import { CssBaseline } from '@material-ui/core';
import React from 'react';
import {
  BrowserRouter,
  Route, Switch
} from "react-router-dom";
import './App.css';
import ProviderBundle from "./components/ProviderBundle";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./components/Home";
import LoadableContent from "./components/LoadableContent";
import { GetBlogRoutes } from "./components/Blog"
const FourOhFour = React.lazy(() => import("./components/FourOhFour"));

const App = (props) => (
  <React.Fragment>
    <ProviderBundle>
      <CssBaseline />
      <BrowserRouter>
          <div style={{
            position: "relative",
            minHeight: "100vh"
          }}>
            <div style={{ paddingBottom: "4rem" }}>
              <Header />
              <React.Suspense fallback={<LoadableContent isLoading={true} fullScreen={true}/>}>
                <Switch>
                  <Route exact path="/" component={Home}/>
                  {GetBlogRoutes()}
                  <Route path="*" render={() => <FourOhFour/>}/>
                </Switch>
              </React.Suspense>
            </div>
            <Footer />
          </div>
      </BrowserRouter>
    </ProviderBundle>
  </React.Fragment>
);

export default App