import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import * as PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import ReactMarkdown from "react-markdown";
// import MuiMarkdown from "mui-markdown";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

QuicknoteCard.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default function QuicknoteCard(props) {
  const classes = useStyles();

  return (
    <Paper
      className={classes.root}
      elevation={3}
      style={{ padding: "20px", borderRadius: "5px" }}
    >
      <Typography gutterBottom variant="h5" component="h2">
        {props.title}
      </Typography>
      <Divider variant="fullWidth" />
      <ReactMarkdown>{props.content}</ReactMarkdown>
    </Paper>
  );
}
