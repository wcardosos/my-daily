import React from 'react';
import {
  Box,
} from '@chakra-ui/react';
import Nav from './Nav';

export default function Sidebar() {
  return (
    <Box pl="8" w="64" mr="8" h="100%">
      <Nav />
    </Box>
  );
}
