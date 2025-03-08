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
import React, { ComponentType, useContext, useState } from "react";
import LoadableContent from "./LoadableContent";
import { withAuth0, WithAuth0Props } from "@auth0/auth0-react";
import { configs } from "../configurations";
import { IconButton, useTheme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

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

const ConnectDialog: React.FC<DialogPropsInterface> = (
  props: DialogPropsInterface
) => {
  const theme = useTheme();

  const [state, setState] = useState<DialogStateInterface>({
    email: props.auth0.user?.email !== undefined ? props.auth0.user?.email : "",
    name: props.auth0.user?.name !== undefined ? props.auth0.user?.name : "",
    message: "",
    isLoading: false,
    isSent: false,
    isFailed: false,
  });

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({ ...prev, name: event.target.value }));
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({ ...prev, email: event.target.value }));
  };

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({ ...prev, message: event.target.value }));
  };

  const handleSend = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.beforeSent?.();
    setState((prev) => ({ ...prev, isLoading: true }));
    EmailJS.send(
      props.emailJsServiceId,
      props.emailJsTemplateId,
      {
        name: state.name,
        email: state.email,
        message: state.message,
      },
      props.emailJsUserId
    ).then(
      (result) => {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          name: "",
          email: "",
          message: "",
          isSent: true,
          isFailed: false,
        }));
        props.afterSent?.();
      },
      (error) => {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          isFailed: true,
          isSent: false,
        }));
        props.onSentFail?.();
        console.error(error);
      }
    );
  };

  const handleClose = () => {
    setState((prev) => ({ ...prev, isLoading: false }));
    setState((prev) => ({ ...prev, isFailed: false }));
    setState((prev) => ({ ...prev, isSent: false }));
    props.connect.closeConnectDialog();
  };

  const signUp = () => {
    // sessionStorage.setItem("redirect_route", window.location.pathname+window.location.search);
    props.auth0
      ?.loginWithRedirect({
        appState: {
          redirectTo: window.location.pathname + window.location.search,
        },
      })
      .catch((reason) => {
        console.error(reason);
      });
  };

  return (
    <LoadableContent
      isLoading={state.isLoading}
      isSuccess={state.isSent}
      isError={state.isFailed}
      onClose={handleClose}
      successMessage="I will get back to you shortly, thanks!"
      errorMessage="Failed to send email! Please reach out to me directly"
      fullScreen={true}
    >
      <Dialog
        fullScreen={Boolean(window.innerWidth < theme.breakpoints.values.sm)}
        open={props.connect.isConnectDialogOpen}
        onClose={props.connect.closeConnectDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Send Me A Message</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={props.connect.closeConnectDialog}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <form onSubmit={handleSend}>
          <DialogContent>
            {props.dialogContentText !== undefined && (
              <DialogContentText>{props.dialogContentText}</DialogContentText>
            )}
            {props.email !== undefined && (
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
                      {props.linkedIn !== undefined && (
                        <Link
                          style={{ display: "inline" }}
                          href={props.linkedIn}
                          target="_blank"
                        >
                          <LinkedInIcon fontSize="large" />
                        </Link>
                      )}
                      {props.github !== undefined && (
                        <Link
                          style={{ display: "inline" }}
                          href={props.github}
                          target="_blank"
                        >
                          <GitHubIcon fontSize="large" />
                        </Link>
                      )}
                    </InputAdornment>
                  ),
                }}
                fullWidth
                value={props.email}
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
              value={state.name !== "" ? state.name : props.auth0.user?.name}
              onChange={handleNameChange}
            />
            <TextField
              required
              margin="normal"
              id="email"
              variant="outlined"
              label="Your Email"
              type="email"
              fullWidth
              value={state.email !== "" ? state.email : props.auth0.user?.email}
              onChange={handleEmailChange}
              style={{ marginBottom: "0px" }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {!props.auth0?.isAuthenticated && (
                      <Link onClick={signUp}>.. or sign in</Link>
                    )}
                  </InputAdornment>
                ),
              }}
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
              value={state.message}
              onChange={handleMessageChange}
            />
          </DialogContent>
          <DialogActions>
            <Button type="submit">Send</Button>
          </DialogActions>
        </form>
      </Dialog>
    </LoadableContent>
  );
};

interface WithProviderPropsInterface {
  connect: ProviderStateInterface;
}

const withProvider = <P extends WithProviderPropsInterface>(
  Component: ComponentType<P>,
  context = ProviderContext
): ComponentType<Omit<P, keyof WithProviderPropsInterface>> => {
  return function WithProvider(props): React.JSX.Element {
    return (
      <context.Consumer>
        {(connect: ProviderStateInterface | null): React.JSX.Element => (
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
            emailJsUserId={configs.emailJS.userId}
            emailJsServiceId={configs.emailJS.serviceId}
            emailJsTemplateId={configs.emailJS.templateForConnect}
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
  return function WithConnectDispatcher(props): React.JSX.Element {
    return (
      <context.Consumer>
        {(
          connectDispatcher: ConnectDispatcherStateInterface | null
        ): React.JSX.Element => (
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
