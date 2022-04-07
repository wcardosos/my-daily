import React from 'react';
import { render, screen } from '@testing-library/react';
import ResumeCard from '../../src/components/ResumeCard';
import '@testing-library/jest-dom/extend-expect';

describe('Component: ResumeCard', () => {
  it('Should render the resume card content', () => {
    render(<ResumeCard><p>Resume card test</p></ResumeCard>);

    expect(screen.getByText('Resume card test')).toBeInTheDocument();
  });
});
