import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import Paper from "@mui/material/Paper";
// import ReactMarkdown from "react-markdown";
import MarkdownRender from "../Component/MarkdownRender";
import AppBar from "../Component/AppBar";
import QuicknoteCard from "../Component/QuicknoteCard";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Divider from "@mui/material/Divider";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import MuiAlert from "@mui/material/Alert";
import Masonry from "@mui/lab/Masonry";
import axios from "axios";
import { BACKEND_URL } from "../env";

const useStyles = makeStyles(() => ({
  paper: {
    padding: 20,
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
        setNoteContent("");
        setNoteTitle("");
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

  return (
    <div>
      <AppBar title="Tech blog" />
      <Container>
        <Box>
          <Masonry columns={4} spacing={2} style={{ marginTop: "10px" }}>
            {notesArr.map((note) => (
              <QuicknoteCard
                title={note.title}
                content={note.content}
                key={note.id}
              />
            ))}
          </Masonry>
          {isAdmin && (
            <Fab
              color="primary"
              aria-label="add"
              onClick={handleClickOpen}
              style={{ position: "absolute", right: "20px", bottom: "20px" }}
            >
              <AddIcon />
            </Fab>
          )}
          <Snackbar
            anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
            open={isSnackbarOpen}
            onClose={handleSnackbarClose}
            autoHideDuration={6000}
          >
            <div>
              <Alert onClose={handleClose} severity={alertSeverity}>
                {alertMsg}
              </Alert>
            </div>
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
              <Box
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "10px",
                }}
              >
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
                  <MarkdownRender input={noteContent} />
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
      </Container>
    </div>
  );
}
