import React, { createContext, ReactNode, useState } from 'react';

interface IDailyWorkProviderProps {
  children: ReactNode
}

export interface ITask {
  name: string
}

interface IWork {
  tasks: Array<ITask>,
  set: (value: unknown) => void // eslint-disable-line no-unused-vars
}

interface IDailyWorkContextData {
  whatWasDone: IWork
  whatWantToDo: IWork
  locks: IWork
}

export const DailyWorkContext = createContext({} as IDailyWorkContextData);

export function DailyWorkProvider({ children }: IDailyWorkProviderProps) {
  const [whatWasDoneTasks, setWhatWasDoneTasks] = useState<Array<ITask>>([]);
  const [whatWantToDoTasks, setWhatWantToDoTasks] = useState<Array<ITask>>([]);
  const [locksTasks, setLocksTasks] = useState<Array<ITask>>([]);

  return (
    <DailyWorkContext.Provider value={{
      whatWasDone: {
        tasks: whatWasDoneTasks,
        set: setWhatWasDoneTasks
      },
      whatWantToDo: {
        tasks: whatWantToDoTasks,
        set: setWhatWantToDoTasks
      },
      locks: {
        tasks: locksTasks,
        set: setLocksTasks
      },
    }}>
      {children}
    </DailyWorkContext.Provider>
  );
}
