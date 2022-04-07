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
  } = useContext(DailyWorkContext);

  const addDoneTask = (task: string) => {
    if (task && !whatWasDone.tasks.includes(task as unknown as ITask)) {
      const newDoneTasks = [...whatWasDone.tasks, task];

      whatWasDone.set(newDoneTasks);
    }
  };
  const removeDoneTask = (task: ITask) => {
    const newDoneTasks = whatWasDone.tasks.filter((t) => t !== task);

    whatWasDone.set(newDoneTasks);
  };

  const addWantToDoTask = (task: string) => {
    if (task) {
      const newWantToDoTasks = [...whatWantToDo.tasks, task];

      whatWantToDo.set(newWantToDoTasks);
    }
  };
  const removeWantToDoTask = (task: ITask) => {
    const newWantToDoTasks = whatWantToDo.tasks.filter((t) => t !== task);

    whatWantToDo.set(newWantToDoTasks);
  };

  const addLockTask = (task: string) => {
    if (task) {
      const newLockTasks = [...locks.tasks, task];

      locks.set(newLockTasks);
    }
  };
  const removeLockTask = (task: ITask) => {
    const newLockTasks = locks.tasks.filter((t) => t !== task);

    locks.set(newLockTasks);
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
