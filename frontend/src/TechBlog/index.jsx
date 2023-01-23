import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import Paper from "@mui/material/Paper";
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
import DialogTitle from "@mui/material/DialogTitle";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import MuiAlert from "@mui/material/Alert";
import Masonry from "@mui/lab/Masonry";
import axios from "axios";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
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
  const [noteType, setNoteType] = useState("0");

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

  /* eslint-disable no-unused-vars */
  const handleEditorChange = ({ _, text }) => {
    setNoteContent(text);
  };
  /* eslint-enable no-unused-vars */

  const showAlert = (msg, severity) => {
    setAlertMsg(msg);
    setAlertSeverity(severity);
    setIsSnackBarOpen(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    backend
      .post("/notes", {
        title: noteTitle,
        content: noteContent,
        type: noteType,
      })
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
    // setIsAdmin(localStorage.getItem("AdminToken") === "114514");
    setIsAdmin(true);
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
            fullScreen={noteType == "1"}
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
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      value="0"
                      control={<Radio />}
                      label="Note"
                      checked={noteType === "0"}
                      onChange={(e) => setNoteType(e.target.value)}
                    />
                    <FormControlLabel
                      value="1"
                      control={<Radio />}
                      label="Article"
                      checked={noteType === "1"}
                      onChange={(e) => setNoteType(e.target.value)}
                    />
                  </RadioGroup>
                  <TextField
                    autoFocus
                    margin="normal"
                    id="title"
                    label="Title of the note"
                    fullWidth
                    value={noteTitle}
                    onChange={(e) => setNoteTitle(e.target.value)}
                  />
                  <MdEditor
                    style={{
                      marginTop: "10px",
                      height: noteType === "0" ? "20vh" : "65vh",
                      width: "100%",
                    }}
                    renderHTML={(text) => {
                      return <MarkdownRender input={text} />;
                    }}
                    onChange={handleEditorChange}
                  />
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
