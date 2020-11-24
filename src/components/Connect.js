import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';

import EmailJS from "emailjs-com"
import EmailJsApiKeys from "./apikeys"
import BackdropLoader from "./reusable/BackdropLoader"
import { withSnackbar } from 'material-ui-snackbar-provider'

const styles = theme => ({
});

class Connect extends React.Component {
    
    constructor(props) {
      super(props);
      this.state = {
          open: false,
          email: "",
          name: "",
          message: "",
          backdropOpen: false,
      };
    }

    handleClickOpen = () => {
        this.setState({ open: true});
    };
    
    handleClose = () => {
        this.setState({ open: false});
    };

    handleNameChange = (event) => {
        this.setState({name: event.target.value});
    }
    handleEmailChange = (event) => {
        this.setState({email: event.target.value});
    }
    handleMessageChange = (event) => {
        this.setState({message: event.target.value});
    }

    handleSend = (event) => {
        event.preventDefault();
        this.setState({backdropOpen: true});
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
                this.setState({ name: ""});
                this.setState({ email: ""});
                this.setState({ message: ""});
                this.setState({ open: false});
                this.setState({backdropOpen: false});
            },
            error => {
                this.setState({backdropOpen: false});
            })
    }
    
    render() {
        return (
            <React.Fragment>
            <Button style={this.props.style} onClick={this.handleClickOpen}>Connect</Button>
            <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                <BackdropLoader open={this.state.backdropOpen}></BackdropLoader>
                <DialogTitle id="form-dialog-title">Send Me An Email</DialogTitle>
                <form onSubmit = {this.handleSend} >
                    <DialogContent>
                    {/* <DialogContentText>
                        Send me a email:
                    </DialogContentText> */}
                        <TextField
                            required
                            autoFocus
                            margin="normal"
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
                            label="Your Message"
                            fullWidth
                            multiline
                            value={this.state.message}
                            onChange={this.handleMessageChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose}>
                            Cancel
                        </Button>
                        <Button type="submit">
                            Send
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
            </React.Fragment>
        );
    }
}

Connect.propTypes = {};

export default withSnackbar(withStyles(styles))(Connect);