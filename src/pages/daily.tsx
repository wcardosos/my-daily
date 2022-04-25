import React, { useContext } from 'react';
import {
  Box,
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
import axios from 'axios';
import Page from '../components/Page';
import ResumeCard from '../components/ResumeCard';
import ResumeEvent from '../components/ResumeEvent';
import TabTitle from '../components/TabTitle';
import WorkEventsHandler from '../components/WorkEventsHandler';
import {
  DailyWorkContext,
  ITask,
} from '../contexts/DailyWorkContext';

export default function Daily() {
  const {
    whatWasDone,
    whatWantToDo,
    locks,
    setShouldUpdateValues,
  } = useContext(DailyWorkContext);

  const addTask = async (task: string, type: string) => {
    const tasksTypes = {
      done: whatWasDone,
      to_do: whatWantToDo,
      lock: locks,
    };

    const tasksList = tasksTypes[type];

    if (task && !tasksList.tasks.includes(task as unknown as ITask)) {
      await axios.post('/api/tasks/create/today', {
        name: task,
        type,
      });
      setShouldUpdateValues(true);
    }
  };

  const removeTask = async(taskId: string) => {
    await axios.delete(`/api/tasks/remove/${taskId}`);
    setShouldUpdateValues(true);
  };

  return (
    <Page>
      <Box w="100%">
        <Tabs variant="unstyled">
          <TabList>
            <TabTitle icon={<TasksIcon />} title="Tarefas" />
            <TabTitle icon={<ResumeIcon />} title="Resumo" />
          </TabList>
          <TabPanels>
            <TabPanel>
              <VStack align="flex-start" spacing="8">
                <WorkEventsHandler
                  title="O que foi feito"
                  tasks={whatWasDone.tasks}
                  type="done"
                  add={addTask}
                  remove={removeTask}
                />
                <WorkEventsHandler
                  title="O que se pretende fazer"
                  tasks={whatWantToDo.tasks}
                  type="to_do"
                  add={addTask}
                  remove={removeTask}
                />
                <WorkEventsHandler
                  title="Travas"
                  tasks={locks.tasks}
                  type="lock"
                  add={addTask}
                  remove={removeTask}
                />
              </VStack>
            </TabPanel>
            <TabPanel>
              <ResumeCard>
                <ResumeEvent title="O que foi feito" tasks={whatWasDone.tasks} />
                <ResumeEvent title="O que se pretende fazer" tasks={whatWantToDo.tasks} />
                <ResumeEvent title="Travas" tasks={locks.tasks} />
              </ResumeCard>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Page>
  );
}
