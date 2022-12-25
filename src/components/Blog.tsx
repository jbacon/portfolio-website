import { IconButton, Typography, Link as Link2, TypographyProps, LinkProps } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Container from '@mui/material/Container';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react';
import {
    Link
} from "react-router-dom";
import Question from './Question';
import { LightThemeProvider } from "./CustomThemeProvider"
import {
    Route
} from "react-router-dom";
import ReactMarkdown from 'react-markdown';
// import gfm from 'remark-gfm'
import BlogStructure from '../blogs/blog-structure'
import Highlight from './Highlight'
import FourOhFour from './FourOhFour';
import { ReactElement } from 'react-markdown/lib/react-markdown';
import { GetInnerText } from '../helpers/ChildrenHelpers';
import configs from "../configurations.json"

interface PropsWithChildren {
    children: React.ReactNode;
}

const Blog = (props?: PropsWithChildren) => (
    <Container>
        <br />
        {props?.children}
        <br />
        <br />
        <Question
            emailJsUserId={configs.emailJS.templates[1].USER_ID}
            emailJsServiceId={configs.emailJS.templates[1].SERVICE_ID}
            emailJsTemplateId={configs.emailJS.templates[1].TEMPLATE_ID} 
            email={configs.email}
            linkedIn={configs.linkedin}
            github={configs.github} />
        <br />
    </Container>
);

interface BlogMenuProps {
    open: boolean;
    onClose: () => void;

}

const BlogMenu = (props: BlogMenuProps) => (
    <LightThemeProvider>
        <Drawer anchor="right" open={props.open} onClose={props.onClose}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
            }}>
                <IconButton onClick={props.onClose}><ChevronRightIcon /></IconButton>
            </div>
            {BlogStructure.map((blog, i) => {
                return (
                    <Accordion key={i} defaultExpanded={(i === 0) ? true : false}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} >
                            <Typography>{blog.year}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <List>
                                {blog.articles.map((article, j) => {
                                    const dotIndex = article.filename.indexOf(".")
                                    const articlePath = article.filename.substring(0, dotIndex)
                                    return (
                                        <ListItem button key={j} component={Link} onClick={props.onClose} to={"/blogs/" + blog.year + "/" + articlePath}>
                                            <ListItemText primary={article.title} />
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

interface MarkdownBlogProps {
    year: number;
    articleFilename: string;
}

interface HeadingProps extends TypographyProps {
    level: number;
}

const MarkdownBlog = (props: MarkdownBlogProps) => {
    const [markdown, setMarkdown] = React.useState("");

    React.useEffect(() => {
        var asyncFunction = async () => {
            try {
                const importResult = await import(`../blogs/${props.year}/${props.articleFilename}.md`)
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
        <Container>
            <ReactMarkdown
                components={{ // https://github.com/remarkjs/react-markdown#appendix-b-node-types
                    h1: (props: HeadingProps) => <Typography style={{ paddingTop: (30-1*3) }} variant={"h1"} {...props} />,
                    h2: (props: HeadingProps) => <Typography style={{ paddingTop: (30-2*3) }} variant={"h2"} {...props} />,
                    h3: (props: HeadingProps) => <Typography style={{ paddingTop: (30-3*3) }} variant={"h3"} {...props} />,
                    h4: (props: HeadingProps) => <Typography style={{ paddingTop: (30-4*3) }} variant={"h4"} {...props} />,
                    h5: (props: HeadingProps) => <Typography style={{ paddingTop: (30-5*3) }} variant={"h5"} {...props} />,
                    h6: (props: HeadingProps) => <Typography style={{ paddingTop: (30-6*3) }} variant={"h6"} {...props} />,
                    p: (props: TypographyProps) => <Typography {...props} />,
                    a: (props: LinkProps) => <Link2 {...props} />,
                    // code: (props) => {
                    //     return <Highlight language={props.className || "markdown"} content={"`"+props.children+"`"} />
                    // }, // Using code will mess up the pre part
                    pre: (props) => {
                        if (props.children.length !== 1) {
                            return <pre {...props}></pre>
                        }
                        const firstChild = props.children.at(0)
                        if (!React.isValidElement(firstChild) || (firstChild as ReactElement).type !== "code") {
                            return <pre {...props}></pre>
                        }
                        return <Highlight language={((firstChild as ReactElement).props as { className?: string}).className || "markdown"} content={GetInnerText(props.children)} />
                    },
                }}
                // remarkPlugins={[[gfm, { singleTilde: false }]]}
                children={markdown} />
        </Container>
    )
};

const GetBlogRoutes = () => BlogStructure.map((blog, i) => blog.articles.map((article, j) => {
    const dotIndex = article.filename.indexOf(".")
    const articleExtension = article.filename.substring(dotIndex)
    const articlePath = article.filename.substring(0, dotIndex)
    const LazyComponent = React.lazy(async () => {
        await new Promise(resolve => setTimeout(resolve, 300))
        return import('../blogs/' + blog.year + "/" + article.filename)
    })

    var blogContent;
    switch(articleExtension) {
        case ".md":
            blogContent = <MarkdownBlog year={blog.year} articleFilename={articlePath} />
            break;
        case ".jsx":
            blogContent = <LazyComponent />
            break;
        case ".tsx":
            blogContent = <LazyComponent />
            break;
        default: 
            blogContent = <FourOhFour/>
    }

    return (
        <Route key={i + "" + j} path={'/blogs/' + blog.year + "/" + articlePath} element={
            <Blog>{blogContent}</Blog>
        }/>
    )
}))



export {
    BlogMenu,
    GetBlogRoutes
}

export default Blog