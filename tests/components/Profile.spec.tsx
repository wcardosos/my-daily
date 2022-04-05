import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import Profile from '../../src/components/Profile';
import '@testing-library/jest-dom/extend-expect';

describe('Component: Profile', () => {
  beforeEach(() => {
    render(<Profile email="email" name="Profile Test" />);
  });

  afterEach(() => {
    cleanup();
  });

  it('Should render the avatar', () => {
    expect(screen.getByTestId('avatar')).toBeInTheDocument();
  });

  it('Should render the account details', () => {
    expect(screen.getByText('Profile Test')).toBeInTheDocument();
    expect(screen.getByText('email')).toBeInTheDocument();
  });
});
