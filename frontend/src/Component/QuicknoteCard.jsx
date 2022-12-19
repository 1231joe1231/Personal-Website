import React from "react";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import * as PropTypes from "prop-types";
import Paper from "@mui/material/Paper";
import ReactMarkdown from "react-markdown";

QuicknoteCard.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  width: PropTypes.string,
  alignItems: PropTypes.string,
};

QuicknoteCard.defaultProps = {
  width: "auto",
  alignItems: "center",
};

export default function QuicknoteCard(props) {
  const paperStyle = {
    paddingLeft: "20px",
    paddingRight: "20px",
    borderRadius: "5px",
    width: props.width,
    display: "flex",
    flexDirection: "column",
    alignItems: props.alignItems,
    // borderTopStyle: "solid",
    // borderTopWidth: "4px",
    // borderColor: "blue",
  };
  return (
    <Paper elevation={3} sx={paperStyle}>
      <Typography variant="h5" sx={{ marginTop: "5px", marginBottom: "5px" }}>
        {props.title}
      </Typography>
      <Divider variant="fullWidth" flexItem />
      <ReactMarkdown>{props.content}</ReactMarkdown>
    </Paper>
  );
}
