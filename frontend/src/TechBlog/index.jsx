import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import ReactMarkdown from "react-markdown";
import AppBar from "../Component/AppBar";
import QuicknoteCard from "../Component/QuicknoteCard";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Snackbar from "@material-ui/core/Snackbar";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Divider from "@material-ui/core/Divider";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import MuiAlert from "@material-ui/lab/Alert";
import axios from "axios";
import { BACKEND_URL } from "../env";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
  },
}));

const backend = axios.create({
  baseURL: BACKEND_URL,
});

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function TechBlog() {
  const classes = useStyles();
  const [notesArr, setNotesArr] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSnackbarOpen, setIsSnackBarOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");

  const handleClickOpen = () => {
    setIsDialogOpen(true);
  };

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setIsSnackBarOpen(false);
  };

  const showAlert = (msg, severity) => {
    setAlertMsg(msg);
    setAlertSeverity(severity);
    setIsSnackBarOpen(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    backend
      .post("/notes", { title: noteTitle, content: noteContent })
      .then(() => {
        showAlert("Note added successfully!", "success");
        handleClose();
        fetchNotes();
      })
      .catch((error) => {
        showAlert("Something went wrong!", "error");
        handleClose();
        console.error(error);
      });
  };

  const fetchNotes = () => {
    backend.get("/notes").then((response) => setNotesArr(response.data));
  };

  const checkAdmin = () => {
    setIsAdmin(localStorage.getItem("AdminToken") === "114514");
  };

  useEffect(() => {
    // fetch notes from backend
    fetchNotes();
    checkAdmin();
  }, []);

  const cards = () => {
    return (
      <Box>
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "20px",
            marginTop: "20px",
          }}
        >
          {notesArr.map((note) => (
            <QuicknoteCard
              title={note.title}
              content={note.content}
              key={note.id}
            />
          ))}
        </Box>
        {isAdmin && (
          <Fab
            color="primary"
            aria-label="add"
            className={classes.fab}
            onClick={handleClickOpen}
          >
            <AddIcon />
          </Fab>
        )}
        <Snackbar
          open={isSnackbarOpen}
          onClose={handleSnackbarClose}
          autoHideDuration={6000}
        >
          <Alert onClose={handleClose} severity={alertSeverity}>
            {alertMsg}
          </Alert>
        </Snackbar>
        <Dialog
          open={isDialogOpen}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
          maxWidth="lg"
          fullWidth
        >
          <DialogTitle id="form-dialog-title">Add a note</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Add a new note! (Content supports markdown, drafts will be auto
              saved!)
            </DialogContentText>
            <Box style={{ display: "flex", justifyContent: "space-between" }}>
              <Paper
                className={classes.paper}
                elevation={5}
                style={{ flex: "1", marginRight: "10px" }}
              >
                <TextField
                  autoFocus
                  margin="dense"
                  id="title"
                  label="Title of the note"
                  fullWidth
                  value={noteTitle}
                  onChange={(e) => setNoteTitle(e.target.value)}
                />
                <TextField
                  id="content"
                  label="Content of the note"
                  margin="dense"
                  multiline
                  fullWidth
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                />
              </Paper>
              <Paper
                className={classes.paper}
                elevation={5}
                style={{ flex: "1", marginLeft: "10px" }}
              >
                <Typography
                  gutterBottom
                  variant="h5"
                  style={{ minHeight: "1.35em" }}
                >
                  {noteTitle}
                </Typography>
                <Divider />
                <ReactMarkdown
                  style={{
                    inlineSize: "min-content",
                    overflowWrap: "break-word",
                  }}
                >
                  {noteContent}
                </ReactMarkdown>
              </Paper>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSubmit} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  };

  return (
    <div>
      <AppBar title="Tech blog" />
      <Container>{cards()}</Container>
    </div>
  );
}
