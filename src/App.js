import { CssBaseline } from '@material-ui/core';
import { withStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import React from 'react';
import {
  BrowserRouter,
  Route, Switch
} from "react-router-dom";
import './App.css';
import ContextProviderBundle from "./components/ContextProviderBundle";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./components/Home";
import { grey } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    // type: "dark",
    primary: {
      light: "#00D8FE",
      main: "#00D8FE",
      dark: "#00D8FE",
    },
    secondary: {
      light: grey[900],
      main: grey[900],
      dark: grey[900],
    },
  },
});

const styles = theme => ({});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <ContextProviderBundle>
              <Header />
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
              </Switch>
              <Footer />
            </ContextProviderBundle>
          </BrowserRouter>
        </ThemeProvider>
      </React.Fragment>
    );
  }
}

App.propTypes = {};

export default withStyles(styles)(App);
