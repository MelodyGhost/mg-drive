// import { Container } from 'react-bootstrap';
import NavbarDrive from './Navbar';
import AddFolderBtn from './drive/AddFolder';
import AddFileBtn from './drive/AddFileBtn';
import { useFolder } from '../hooks/useFolder';
import Folder from './drive/Folder';
import { useParams, useLocation } from 'react-router-dom';
import BreadCrumbs from './drive/BreadCrumbs';
import File from './drive/File';
import { Box, Text, Center, VStack, Stack } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhotoVideo } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
  const { folderId } = useParams();
  const { state = {} } = useLocation();
  const { folder, childFolders, childFiles } = useFolder(
    folderId,
    state.folder
  );

  return (
    <>
      <NavbarDrive />
      <Box maxWidth="container.lg" mx="auto">
        <Box px="4">
          <div className="d-flex align-items-center w-100 my-3">
            <BreadCrumbs currentFolder={folder} />
            <Stack spacing="-1" direction={['column', 'row']}>
              <AddFileBtn currentFolder={folder} />
              <AddFolderBtn currentFolder={folder} />
            </Stack>
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
        <Center zIndex={-100}>
          <VStack
            mt={'60px'}
            borderRadius="lg"
            p="8"
            bg="red.50"
            color="gray.400"
          >
            <FontAwesomeIcon size={'4x'} icon={faPhotoVideo} />
            <Text fontSize="2xl" fontWeight="semibold">
              Drop a file
            </Text>
            <Text>or use the button.</Text>
          </VStack>
        </Center>
      </Box>
    </>
  );
};

export default Dashboard;
