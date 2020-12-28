import { Typography } from '@material-ui/core';
import React from 'react';
import Container from '@material-ui/core/Container';

const FourOhFour = (props) => (
    <Container >
        <Typography variant="h1" style={{ textAlign: "center" }}>
            <br />
            Oops! 4o4
            <br />
        </Typography>
        <Typography style={{ textAlign: "center" }}>
            Page not found.
            <br />
            <br />
            <br />
        </Typography>
    </Container>
);

export default FourOhFour