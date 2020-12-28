import { CssBaseline } from '@material-ui/core';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
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
import MultiPageVsSinglePageApplications from './components/blogs/2015/MultiPageVsSinglePageApplications';
import ANarrativeOnWebApplications from './components/blogs/2015/ANarrativeOnWebApplications';
import FourOhFour from "./components/FourOhFour";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      light: "#00D8FE",
      main: "#00D8FE",
      dark: "#00D8FE",
    },
    // secondary: {
    //   light: grey[500],
    //   main: grey[500],
    //   dark: grey[500],
    // },
  },
});

const App = (props) => (
  <React.Fragment>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <ContextProviderBundle>
          <div style={{
            position: "relative",
            minHeight: "100vh"
          }}>
            <div style={{ paddingBottom: "4rem" }}>
              <Header />
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                {/* <Route exact path="/about">
                  <About />
                </Route> */}
                <Route exact path="/blog/2015/MultiPageVsSinglePageApplications">
                  <MultiPageVsSinglePageApplications />
                </Route>
                <Route exact path="/blog/2015/ANarrativeOnWebApplications">
                  <ANarrativeOnWebApplications />
                </Route>
                <Route path="*">
                  <FourOhFour />
                </Route>
              </Switch>
            </div>
            <Footer />
          </div>
        </ContextProviderBundle>
      </BrowserRouter>
    </ThemeProvider>
  </React.Fragment>
);

export default App