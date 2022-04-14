import React, { forwardRef, Ref } from 'react';
import {
  Flex,
  Spacer,
} from '@chakra-ui/react';
import { format } from 'date-fns';
import { RiCalendarTodoFill } from 'react-icons/ri';

interface IDateInput {
  date: Date
  onClick?: () => void // eslint-disable-line no-unused-vars, react/require-default-props
}

function DateInput({ date, onClick }: IDateInput, ref: Ref<HTMLInputElement>) {
  return (
    <Flex
      px={['2', '4']}
      align="center"
      fontSize={['sm', 'md']}
      onClick={onClick}
      ref={ref}
      border="1px"
      borderColor="gray.400"
      borderRadius={['5px', '10px']}
      w={['40', '48']}
      h={['8', '12']}
    >
      {date && format(date, 'dd/MM/yyyy')}
      <Spacer />
      <RiCalendarTodoFill fontSize="16" />
    </Flex>
  );
}

export default forwardRef(DateInput);
