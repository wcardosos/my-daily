import React from 'react';
import { render, screen } from '@testing-library/react';
import NavSection from '../../src/components/NavSection';
import '@testing-library/jest-dom/extend-expect';

describe('Component: NavSection', () => {
  it('Shoulde render the nav section', () => {
    render(<NavSection title="Nav section"><p>Nav section test</p></NavSection>);

    expect(screen.getByText('Nav section')).toBeInTheDocument();
    expect(screen.getByText('Nav section test')).toBeInTheDocument();
  });
});
