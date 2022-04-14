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

  const addDoneTask = async (task: string) => {
    if (task && !whatWasDone.tasks.includes(task as unknown as ITask)) {
      await axios.post('/api/tasks/create/today', {
        name: task,
        type: 'done',
      });
      setShouldUpdateValues(true);
    }
  };
  const removeDoneTask = async(task: ITask) => {
    await axios.delete(`/api/tasks/remove/${task.id}`);
    setShouldUpdateValues(true);
  };

  const addWantToDoTask = async (task: string) => {
    if (task && !whatWasDone.tasks.includes(task as unknown as ITask)) {
      await axios.post('/api/tasks/today', {
        name: task,
        type: 'to_do',
      });
      setShouldUpdateValues(true);
    }
  };
  const removeWantToDoTask = async(task: ITask) => {
    await axios.delete(`/api/tasks/remove/${task.id}`);
    setShouldUpdateValues(true);
  };

  const addLockTask = async(task: string) => {
    if (task && !whatWasDone.tasks.includes(task as unknown as ITask)) {
      await axios.post('/api/tasks/today', {
        name: task,
        type: 'lock',
      });
      setShouldUpdateValues(true);
    }
  };
  const removeLockTask = async(task: ITask) => {
    await axios.delete(`/api/tasks/remove/${task.id}`);
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
                  add={addDoneTask}
                  remove={removeDoneTask}
                />
                <WorkEventsHandler
                  title="O que se pretende fazer"
                  tasks={whatWantToDo.tasks}
                  add={addWantToDoTask}
                  remove={removeWantToDoTask}
                />
                <WorkEventsHandler
                  title="Travas"
                  tasks={locks.tasks}
                  add={addLockTask}
                  remove={removeLockTask}
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
