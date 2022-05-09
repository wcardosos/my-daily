/* eslint-disable no-trailing-spaces */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import {
  Box,
  Button,
  Center,
  Link,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react';
import { getSession } from 'next-auth/react';
import Logo from '../../components/Logo';
import AuthSectionInfo from '../../components/AuthSectionInfo';
import httpStatus from '../../utils/httpStatus';

export default function Processing() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isNewUser, setIsNewUser] = useState<boolean>(false);
  
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
    <Center w="100%" h="100vh">
      <Spinner size="lg" />
    </Center>
  ) : isNewUser && (
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
            <Text color="gray.600">Obrigado por usar nosso app</Text>
          </Box>
          <Box>
            <Link href="/daily">
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
  );
}
