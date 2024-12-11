import {
  createTheme,
  useMediaQuery,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material";
import { FC, PropsWithChildren, useMemo } from "react";

export const ThemeProvider: FC<PropsWithChildren> = (props) => {
  const { children } = props;
  const isDarkTheme = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = useMemo(() => {
    return createTheme({
      palette: {
        mode: isDarkTheme ? "dark" : "light",
      },
    });
  }, [isDarkTheme]);

  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};
