import { SnackbarProvider } from 'material-ui-snackbar-provider';
import React from 'react';
import ConnectDialogProvider from "./ConnectDialog";
import Template1 from "../emailJsApiKeys"


const ContextProviderBundle = (props) => (
  <SnackbarProvider SnackbarProps={{ autoHideDuration: 4000 }}>
    <ConnectDialogProvider
      email="jbacon@zagmail.gonzaga.edu"
      linkedIn="https://www.linkedin.com/in/jbacon47/"
      github="https://github.com/jbacon"
      // dialogContentDescription=""
      emailJsUserId={Template1.USER_ID}
      emailJsServiceId={Template1.SERVICE_ID}
      emailJsTemplateId={Template1.TEMPLATE_ID}
    // beforeSent=()=>{}
    // afterSent=()=>{}
    // onSentFail=()=>{}
    >
      {props.children}
    </ConnectDialogProvider>
  </SnackbarProvider>
);

export default ContextProviderBundle;