import { useTasksContext } from "../../contexts/TaskContext.tsx";
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

export const CreateTaskForm = () => {
  const tasksContext = useTasksContext();
  const { onSubmit } = useCreateTaskForm();
  return (
    <form onSubmit={onSubmit}>
      <Stack spacing={2}>
        <FormLabel>Create task</FormLabel>
        <TitleField />
        <DescriptionField />
        <FormControl>
          <Button
            sx={{ display: "flex", gap: 1, alignItems: "center" }}
            disabled={tasksContext.create.isLoading}
            type="submit"
            variant="contained"
          >
            {tasksContext.create.isLoading && <CircularProgress size={16} />}
            Create
          </Button>
        </FormControl>
      </Stack>
    </form>
  );
};

const useCreateTaskForm = () => {
  const tasksContext = useTasksContext();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    try {
      await tasksContext.create.mutate({
        title,
        description,
      });
      form.reset();
      void tasksContext.list.fetch();
    } catch (err) {
      const message = err instanceof Error ? err.message : "An error occurred";
      alert(message);
    }
  };

  return { onSubmit };
};
