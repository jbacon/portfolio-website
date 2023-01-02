import { SnackbarProvider } from "material-ui-snackbar-provider";
import React from "react";
import ConnectProvider from "./ConnectDialog";
import DarkThemeProvider from "./CustomThemeProvider";
import { Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const ProviderBundle = (props: { children?: React.ReactNode }) => {
  const navigate = useNavigate();

  return (
    <DarkThemeProvider>
      <Auth0Provider
        domain="dev-doylanbzoaktwa7a.us.auth0.com"
        clientId="GS7pZEBjIGsfTZ0z5jHiiqzwFna9an5C"
        redirectUri={window.location.origin + "/auth0/callback"}
        cacheLocation="localstorage"
        onRedirectCallback={(appState) => {
          // handle callback url -> return to page
          // Have to use sessionStorage because Auth0 only supports allowed returnTo paths w/o wildcard
          // const route = sessionStorage.getItem("redirect_route") || "/"
          // sessionStorage.removeItem("redirect_route")
          navigate(
            appState?.redirectTo !== undefined ? appState.redirectTo : "/"
          );
        }}
      >
        <SnackbarProvider SnackbarProps={{ autoHideDuration: 4000 }}>
          <ConnectProvider>{props.children}</ConnectProvider>
        </SnackbarProvider>
      </Auth0Provider>
    </DarkThemeProvider>
  );
};

export default ProviderBundle;
