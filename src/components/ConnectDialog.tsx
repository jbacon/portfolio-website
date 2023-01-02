/**
 * Summary: A provider that allows child components to dispatch the connect dialog
 * Requires two separate contexts to avoid re-rendering children
 * One context is for providing dispatcher
 * One context is for providing dispatcher, closer, and isOpen (used internally)
 *  */

import EmailJS from "@emailjs/browser";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InputAdornment from "@mui/material/InputAdornment";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import React, { ComponentType, useContext } from "react";
import { LightThemeProvider } from "./CustomThemeProvider";
import LoadableContent from "./LoadableContent";
import { withAuth0, WithAuth0Props } from "@auth0/auth0-react";
import configs from "../configurations.json";

interface DialogPropsInterface
  extends WithAuth0Props,
    WithProviderPropsInterface {
  email?: string;
  linkedIn?: string;
  github?: string;
  dialogContentText?: React.ReactNode;
  emailJsUserId: string;
  emailJsServiceId: string;
  emailJsTemplateId: string;
  beforeSent?: () => void;
  afterSent?: () => void;
  onSentFail?: () => void;
}

interface DialogStateInterface {
  email: string;
  name: string;
  message: string;
  isLoading: boolean;
  isSent: boolean;
  isFailed: boolean;
}

// Does not re-render consumer
const ProviderContext = React.createContext<ProviderStateInterface | null>(
  null
);

class ConnectDialog extends React.Component<
  DialogPropsInterface,
  DialogStateInterface
> {
  constructor(props: DialogPropsInterface) {
    super(props);
    this.state = {
      email:
        props.auth0.user?.email !== undefined ? props.auth0.user?.email : "",
      name: props.auth0.user?.name !== undefined ? props.auth0.user?.name : "",
      message: "",
      isLoading: false,
      isSent: false,
      isFailed: false,
    };
  }

  handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ name: event.target.value });
  };

  handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ email: event.target.value });
  };

  handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ message: event.target.value });
  };

  handleSend = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.beforeSent?.();
    this.setState({ isLoading: true });
    EmailJS.send(
      this.props.emailJsServiceId,
      this.props.emailJsTemplateId,
      {
        name: this.state.name,
        email: this.state.email,
        message: this.state.message,
      },
      this.props.emailJsUserId
    ).then(
      (result) => {
        this.setState({
          isLoading: false,
          name: "",
          email: "",
          message: "",
          isSent: true,
          isFailed: false,
        });
        this.props.afterSent?.();
      },
      (error) => {
        this.setState({ isLoading: false, isFailed: true, isSent: false });
        this.props.onSentFail?.();
        console.error(error);
      }
    );
  };

  handleClose = () => {
    this.setState({ isLoading: false });
    this.setState({ isFailed: false });
    this.setState({ isSent: false });
    this.props.connect.closeConnectDialog();
  };

  render() {
    return (
      <LoadableContent
        isLoading={this.state.isLoading}
        isSuccess={this.state.isSent}
        isError={this.state.isFailed}
        onClose={this.handleClose}
        successMessage="I will get back to you shortly, thanks!"
        errorMessage="Failed to send email! Please reach out to me directly"
        fullScreen={true}
      >
        <LightThemeProvider>
          <Dialog
            open={this.props.connect.isConnectDialogOpen}
            onClose={this.props.connect.closeConnectDialog}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Send Me A Message</DialogTitle>
            <form onSubmit={this.handleSend}>
              <DialogContent>
                {this.props.dialogContentText !== undefined && (
                  <DialogContentText>
                    {this.props.dialogContentText}
                  </DialogContentText>
                )}
                {this.props.email !== undefined && (
                  <TextField
                    margin="normal"
                    id="to"
                    label="To"
                    variant="outlined"
                    type="email"
                    disabled
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          {this.props.linkedIn !== undefined && (
                            <Link
                              style={{ display: "inline" }}
                              href={this.props.linkedIn}
                              target="_blank"
                            >
                              <LinkedInIcon fontSize="large" />
                            </Link>
                          )}
                          {this.props.github !== undefined && (
                            <Link
                              style={{ display: "inline" }}
                              href={this.props.github}
                              target="_blank"
                            >
                              <GitHubIcon fontSize="large" />
                            </Link>
                          )}
                        </InputAdornment>
                      ),
                    }}
                    fullWidth
                    value={this.props.email}
                  />
                )}
                <TextField
                  required
                  autoFocus
                  margin="normal"
                  variant="outlined"
                  id="name"
                  label="Your Name"
                  fullWidth
                  value={
                    this.state.name !== ""
                      ? this.state.name
                      : this.props.auth0.user?.name
                  }
                  onChange={this.handleNameChange}
                />
                <TextField
                  required
                  margin="normal"
                  id="email"
                  variant="outlined"
                  label="Your Email"
                  type="email"
                  fullWidth
                  value={
                    this.state.email !== ""
                      ? this.state.email
                      : this.props.auth0.user?.email
                  }
                  onChange={this.handleEmailChange}
                />
                <TextField
                  required
                  margin="normal"
                  id="message"
                  label="Message"
                  variant="outlined"
                  rows={4}
                  fullWidth
                  multiline
                  value={this.state.message}
                  onChange={this.handleMessageChange}
                />
              </DialogContent>
              <DialogActions>
                <Button type="submit">Send</Button>
                <Button onClick={this.props.connect.closeConnectDialog}>
                  Cancel
                </Button>
              </DialogActions>
            </form>
          </Dialog>
        </LightThemeProvider>
      </LoadableContent>
    );
  }
}

