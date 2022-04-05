import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ActionBar from '../../src/components/ActionBar';
import '@testing-library/jest-dom/extend-expect';

describe('Component: ActionBar', () => {
  const handleLogoutSpy = jest.fn();

  beforeEach(() => {
    render(<ActionBar handleLogout={handleLogoutSpy} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('Should render action bar', () => {
    expect(screen.getByTestId('settings-button')).toBeInTheDocument();
    expect(screen.getByTestId('logout-button')).toBeInTheDocument();
  });

  it('Should logout the system', async() => {
    const user = userEvent.setup();
    const logoutButton = screen.getByTestId('logout-button');

    await user.click(logoutButton);

    expect(handleLogoutSpy).toHaveBeenCalled();
  });
});
