import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { useRouter } from 'next/router';
import Daily from '../../src/pages/daily';
import '@testing-library/jest-dom/extend-expect';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Page: daily', () => {
  const useRouterMock = useRouter as jest.MockedFunction<typeof useRouter>;
  useRouterMock.mockReturnValue({ asPath: '/test' } as any); // eslint-disable-line @typescript-eslint/no-explicit-any

  beforeEach(() => {
    render(<Daily />);
  });

  afterEach(() => {
    cleanup();
  });

  it('Should render the tabs', () => {
    expect(screen.getByText('Tarefas')).toBeInTheDocument();
    expect(screen.getByText('Resumo')).toBeInTheDocument();
  });
});
