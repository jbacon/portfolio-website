import { SnackbarProvider } from "material-ui-snackbar-provider";
import React from "react";
import ConnectProvider from "./ConnectDialog";
import DarkThemeProvider from "./CustomThemeProvider";
import { Auth0Provider } from "@auth0/auth0-react";
import Assistant from "./assistant/Assistant";
import { BrowserRouter } from "react-router-dom";

const ProviderBundle = (props: { children?: React.ReactNode }) => {
  return (
    <DarkThemeProvider>
      <Auth0Provider
        domain="dev-doylanbzoaktwa7a.us.auth0.com"
        clientId="GS7pZEBjIGsfTZ0z5jHiiqzwFna9an5C"
        redirectUri={window.location.origin + "/auth0/callback"}
        cacheLocation="localstorage"
        authorizationParam={{
          redirect_uri: window.location.origin + "/auth0/callback",
        }}
        onRedirectCallback={(appState) => {
          window.location.href = "/";
        }}
      >
        <SnackbarProvider SnackbarProps={{ autoHideDuration: 4000 }}>
          <Assistant>
            <ConnectProvider>
              <BrowserRouter>{props.children}</BrowserRouter>
            </ConnectProvider>
          </Assistant>
        </SnackbarProvider>
      </Auth0Provider>
    </DarkThemeProvider>
  );
};

export default ProviderBundle;
