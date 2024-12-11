import { useRef, useState } from "react";
import { Task } from "tasks";

export const useTasksQuery = () => {
  const [data, setData] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const signal = useRef(new AbortController());

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const url = new URL(import.meta.env.VITE_API_URL as string);
      url.pathname = "/tasks";
      const response = await fetch(url, {
        signal: signal.current.signal,
      });
      if (!response.ok) {
        throw new Error(await response.text());
      }
      const tasks = (await response.json()) as Task[];
      setData(tasks);
      setIsLoading(false);
    } catch (err) {
      setError(err as Error);
      setIsLoading(false);
    }
  };

  const abort = () => {
    signal.current.abort();
    signal.current = new AbortController();
  };

  return {
    fetch: fetchData,
    abort,
    signal,
    data,
    isLoading,
    error,
  };
};

export const useUpdateTaskMutation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const signal = useRef(new AbortController());

  const mutate = async (
    id: number,
    task: Pick<Task, "title" | "description">,
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const url = new URL(import.meta.env.VITE_API_URL as string);
      url.pathname = `/tasks/${id}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
        signal: signal.current.signal,
      });
      if (!response.ok) {
        throw new Error(await response.text());
      }
      const updatedTask = (await response.json()) as Task;
      setIsLoading(false);
      return updatedTask;
    } catch (err) {
      setError(err as Error);
      setIsLoading(false);
      throw err;
    }
  };

  const abort = () => {
    signal.current.abort();
    signal.current = new AbortController();
  };

  return {
    mutate,
    isLoading,
    error,
    abort,
  };
};

export const useDeleteTaskMutation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const signal = useRef(new AbortController());

  const mutate = async (id: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const url = new URL(import.meta.env.VITE_API_URL as string);
      url.pathname = `/tasks/${id}`;
      const response = await fetch(url, {
        method: "DELETE",
        signal: signal.current.signal,
      });
      if (!response.ok) {
        throw new Error(await response.text());
      }
      setIsLoading(false);
      return true;
    } catch (err) {
      setError(err as Error);
      setIsLoading(false);
      throw err;
    }
  };

  const abort = () => {
    signal.current.abort();
    signal.current = new AbortController();
  };

  return {
    mutate,
    isLoading,
    error,
    abort,
  };
};

export const useCreateTaskMutation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const signal = useRef(new AbortController());

  const mutate = async (task: Pick<Task, "title" | "description">) => {
    setIsLoading(true);
    setError(null);
    try {
      const url = new URL(import.meta.env.VITE_API_URL as string);
      url.pathname = "/tasks";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });
      if (!response.ok) {
        throw new Error(await response.text());
      }
      const createdTask = (await response.json()) as Task;
      setIsLoading(false);
      return createdTask;
    } catch (err) {
      setError(err as Error);
      setIsLoading(false);
      throw err;
    }
  };

  const abort = () => {
    signal.current.abort();
    signal.current = new AbortController();
  };

  return {
    mutate,
    isLoading,
    error,
    abort,
  };
};
