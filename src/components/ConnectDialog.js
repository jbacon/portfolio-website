/**
 * Summary. A Connect Dialog Popup allowing users to send me an email.
 * 
 * Description. This file exports a ConnectDialogProvider and a withConnectDialogDispatcher.
 *  The connect dialog can be opened from child component(s) which are wrapped withConnectDialogDispatcher
 *  and exist under the ConnectProvider.
 * 
 * Dependencies: 
 *  - "material-ui-snackbar-provider" - Needs to wrap Connect Provider if you desire success/fail notification
 * 
 *  (this is definitely over-engineered, but learned a great deal about Context API!)
 */


import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogTitle';
import InputAdornment from '@material-ui/core/InputAdornment';
import Link from '@material-ui/core/Link';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import EmailJS from "emailjs-com";
import { withSnackbar } from 'material-ui-snackbar-provider';
import React from 'react';
import { withLoader } from "./Loader";
import PropTypes from 'prop-types';
import LoaderProvider from "./Loader";


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
            this.props.beforeSent && this.props.beforeSent()
            this.props.loader.signalLoading();
            EmailJS.send(
                this.props.emailJsServiceId,
                this.props.emailJsTemplateId,
                {
                    name: this.state.name,
                    email: this.state.email,
                    message: this.state.message,
                },
                this.props.emailJsUserId)
                .then(result => {   
                    this.props.snackbar.showMessage('Email Sent Successfully!')
                    this.props.loader.signalLoaded();
                    this.setState({ name: "", email: "", message: "", open: false });
                    this.context.closeConnectDialog()
                    this.props.afterSent && this.props.afterSent()
                },
                    error => {
                        this.props.snackbar.showMessage('Oops, something went wrong sending that email. Lets connect on LinkedIn!')
                        this.props.loader.signalLoaded();
                        this.context.closeConnectDialog()
                        this.props.onSentFail && this.props.onSentFail()
                    })
        }

        render() {
            return (
                <React.Fragment>
                    <Dialog open={this.context.isConnectDialogOpen} onClose={this.context.closeConnectDialog} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Send An Email</DialogTitle>
                        <form onSubmit={this.handleSend} >
                            <DialogContent>
                                { this.props.dialogContentText &&
                                <DialogContentText>{this.props.dialogContentText}</DialogContentText>
                                }
                                { this.props.email &&
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
                                                { this.props.linkedIn &&
                                                <Link style={{ display: "inline" }} href={this.props.linkedIn} target="_blank">
                                                    <LinkedInIcon fontSize="large" />
                                                </Link>
                                                }
                                                { this.props.github &&
                                                <Link style={{ display: "inline" }} href={this.props.github} target="_blank">
                                                    <GitHubIcon fontSize="large" />
                                                </Link>
                                                }
                                            </InputAdornment>,
                                    }}
                                    fullWidth
                                    value={this.props.email}
                                    onChange={this.handleNameChange}
                                />}
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
ConnectDialog.propTypes = {
    email: PropTypes.string,
    linkedIn: PropTypes.string,
    github: PropTypes.string,
    dialogContentDescription: PropTypes.elementType,
    emailJsUserId: PropTypes.string.isRequired,
    emailJsServiceId: PropTypes.string.isRequired,
    emailJsTemplateId: PropTypes.string.isRequired,
    beforeSent: PropTypes.func,
    afterSent: PropTypes.func,
    onSentFail: PropTypes.func,
};

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
                        <LoaderProvider>
                            <ConnectDialog 
                                email={this.props.email}
                                linkedIn={this.props.linkedIn}
                                github={this.props.github}
                                dialogContentDescription={this.props.dialogContentDescription}
                                emailJsUserId={this.props.emailJsUserId}
                                emailJsServiceId={this.props.emailJsServiceId}
                                emailJsTemplateId={this.props.emailJsTemplateId}
                                beforeSent={this.props.beforeSent}
                                afterSent={this.props.afterSent}
                                onSentFail={this.props.onSentFail}
                            />
                        </LoaderProvider>
                        {this.props.children}
                    </ConnectDialogStateContext.Provider>
                </ConnectDialogDispatcherContext.Provider>
        );
    }
};
ConnectDialogProvider.propTypes = {
    email: PropTypes.string,
    linkedIn: PropTypes.string,
    github: PropTypes.string,
    dialogContentDescription: PropTypes.elementType,
    emailJsUserId: PropTypes.string.isRequired,
    emailJsServiceId: PropTypes.string.isRequired,
    emailJsTemplateId: PropTypes.string.isRequired,
    beforeSent: PropTypes.func,
    afterSent: PropTypes.func,
    onSentFail: PropTypes.func,
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