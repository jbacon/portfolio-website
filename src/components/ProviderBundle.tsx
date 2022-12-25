import { SnackbarProvider } from 'material-ui-snackbar-provider';
import React from 'react';
import configs from "../configurations.json";
import ConnectDialogProvider from "./ConnectDialog";
import DarkThemeProvider from "./CustomThemeProvider";


const ProviderBundle = (props: { children?: React.ReactNode }) => (
  <DarkThemeProvider>
    <SnackbarProvider SnackbarProps={{ autoHideDuration: 4000 }}>
      <ConnectDialogProvider
        email={configs.email}
        linkedIn={configs.linkedin}
        github={configs.github}
        emailJsUserId={configs.emailJS.templates[0].USER_ID}
        emailJsServiceId={configs.emailJS.templates[0].SERVICE_ID}
        emailJsTemplateId={configs.emailJS.templates[0].TEMPLATE_ID}>
        {props.children}
      </ConnectDialogProvider>
    </SnackbarProvider>
  </DarkThemeProvider>
);

export default ProviderBundle;