import React from "react";
import "./App.css";
import CssBaseline from "@mui/material/CssBaseline";
import { Route, Routes, Navigate } from "react-router-dom";
import ProviderBundle from "./components/ProviderBundle";
import LoadableContent from "./components/LoadableContent";
import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";
import FourOhFour from "./components/FourOhFour";
import { GetBlogRoutes } from "./components/Blog";
import { useAuth0 } from "@auth0/auth0-react";

const Signout = () => {
  const auth0 = useAuth0();
  auth0
    ?.logout({
      logoutParams: {
        returnTo: window.location.origin + "/signout",
      },
    })
    .catch((e) => {
      console.error(e);
    });
  return <Navigate to="/" />;
};

function App() {
  return (
    <ProviderBundle>
      <CssBaseline />
      <div
        style={{
          position: "relative",
          minHeight: "100vh",
        }}
      >
        <div style={{ paddingBottom: "4rem" }}>
          <Header />
          <React.Suspense
            fallback={<LoadableContent isLoading={true} fullScreen={true} />}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              {GetBlogRoutes()}
              <Route path="/signout" element={<Signout />} />
              <Route
                path="/auth0/callback"
                element={<LoadableContent isLoading={true} fullScreen={true} />}
              />
              <Route path="*" element={<FourOhFour />} />
            </Routes>
          </React.Suspense>
        </div>
        <Footer />
      </div>
    </ProviderBundle>
  );
}

export default App;
