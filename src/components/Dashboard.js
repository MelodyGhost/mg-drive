import { Container } from 'react-bootstrap';
import NavbarDrive from './Navbar';
import AddFolderBtn from './drive/AddFolder';
import AddFileBtn from './drive/AddFileBtn';
import { useFolder } from '../hooks/useFolder';
import Folder from './drive/Folder';
import { useParams, useLocation } from 'react-router-dom';
import BreadCrumbs from './drive/BreadCrumbs';
import File from './drive/File';
import { Box, Text } from '@chakra-ui/react';

const Dashboard = () => {
  const { folderId } = useParams();
  const { state = {} } = useLocation();
  const { folder, childFolders, childFiles } = useFolder(
    folderId,
    state.folder
  );

  return (
    <Container fluid>
      <NavbarDrive />
      <Box px="4">
        <div className="d-flex align-items-center  w-100 my-3">
          <BreadCrumbs currentFolder={folder} />
          <AddFileBtn currentFolder={folder} />
          <AddFolderBtn currentFolder={folder} />
        </div>
        {childFolders.length > 0 && (
          <>
            <Box color="blackAlpha.700">Folders</Box>
            <div className="d-flex flex-wrap">
              {childFolders.map((childFolder) => (
                <Folder key={childFolder.id} folder={childFolder} />
              ))}
            </div>
            <hr />
          </>
        )}
        <Box color="blackAlpha.700" my="2">
          Files
        </Box>
        {childFiles.length > 0 && (
          <div className="d-flex flex-wrap">
            {childFiles.map((childFile) => (
              <File key={childFile.id} file={childFile} />
            ))}
          </div>
        )}
        {!childFiles.length && (
          <Text size="lg" color="blackAlpha.500" align="center">
            No files...
          </Text>
        )}
      </Box>
    </Container>
  );
};

export default Dashboard;
