import React, { useState, useEffect } from "react";
import AppBar from "../Component/AppBar";
import QuicknoteCard from "../Component/QuicknoteCard";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import axios from "axios";

const backend = axios.create({
  baseURL: "http://localhost:5000",
});

export default function TechBlog() {
  const [notesArr, setNotesArr] = useState([]);

  const fetchNotes = () => {
    backend.get("/notes").then((response) => setNotesArr(response.data));
  };

  useEffect(() => {
    // fetch notes from backend
    fetchNotes();
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
