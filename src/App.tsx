import React from 'react';
import './App.css';
import CssBaseline from '@mui/material/CssBaseline';
import {
  BrowserRouter,
  Route, Routes
} from "react-router-dom";
import ProviderBundle from "./components/ProviderBundle";
import LoadableContent from "./components/LoadableContent";
import Header from "./components/Header"
import Home from "./components/Home"
import Footer from "./components/Footer"
import FourOhFour from "./components/FourOhFour"
import { GetBlogRoutes } from "./components/Blog"

function App() {
  return (
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
                <Routes>
                  <Route path="/" element={<Home/>}/>
                  {GetBlogRoutes()}
                  <Route path="*" element={<FourOhFour/>}/>
                </Routes>
              </React.Suspense>
            </div>
            <Footer />
          </div>
      </BrowserRouter>
    </ProviderBundle>
  </React.Fragment>
  );
}

export default App;
