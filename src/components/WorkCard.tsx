import React, { ReactNode } from 'react';
import {
  Flex,
} from '@chakra-ui/react';

interface IWorkCard {
  children: ReactNode
}

export default function WorkCard({ children }: IWorkCard) {
  return (
    <Flex
      direction="column"
      w={['100%', '400px']}
      minH="320px"
      p="8"
      bgColor="gray.100"
      borderRadius={['5px', '10px']}
    >
      {children}
    </Flex>
  );
}
