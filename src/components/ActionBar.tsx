import React from 'react';
import {
  Button,
  HStack,
} from '@chakra-ui/react';
import {
  RiSettings4Fill as SettingsIcon,
  RiLogoutBoxRLine as LogoutIcon,
} from 'react-icons/ri';

interface IActionBarProps {
  handleLogout: () => void
}

export default function ActionBar({ handleLogout }: IActionBarProps) {
  return (
    <HStack spacing="2">
      <Button data-testid="settings-button" variant="ghost">
        <SettingsIcon fontSize="24" />
      </Button>
      <Button variant="ghost" onClick={handleLogout}>
        <LogoutIcon data-testid="logout-button" fontSize="24" />
      </Button>
    </HStack>
  );
}
