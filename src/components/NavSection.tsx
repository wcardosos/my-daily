import React, { ReactNode } from 'react';
import {
  Box,
  Stack,
  Text,
} from '@chakra-ui/react';

interface INavSectionProps {
  children: ReactNode,
  title: string
}

export default function NavSection({ title, children }: INavSectionProps) {
  return (
    <Box>
      <Text fontWeight="bold" color="gray.400" fontSize="small">{title}</Text>
      <Stack spacing="4" mt="8" align="stretch">
        { children }
      </Stack>
    </Box>
  );
}
