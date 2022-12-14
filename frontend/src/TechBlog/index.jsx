import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "../Component/AppBar";
import QuicknoteCard from "../Component/QuicknoteCard";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";
import { BACKEND_URL } from "../env";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const backend = axios.create({
  baseURL: BACKEND_URL,
});

export default function TechBlog() {
  const classes = useStyles();
  const [notesArr, setNotesArr] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleClickOpen = () => {
    setIsDialogOpen(true);
  };

  const handleClose = () => {
    setIsDialogOpen(false);
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
        <Dialog
          open={isDialogOpen}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add a note</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleClose} color="primary">
              Subscribe
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
