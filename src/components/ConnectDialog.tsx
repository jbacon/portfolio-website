/**
 * Summary. A Connect Dialog Popup allowing users to send me an email.
 * 
 * Description. This file exports a ConnectDialogProvider and a withConnectDialogDispatcher.
 *  The connect dialog can be opened from child component(s) which are wrapped withConnectDialogDispatcher
 *  and exist under the ConnectProvider.
 * 
 *  (this is definitely over-engineered, but learned a great deal about Context API!)
 */


import EmailJS from "@emailjs/browser";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { default as DialogContentText, default as DialogTitle } from '@mui/material/DialogTitle';
import InputAdornment from '@mui/material/InputAdornment';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import React from 'react';
import { LightThemeProvider } from "./CustomThemeProvider";
import LoadableContent from './LoadableContent';

interface ConnectDialogProps {
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

interface ConnectDialogState {
    email: string;
    name: string;
    message: string;
    isLoading: boolean;
    isSent: boolean;
    isFailed: boolean;
}

const ConnectDialogDispatcherContext = React.createContext<DispatcherContext | null>(null);

// Does not re-render consumer
const ConnectDialogStateContext = React.createContext<ConnectDialogProviderState | null>(null);


class ConnectDialog extends React.Component<ConnectDialogProps, ConnectDialogState> {
    static contextType = ConnectDialogStateContext

    context!: React.ContextType<typeof ConnectDialogStateContext>

    constructor(props: ConnectDialogProps) {
        super(props);
        this.state = {
            email: "",
            name: "",
            message: "",
            isLoading: false,
            isSent: false,
            isFailed: false
        };
    }

    handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ name: event.target.value });
    }
    handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ email: event.target.value });
    }
    handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ message: event.target.value });
    }

    handleSend = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        this.props.beforeSent && this.props.beforeSent()
        this.setState({ isLoading: true })
        EmailJS.send(
            this.props.emailJsServiceId,
            this.props.emailJsTemplateId,
            {
                name: this.state.name,
                email: this.state.email,
                message: this.state.message,
            },
            this.props.emailJsUserId)
            .then(
                result => {
                    this.setState({ isLoading: false, name: "", email: "", message: "", isSent: true, isFailed: false });
                    this.props.afterSent && this.props.afterSent()
                },
                error => {
                    this.setState({ isLoading: false, isFailed: true, isSent: false })
                    this.props.onSentFail && this.props.onSentFail()
                })
    }

    handleClose = () => {
        this.setState({ isLoading: false });
        this.setState({ isFailed: false });
        this.setState({ isSent: false });
        this.context!.closeConnectDialog();
    }

    render() {
        return (
            <LoadableContent
                isLoading={this.state.isLoading}
                isSuccess={this.state.isSent}
                isError={this.state.isFailed}
                onClose={this.handleClose}
                successMessage="I will get back to you shortly, thanks!"
                errorMessage="Failed to send email! Please reach out to me directly"
                fullScreen={true}>
                <LightThemeProvider>
                    <Dialog open={this.context!.isConnectDialogOpen} onClose={this.context!.closeConnectDialog} aria-labelledby="form-dialog-title" >
                        <DialogTitle id="form-dialog-title">Send An Email</DialogTitle>
                        <form onSubmit={this.handleSend}>
                            <DialogContent>
                                {this.props.dialogContentText &&
                                    <DialogContentText>{this.props.dialogContentText}</DialogContentText>
                                }
                                {this.props.email &&
                                    <TextField
                                        margin="normal"
                                        id="to"
                                        label="To"
                                        variant="outlined"
                                        type="email"
                                        disabled
                                        InputProps={{
                                            endAdornment:
                                                <InputAdornment position="end">
                                                    {this.props.linkedIn &&
                                                        <Link style={{ display: "inline" }} href={this.props.linkedIn} target="_blank">
                                                            <LinkedInIcon fontSize="large" />
                                                        </Link>
                                                    }
                                                    {this.props.github &&
                                                        <Link style={{ display: "inline" }} href={this.props.github} target="_blank">
                                                            <GitHubIcon fontSize="large" />
                                                        </Link>
                                                    }
                                                </InputAdornment>,
                                        }}
                                        fullWidth
                                        value={this.props.email}
                                    />}
                                <TextField
                                    required
                                    autoFocus
                                    margin="normal"
                                    variant="outlined"
                                    id="name"
                                    label="Your Name"
                                    fullWidth
                                    value={this.state.name}
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
                                    value={this.state.email}
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
                                <Button type="submit">
                                    Send
                                </Button>
                                <Button onClick={this.context!.closeConnectDialog}>
                                    Cancel
                                </Button>
                            </DialogActions>
                        </form>
                    </Dialog>
                </LightThemeProvider>
            </LoadableContent>
        );
    }
};

interface DispatcherContext {
    openConnectDialog: () => void;
}

interface ConnectDialogProviderProps extends ConnectDialogProps {
    children?: React.ReactNode
}

interface ConnectDialogProviderState {
    isConnectDialogOpen: boolean;
    closeConnectDialog: () => void;
    openConnectDialog: () => void;
}

// ConnectDialogProvider renders the actual Dialog component and provides the dispatcher context for all children
class ConnectDialogProvider extends React.Component<ConnectDialogProviderProps, ConnectDialogProviderState> {
    constructor(props: ConnectDialogProviderProps) {
        super(props);
        this.state = {
            isConnectDialogOpen: false,
            closeConnectDialog: this.closeConnectDialog,
            openConnectDialog: this.openConnectDialog
        };
    }

    openConnectDialog = () => { this.setState({ isConnectDialogOpen: true }) };
    closeConnectDialog = () => { this.setState({ isConnectDialogOpen: false }) };

    render() {
        // Nested Providers is necessary to prevent consumer components from re-rendering if they only need to "update" the data.
        return (
            <ConnectDialogDispatcherContext.Provider value={{ openConnectDialog: this.state.openConnectDialog }}>
                <ConnectDialogStateContext.Provider value={this.state}>
                    <ConnectDialog {...this.props} />
                </ConnectDialogStateContext.Provider>
                {this.props.children}
            </ConnectDialogDispatcherContext.Provider>
        );
    }
};

// This pattern is not possible with typescript. Saving for reference.
// const withConnectDialogDispatcher = (Component: React.ComponentType<object>) => 
//     class WithConnectDialogDispatcher extends React.Component<object> {
//         render() {
//             return (
//                 <ConnectDialogDispatcherContext.Consumer>
//                     {(connect: DispatcherContext | null) => {
//                         return <Component {...this.props} connect={connect} />;
//                     }}
//                 </ConnectDialogDispatcherContext.Consumer>
//             )
//         }
//     };
// };

export {
    ConnectDialogDispatcherContext
};

export type {
    DispatcherContext
}

export default ConnectDialogProvider