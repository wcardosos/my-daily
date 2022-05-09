import React from 'react';
import { useSession } from 'next-auth/react';
import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/router';
import Page from '../../src/components/Page';
import '@testing-library/jest-dom/extend-expect';

jest.mock('next-auth/react');
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Component: Page', () => {
  const useRouterMock = useRouter as jest.MockedFunction<typeof useRouter>;
  useRouterMock.mockReturnValue({ asPath: '/test' } as any); // eslint-disable-line @typescript-eslint/no-explicit-any
  const useSessionMock = useSession as jest.MockedFunction<typeof useSession>;

  it('Shoulde render the page', () => {
    useSessionMock.mockReturnValue({
      data: {
        user: {
          email: 'email',
          name: 'name',
          image: 'image',
        },
        expires: null,
      },
      status: 'authenticated',
    });
    render(<Page><p>Page component</p></Page>);

    expect(screen.getByText('Page component')).toBeInTheDocument();
  });
});
