import React from 'react';
import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/router';
import { IconType } from 'react-icons';
import NavLink from '../../src/components/NavLink';
import '@testing-library/jest-dom/extend-expect';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Component: NavLink', () => {
  const useRouterMock = useRouter as jest.MockedFunction<typeof useRouter>;
  useRouterMock.mockReturnValue({ asPath: '/test' } as any); // eslint-disable-line @typescript-eslint/no-explicit-any

  it('Shoulde render the nav link', () => {
    const hrefMock = 'href';
    const iconMock = 'icon' as unknown as IconType;
    const textMock = 'text';
    render(<NavLink href={hrefMock} icon={iconMock} text={textMock} />);

    expect(screen.getByText('text')).toBeInTheDocument();
    expect(screen.getByTestId('nav-link-icon')).toBeInTheDocument();
  });
});
