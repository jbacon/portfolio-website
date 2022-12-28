import React from "react";
import { ReactElement } from "react-markdown/lib/react-markdown";

// Get inner text content from a React.ReactNode & React.ReactNode[]
function GetInnerText(
  reactNode:
    | (React.ReactNode & React.ReactNode[])
    | React.ReactNode
    | React.ReactNode[]
): string {
  if (!reactNode) {
    return "";
  }
  if (typeof reactNode === "string") {
    return reactNode;
  }
  if (React.isValidElement(reactNode)) {
    const reactElement = reactNode as ReactElement;
    const props = reactElement.props as {
      children?: React.ReactNode & React.ReactNode[];
    };
    if (props.children) {
      return GetInnerText(props.children);
    }
  }

  if (Array.isArray(reactNode)) {
    return reactNode.map((r) => GetInnerText(r)).join("");
  }

  return "";
}

export { GetInnerText };
