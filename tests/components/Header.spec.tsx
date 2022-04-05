import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import Header from '../../src/components/Header';
import '@testing-library/jest-dom/extend-expect';

describe('Component: Header', () => {
  beforeEach(() => {
    render(<Header />);
  });

  afterEach(() => {
    cleanup();
  });

  it('Should render the header', () => {
    expect(screen.getByTestId('logo')).toBeInTheDocument();
    expect(screen.getByTestId('profile')).toBeInTheDocument();
  });
});
