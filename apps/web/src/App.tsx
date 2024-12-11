import {
  AppBar,
  Box,
  Paper,
  Stack,
  ThemeProvider,
  Toolbar,
} from "@mui/material";
import { DarkTheme } from "./contexts/ThemeContext.tsx";
import { TaskProvider } from "./contexts/TaskContext.tsx";
import { CreateTaskForm } from "./components/TaskForm/CreateTaskForm.tsx";
import { TaskList } from "./components/TaskList/TaskList.tsx";
import TaskIcon from "@mui/icons-material/Task";

const App = () => {
  return (
    <ThemeProvider theme={DarkTheme}>
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
