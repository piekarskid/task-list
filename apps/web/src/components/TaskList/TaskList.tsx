import { useTasksContext } from "../../contexts/TaskContext.tsx";
import {
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { TaskListItem } from "./TaskListItem.tsx";

export const TaskList = () => {
  const tasksContext = useTasksContext();
  return (
    <Paper>
      <Typography align="center" sx={{ padding: 2 }}>
        Tasks
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width={120}>ID</TableCell>
              <TableCell width={120}>Title</TableCell>
              <TableCell width={120}>Description</TableCell>
              <TableCell width={120}>Completed</TableCell>
              <TableCell width={200} />
            </TableRow>
          </TableHead>
          <TableBody>
            {tasksContext.list.data.map((task) => (
              <TaskListItem key={task.id} task={task} />
            ))}
            {tasksContext.list.isLoading && (
              <TableRow>
                <TableCell colSpan={5}>
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <CircularProgress />
                  </Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
