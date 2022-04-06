import React, { useRef } from 'react';
import {
  Box,
  Drawer as DrawerChakra,
  DrawerBody,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerOverlay,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { RiMenuFill as MenuIcon } from 'react-icons/ri';
import Profile from './Profile';
import Nav from './Nav';
import Logo from './Logo';

export default function Drawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const menuButtonRef = useRef();

  return (
    <>
      <Box
        as="button"
        data-testid="open-drawer-button"
        color="purple.700"
        ref={menuButtonRef}
        onClick={onOpen}
      >
        <MenuIcon fontSize="24" />
      </Box>
      <DrawerChakra
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={menuButtonRef}
      >
        <DrawerOverlay />
        <DrawerContent bg="gray.50" color="gray.800">
          <DrawerCloseButton data-testid="close-drawer-button" />
          <DrawerHeader fontWeight={400} py="8">
            <VStack align="flex-start" spacing="4">
              <Logo />
              <Profile email="wagner@email.com" name="Wagner Cardoso" />
            </VStack>
          </DrawerHeader>
          <DrawerBody>
            <Nav />
          </DrawerBody>
        </DrawerContent>
      </DrawerChakra>
    </>
  );
}
