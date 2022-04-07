import React, { ReactNode } from 'react';
import {
  Stack,
} from '@chakra-ui/react';

interface IResumeCard {
  children: ReactNode
}

export default function ResumeCard({ children }: IResumeCard) {
  return (
    <Stack
      align="flex-start"
      direction={['column', 'row']}
      w={['100', '75%']}
      minH="70vh"
      p={['4', '8']}
      bgColor="gray.100"
      borderRadius={['5px', '10px']}
      spacing="16"
    >
      {children}
    </Stack>
  );
}
