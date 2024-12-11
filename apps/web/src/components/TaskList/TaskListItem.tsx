import { Task } from "tasks";
import { useTasksContext } from "../../contexts/TaskContext.tsx";
import { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Modal,
  TableCell,
  TableRow,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { UpdateTaskForm } from "../TaskForm/UpdateTaskForm.tsx";

type TaskListItemProps = {
  task: Task;
};

export const TaskListItem = (props: TaskListItemProps) => {
  const { task } = props;
  const {
    onDelete,
    onUpdate,
    isDeleting,
    onEditModalOpen,
    isEditModalOpen,
    onEditModalClose,
  } = useTaskListItem(task);
  return (
    <TableRow>
      <TableCell>{task.id}</TableCell>
      <TableCell>{task.title}</TableCell>
      <TableCell>{task.description}</TableCell>
      <TableCell>{task.completed ? "Yes" : "No"}</TableCell>
      <TableCell>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button onClick={onEditModalOpen} size="small" variant="contained">
            <Edit />
            <Modal open={isEditModalOpen} onClose={onEditModalClose}>
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 400,
                  bgcolor: "background.paper",
                  boxShadow: 24,
                  p: 4,
                }}
              >
                <UpdateTaskForm task={task} onUpdate={onUpdate} />
              </Box>
            </Modal>
          </Button>
          <Button
            disabled={isDeleting}
            onClick={onDelete}
            size="small"
            variant="contained"
          >
            {isDeleting && <CircularProgress size={16} />}
            <Delete />
          </Button>
        </Box>
      </TableCell>
    </TableRow>
  );
};

const useTaskListItem = (task: Task) => {
  const tasksContext = useTasksContext();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const onDelete = async () => {
    setIsDeleting(true);
    try {
      await tasksContext.delete.mutate(task.id);
      await tasksContext.list.fetch();
    } catch (err) {
      const message = err instanceof Error ? err.message : "An error occurred";
      alert(message);
    }
    setIsDeleting(false);
  };

  const onEditModalOpen = () => {
    setIsEditModalOpen(true);
  };

  const onEditModalClose = () => {
    setIsEditModalOpen(false);
  };

  const onUpdate = async () => {
    onEditModalClose();
  };

  return {
    onEditModalClose,
    onEditModalOpen,
    onDelete,
    onUpdate,
    isDeleting,
    isEditModalOpen,
  };
};
