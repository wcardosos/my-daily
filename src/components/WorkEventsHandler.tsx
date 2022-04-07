import React, { useState } from 'react';
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
import { ITask } from '../contexts/DailyWorkContext';

interface IWorkEventsHandler {
  title: string
  tasks: ITask[]
  add: (value: unknown) => void // eslint-disable-line no-unused-vars
  remove: (value: unknown) => void // eslint-disable-line no-unused-vars
}

export default function WorkEventsHandler({
  title,
  tasks,
  add,
  remove,
}: IWorkEventsHandler) {
  const [inputValue, setInputValue] = useState('');

  const addWork = () => {
    add(inputValue);
    setInputValue('');
  };

  const removeWork = (task: ITask) => {
    remove(task);
  };

  const onChangeInput = (event: React.FormEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value);
  };

  return (
    <WorkCard>
      <Text as="strong" color="purple.700">{title}</Text>
      <VStack spacing="4" pt="6" pb="8">
        { tasks.map((task) => (
          <Flex key={task as unknown as string} w="100%">
            <Text>{task}</Text>
            <Spacer />
            <Text
              cursor="pointer"
              fontSize="xs"
              color="red.500"
              onClick={() => removeWork(task)}
            >
              Remover
            </Text>
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
          value={inputValue}
          onChange={onChangeInput}
        />
        <Center mt="4">
          <Button
            fontSize="12px"
            size="sm"
            colorScheme="purple"
            bgColor="purple.700"
            onClick={addWork}
          >
            Adicionar
          </Button>
        </Center>
      </>
    </WorkCard>
  );
}
