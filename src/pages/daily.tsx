import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import {
  Box,
  Center,
  Heading,
  Spinner,
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
import { useQuery, useQueryClient } from 'react-query';
import { format } from 'date-fns';
import Head from 'next/head';
import axios from 'axios';
import Page from '../components/Page';
import ResumeCard from '../components/ResumeCard';
import ResumeEvent from '../components/ResumeEvent';
import TabTitle from '../components/TabTitle';
import WorkEventsHandler from '../components/WorkEventsHandler';
import { ITask } from '../interfaces/ITask';

interface IDailyProps {
  user: {
    email: string
  }
}

export default function Daily({ user: { email } }: IDailyProps) {
  const [whatWasDone, setWhatWasDone] = useState<Array<ITask>>([]);
  const [whatWantToDo, setWhatWantToDo] = useState<Array<ITask>>([]);
  const [locks, setLocks] = useState<Array<ITask>>([]);

  const { isLoading } = useQuery('getDailyTasks', async() => {
    const response = await axios.get(`/api/tasks/today?user=${email}`);

    const doneList = response.data.filter((item) => item.type === 'done');
    const toDoList = response.data.filter((item) => item.type === 'to_do');
    const locksList = response.data.filter((item) => item.type === 'lock');

    setWhatWasDone(doneList.map(({ id, name }) => ({ id, name })));
    setWhatWantToDo(toDoList.map(({ id, name }) => ({ id, name })));
    setLocks(locksList.map(({ id, name }) => ({ id, name })));
  }, {
    refetchOnWindowFocus: false,
  });

  const queryClient = useQueryClient();

  const addTask = async (task: string, type: string) => {
    const tasksTypes = {
      done: whatWasDone,
      to_do: whatWantToDo,
      lock: locks,
    };

    const tasksList: ITask[] = tasksTypes[type];

    if (task && !tasksList.includes(task as unknown as ITask)) {
      await axios.post('/api/tasks/create/today', {
        user: email,
        name: task,
        type,
      });

      queryClient.invalidateQueries(['getDailyTasks']);
    }
  };

  const removeTask = async(taskId: string) => {
    await axios.delete(`/api/tasks/remove/${taskId}`);
    queryClient.invalidateQueries();
  };

  const today = new Date();

  return (
    <>
      <Head>
        <title>Hoje - myDaily</title>
      </Head>
      <Page>
        <Box w="100%">
          <Heading color="purple.700" size="md">{`Daily de hoje, ${format(today, 'dd/MM/yy')}`}</Heading>
          <Box pt={['4', '8']}>
            <Tabs variant="unstyled">
              <TabList>
                <TabTitle icon={<TasksIcon />} title="Tarefas" />
                <TabTitle icon={<ResumeIcon />} title="Resumo" />
              </TabList>
              <TabPanels>
                <TabPanel>
                  {
                    isLoading
                      ? (
                        <Center h="50vh">
                          <Spinner color="purple.700" />
                        </Center>
                      ) : (
                        <VStack align="flex-start" spacing="8">
                          <WorkEventsHandler
                            title="O que foi feito"
                            tasks={whatWasDone}
                            type="done"
                            add={addTask}
                            remove={removeTask}
                          />
                          <WorkEventsHandler
                            title="O que se pretende fazer"
                            tasks={whatWantToDo}
                            type="to_do"
                            add={addTask}
                            remove={removeTask}
                          />
                          <WorkEventsHandler
                            title="Travas"
                            tasks={locks}
                            type="lock"
                            add={addTask}
                            remove={removeTask}
                          />
                        </VStack>
                      )
                  }
                </TabPanel>
                <TabPanel>
                  <ResumeCard>
                    <ResumeEvent title="O que foi feito" tasks={whatWasDone} />
                    <ResumeEvent title="O que se pretende fazer" tasks={whatWantToDo} />
                    <ResumeEvent title="Travas" tasks={locks} />
                  </ResumeCard>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Box>
      </Page>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async({ req }) => {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  return {
    props: {
      user: {
        email: session.user.email,
      },
    },
  };
};
