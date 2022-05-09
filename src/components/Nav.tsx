import React from 'react';
import { signOut } from 'next-auth/react';
import {
  Stack,
} from '@chakra-ui/react';
import {
  RiCalendarEventFill,
  RiCalendarTodoFill,
  RiLogoutBoxRLine,
  RiSettings4Fill,
} from 'react-icons/ri';
import NavLink from './NavLink';
import NavSection from './NavSection';

export default function Nav() {
  const handleSignout = () => signOut();

  return (
    <Stack data-testid="nav" spacing="12" align="flex-start">
      <NavSection title="DAYLY">
        <NavLink href="/daily" icon={RiCalendarTodoFill} text="Hoje" />
        <NavLink href="/calendar" icon={RiCalendarEventFill} text="Calendário" />
      </NavSection>
      <NavSection title="CONTA">
        <NavLink href="/config" icon={RiSettings4Fill} text="Configurações" />
        <NavLink href={null} icon={RiLogoutBoxRLine} text="Sair" onClick={handleSignout} />
      </NavSection>
    </Stack>
  );
}
