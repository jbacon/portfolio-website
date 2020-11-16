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
import EmailJsApiKeys from "../apikeys"

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
                alert('Message Sent, I\'ll get back to you soon');
                this.setState({ name: ""});
                this.setState({ email: ""});
                this.setState({ message: ""});
                this.setState({ open: false});
            },
            error => {
                alert( 'An error occured, Plese try again',error.text)
            })
    }
    
    render() {
        return (
            <React.Fragment>
            <Button style={this.props.style} onClick={this.handleClickOpen}>Connect</Button>
            <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Send Me A Email</DialogTitle>
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

export default withStyles(styles)(Connect);