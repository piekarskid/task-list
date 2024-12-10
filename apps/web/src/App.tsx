import {
  AppBar,
  Box,
  Button,
  createTheme,
  FormControl,
  FormLabel,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  TextField,
  ThemeProvider,
  Toolbar,
} from "@mui/material";
import { Notification } from "notifications";
import { FormEvent, MouseEvent, useState } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: Send notification to the server
    alert("Not implemented");
    event.currentTarget.reset();
  };

  const notifications: Notification[] = [];
  const open = Boolean(anchorEl);

  return (
    <ThemeProvider theme={theme}>
      <Stack spacing={8}>
        <AppBar position="static">
          <Toolbar sx={{ justifyContent: "flex-end" }}>
            <>
              <Menu open={open} anchorEl={anchorEl} onClose={handleClose}>
                {notifications.map((notification) => {
                  return (
                    <MenuItem key={notification.id}>
                      {notification.message}
                    </MenuItem>
                  );
                })}
              </Menu>
              <IconButton onClick={handleClick}>
                <NotificationsIcon />
              </IconButton>
            </>
          </Toolbar>
        </AppBar>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <form onSubmit={onSubmit}>
            <Stack spacing={2}>
              <FormLabel>Send Notification</FormLabel>
              <FormControl>
                <TextField
                  label="Message"
                  id="message"
                  name="message"
                  multiline
                  rows={4}
                />
              </FormControl>
              <FormControl>
                <Button type="submit" variant="contained">
                  Send
                </Button>
              </FormControl>
            </Stack>
          </form>
        </Box>
      </Stack>
    </ThemeProvider>
  );
}

export default App;
