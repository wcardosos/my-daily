import React from 'react';
import {
  Text,
} from '@chakra-ui/react';

export default function Logo() {
  return (
    <Text
      data-testid="logo"
      color="purple.700"
      fontSize={['2xl', '3xl']}
      fontWeight="bold"
      letterSpacing="tight"
      w="64"
    >
      myDaily
    </Text>
  );
}
