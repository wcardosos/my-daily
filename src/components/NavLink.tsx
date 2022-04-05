import React from 'react';
import {
  Icon,
  Link,
  LinkProps as ChakraLinkProps,
  Text,
} from '@chakra-ui/react';
import { IconType } from 'react-icons';
import ActiveLink from './ActiveLink';

interface INavLinkProps extends ChakraLinkProps {
  href: string,
  icon: IconType,
  text: string,
}

export default function NavLink({
  href,
  icon,
  text,
  ...rest
}: INavLinkProps) {
  return (
    <ActiveLink href={href}>
      <Link display="flex" align="center" {...rest}>
        <Icon data-testid="nav-link-icon" as={icon} fontSize="20" />
        <Text ml="4" fontWeight="medium">{text}</Text>
      </Link>
    </ActiveLink>
  );
}
