import React, { ReactNode } from 'react';
import {
  Flex,
} from '@chakra-ui/react';
import Header from './Header';
import Sidebar from './Sidebar';
import { useResponsiveness } from '../hooks/useResponsiveness';

interface IPageProps {
  children: ReactNode
}

export default function Page({ children }: IPageProps) {
  const isMobileVersion = useResponsiveness('mobile');
  return (
    <Flex direction="column">
      <Header />
      <Flex py="8" px={isMobileVersion ? '6' : 0} w="100%" maxWidth={1480} mx="auto">
        {!isMobileVersion && <Sidebar />}
        {children}
      </Flex>
    </Flex>
  );
}
