import React, { useState, useEffect } from "react";
import AppBar from "../Component/AppBar";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../env";
import axios from "axios";

const backend = axios.create({
  baseURL: BACKEND_URL,
});

export default function Article() {
  let { id } = useParams();
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");

  const fetchNote = () => {
    backend.get("/notes", { params: { id } }).then((response) => {
      setNoteTitle(response.data["title"]);
      setNoteContent(response.data["content"]);
    });
  };

  useEffect(() => {
    // fetch note from backend
    fetchNote();
  }, []);
  return (
    <div>
      <AppBar title="Article" />
      <div>
        <h3>{noteTitle}</h3>
        <h5>{noteContent}</h5>
      </div>
    </div>
  );
}
