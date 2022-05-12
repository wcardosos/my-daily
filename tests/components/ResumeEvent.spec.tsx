import React from 'react';
import { render, screen } from '@testing-library/react';
import { ITask } from '../../src/interfaces/ITask';
import ResumeEvent from '../../src/components/ResumeEvent';
import '@testing-library/jest-dom/extend-expect';

describe('Component: ResumeEvent', () => {
  const titleMock = 'resume event title';
  const tasksMock = [
    {
      id: 'id 1',
      name: 'task 1',
    },
    {
      id: 'id 2',
      name: 'task 2',
    }] as unknown as ITask[];

  it('Should render the title and the tasks', () => {
    render(<ResumeEvent title={titleMock} tasks={tasksMock} />);

    expect(screen.getByText('resume event title')).toBeInTheDocument();
    expect(screen.getByText('task 1')).toBeInTheDocument();
    expect(screen.getByText('task 2')).toBeInTheDocument();
  });
});
