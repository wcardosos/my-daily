import React from 'react';
import { render, screen } from '@testing-library/react';
import Logo from '../../src/components/Logo';
import '@testing-library/jest-dom/extend-expect';

describe('Component: Logo', () => {
  it('Should render the logo', () => {
    render(<Logo />);

    expect(screen.getByText('myDaily')).toBeInTheDocument();
  });
});
