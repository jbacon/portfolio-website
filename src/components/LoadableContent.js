import React from 'react';
import PropTypes from 'prop-types';
import { Backdrop, CircularProgress } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

const LoadableContent = (props) => (
    <div style={{ position: "relative" }}>
        {props.children}
        <Backdrop open={props.isLoading || props.isError || props.isSuccess} style={{ zIndex: 9999, flexDirection: "column", position: props.fullScreen ? "fixed": "absolute" }}>
            {props.isLoading &&
                <CircularProgress variant="indeterminate"/>
            }
            <Collapse in={props.isError}>
                <Alert
                    variant="filled"
                    severity="error"
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={props.onClose}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }>
                    <AlertTitle>Oops!</AlertTitle>
                    {props.errorMessage}
                </Alert>
            </Collapse>
            <Collapse in={props.isSuccess}>
                <Alert
                    variant="filled"
                    severity="success"
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={props.onClose}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }>
                    <AlertTitle>Success!</AlertTitle>
                    {props.successMessage}
                </Alert>
            </Collapse>
        </Backdrop>
    </div>
)

LoadableContent.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    isSuccess: PropTypes.bool,
    isError: PropTypes.bool,
    successMessage: PropTypes.string,
    errorMessage: PropTypes.string,
    onClose: PropTypes.func,
    fullScreen: PropTypes.bool
};
LoadableContent.defaultProps = {
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: "Something went wrong",
    fullScreen: false,
};


export default LoadableContent