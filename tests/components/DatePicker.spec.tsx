import React from 'react';
import { render, screen } from '@testing-library/react';
import DatePicker from '../../src/components/DatePicker';
import '@testing-library/jest-dom/extend-expect';

describe('Component: DatePicker', () => {
  const onChangeMock = jest.fn();
  const dateMock = new Date('2022/04/14');

  it('Should render the date selected', () => {
    render(<DatePicker date={dateMock} onChange={onChangeMock} />);

    expect(screen.getByText('14/04/2022')).toBeInTheDocument();
  });
});
