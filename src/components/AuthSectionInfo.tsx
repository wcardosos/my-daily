/* eslint-disable no-trailing-spaces */
import React from 'react';
import {
  Box,
  Flex,
  Image,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react';

export default function AuthSectionInfo() {
  return (
    <Box
      bgColor="purple.700"
      color="gray.50"
      w={['100%', '100%', '50%']}
      minH="100vh"
      px={['6', '16']}
      py={['16', '8']}
    >
      <Flex w="100%" direction="row-reverse">
        <Text as="strong">myDaily</Text>
      </Flex>
      <VStack py="8" spacing="16">
        <HStack spacing="8">
          <Image
            src="/assets/daily-organization.png"
            alt="Daily organization"
            w="128px"
          />
          <Text>Organize sua daily e não deixe mais nada passar batido na cerimônia</Text>
        </HStack>
        <HStack spacing="8">
          <Image
            src="/assets/past-dailies.png"
            alt="Past dailies"
            w="128px"
          />
          <Text>Consulte o que você fez em dias anteriores</Text>
        </HStack>
        <HStack spacing="8">
          <Image
            src="/assets/team-meeting.png"
            alt="Team meeting"
            w="128px"
          />
          <Text>
            Não se enrole mais com o que você fez e melhore 
            a compreensão de seus colegas de time
          </Text>
        </HStack>
      </VStack>
    </Box>
  );
}
