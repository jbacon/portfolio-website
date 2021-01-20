import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const darkTheme = createMuiTheme({
    palette: {
      type: "dark",
      primary: {
          light: "#00D8FE",
          main: "#00D8FE",
          dark: "#00D8FE",
      },
    }
  });
  
const lightTheme = createMuiTheme({
    palette: {
      type: "light",
      primary: {
          light: "#00D8FE",
          main: "#00D8FE",
          dark: "#00D8FE",
      },
    }
  });

const LightThemeProvider = (props) => (
    <ThemeProvider theme={lightTheme}>
        {props.children}
    </ThemeProvider>
)

const DarkThemeProvider = (props) => (
    <ThemeProvider theme={darkTheme}>
        {props.children}
    </ThemeProvider>
)

export {
    LightThemeProvider
}

export default DarkThemeProvider