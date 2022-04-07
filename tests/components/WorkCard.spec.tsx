import React from 'react';
import { render, screen } from '@testing-library/react';
import WorkCard from '../../src/components/WorkCard';
import '@testing-library/jest-dom/extend-expect';

describe('Component: WorkCard', () => {
  it('Should render the work card content', () => {
    render(<WorkCard>Work card test</WorkCard>);

    expect(screen.getByText('Work card test')).toBeInTheDocument();
  });
});
