import React from 'react';
import Container from '@material-ui/core/Container';
import Question from './Question'
import { Template2 } from "../emailJsApiKeys"


const Blog = (props) => (
    <Container>
        <br />
        {props.children}
        <br />
        <Question
            emailJsUserId={Template2.USER_ID}
            emailJsServiceId={Template2.SERVICE_ID}
            emailJsTemplateId={Template2.TEMPLATE_ID} />
        <br />
    </Container>
);

export default Blog