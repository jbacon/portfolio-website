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
import { LightThemeProvider } from "./CustomThemeProvider"

// arrays maintain order, objects do not
// [ { year: [ {article-url: article-title }]}]
const BlogStructure = [
    { 2020: [
        { "building-a-simple-golang-api": "Building A Simple GoLang API" },
    ]},
    { 2015: [
        { "a-narrative-on-web-applications": "A Narrative On Web Applications" },
        { "multi-page-vs-single-page-applications": "Multi-page vs Single-page Applications" }
    ]}
]

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
    <LightThemeProvider>
    <Drawer anchor="right" open={props.open} onClose={props.onClose}>
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
        }}>
            <IconButton onClick={props.onClose}><ChevronRightIcon /></IconButton>
        </div>
        {BlogStructure.map((yearObj, i) => {
            let year = Object.keys(yearObj)[0]
            let yearArticlesList = yearObj[year]
            return (
                <Accordion key={i} defaultExpanded={(i === 0) ? true : false}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} >
                        <Typography>{year}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <List>
                            {yearArticlesList.map((articleObj, j) => {
                                let articleUrl = Object.keys(articleObj)[0]
                                let articleTitle = articleObj[articleUrl]
                                return (
                                    <ListItem button key={j} component={Link} onClick={props.onClose} to={"/blog/" + year + "/" + articleUrl}>
                                        <ListItemText primary={articleTitle} />
                                    </ListItem>
                                )
                            })}
                        </List>
                    </AccordionDetails>
                </Accordion>
            )
        })}
    </Drawer>
    </LightThemeProvider>
);

const BlogRoutes = (props) => (
    <React.Fragment>
        {BlogStructure.map((yearObj, i) => {
            let year = Object.keys(yearObj)[0]
            let yearArticlesList = yearObj[year]
            return (
                yearArticlesList.map((articleObj, j) => {
                    let articleUrl = Object.keys(articleObj)[0]
                    return (
                        <Route
                        key={i+""+j}
                        path={"/blog/" + year + "/" + articleUrl}
                        component={
                            React.lazy(async () => {
                                await new Promise(resolve => setTimeout(resolve,300))
                                return import("./blogs/" + year + "/" + articleUrl)
                            })} />
                    )
                })
            )
        })}
    </React.Fragment>
);

export {
    BlogMenu,
    BlogRoutes
}

export default Blog