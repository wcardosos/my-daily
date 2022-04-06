import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { useResponsiveness } from '../../src/hooks/useResponsiveness';
import Header from '../../src/components/Header';
import '@testing-library/jest-dom/extend-expect';

jest.mock('../../src/hooks/useResponsiveness');

describe('Component: Header', () => {
  afterEach(() => {
    cleanup();
  });

  describe('Responsiveness', () => {
    describe('Desktop', () => {
      it('Should render the logo, profile, and action bar; does not render the drawer ', () => {
        const useResponsivenessMock = useResponsiveness as jest
        .MockedFunction<typeof useResponsiveness>;

        useResponsivenessMock.mockReturnValue(true);

        render(<Header />);

        expect(useResponsivenessMock).toHaveBeenCalled();
        expect(screen.getByTestId('logo')).toBeInTheDocument();
        expect(screen.getByTestId('profile')).toBeInTheDocument();
        expect(screen.getByTestId('action-bar')).toBeInTheDocument();
        expect(screen.queryByTestId('open-drawer-button')).not.toBeInTheDocument();
      });
    });

    describe('Mobile', () => {
      it('Should render the logo and the drawer; does not render profile, and action bar ', () => {
        const useResponsivenessMock = useResponsiveness as jest
        .MockedFunction<typeof useResponsiveness>;

        useResponsivenessMock.mockReturnValue(false);

        render(<Header />);

        expect(useResponsivenessMock).toHaveBeenCalled();
        expect(screen.getByTestId('logo')).toBeInTheDocument();
        expect(screen.getByTestId('open-drawer-button')).toBeInTheDocument();
        expect(screen.queryByTestId('profile')).not.toBeInTheDocument();
        expect(screen.queryByTestId('action-bar')).not.toBeInTheDocument();
      });
    });
  });
});
