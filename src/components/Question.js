/**
 * Summary. Adds a form for users to email a question regarding the current page.
 */
import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import EmailJS from "emailjs-com";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Typography } from '@material-ui/core';
import LoadableContent from './LoadableContent';

class Question extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            message: "",
            isLoading: false,
            isSent: false,
            isFailed: false,
        };
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
        this.setState({ isLoading: true })
        EmailJS.send(
            this.props.emailJsServiceId,
            this.props.emailJsTemplateId,
            {
                email: this.state.email,
                message: this.state.message,
                page: window.location.href,
            },
            this.props.emailJsUserId)
            .then(
                result => {
                    this.setState({ email: "", message: "", isLoading: false, isSent: true, isFailed: false });
                    this.props.afterSent && this.props.afterSent()
                },
                error => {
                    this.setState({ isLoading: false, isSent: false, isFailed: true })
                    this.props.onSentFail && this.props.onSentFail()
                })
    }

    handleClose = () => {
        this.setState({ isLoading: false });
        this.setState({ isFailed: false });
        this.setState({ isSent: false });
    }

    render() {
        return (
            <LoadableContent
                isLoading={this.state.isLoading}
                isSuccess={this.state.isSent}
                isError={this.state.isFailed}
                onClose={this.handleClose}
                successMessage="I will get back to you shortly, thanks!"
                errorMessage="Failed to send email... sorry">
                <Accordion TransitionProps={{ unmountOnExit: true }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} >
                        <Typography variant="h5">Question / Comment?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <form style={{ width: "100%", position: "relative" }} onSubmit={this.handleSend}>
                            <TextField
                                required
                                autoFocus
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
                            <Button type="submit">Send</Button>
                        </form>
                    </AccordionDetails>
                </Accordion>
            </LoadableContent>
        );
    }
}

Question.propTypes = {
    emailJsUserId: PropTypes.string.isRequired,
    emailJsServiceId: PropTypes.string.isRequired,
    emailJsTemplateId: PropTypes.string.isRequired,
    beforeSent: PropTypes.func,
    afterSent: PropTypes.func,
    onSentFail: PropTypes.func,
};


export default Question