import ReactDOM from 'react-dom';
import { faFileUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuth } from '../../context/AuthContext';
import { storage, files, currentDate } from '../../firebase';
import { useState } from 'react';
import { Toast, ProgressBar } from 'react-bootstrap';
import { Tooltip } from '@chakra-ui/react';
import { v4 as uuid4 } from 'uuid';

export default function AddFileBtn({ currentFolder }) {
  const [uploadingFile, setUploadingFile] = useState([]);
  const { currentUser } = useAuth();

  function handleUpload(e) {
    const file = e.target.files[0];
    if (currentFolder === null || !file) return;

    const id = uuid4();
    // Add to uploadingFile state
    setUploadingFile(() => [
      ...uploadingFile,
      {
        id: id,
        name: file.name,
        error: false,
        progress: 0,
      },
    ]);

    // File path for database storage
    let filePath = '';
    currentFolder.path.forEach((dir) => (filePath += dir.name + '/'));
    filePath += currentFolder.name + '/' + file.name;

    const uploadFile = storage
      .ref(`files/${currentUser.uid}/${filePath}`)
      .put(file);

    uploadFile.on(
      'state-changed',
      (snapshot) => {
        const progress = snapshot.bytesTransferred / snapshot.totalBytes;
        setUploadingFile((files) => {
          return files.map((f) => {
            if (f.id === id) {
              return { ...f, progress: progress };
            }
            return f;
          });
        });
      },

      (error) => {
        setUploadingFile((prevFile) => {
          return prevFile.map((f) => {
            if (f.id === id) {
              return {
                ...f,
                error: true,
              };
            }
            return f;
          });
        });
      },
      () => {
        setUploadingFile(() => uploadingFile.filter((f) => f.id !== id));

        uploadFile.snapshot.ref.getDownloadURL().then((url) => {
          files
            .where('name', '==', file.name)
            .where('folderId', '==', currentFolder.id)
            .where('userId', '==', currentUser.uid)
            .get()
            .then((existingFiles) => {
              const existingFile = existingFiles.docs[0];
              if (existingFile) {
                existingFile.ref.update({ url: url });
              } else {
                files.add({
                  name: file.name,
                  url: url,
                  createdAt: currentDate(),
                  folderId: currentFolder.id,
                  userId: currentUser.uid,
                });
              }
            });
        });
      }
    );
  }
  return (
    <>
      <Tooltip label="Upload Files">
        <label className="btn btn-outline-success m-3">
          <FontAwesomeIcon icon={faFileUpload} />
          <input
            type="file"
            onChange={handleUpload}
            style={{
              visibility: 'hidden',
              position: 'absolute',
              top: '-9999px',
            }}
          />
        </label>
      </Tooltip>
      {uploadingFile.length > 0 &&
        ReactDOM.createPortal(
          <div
            style={{
              position: 'absolute',
              right: '1rem',
              bottom: '1rem',
              width: '250px',
            }}
          >
            {uploadingFile.map((f) => {
              return (
                <Toast
                  key={f.id}
                  show={f.progress !== 100}
                  onClose={() =>
                    setUploadingFile(() =>
                      uploadingFile.filter((doc) => doc.id !== f.id)
                    )
                  }
                >
                  <Toast.Header className="text-truncate" closeButton={f.error}>
                    {f.name}
                  </Toast.Header>
                  <Toast.Body>
                    <ProgressBar
                      animated={!f.error}
                      variant={f.error ? 'danger' : 'success'}
                      now={Math.round(f.progress * 100)}
                      striped
                      label={
                        f.error
                          ? 'Error'
                          : `uploading ${Math.round(f.progress * 100)}%`
                      }
                    />
                  </Toast.Body>
                </Toast>
              );
            })}
          </div>,
          document.body
        )}
    </>
  );
}
