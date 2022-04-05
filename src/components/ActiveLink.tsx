import React, { cloneElement, ReactElement } from 'react';
import {
  Link,
  LinkProps,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

interface IActiveLinkProps extends LinkProps {
  children: ReactElement,
  shouldMatchExactHref?: boolean
}

export default function ActiveLink({
  children,
  shouldMatchExactHref,
  ...rest
}: IActiveLinkProps) {
  const { asPath } = useRouter();
  let isActive = false;

  if (shouldMatchExactHref && (asPath === rest.href || asPath === rest.as)) {
    isActive = true;
  }

  if (
    !shouldMatchExactHref
    && (asPath.startsWith(String(rest.href)) || asPath.startsWith(String(rest.as)))
  ) {
    isActive = true;
  }

  return (
    <Link {...rest}>
      {cloneElement(children, {
        href: rest.href,
        color: isActive ? 'purple.700' : 'gray.800',
      })}
    </Link>
  );
}

ActiveLink.defaultProps = {
  shouldMatchExactHref: false,
};
