import { withStyles } from '@material-ui/core/styles';
import { SnackbarProvider } from 'material-ui-snackbar-provider';
import React from 'react';
import ConnectDialogProvider from "./ConnectDialog";
import LoaderProvider from "./Loader";

const styles = theme => ({});

class ContextProviderBundle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <SnackbarProvider SnackbarProps={{ autoHideDuration: 4000 }}>
        <LoaderProvider>
          <ConnectDialogProvider>
            {this.props.children}
          </ConnectDialogProvider>
        </LoaderProvider>
      </SnackbarProvider>
    );
  }
}

ContextProviderBundle.propTypes = {};

export default withStyles(styles)(ContextProviderBundle);
