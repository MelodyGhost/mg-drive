import { Center, VStack } from '@chakra-ui/react';
import React from 'react';
import Navbar from '../Navbar';

const CenteredContainer = ({ children }) => {
  return (
    <>
      <Navbar />
      <Center height={'80vh'}>
        <VStack>{children}</VStack>
      </Center>
    </>
  );
};

export default CenteredContainer;
