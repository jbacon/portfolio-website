import React from "react";
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-json';

interface HighlighterProps {
  content: string;
  language: string;
}

export default function Highlight(props: HighlighterProps): JSX.Element {

  const language = props.language.trim().replace("language-", "").replace("lang-", "")

  const highlighted = Prism.highlight(props.content, Prism.languages[language], language)

  return <pre style={{ overflowX: "scroll", backgroundColor: "rgba(244, 247, 250)"}}>
    <code dangerouslySetInnerHTML={{ __html: highlighted }} />
  </pre>
}