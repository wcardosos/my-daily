import React from 'react';
import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/router';
import Sidebar from '../../src/components/Sidebar';
import '@testing-library/jest-dom/extend-expect';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Component: Sidebar', () => {
  const useRouterMock = useRouter as jest.MockedFunction<typeof useRouter>;
  useRouterMock.mockReturnValue({ asPath: '/test' } as any); // eslint-disable-line @typescript-eslint/no-explicit-any

  it('Shoulde render the page', () => {
    render(<Sidebar />);

    expect(screen.getByTestId('nav')).toBeInTheDocument();
  });
});
