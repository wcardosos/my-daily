import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import DateInput from '../../src/components/DateInput';
import '@testing-library/jest-dom/extend-expect';

describe('Component: DateInput', () => {
  afterEach(() => {
    cleanup();
  });

  it('Should render the date formmatted', () => {
    const dateMock = new Date('2022/04/14');

    render(<DateInput date={dateMock} />);

    expect(screen.getByText('14/04/2022')).toBeInTheDocument();
  });
});
