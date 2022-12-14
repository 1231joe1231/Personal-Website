import React, { useState, useEffect } from "react";
import AppBar from "../Component/AppBar";
import QuicknoteCard from "../Component/QuicknoteCard";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import axios from "axios";
import { BACKEND_URL } from "../env";

const backend = axios.create({
  baseURL: BACKEND_URL,
});

export default function TechBlog() {
  const [notesArr, setNotesArr] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

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
        {isAdmin && (
          <Fab color="primary" aria-label="add">
            <AddIcon />
          </Fab>
        )}
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
