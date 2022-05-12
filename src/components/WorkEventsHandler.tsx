import React, { useState } from 'react';
import {
  Box,
  Button,
  Center,
  Flex,
  Input,
  Spacer,
  Text,
  VStack,
} from '@chakra-ui/react';
import WorkCard from './WorkCard';
import { ITask } from '../interfaces/ITask';

interface IWorkEventsHandlerProps {
  title: string
  tasks: ITask[]
  type: string
  add: (value: unknown, type: string) => void // eslint-disable-line no-unused-vars
  remove: (value: unknown) => void // eslint-disable-line no-unused-vars
}

export default function WorkEventsHandler({
  title,
  tasks,
  type,
  add,
  remove,
}: IWorkEventsHandlerProps) {
  const [inputValue, setInputValue] = useState('');

  const addWork = () => {
    add(inputValue, type);
    setInputValue('');
  };

  const removeWork = (task: ITask) => {
    remove(task.id);
  };

  const onChangeInput = (event: React.FormEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value);
  };

  return (
    <WorkCard>
      <Text as="strong" color="purple.700">{title}</Text>
      <VStack spacing="4" pt="6" pb="8">
        { tasks.map((task) => (
          <Flex key={task.id} w="100%">
            <Box maxW="75%">
              <Text>{task.name}</Text>
            </Box>
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
          placeholder="Adicione uma nova tarefa"
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
