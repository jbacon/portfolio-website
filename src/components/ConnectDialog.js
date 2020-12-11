/**
 * Summary. A Connect Dialog Popup allowing user to send an email.
 * 
 * Description. This file exports the Component, a Context, and a Provider.
 *  The Context Provider allows the Connect Dialog to be opened/triggered
 *  from anywhere inside the app.
 *  This allows me to render a single Connect Dialog component instead of many.
 *  This also prevents needing a page navigation router redirect, since it is a popup.
 * 
 *  (this is definitely over-engineered, but learned a great deal about Context API!)
 */


import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputAdornment from '@material-ui/core/InputAdornment';
import Link from '@material-ui/core/Link';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import EmailJS from "emailjs-com";
import { withSnackbar } from 'material-ui-snackbar-provider';
import React from 'react';
import EmailJsApiKeys from "../apikeys";
import { withLoader } from "./Loader";


const ConnectDialogDispatcherContext = React.createContext({}); // Does not re-render consumer
const ConnectDialogStateContext = React.createContext({});

const styles = theme => ({
});

const ConnectDialog = withLoader(withSnackbar(withStyles(styles))(
    class ConnectDialog extends React.Component {
        static contextType = ConnectDialogStateContext

        constructor(props) {
            super(props);
            this.state = {
                email: "",
                name: "",
                message: "",
            };
        }

        handleNameChange = (event) => {
            this.setState({ name: event.target.value });
        }
        handleEmailChange = (event) => {
            this.setState({ email: event.target.value });
        }
        handleMessageChange = (event) => {
            this.setState({ message: event.target.value });
        }

        handleSend = (event) => {
            event.preventDefault();
            this.props.loader.signalLoading();
            EmailJS.send(
                EmailJsApiKeys.SERVICE_ID,
                EmailJsApiKeys.TEMPLATE_ID,
                {
                    name: this.state.name,
                    email: this.state.email,
                    message: this.state.message,
                },
                EmailJsApiKeys.USER_ID)
                .then(result => {
                    this.props.snackbar.showMessage('Email Sent Successfully!')
                    this.props.loader.signalLoaded();
                    this.setState({ name: "", email: "", message: "", open: false });
                    this.context.closeConnectDialog()
                },
                    error => {
                        this.props.snackbar.showMessage('Oops, something went wrong sending that email. Lets connect on LinkedIn!')
                        this.props.loader.signalLoaded();
                        this.context.closeConnectDialog()
                    })
        }

        render() {
            return (
                <React.Fragment>
                    <Dialog open={this.context.isConnectDialogOpen} onClose={this.context.closeConnectDialog} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Send Me An Email</DialogTitle>
                        <form onSubmit={this.handleSend} >
                            <DialogContent>
                                <TextField
                                    margin="normal"
                                    id="to"
                                    label="To"
                                    variant="outlined"
                                    disabled
                                    InputProps={{
                                        endAdornment:
                                            <InputAdornment position="end">
                                                <Link style={{ display: "inline" }} href="https://www.linkedin.com/in/jbacon47/" target="_blank">
                                                    <LinkedInIcon fontSize="large" />
                                                </Link>
                                            </InputAdornment>,
                                    }}
                                    fullWidth
                                    value="jbacon@zagmail.gonzaga.edu"
                                    onChange={this.handleNameChange}
                                />
                                <TextField
                                    required
                                    autoFocus
                                    margin="normal"
                                    variant="outlined"
                                    id="name"
                                    label="Name"
                                    fullWidth
                                    value={this.state.name}
                                    onChange={this.handleNameChange}
                                />
                                <TextField
                                    required
                                    margin="normal"
                                    id="email"
                                    variant="outlined"
                                    label="Email"
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
                                    rowsMax={10}
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
                                <Button onClick={this.context.closeConnectDialog}>
                                    Cancel
                                    </Button>
                            </DialogActions>
                        </form>
                    </Dialog>
                </React.Fragment>
            );
        }
    }
));
ConnectDialog.propTypes = {};

// Open Provider allows opening the Connect component from anywhere in the app using Context API
class ConnectDialogProvider extends React.Component {
    constructor(props) {
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
            <ConnectDialogDispatcherContext.Provider value={this.state.openConnectDialog}>
                <ConnectDialogStateContext.Provider value={this.state}>
                    <ConnectDialog />
                    {this.props.children}
                </ConnectDialogStateContext.Provider>
            </ConnectDialogDispatcherContext.Provider>
        );
    }
};

const withConnectDialogDispatcher = Component => {
    return props => {
        return (
            <ConnectDialogDispatcherContext.Consumer>
                {(connect) => {
                    return <Component {...props} connect={connect} />;
                }}
            </ConnectDialogDispatcherContext.Consumer>
        );
    };
};

export {
    withConnectDialogDispatcher,
};
export default ConnectDialogProvider