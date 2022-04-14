import React, { useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
} from '@chakra-ui/react';
import DatePicker from '../components/DatePicker';
import Page from '../components/Page';
import Button from '../components/Button';
import ResumeEvent from '../components/ResumeEvent';
import ResumeCard from '../components/ResumeCard';

export default function Calendar() {
  const [dateToSearch, setDateToSearch] = useState<Date | null>(null);

  const onChangeDatePicker = (date: Date) => setDateToSearch(date);

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
            <Button size="normal" text="Buscar" />
          </Flex>
        </Box>
        <ResumeCard>
          <ResumeEvent title="O que foi feito" tasks={[]} />
          <ResumeEvent title="O que se pretende fazer" tasks={[]} />
          <ResumeEvent title="Travas" tasks={[]} />
        </ResumeCard>
      </Box>
    </Page>
  );
}
