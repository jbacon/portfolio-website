import { PaletteOptions } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";

const darkTheme = createTheme({
  palette: {
    // type: "dark",
    primary: {
      light: "#00D8FE",
      main: "#00D8FE",
      dark: "#00D8FE",
    },
    secondary: {
      light: "#F34F7E",
      main: "#F34F7E",
      dark: "#F34F7E",
    },
  },
});

const lightTheme = createTheme({
  palette: {
    // type: "light",
    primary: {
      light: "#00D8FE",
      main: "#00D8FE",
      dark: "#00D8FE",
    },
    secondary: {
      light: "#F34F7E",
      main: "#F34F7E",
      dark: "#F34F7E",
    },
  },
});

declare module "@mui/material/styles" {
  interface MyTheme {
    palette: {
      primary: {
        light: string;
        main: string;
        dark: string;
      };
    };
  }
  // allow configuration using `createTheme`
  interface MyThemeOptions {
    palette?: PaletteOptions | undefined;
  }
}

const LightThemeProvider = (props: { children?: React.ReactNode }) => (
  <ThemeProvider theme={lightTheme}>{props.children}</ThemeProvider>
);

const DarkThemeProvider = (props: { children?: React.ReactNode }) => (
  <ThemeProvider theme={darkTheme}>{props.children}</ThemeProvider>
);

export { LightThemeProvider };

export default DarkThemeProvider;
