import React from 'react';
import ReactDatePicker from 'react-datepicker';
import DateInput from './DateInput';

import 'react-datepicker/dist/react-datepicker.css';

interface IDatePickerProps {
  date: Date
  onChange: (date: Date) => void // eslint-disable-line no-unused-vars
}

export default function DatePicker({ date, onChange }: IDatePickerProps) {
  return (
    <ReactDatePicker
      selected={date}
      onChange={onChange}
      dateFormat="dd/MM/yyyy"
      customInput={<DateInput date={date} />}
    />
  );
}
