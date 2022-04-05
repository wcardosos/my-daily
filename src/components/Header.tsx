import {
  Flex,
  Spacer,
} from '@chakra-ui/react';
import React from 'react';
import Logo from './Logo';
import Profile from './Profile';

export default function Header() {
  return (
    <Flex px="32" align="center" h="10vh">
      <Logo />
      <Spacer />
      <Flex>
        <Profile email="wagner@email.com" name="Wagner Cardoso" />
      </Flex>
    </Flex>
  );
}
