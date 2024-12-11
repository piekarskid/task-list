import { AppBar, Box, Paper, Stack, Toolbar } from "@mui/material";
import { ThemeProvider } from "./contexts/ThemeContext.tsx";
import { TaskProvider } from "./contexts/TaskContext.tsx";
import { CreateTaskForm } from "./components/TaskForm/CreateTaskForm.tsx";
import { TaskList } from "./components/TaskList/TaskList.tsx";
import TaskIcon from "@mui/icons-material/Task";

const App = () => {
  return (
    <ThemeProvider>
      <TaskProvider>
        <Stack>
          <AppBar position="static">
            <Toolbar>
              <Box sx={{ display: "flex", gap: 1 }}>
                <TaskIcon />
                Tasks
              </Box>
            </Toolbar>
          </AppBar>
          <Box sx={{ padding: 10, display: "flex", justifyContent: "center" }}>
            <Paper sx={{ paddingBlock: 2, paddingInline: 4 }}>
              <CreateTaskForm />
            </Paper>
          </Box>
          <TaskList />
        </Stack>
      </TaskProvider>
    </ThemeProvider>
  );
};

export default App;
