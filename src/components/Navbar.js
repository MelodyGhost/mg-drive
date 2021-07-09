import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Flex,
  Heading,
  Text,
  Avatar,
  HStack,
  Tooltip,
  Container,
} from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext';

// import { Container, Navbar, Nav } from 'react-bootstrap';

// const NavbarDrive = () => {
//   return (
//     <>
//       <Navbar bg="dark" variant='dark' expand="sm">
//         <Navbar.Brand>My Google Drive</Navbar.Brand>
//         <Nav className='ml-auto'>
//           <Nav.Link as={Link} to='/profile' >
//             Profile
//           </Nav.Link>
//         </Nav>
//       </Navbar>
//     </>
//   )
// }

const NavbarDrive = () => {
  const { currentUser } = useAuth();
  return (
    <>
      <Box bg="blackAlpha.800" p="4">
        <Box maxWidth="container.lg" mx="auto">
          <Flex justify="space-between" mx="4">
            <Heading size="md" color="white">
              MG Drive
            </Heading>
            {currentUser && (
              <Box color="white" size="md" as={Link} to="/profile">
                <Tooltip label="Profile">
                  <Avatar bg="teal.500" size="sm" />
                </Tooltip>
              </Box>
            )}
            {!currentUser && (
              <HStack spacing="30px">
                <Text as={Link} to="/login" style={{ color: '#90CDF4' }}>
                  Login
                </Text>

                <Text as={Link} to="/signup" style={{ color: '#90CDF4' }}>
                  Create Account
                </Text>
              </HStack>
            )}
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export default NavbarDrive;