interface WithProviderPropsInterface {
  connect: ProviderStateInterface;
}

const withProvider = <P extends WithProviderPropsInterface>(
  Component: ComponentType<P>,
  context = ProviderContext
): ComponentType<Omit<P, keyof WithProviderPropsInterface>> => {
  return function WithProvider(props): JSX.Element {
    return (
      <context.Consumer>
        {(connect: ProviderStateInterface | null): JSX.Element => (
          <Component {...(props as P)} connect={connect} />
        )}
      </context.Consumer>
    );
  };
};

const ConnectDialogWithContexts = withAuth0(withProvider(ConnectDialog));

interface ConnectDispatcherStateInterface {
  openConnectDialog: () => void;
}

const ConnectDispatcherContext =
  React.createContext<ConnectDispatcherStateInterface | null>(null);

interface ProviderPropsInterface {
  children?: React.ReactNode;
}

interface ProviderStateInterface {
  isConnectDialogOpen: boolean;
  closeConnectDialog: () => void;
  openConnectDialog: () => void;
}

// ConnectDialogProvider renders the actual Dialog component and provides the dispatcher context for all children
class ConnectProvider extends React.Component<
  ProviderPropsInterface,
  ProviderStateInterface
> {
  constructor(props: ProviderPropsInterface) {
    super(props);
    this.state = {
      isConnectDialogOpen: false,
      closeConnectDialog: this.closeConnectDialog,
      openConnectDialog: this.openConnectDialog,
    };
  }

  openConnectDialog = () => {
    this.setState({ isConnectDialogOpen: true });
  };

  closeConnectDialog = () => {
    this.setState({ isConnectDialogOpen: false });
  };

  render() {
    // Nested Providers is necessary to prevent consumer components from re-rendering if they only need to "update" the data.
    return (
      <ConnectDispatcherContext.Provider
        value={{ openConnectDialog: this.state.openConnectDialog }}
      >
        <ProviderContext.Provider value={this.state}>
          <ConnectDialogWithContexts
            email={configs.email}
            linkedIn={configs.linkedin}
            github={configs.github}
            emailJsUserId={configs.emailJS.templates[0].USER_ID}
            emailJsServiceId={configs.emailJS.templates[0].SERVICE_ID}
            emailJsTemplateId={configs.emailJS.templates[0].TEMPLATE_ID}
          />
        </ProviderContext.Provider>
        {this.props.children}
      </ConnectDispatcherContext.Provider>
    );
  }
}

interface WithConnectDispatcherProps {
  connectDispatcher: ConnectDispatcherStateInterface;
}

const withConnectDispatcher = <P extends WithConnectDispatcherProps>(
  Component: ComponentType<P>,
  context = ConnectDispatcherContext
): ComponentType<Omit<P, keyof WithConnectDispatcherProps>> => {
  return function WithConnectDispatcher(props): JSX.Element {
    return (
      <context.Consumer>
        {(
          connectDispatcher: ConnectDispatcherStateInterface | null
        ): JSX.Element => (
          <Component {...(props as P)} connectDispatcher={connectDispatcher} />
        )}
      </context.Consumer>
    );
  };
};

const useConnectDispatcher = (
  context = ConnectDispatcherContext
): ConnectDispatcherStateInterface =>
  useContext(context) as ConnectDispatcherStateInterface;

export {
  ConnectDispatcherContext,
  withConnectDispatcher,
  useConnectDispatcher,
};

export type { ConnectDispatcherStateInterface };

export default ConnectProvider;
