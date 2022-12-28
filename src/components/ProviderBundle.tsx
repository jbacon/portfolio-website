import { SnackbarProvider } from "material-ui-snackbar-provider";
import React from "react";
import configs from "../configurations.json";
import ConnectDialogProvider from "./ConnectDialog";
import DarkThemeProvider from "./CustomThemeProvider";
import { Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const ProviderBundle = (props: { children?: React.ReactNode }) => {
  const navigate = useNavigate();

  return (
    <DarkThemeProvider>
      <SnackbarProvider SnackbarProps={{ autoHideDuration: 4000 }}>
        <Auth0Provider
          domain="dev-doylanbzoaktwa7a.us.auth0.com"
          clientId="GS7pZEBjIGsfTZ0z5jHiiqzwFna9an5C"
          redirectUri={window.location.origin + "/auth0/callback"}
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
          <ConnectDialogProvider
            email={configs.email}
            linkedIn={configs.linkedin}
            github={configs.github}
            emailJsUserId={configs.emailJS.templates[0].USER_ID}
            emailJsServiceId={configs.emailJS.templates[0].SERVICE_ID}
            emailJsTemplateId={configs.emailJS.templates[0].TEMPLATE_ID}
          >
            {props.children}
          </ConnectDialogProvider>
        </Auth0Provider>
      </SnackbarProvider>
    </DarkThemeProvider>
  );
};

export default ProviderBundle;
