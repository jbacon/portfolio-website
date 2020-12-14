import { withStyles } from '@material-ui/core/styles';
import { SnackbarProvider } from 'material-ui-snackbar-provider';
import React from 'react';
import ConnectDialogProvider from "./ConnectDialog";
import keys from "../emailJsApiKeys"

const styles = theme => ({});

class ContextProviderBundle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <SnackbarProvider SnackbarProps={{ autoHideDuration: 4000 }}>
        <ConnectDialogProvider
          email="jbacon@zagmail.gonzaga.edu"
          linkedIn="https://www.linkedin.com/in/jbacon47/"
          github="https://github.com/jbacon"
          // dialogContentDescription=""
          emailJsUserId={keys.USER_ID}
          emailJsServiceId={keys.SERVICE_ID}
          emailJsTemplateId={keys.TEMPLATE_ID}
        // beforeSent=()=>{}
        // afterSent=()=>{}
        // onSentFail=()=>{}
        >
          {this.props.children}
        </ConnectDialogProvider>
      </SnackbarProvider>
    );
  }
}

ContextProviderBundle.propTypes = {};

export default withStyles(styles)(ContextProviderBundle);
