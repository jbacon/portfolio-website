import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
});

class Connect extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          open: false,
      };
    }

    handleClickOpen = () => {
        this.setState({ open: true});
    };
    
    handleClose = () => {
        this.setState({ open: false});
    };



    render() {
        return (
            <React.Fragment>
            <Button style={this.props.style} onClick={this.handleClickOpen}>Connect</Button>
            <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                {/* <DialogTitle id="form-dialog-title">Connect</DialogTitle> */}
                <DialogContent>
                <DialogContentText>
                    Send me a email:
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Your Email"
                    type="email"
                    fullWidth
                />
                <TextField
                    margin="dense"
                    id="name"
                    label="Subject"
                    fullWidth
                />
                <TextField
                    margin="dense"
                    id="name"
                    label="Message"
                    fullWidth
                    multiline
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={this.handleClose} color="primary">
                    Send
                </Button>
                </DialogActions>
            </Dialog>
            </React.Fragment>
        );
    }
}

Connect.propTypes = {};

export default withStyles(styles)(Connect);