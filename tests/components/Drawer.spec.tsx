import React from 'react';
import {
  cleanup,
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { useRouter } from 'next/router';
import userEvent from '@testing-library/user-event';
import Drawer from '../../src/components/Drawer';
import '@testing-library/jest-dom/extend-expect';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Component: Drawer', () => {
  const user = userEvent.setup();
  const useRouterMock = useRouter as jest.MockedFunction<typeof useRouter>;
  useRouterMock.mockReturnValue({ asPath: '/test' } as any); // eslint-disable-line @typescript-eslint/no-explicit-any

  const profileInfoMock = {
    user: 'user',
    email: 'email',
    image: 'image',
  };

  beforeEach(() => {
    render(<Drawer profileInfo={profileInfoMock} />);
  });

  afterEach(() => {
    cleanup();
  });

  it('Should render the drawer', () => {
    expect(screen.getByTestId('open-drawer-button')).toBeInTheDocument();
  });

  it('Should open the drawer', async() => {
    const openDrawerButton = screen.getByTestId('open-drawer-button');

    await user.click(openDrawerButton);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByTestId('logo')).toBeInTheDocument();
    expect(screen.getByTestId('profile')).toBeInTheDocument();
    expect(screen.getByTestId('nav')).toBeInTheDocument();
  });

  it('Should close the drawer', async() => {
    const openDrawerButton = screen.getByTestId('open-drawer-button');

    await user.click(openDrawerButton);

    const closeDrawerButton = screen.getByTestId('close-drawer-button');

    await user.click(closeDrawerButton);

    await waitForElementToBeRemoved(() => screen.getByRole('dialog'));

    expect(screen.queryByTestId('logo')).not.toBeInTheDocument();
    expect(screen.queryByTestId('profile')).not.toBeInTheDocument();
    expect(screen.queryByTestId('nav')).not.toBeInTheDocument();
  });
});
