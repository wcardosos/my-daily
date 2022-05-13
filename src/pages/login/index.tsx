/* eslint-disable no-trailing-spaces */
import React from 'react';
import {
  Box,
  Button,
  Center,
  Stack,
  Text,
} from '@chakra-ui/react';
import { getSession, signIn } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import { FaGithub } from 'react-icons/fa';
import Head from 'next/head';
import Logo from '../../components/Logo';
import AuthSectionInfo from '../../components/AuthSectionInfo';

export default function Login() {
  const handleLogin = async() => {
    await signIn('github', { callbackUrl: '/login/processing' });
  };

  return (
    <>
      <Head>
        <title>Login - myDaily</title>
      </Head>
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
                onClick={handleLogin}
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
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async({ req }) => {
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: {
        destination: '/daily',
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
