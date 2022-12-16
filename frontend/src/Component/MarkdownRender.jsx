import React from "react";
import ReactMarkdown from "react-markdown";
import * as PropTypes from "prop-types";

MarkdownRender.propTypes = {
  input: PropTypes.string.isRequired,
};

export default function MarkdownRender(props) {
  const CustomImg = {
    //This custom renderer changes how images are rendered
    //we use it to constrain the max width of an image to its container
    img: ({ ...props }) => <img {...props} style={{ maxWidth: "80%" }} />,
  };
  return <ReactMarkdown components={CustomImg}>{props.input}</ReactMarkdown>;
}
