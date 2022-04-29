/* eslint-disable no-trailing-spaces */
import React from 'react';
import {
  Box,
  Button,
  Center,
  Stack,
  Text,
} from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';
import Logo from '../components/Logo';
import AuthSectionInfo from '../components/AuthSectionInfo';

export default function Login() {
  return (
    <Box w="100%">
      <Stack
        w="100%"
        direction={['column', 'row']}
      >
        <Box
          w={['100%', '100%', '50%']}
          h="100vh"
          px={['6', '16']}
          py={['16', '8']}
        >
          <Center>
            <Logo />
          </Center>
          <Box py={['16', '8']}>
            <Text fontSize="32">Bem vindo!</Text>
            <Text color="gray.600">Faça seu login</Text>
          </Box>
          <Box>
            <Button
              bgColor="gray.800"
              color="gray.50"
              fontSize="12px"
              fontWeight={400}
              h="48px"
              rightIcon={<FaGithub fontSize={24} />}
              _hover={{
                bgColor: 'gray.700',
              }}
            >
              Entrar com Github
            </Button>
          </Box>
        </Box>
        <AuthSectionInfo />
      </Stack>
    </Box>
  );
}
