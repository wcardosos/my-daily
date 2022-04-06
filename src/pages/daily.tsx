import React from 'react';
import {
  Box,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  VStack,
} from '@chakra-ui/react';
import {
  RiTaskFill as TasksIcon,
  RiTodoFill as ResumeIcon,
} from 'react-icons/ri';
import Page from '../components/Page';
import TabTitle from '../components/TabTitle';
import WorkEventsHandler from '../components/WorkEventsHandler';

export default function Daily() {
  return (
    <Page>
      <Box>
        <Tabs variant="unstyled">
          <TabList>
            <TabTitle icon={<TasksIcon />} title="Tarefas" />
            <TabTitle icon={<ResumeIcon />} title="Resumo" />
          </TabList>
          <TabPanels>
            <TabPanel>
              <VStack align="flex-start" spacing="8">
                <WorkEventsHandler title="O que foi feito" tasks={['Tarefa 1', 'Tarefa 2', 'Tarefa 3']} />
                <WorkEventsHandler title="O que se pretende fazer" tasks={['Tarefa 1', 'Tarefa 2', 'Tarefa 3']} />
                <WorkEventsHandler title="Travas" tasks={[]} />
              </VStack>
            </TabPanel>
            <TabPanel>
              <Heading>Resumo das tarefas</Heading>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Page>
  );
}
