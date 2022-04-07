import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ITask } from '../../src/contexts/DailyWorkContext';
import WorkEventsHandler from '../../src/components/WorkEventsHandler';
import '@testing-library/jest-dom/extend-expect';

describe('Component: WorkEventsHandler', () => {
  const user = userEvent.setup();
  const addWorkMock = jest.fn();
  const removeWorkMock = jest.fn();
  const tasksMock = ['test task 1', 'test task 2'];

  beforeEach(() => {
    render((
      <WorkEventsHandler
        title="Work event handler test"
        tasks={tasksMock as unknown as ITask[]}
        add={addWorkMock}
        remove={removeWorkMock}
      />
    ));
  });

  afterEach(() => {
    cleanup();
  });

  it('Should render the tasks', () => {
    expect(screen.getByText('test task 1')).toBeInTheDocument();
    expect(screen.getByText('test task 2')).toBeInTheDocument();
  });

  it('Should add new task', async() => {
    const addButton = screen.getByText('Adicionar');
    const addTaskInput = screen.getByPlaceholderText('Adicione uma nova tarefa');

    await user.type(addTaskInput, 'test task 3');
    await user.click(addButton);

    expect(addWorkMock).toHaveBeenCalled();
  });

  it('Should remove a task', async() => {
    const [firstRemoveButton] = screen.getAllByText('Remover');

    await user.click(firstRemoveButton);

    expect(removeWorkMock).toHaveBeenCalled();
  });
});
