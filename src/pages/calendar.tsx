import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import {
  Box,
  Center,
  Flex,
  Heading,
  Spinner,
  Text,
} from '@chakra-ui/react';
import axios from 'axios';
import { ITask } from '../contexts/DailyWorkContext';
import DatePicker from '../components/DatePicker';
import Page from '../components/Page';
import Button from '../components/Button';
import ResumeEvent from '../components/ResumeEvent';
import ResumeCard from '../components/ResumeCard';

interface ICalendarData {
  whatWantToDo: ITask[]
  locks: ITask[]
  whatWasDone: ITask[]
}

interface ICalendarProps {
  user: {
    email: string
  }
}

export default function Calendar({ user: { email: userEmail } }: ICalendarProps) {
  const [dateToSearch, setDateToSearch] = useState<Date | null>(null);
  const [notFoundTasks, setNotFoundTasks] = useState<boolean>(false);
  const [dateNotSelected, setDateNotSelected] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dailyInfo, setDailyInfo] = useState<ICalendarData>(null);

  const onChangeDatePicker = (date: Date) => setDateToSearch(date);

  const onClickSearchDailyByDate = async() => {
    if (dateNotSelected) {
      setDateNotSelected(false);
    }
    setDailyInfo(null);
    setNotFoundTasks(false);
    setIsLoading(true);

    const date = new Date(dateToSearch);
    const { data } = await axios.get(`/api/tasks?dateToSearch=${date.toString()}&userEmail=${userEmail}`);

    if (data.length) {
      const doneList = data.filter((item: ITask) => item.type === 'done');
      const toDoList = data.filter((item: ITask) => item.type === 'to_do');
      const locksList = data.filter((item: ITask) => item.type === 'lock');

      setDailyInfo({
        whatWantToDo: toDoList,
        whatWasDone: doneList,
        locks: locksList,
      });
    } else {
      setNotFoundTasks(true);
    }

    setIsLoading(false);
  };

  return (
    <Page>
      <Box w="100%">
        <Heading color="purple.700">Calendário</Heading>
        <Box pt={['4', '16']}>
          <Text>Selecione a data:</Text>
          <Flex pt="4" pb="8">
            <Box mr={['4', '8']}>
              <DatePicker date={dateToSearch} onChange={onChangeDatePicker} />
            </Box>
            <Button size="normal" text="Buscar" onClick={onClickSearchDailyByDate} />
          </Flex>
        </Box>
        { dateNotSelected && (
          <Center h="25vh">
            <Text>Selecione uma data</Text>
          </Center>
        ) }
        { !dateNotSelected && notFoundTasks && (
          <Center h="25vh">
            <Text>Nenhuma tarefa encontrada na data informada</Text>
          </Center>
        ) }
        { isLoading && (
          <Center h="25vh">
            <Spinner size="xl" color="purple.700" />
          </Center>
        ) }
        { dailyInfo && (
          <ResumeCard>
            <ResumeEvent title="O que foi feito" tasks={dailyInfo.whatWasDone} />
            <ResumeEvent title="O que se pretende fazer" tasks={dailyInfo.whatWantToDo} />
            <ResumeEvent title="Travas" tasks={dailyInfo.locks} />
          </ResumeCard>
        ) }
      </Box>
    </Page>
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
