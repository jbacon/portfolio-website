import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { IconButton, ListItemButton, Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Container from "@mui/material/Container";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import React from "react";
import { Link, Route } from "react-router-dom";
import { LightThemeProvider } from "./CustomThemeProvider";
import Question from "./Question";
// import gfm from 'remark-gfm'
import BlogStructure from "../blogs/blog-structure";
import { configs } from "../configurations";
import FourOhFour from "./FourOhFour";
import Markdown from "./Markdown";

interface PropsWithChildren {
  children: React.ReactNode;
}

const Blog = (props?: PropsWithChildren) => (
  <Container style={{ overflow: "auto" }}>
    <br />
    {props?.children}
    <br />
    <br />
    <Question
      emailJsServiceId={configs.emailJS.serviceId}
      emailJsUserId={configs.emailJS.userId}
      emailJsTemplateId={configs.emailJS.templateForQuestion}
      email={configs.email}
      linkedIn={configs.linkedin}
      github={configs.github}
    />
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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <IconButton onClick={props.onClose}>
          <ChevronRightIcon />
        </IconButton>
      </div>
      {BlogStructure.map((blog, i) => {
        return (
          <Accordion key={i} defaultExpanded={i === 0}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{blog.year}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                {blog.articles.map((article, j) => {
                  const dotIndex = article.filename.indexOf(".");
                  const articlePath = article.filename.substring(0, dotIndex);
                  return (
                    <ListItemButton
                      key={j}
                      component={Link}
                      onClick={props.onClose}
                      to={`/blogs/${blog.year}/${articlePath}`}
                    >
                      <ListItemText primary={article.title} />
                    </ListItemButton>
                  );
                })}
              </List>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Drawer>
  </LightThemeProvider>
);

interface MarkdownBlogProps {
  year: number;
  articleFilename: string;
}

const MarkdownBlog = (props: MarkdownBlogProps) => {
  const [markdown, setMarkdown] = React.useState("");

  React.useEffect(() => {
    const asyncFunction = async () => {
      const importResult = await import(
        `../blogs/${props.year}/${props.articleFilename}.md`
      );
      const result = await fetch(importResult.default);
      const text = await result.text();
      setMarkdown(text);
    };
    asyncFunction().catch((e) => {
      console.log(e);
    });
  }, [props]);

  return (
    <Container>
      <Markdown content={markdown} />
    </Container>
  );
};

const GetBlogRoutes = () =>
  BlogStructure.map((blog, i) =>
    blog.articles.map((article, j) => {
      const dotIndex = article.filename.indexOf(".");
      const articleExtension = article.filename.substring(dotIndex);
      const articlePath = article.filename.substring(0, dotIndex);
      const LazyComponent = React.lazy(async () => {
        await new Promise((resolve) => setTimeout(resolve, 300)); // User experience looks better with small delay
        return await import(`../blogs/${blog.year}/${article.filename}`);
      });

      let blogContent;
      switch (articleExtension) {
        case ".md":
          blogContent = (
            <MarkdownBlog year={blog.year} articleFilename={articlePath} />
          );
          break;
        case ".jsx":
          blogContent = <LazyComponent />;
          break;
        case ".tsx":
          blogContent = <LazyComponent />;
          break;
        default:
          blogContent = <FourOhFour />;
      }

      return (
        <Route
          key={`${i}${j}`}
          path={`/blogs/${blog.year}/${articlePath}`}
          element={
            <Blog key={`/blogs/${blog.year}/${articlePath}`}>
              {blogContent}
            </Blog>
          }
        />
      );
    })
  );

export { BlogMenu, GetBlogRoutes };

export default Blog;
