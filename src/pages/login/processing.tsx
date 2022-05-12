/* eslint-disable no-trailing-spaces */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  Center,
  Link,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react';
import axios from 'axios';
import Head from 'next/head';
import { getSession } from 'next-auth/react';
import Logo from '../../components/Logo';
import AuthSectionInfo from '../../components/AuthSectionInfo';
import httpStatus from '../../utils/httpStatus';

export default function Processing() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isNewUser, setIsNewUser] = useState<boolean>(false);
  const [newUserName, setNewUserName] = useState<string | null>(null);
  
  const router = useRouter();

  useEffect(() => {
    async function fetchUserExists() {
      const { user } = await getSession();

      try {
        const { status } = await axios.head(`/api/users/exists?email=${user.email}`);
        
        if (status === httpStatus.OK) {
          router.push('/daily');
        }
      } catch (error) {
        setIsNewUser(true);
        
        const { email, name, image } = user;
        
        setNewUserName(name);
        
        await axios.post('/api/users', {
          email,
          name,
          image,
        });
        
        setIsLoading(false);  
      }
    }
    fetchUserExists();
  }, [router]);

  return isLoading ? (
    <>
      <Head>
        <title>Autenticando - myDaily</title>
      </Head>
      <Center w="100%" h="100vh">
        <Spinner size="lg" />
      </Center>
    </>
  ) : isNewUser && (
    <>
      <Head>
        <title>Seja bem vindo - myDaily</title>
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
              <Text fontSize="32">{`Bem vindo ${newUserName}!`}</Text>
              <Text color="gray.600">Obrigado por usar nosso app</Text>
            </Box>
            <Box>
              <Link
                href="/daily"
                _hover={{
                  textDecoration: null,
                }}
              >
                <Button
                  colorScheme="purple"
                  bgColor="purple.700"
                  color="gray.50"
                  h="48px"
                >
                  Acessar myDaily
                </Button>
              </Link>
            </Box>
          </Box>
          <AuthSectionInfo />
        </Stack>
      </Box>
    </>
  );
}
