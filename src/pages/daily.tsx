import React from 'react';
import {
  Box,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react';
import {
  RiTaskFill as TasksIcon,
  RiTodoFill as ResumeIcon,
} from 'react-icons/ri';
import Page from '../components/Page';
import TabTitle from '../components/TabTitle';

export default function Daily() {
  return (
    <Page>
      <Box>
        <Tabs>
          <TabList>
            <TabTitle icon={<TasksIcon />} title="Tarefas" />
            <TabTitle icon={<ResumeIcon />} title="Resumo" />
          </TabList>
          <TabPanels>
            <TabPanel>
              <Heading>Tarefas para adicionar</Heading>
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
