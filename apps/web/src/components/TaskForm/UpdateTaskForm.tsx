import { Task } from "tasks";
import { FormEvent } from "react";
import {
  Button,
  CircularProgress,
  FormControl,
  FormLabel,
  Stack,
} from "@mui/material";
import { TitleField } from "./TitleField.tsx";
import { DescriptionField } from "./DescriptionField.tsx";
import { CompletedField } from "./CompletedField.tsx";
import { useTasksContext } from "../../contexts/TaskContext.tsx";

type UpdateTaskFormProps = {
  task: Task;
  onUpdate: (task: Task) => Promise<void>;
};

export const UpdateTaskForm = (props: UpdateTaskFormProps) => {
  const tasksContext = useTasksContext();
  const { onSubmit, task } = useUpdateTaskForm(props);
  return (
    <form onSubmit={onSubmit}>
      <Stack sx={{ display: "flex", flexDirection: "column" }} spacing={2}>
        <FormLabel>Update task</FormLabel>
        <TitleField defaultValue={task.title} />
        <DescriptionField defaultValue={task.description} />
        <CompletedField defaultChecked={task.completed} />
        <FormControl>
          <Button
            sx={{ display: "flex", gap: 1, alignItems: "center" }}
            disabled={tasksContext.update.isLoading}
            type="submit"
            variant="contained"
          >
            {tasksContext.update.isLoading && <CircularProgress size={16} />}
            Update
          </Button>
        </FormControl>
      </Stack>
    </form>
  );
};

const useUpdateTaskForm = (props: UpdateTaskFormProps) => {
  const { task, onUpdate } = props;
  const tasksContext = useTasksContext();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const completed = Boolean(formData.get("completed"));
    const updatedTask: Task = {
      id: task.id,
      title,
      description,
      completed,
    };
    try {
      await tasksContext.update.mutate(task.id, updatedTask);
      await tasksContext.list.fetch();
      await onUpdate(updatedTask);
      form.reset();
    } catch (err) {
      const message = err instanceof Error ? err.message : "An error occurred";
      alert(message);
    }
  };

  return {
    onSubmit,
    task,
  };
};
