import React from 'react';
import { FileDrop } from 'react-file-drop';
import './file-drop.css';
import { Heading } from '@chakra-ui/layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';

export const DropFile = ({ handleUpload }) => {
  return (
    <div>
      <FileDrop
        onFrameDragEnter={(event) => {}}
        onFrameDragLeave={(event) => {}}
        onFrameDrop={(event) => handleUpload(event.dataTransfer.files)}
        onDragOver={(event) => {}}
        onDragLeave={(event) => {}}
        onDrop={(files, event) => {}}
      >
        <Heading size="3xl" textShadow="1px 1px rgba(255, 255, 255, 0.5)">
          <FontAwesomeIcon size="3x" icon={faCloudUploadAlt} />
          <br />
          Drop Here to Upload
        </Heading>
      </FileDrop>
    </div>
  );
};
