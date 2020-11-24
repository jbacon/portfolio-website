
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Backdrop, CircularProgress } from '@material-ui/core';
import PropTypes from 'prop-types';


const styles = theme => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 9999,
      color: '#fff',
    },
});

class BackgdropLoader extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }
    
    render() {
        return (
            <Backdrop className={this.props.classes.backdrop} open={this.props.open} >
                <CircularProgress color="inherit" />
            </Backdrop>
        );
    }
}

BackgdropLoader.propTypes = {
    open: PropTypes.bool.isRequired,
};

export default withStyles(styles)(BackgdropLoader);