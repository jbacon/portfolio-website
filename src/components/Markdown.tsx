import {
  Typography,
  Link as Link2,
  LinkProps,
  TypographyProps,
} from "@mui/material";
import React, { ReactElement } from "react";
import ReactMarkdown from "react-markdown";
import { GetInnerText } from "../helpers/ChildrenHelpers";
import Highlight from "./Highlight";

interface MarkdownProps {
  content: string;
}

interface HeadingProps extends TypographyProps {
  level: number;
}

const Markdown = (props: MarkdownProps) => {
  return (
    <ReactMarkdown
      // remarkPlugins={[[gfm, { singleTilde: false }]]}
      components={{
        // https://github.com/remarkjs/react-markdown#appendix-b-node-types
        h1: (props: HeadingProps) => (
          <Typography
            style={{ paddingTop: 30 - 1 * 3 }}
            variant={"h1"}
            {...props}
          />
        ),
        h2: (props: HeadingProps) => (
          <Typography
            style={{ paddingTop: 30 - 2 * 3 }}
            variant={"h2"}
            {...props}
          />
        ),
        h3: (props: HeadingProps) => (
          <Typography
            style={{ paddingTop: 30 - 3 * 3 }}
            variant={"h3"}
            {...props}
          />
        ),
        h4: (props: HeadingProps) => (
          <Typography
            style={{ paddingTop: 30 - 4 * 3 }}
            variant={"h4"}
            {...props}
          />
        ),
        h5: (props: HeadingProps) => (
          <Typography
            style={{ paddingTop: 30 - 5 * 3 }}
            variant={"h5"}
            {...props}
          />
        ),
        h6: (props: HeadingProps) => (
          <Typography
            style={{ paddingTop: 30 - 6 * 3 }}
            variant={"h6"}
            {...props}
          />
        ),
        p: (props: TypographyProps) => <Typography {...props} />,
        a: (props: LinkProps) => <Link2 {...props} />,
        // code: (props) => {
        //     return <Highlight language={props.className || "markdown"} content={"`"+props.children+"`"} />
        // }, // Using code will mess up the pre part
        pre: (props) => {
          if (props.children.length !== 1) {
            return <pre {...props}></pre>;
          }
          const firstChild = props.children.at(0);
          if (
            !React.isValidElement(firstChild) ||
            (firstChild as ReactElement).type !== "code"
          ) {
            return <pre {...props}></pre>;
          }

          const firstChildProps = (firstChild as ReactElement).props as {
            className?: string;
          };
          return (
            <Highlight
              language={
                firstChildProps?.className !== undefined
                  ? firstChildProps?.className
                  : "markdown"
              }
              content={GetInnerText(props.children)}
            />
          );
        },
      }}
    >
      {props.content}
    </ReactMarkdown>
  );
};

export default Markdown;
