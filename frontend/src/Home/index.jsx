/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from "react";
import AppBar from "../Component/AppBar";
import ImageCarousel from "../Component/ImageCarousel";
// import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import QuicknoteCard from "../Component/QuicknoteCard";
import axios from "axios";
import { BACKEND_URL } from "../env";

const backend = axios.create({
  baseURL: BACKEND_URL,
});

export default function Home() {
  const [notesArr, setNotesArr] = useState([]);

  const fetchNotes = () => {
    backend.get("/notes").then((response) => setNotesArr(response.data));
  };

  useEffect(() => {
    // fetch notes from backend
    fetchNotes();
  }, []);

  return (
    <div>
      <AppBar title="Home" />
      <Container maxWidth="90vw" sx={{ height: "95vh" }}>
        <Grid container spacing={5} sx={{ padding: "20px" }}>
          <Grid
            container
            xl={4}
            md={6}
            xs={12}
            sx={{ flexDirection: "column" }}
          >
            <Grid xs={12}>self intro</Grid>
            <Grid xs={12}>
              <ImageCarousel />
            </Grid>
          </Grid>
          <Grid container xl={8} md={6} xs={12}>
            <Grid xl={6} md={12} xs={12}>
              <Paper elevation={3}>
                <Container
                  sx={{
                    padding: "20px",
                  }}
                >
                  <Typography variant="h5">Recent quick notes</Typography>
                  <List sx={{ height: "80vh", overflow: "wrap" }}>
                    {notesArr.map((note) => (
                      <ListItem key={note.id}>
                        <QuicknoteCard
                          title={note.title}
                          content={note.content}
                          key={note.id}
                          width="100%"
                          alignItems="flex-start"
                        />
                      </ListItem>
                    ))}
                  </List>
                </Container>
              </Paper>
            </Grid>
            <Grid xl={6} md={12} xs={12}>
              <Paper elevation={3}>
                <Container
                  sx={{
                    padding: "20px",
                  }}
                >
                  <Typography variant="h5">Recent quick notes</Typography>
                  <List sx={{ height: "80vh", overflow: "auto" }}>
                    {notesArr.map((note) => (
                      <ListItem key={note.id}>
                        <QuicknoteCard
                          title={note.title}
                          content={note.content}
                          key={note.id}
                          width="100%"
                        />
                      </ListItem>
                    ))}
                  </List>
                </Container>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
