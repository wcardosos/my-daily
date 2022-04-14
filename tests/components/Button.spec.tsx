import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from '../../src/components/Button';
import '@testing-library/jest-dom/extend-expect';

describe('Component: Button', () => {
  const onClickSpy = jest.fn();

  beforeEach(() => {
    render(<Button text="button test" size="normal" onClick={onClickSpy} />);
  });

  afterEach(() => {
    cleanup();
  });

  it('Should render the button', () => {
    expect(screen.getByText('button test')).toBeInTheDocument();
  });

  it('Should call onClick callback', async() => {
    const user = userEvent.setup();

    const button = screen.getByText('button test');

    await user.click(button);

    expect(onClickSpy).toHaveBeenCalled();
  });
});
