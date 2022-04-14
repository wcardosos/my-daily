import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import axios from 'axios';

interface IDailyWorkProviderProps {
  children: ReactNode
}

export interface ITask {
  id: string
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
  setShouldUpdateValues: Dispatch<SetStateAction<boolean>>
}

export const DailyWorkContext = createContext({} as IDailyWorkContextData);

export function DailyWorkProvider({ children }: IDailyWorkProviderProps) {
  const [shouldUpdateValues, setShouldUpdateValues] = useState(false);
  const [whatWasDoneTasks, setWhatWasDoneTasks] = useState<Array<ITask>>([]);
  const [whatWantToDoTasks, setWhatWantToDoTasks] = useState<Array<ITask>>([]);
  const [locksTasks, setLocksTasks] = useState<Array<ITask>>([]);

  useLayoutEffect(() => {
    async function fetchDailyData() {
      await axios
        .get('/api/tasks/today')
        .then(({ data }) => {
          const doneList = data.filter((item) => item.type === 'done');
          const toDoList = data.filter((item) => item.type === 'to_do');
          const locksList = data.filter((item) => item.type === 'lock');

          setWhatWasDoneTasks(doneList.map(({ id, name }) => ({ id, name })));
          setWhatWantToDoTasks(toDoList.map(({ id, name }) => ({ id, name })));
          setLocksTasks(locksList.map(({ id, name }) => ({ id, name })));
        });
    }

    fetchDailyData();
  }, []);

  useEffect(() => {
    if (shouldUpdateValues) {
      axios
        .get('/api/tasks/today')
        .then(({ data }) => {
          const doneList = data.filter((item) => item.type === 'done');
          const toDoList = data.filter((item) => item.type === 'to_do');
          const locksList = data.filter((item) => item.type === 'lock');

          setWhatWasDoneTasks(doneList.map(({ id, name }) => ({ id, name })));
          setWhatWantToDoTasks(toDoList.map(({ id, name }) => ({ id, name })));
          setLocksTasks(locksList.map(({ id, name }) => ({ id, name })));
        });

      setShouldUpdateValues(false);
    }
  }, [shouldUpdateValues]);

  const memoizedValues = useMemo(() => ({
    whatWasDone: {
      tasks: whatWasDoneTasks,
      set: setWhatWasDoneTasks,
    },
    whatWantToDo: {
      tasks: whatWantToDoTasks,
      set: setWhatWantToDoTasks,
    },
    locks: {
      tasks: locksTasks,
      set: setLocksTasks,
    },
    setShouldUpdateValues,
  }), [whatWasDoneTasks, whatWantToDoTasks, locksTasks]);

  return (
    <DailyWorkContext.Provider value={memoizedValues}>
      {children}
    </DailyWorkContext.Provider>
  );
}
