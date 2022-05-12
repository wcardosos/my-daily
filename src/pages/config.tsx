import React, { useRef, useState } from 'react';
import { GetServerSideProps } from 'next';
import { getSession, signOut } from 'next-auth/react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Heading,
  Text,
} from '@chakra-ui/react';
import Head from 'next/head';
import axios from 'axios';
import Page from '../components/Page';
import Button from '../components/Button';

interface IConfigProps {
  user: {
    email: string
  }
}

export default function Home({ user: { email } }: IConfigProps) {
  const [isToShowDeleteDataAlert, setIsToShowDeleteDataAlert] = useState<boolean>(false);
  const [isToShowDeleteAccountAlert, setIsToShowDeleteAccountAlert] = useState<boolean>(false);

  const cancelRef = useRef();

  const onClickDeleteData = () => setIsToShowDeleteDataAlert(true);
  const onClickCloseDeleteDataAlert = () => setIsToShowDeleteDataAlert(false);

  const deleteData = async() => {
    await axios.delete(`/api/dailies/delete?email=${email}`);
    setIsToShowDeleteDataAlert(false);
  };

  const onClickDeleteAccount = () => setIsToShowDeleteAccountAlert(true);

  const onClickCloseDeleteAccountAlert = () => setIsToShowDeleteAccountAlert(false);

  const deleteAccount = async() => {
    await axios.delete(`/api/users/delete?email=${email}`);
    setIsToShowDeleteAccountAlert(false);
    signOut();
  };

  return (
    <>
      <Head>
        <title>Configurações - myDaily</title>
      </Head>
      <Page>
        <Box w="100%">
          <Heading color="purple.700">Configurações</Heading>
          <Box>
            <Box pt={['8', '16']}>
              <Heading size="sm" color="purple.700">Sua conta</Heading>
              <Text pt={['6', '8']}>
                Sua conta está linkada com o
                <strong> Github</strong>
                .
              </Text>
            </Box>
            <Box pt={['8', '16']}>
              <Heading size="sm" color="purple.700">Zona de perigo</Heading>
              <Box pt={['6', '8']} pb="4">
                <Button
                  text="Excluir dados"
                  size="normal"
                  onClick={onClickDeleteData}
                  bgColor="red.500"
                  colorScheme="red"
                />
                <Text
                  pt="2"
                  fontSize="sm"
                  color="gray.500"
                >
                  Esta ação irá excluir permanentemente todos os dados da sua daily.
                </Text>
              </Box>
              <Box pb="4">
                <Button
                  text="Excluir conta"
                  size="normal"
                  onClick={onClickDeleteAccount}
                  bgColor="red.500"
                  colorScheme="red"
                />
                <Text
                  pt="2"
                  fontSize="sm"
                  color="gray.500"
                >
                  Esta ação irá excluir permanentemente os dados da sua conta no myDaily.
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>
        <AlertDialog
          isOpen={isToShowDeleteDataAlert}
          leastDestructiveRef={cancelRef}
          onClose={onClickCloseDeleteDataAlert}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold" color="purple.700">
                Deletar dados da conta
              </AlertDialogHeader>

              <AlertDialogBody>
                Você tem certeza ? Você não poderá recuperar os dados no futuro.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button
                  text="Cancelar"
                  size="normal"
                  onClick={onClickCloseDeleteDataAlert}
                  bgColor="gray.300"
                  colorScheme="gray"
                />
                <Button
                  text="Apagar dados"
                  size="normal"
                  onClick={deleteData}
                  colorScheme="red"
                  bgColor="red.500"
                  ml={3}
                />
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
        <AlertDialog
          isOpen={isToShowDeleteAccountAlert}
          leastDestructiveRef={cancelRef}
          onClose={onClickCloseDeleteAccountAlert}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold" color="purple.700">
                Deletar conta
              </AlertDialogHeader>

              <AlertDialogBody>
                {/* eslint-disable-next-line max-len */}
                Você tem certeza ? Será necessário criar uma nova conta para acessar o myDaily novamente.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button
                  text="Cancelar"
                  size="normal"
                  onClick={onClickCloseDeleteAccountAlert}
                  bgColor="gray.300"
                  colorScheme="gray"
                />
                <Button
                  text="Apagar conta"
                  size="normal"
                  onClick={deleteAccount}
                  colorScheme="red"
                  bgColor="red.500"
                  ml={3}
                />
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </Page>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async({ req }) => {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  return {
    props: {
      user: {
        email: session.user.email,
      },
    },
  };
};
