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
      const date = '11/4/2022';
      await axios
        .get(`/api/tasks?dailyId=${date}`)
        .then(({ data }) => {
          const doneList = data.filter((item) => item.type === 'done');
          const toDoList = data.filter((item) => item.type === 'to_do');
          const locksList = data.filter((item) => item.type === 'lock');

          setWhatWasDoneTasks(doneList.map((item) => item.name));
          setWhatWantToDoTasks(toDoList.map((item) => item.name));
          setLocksTasks(locksList.map((item) => item.name));
        });
    }

    fetchDailyData();
  }, []);

  useEffect(() => {
    if (shouldUpdateValues) {
      const date = '11/4/2022';
      axios
        .get(`/api/tasks?dailyId=${date}`)
        .then(({ data }) => {
          const doneList = data.filter((item) => item.type === 'done');
          const toDoList = data.filter((item) => item.type === 'to_do');
          const locksList = data.filter((item) => item.type === 'lock');

          setWhatWasDoneTasks(doneList.map((item) => item.name));
          setWhatWantToDoTasks(toDoList.map((item) => item.name));
          setLocksTasks(locksList.map((item) => item.name));
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
