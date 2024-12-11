import { Task } from "tasks";
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
} from "react";
import {
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useTasksQuery,
  useUpdateTaskMutation,
} from "../hooks/useTaskApi.ts";

type TTaskContext = {
  list: {
    data: Task[];
    isLoading: boolean;
    error: Error | null;
    fetch: () => Promise<void>;
    abort: () => void;
  };
  create: {
    mutate: (task: Pick<Task, "title" | "description">) => Promise<Task>;
    isLoading: boolean;
    error: Error | null;
    abort: () => void;
  };
  update: {
    mutate: (
      id: number,
      task: Pick<Task, "title" | "description" | "completed">,
    ) => Promise<Task>;
    isLoading: boolean;
    error: Error | null;
    abort: () => void;
  };
  delete: {
    mutate: (id: number) => Promise<boolean>;
    isLoading: boolean;
    error: Error | null;
    abort: () => void;
  };
};

const TasksContext = createContext<TTaskContext | null>(null);

export const useTasksContext = () => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error("useTasksContext must be used within a TaskProvider");
  }
  return context;
};

export const TaskProvider: FC<PropsWithChildren> = ({ children }) => {
  const taskQuery = useTasksQuery();
  const createTaskMutation = useCreateTaskMutation();
  const updateTaskMutation = useUpdateTaskMutation();
  const deleteTaskMutation = useDeleteTaskMutation();

  useEffect(() => {
    void taskQuery.fetch();
    return () => {
      taskQuery.abort();
    };
  }, []);

  const context: TTaskContext = {
    list: taskQuery,
    create: createTaskMutation,
    update: updateTaskMutation,
    delete: deleteTaskMutation,
  };

  return (
    <TasksContext.Provider value={context}>{children}</TasksContext.Provider>
  );
};
