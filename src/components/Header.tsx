import {
  Center,
  Divider,
  Flex,
  Spacer,
} from '@chakra-ui/react';
import React from 'react';
import Logo from './Logo';
import Profile from './Profile';
import ActionBar from './ActionBar';
import { useResponsiveness } from '../hooks/useResponsiveness';
import Drawer from './Drawer';

export default function Header() {
  const isDesktopVersion = useResponsiveness('desktop');

  const handleLogout = () => console.log('Logout'); // eslint-disable-line no-console

  return (
    <Flex
      direction={isDesktopVersion ? 'row' : 'row-reverse'}
      pl={['6', '8']}
      pr={['6', '32']}
      align="center"
      h="10vh"
    >
      <Logo />
      <Spacer />
      <Flex>
        { isDesktopVersion && (
          <>
            <Profile email="wagner@email.com" name="Wagner Cardoso" />
            <Center px="4">
              <Divider borderColor="gray.500" orientation="vertical" />
            </Center>
            <ActionBar handleLogout={handleLogout} />
          </>
        )}
        { !isDesktopVersion && <Drawer /> }
      </Flex>
    </Flex>
  );
}
