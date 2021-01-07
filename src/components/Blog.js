import { IconButton, Typography } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Container from '@material-ui/core/Container';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from 'react';
import {
    Link,
    Route
} from "react-router-dom";
import { Template2 } from "../emailJsApiKeys";
import Question from './Question';

// { year: { key:title }}
const BlogStructure = {
    2015: {
        "a-narrative-on-web-applications": "A Narrative On Web Applications",
        "multi-page-vs-single-page-applications": "Multi-page vs Single-page Applications"
    },
    2020: {
        "building-a-simple-golang-api": "Building A Simple GoLang API"
    },
}

const Blog = (props) => (
    <Container>
        <br />
        {props.children}
        <br />
        <br />
        <Question
            emailJsUserId={Template2.USER_ID}
            emailJsServiceId={Template2.SERVICE_ID}
            emailJsTemplateId={Template2.TEMPLATE_ID} />
        <br />
    </Container>
);

const BlogMenu = (props) => (
    <Drawer anchor="right" open={props.open} onClose={props.onClose}>
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
        }}>
            <IconButton onClick={props.onClose}><ChevronRightIcon /></IconButton>
        </div>
        {Object.keys(BlogStructure).map((year, i) => (
            <Accordion key={i}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} >
                    <Typography>{year}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <List>
                        {Object.keys(BlogStructure[year]).map((article, i) => (
                            <ListItem button key={i} component={Link} onClick={props.onClose} to={"/blog/" + year + "/" + article}>
                                <ListItemText primary={BlogStructure[year][article]} />
                            </ListItem>
                        ))}
                    </List>
                </AccordionDetails>
            </Accordion>
        ))}
    </Drawer>
);

const BlogRoutes = (props) => (
    <React.Fragment>
        {Object.keys(BlogStructure).map((year, i) => (
            Object.keys(BlogStructure[year]).map((article, j) => (
                <Route key={i+""+j} path={"/blog/" + year + "/" + article} component={React.lazy(() => import("./blogs/" + year + "/" + article))} />
            ))
        ))}
    </React.Fragment>
);

export {
    BlogMenu,
    BlogRoutes
}

export default Blog