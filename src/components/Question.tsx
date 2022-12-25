/**
 * Summary. Adds a form for users to email a question regarding the current page.
 */
import EmailJS from "@emailjs/browser";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { InputAdornment, Typography } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React from 'react';
import LoadableContent from './LoadableContent';
import Link from '@mui/material/Link';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

interface QuestionProps {
    emailJsUserId: string;
    emailJsServiceId: string;
    emailJsTemplateId: string;
    beforeSent?: () => void;
    afterSent?: () => void;
    onSentFail?: () => void;
    linkedIn?: string;
    github?: string;
    email?: string;
}

interface QuestionState {
    email: string;
    name: string;
    message: string;
    isLoading: boolean;
    isSent: boolean;
    isFailed: boolean;
}

class Question extends React.Component<QuestionProps, QuestionState> {
    constructor(props: QuestionProps) {
        super(props);
        this.state = {
            email: "",
            name: "",
            message: "",
            isLoading: false,
            isSent: false,
            isFailed: false,
        };
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
                errorMessage="Failed to send email! Please reach out to me directly">
                <Accordion TransitionProps={{ unmountOnExit: true }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} >
                        <Typography variant="h5">Question / Comment?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <form style={{ width: "100%", position: "relative" }} onSubmit={this.handleSend}>
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
                            />
                            <TextField
                                required
                                autoFocus
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
                            <Button type="submit">Send</Button>
                        </form>
                    </AccordionDetails>
                </Accordion>
            </LoadableContent>
        );
    }
}

export default Question