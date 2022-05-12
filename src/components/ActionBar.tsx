import React from 'react';
import {
  Button,
  Link,
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
    <HStack data-testid="action-bar" spacing="2">
      <Link href="/config">
        <Button data-testid="settings-button" variant="ghost">
          <SettingsIcon fontSize="24" />
        </Button>
      </Link>
      <Button variant="ghost" onClick={handleLogout}>
        <LogoutIcon data-testid="logout-button" fontSize="24" />
      </Button>
    </HStack>
  );
}
