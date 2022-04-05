import React from 'react';
import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/router';
import Page from '../../src/components/Page';
import '@testing-library/jest-dom/extend-expect';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Component: Page', () => {
  const useRouterMock = useRouter as jest.MockedFunction<typeof useRouter>;
  useRouterMock.mockReturnValue({ asPath: '/test' } as any); // eslint-disable-line @typescript-eslint/no-explicit-any

  it('Shoulde render the page', () => {
    render(<Page><p>Page component</p></Page>);

    expect(screen.getByText('Page component')).toBeInTheDocument();
  });
});
