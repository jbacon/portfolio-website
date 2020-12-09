import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';

import EmailJS from "emailjs-com"
import EmailJsApiKeys from "./apikeys"
import { withSnackbar } from 'material-ui-snackbar-provider'
import PropTypes from 'prop-types';
import AppContext from '../AppContext'
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import Link from '@material-ui/core/Link';
import InputAdornment from '@material-ui/core/InputAdornment';

const styles = theme => ({
});

class Connect extends React.Component {
    static contextType = AppContext

    constructor(props) {
      super(props);
      this.state = {
          email: "",
          name: "",
          message: "",
      };
    }

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
        this.context.setLoading();
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
                this.props.onDone();
                this.context.setLoaded();
                this.setState({ open: false});
            },
            error => {
                this.context.setLoaded();
                this.props.onDone();
            })
    }
    
    render() {
        return (
            <React.Fragment>
                <Dialog open={this.props.open} onClose={this.props.onDone} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Send Me An Email</DialogTitle>
                    <form onSubmit = {this.handleSend} >
                        <DialogContent>
                            <TextField
                                // required
                                // autoFocus
                                margin="normal"
                                id="to"
                                label="To"
                                variant="outlined"
                                defaultValue="Disabled"
                                disabled
                                InputProps={{
                                    endAdornment:
                                    <InputAdornment position="start">
                                        <Link style={{ display: "inline"}} href="https://www.linkedin.com/in/jbacon47/" target="_blank">
                                            <LinkedInIcon fontSize="large"/>
                                        </Link>
                                    </InputAdornment>,
                                  }}
                                fullWidth
                                value="jbacon@zagmail.gonzaga.edu"
                                onChange={this.handleNameChange}
                            />
                            <TextField
                                // required
                                autoFocus
                                margin="normal"
                                variant="outlined"
                                id="name"
                                label="Name"
                                // InputProps={{
                                //     startAdornment: <InputAdornment position="start">Subject:</InputAdornment>,
                                //   }}
                                fullWidth
                                value={this.state.name}
                                onChange={this.handleNameChange}
                            />
                            <TextField
                                // required
                                margin="normal"
                                id="email"
                                variant="outlined"
                                label="Email"
                                // InputProps={{
                                //     startAdornment: <InputAdornment position="start">From:</InputAdornment>,
                                //   }}
                                type="email"
                                fullWidth
                                value={this.state.email}
                                onChange={this.handleEmailChange}
                            />
                            <TextField
                                // required
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
                            <Button onClick={this.props.onDone}>
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

Connect.propTypes = {
    onDone: PropTypes.func.isRequired,
    open: PropTypes.bool,
};


export default withSnackbar(withStyles(styles))(Connect);