import React from 'react';
import {
  Button,
  Center,
  Flex,
  Input,
  Spacer,
  Text,
  VStack,
} from '@chakra-ui/react';
import WorkCard from './WorkCard';

interface IWorkEventsHandler {
  title: string
  tasks: Array<string>
}

export default function WorkEventsHandler({ title, tasks }: IWorkEventsHandler) {
  return (
    <WorkCard>
      <Text as="strong" color="purple.700">{title}</Text>
      <VStack spacing="4" pt="6" pb="8">
        { tasks.map((task) => (
          <Flex w="100%">
            <Text>{task}</Text>
            <Spacer />
            <Text cursor="pointer" fontSize="xs" color="red.500">Remover</Text>
          </Flex>
        )) }
      </VStack>
      <Spacer />
      <>
        <Input
          bgColor="gray.50"
          borderColor="gray.400"
          size="sm"
          focusBorderColor="purple.500"
        />
        <Center mt="4">
          <Button fontSize="12px" size="sm" colorScheme="purple" bgColor="purple.700">Adicionar</Button>
        </Center>
      </>
    </WorkCard>
  );
}
