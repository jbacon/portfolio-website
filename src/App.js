import { CssBaseline } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
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
      </React.Fragment>
    );
  }
}

App.propTypes = {};

export default withStyles(styles)(App);
