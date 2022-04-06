import React, { ReactElement } from 'react';
import {
  HStack,
  Tab as TabChakra,
  Text,
} from '@chakra-ui/react';
import { IconType } from 'react-icons';

interface ITabProps {
  icon: ReactElement<IconType>
  title: string
}

export default function Tab({ icon, title }: ITabProps) {
  return (
    <TabChakra
      color="gray.500"
      _selected={{ color: 'purple.700' }}
    >
      <HStack spacing="4" px="4">
        {icon}
        <Text as="strong">{title}</Text>
      </HStack>
    </TabChakra>
  );
}
