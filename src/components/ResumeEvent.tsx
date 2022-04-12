import React from 'react';
import {
  Box,
  Text,
  VStack,
} from '@chakra-ui/react';
import { ITask } from '../contexts/DailyWorkContext';

interface IResumeEventProps {
  title: string
  tasks: ITask[]
}

export default function ResumeEvent({ title, tasks }: IResumeEventProps) {
  return (
    <Box w="100%" minH="30vh">
      <Text as="strong" color="purple.700">{title}</Text>
      <VStack align="flex-start" spacing="4" pt="8">
        { tasks.map((task) => <Text>{task.name}</Text>) }
      </VStack>
    </Box>
  );
}
