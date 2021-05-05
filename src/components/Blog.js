import { IconButton, Typography, Link as Link2 } from '@material-ui/core';
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
    Link
} from "react-router-dom";
import { Template2 } from "../emailJsApiKeys";
import Question from './Question';
import { LightThemeProvider } from "./CustomThemeProvider"
import {
    Route
} from "react-router-dom";
import ReactMarkdown from 'react-markdown';
import Highlight from 'react-highlight';
import gfm from 'remark-gfm'
import BlogStructure from '../blogs/blog-structure'

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
                                    let articleFilename = Object.keys(articleObj)[0]
                                    const dotIndex = articleFilename.indexOf(".")
                                    const article = articleFilename.substring(0, dotIndex)
                                    let articleTitle = articleObj[articleFilename]
                                    return (
                                        <ListItem button key={j} component={Link} onClick={props.onClose} to={"/blogs/" + year + "/" + article}>
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

const MarkdownBlog = (props) => {
    const [markdown, setMarkdown] = React.useState("");

    React.useEffect(() => {
        var asyncFunction = async () => {
            try {
                const importResult = await import(`../blogs/${props.year}/${props.article}.md`)
                const result = await fetch(importResult.default)
                const text = await result.text()
                setMarkdown(text)
            } catch (e) {
                console.log(e)
            }
        }
        asyncFunction()
    }, [props]);

    return (
        <Container >
            <ReactMarkdown
                renderers={{ // https://github.com/remarkjs/react-markdown#appendix-b-node-types
                    heading: props => <Typography style={{ paddingTop: (30-props.level*3) }} variant={"h"+(props.level+1)} {...props} />,
                    paragraph: props => <Typography {...props} />,
                    link: props => <Link2 {...props} />,
                    code: ({ language, value }) => <Highlight className={language} children={value} />,
                    inlineCode: props => <b><code style={{ background: "#232323" }} {...props} /></b>
                }}
                plugins={[[gfm, { singleTilde: false }]]}
                source={markdown} />
        </Container>
    )
};

const GetBlogRoutes = () => BlogStructure.map((yearObj, i) => {
    const year = Object.keys(yearObj)[0]
    const yearArticlesList = yearObj[year]
    return (
        yearArticlesList.map((articleObj, j) => {
            const articleFilename = Object.keys(articleObj)[0]
            const dotIndex = articleFilename.indexOf(".")
            const articleExtension = articleFilename.substring(dotIndex)
            const article = articleFilename.substring(0, dotIndex)
            const LazyComponent = React.lazy(async () => {
                await new Promise(resolve => setTimeout(resolve, 300))
                return import('../blogs/' + year + "/" + article)
            })
            return <Route key={i + "" + j} path={'/blogs/' + year + "/" + article} render={() => <Blog>
                {articleExtension === ".md" &&
                    <MarkdownBlog year={year} article={article} />
                }
                {articleExtension === ".js" &&
                    <LazyComponent />
                }
            </Blog>} />
        })
    )
})



export {
    BlogMenu,
    GetBlogRoutes
}

export default Blog