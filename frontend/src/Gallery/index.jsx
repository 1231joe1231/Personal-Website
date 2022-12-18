import React, { useState, useEffect } from "react";
import axios from "axios";
import AppBar from "../Component/AppBar";
import Container from "@mui/material/Container";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Snackbar from "@mui/material/Snackbar";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import MuiAlert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

const backend = axios.create({
  // always upload image to server
  baseURL: "https://joe-zhuang.com/api",
});

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Gallery() {
  const [imageArr, setImageArr] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSnackbarOpen, setIsSnackBarOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");
  const [imageTitle, setimageTitle] = useState("");
  const [imageSourec, setImageSource] = useState("");

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
      .post("/images", { title: imageTitle, image: imageSourec })
      .then(() => {
        showAlert("Image added successfully!", "success");
        handleClose();
        setimageTitle("");
        setImageSource("");
        fetchImages();
      })
      .catch((error) => {
        showAlert("Something went wrong!", "error");
        handleClose();
        console.error(error);
      });
  };

  const fetchImages = () => {
    backend.get("/images").then((response) => setImageArr(response.data));
  };

  const checkAdmin = () => {
    setIsAdmin(localStorage.getItem("AdminToken") === "114514");
  };

  useEffect(() => {
    // fetch notes from backend
    fetchImages();
    checkAdmin();
  }, []);

  return (
    <div>
      <AppBar title="Gallery" />
      <Container>
        <Box>
          <ImageList variant="masonry" cols={3} gap={8}>
            {imageArr.map((item) => (
              <ImageListItem key={item.path}>
                <img
                  src={`${item.path}?w=248&fit=crop&auto=format`}
                  srcSet={`${item.path}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.title}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
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
      </Container>
    </div>
  );
}
