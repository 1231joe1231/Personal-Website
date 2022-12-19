/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from "react";
import AppBar from "../Component/AppBar";
import ImageCarousel from "../Component/ImageCarousel";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
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
    <div style={{ height: "100vh", backgroundColor: "#F5F5F5" }}>
      <AppBar title="Home" />
      <Container
        maxWidth="90vw"
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Grid container spacing={5} sx={{ margin: "0px" }}>
          <Grid
            container
            xl={4}
            md={6}
            xs={12}
            sx={{ flexDirection: "column" }}
          >
            <Grid xs={12}>
              <Typography variant="h5" sx={{ marginBottom: "20px" }}>
                About me
              </Typography>
              <Paper elevation={3}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    padding: "20px",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Avatar
                    sx={{ width: "15vh", height: "15vh" }}
                    src="/public/avatar.jpg"
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      marginLeft: "20px",
                    }}
                  >
                    <Typography sx={{ fontSize: 30 }}>
                      Hello, I'm Ruixin(Joe) Zhuang
                    </Typography>
                    <List
                      dense
                      sx={{
                        listStyleType: "disc",
                        pl: 2,
                        "& .MuiListItem-root": {
                          display: "list-item",
                        },
                      }}
                    >
                      <ListItem dense alignItems="flex-start">
                        <Typography>
                          👋 Hi, I'm Ruixin(Joe) Zhuang, a recent graduate from
                          Computer Science program at University of Toronto
                          Scarborough
                        </Typography>
                      </ListItem>
                      <ListItem dense alignItems="flex-start">
                        <Typography>
                          👀 I’m interested in coding, photography, films,
                          camping, guitar
                        </Typography>
                      </ListItem>
                      <ListItem dense alignItems="flex-start">
                        <Typography>
                          🌱 I’m currently learning Node.js, DevOps, React
                        </Typography>
                      </ListItem>
                      <ListItem dense alignItems="flex-start">
                        <Typography>
                          📬 How to reach me: Click the link below!
                        </Typography>
                      </ListItem>
                    </List>
                    <div
                      style={{
                        display: "flex",
                        marginTop: "10px",
                        justifyContent: "space-around",
                      }}
                    >
                      <Button
                        variant="contained"
                        href="https://www.linkedin.com/in/ruixin-zhuang/"
                        sx={{ textTransform: "none" }}
                      >
                        LinkedIn
                      </Button>
                      <Button
                        variant="contained"
                        href="https://github.com/1231joe1231"
                        sx={{ textTransform: "none" }}
                      >
                        Github
                      </Button>
                      <Button
                        variant="contained"
                        href="https://space.bilibili.com/8190716"
                        sx={{ textTransform: "none" }}
                      >
                        Bilibili
                      </Button>
                      <Button
                        variant="contained"
                        href="public/Resume.pdf"
                        sx={{ textTransform: "none" }}
                      >
                        Resume
                      </Button>
                    </div>
                  </div>
                </div>
              </Paper>
            </Grid>
            <Grid xs={12}>
              <Typography variant="h5" sx={{ marginBottom: "20px" }}>
                Recent photography works
              </Typography>
              <ImageCarousel />
            </Grid>
          </Grid>
          <Grid container xl={8} md={6} xs={12}>
            <Grid xl={6} md={12} xs={12}>
              <Typography variant="h5" sx={{ marginBottom: "20px" }}>
                Recent quick notes
              </Typography>
              <Paper elevation={3}>
                <Container
                  sx={{
                    padding: "20px",
                  }}
                >
                  <List
                    sx={{
                      height: "75vh",
                      overflow: "auto",
                      scrollbarWidth: "thin",
                      "&::-webkit-scrollbar": {
                        width: "0.4em",
                      },
                      "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "#888",
                      },
                      "&::-webkit-scrollbar-thumb:hover": {
                        background: "#555",
                      },
                    }}
                  >
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
              <Typography variant="h5" sx={{ marginBottom: "20px" }}>
                Recent articles
              </Typography>
              <Paper elevation={3}>
                <Container
                  sx={{
                    padding: "20px",
                  }}
                >
                  <List
                    sx={{
                      height: "75vh",
                      overflow: "auto",
                      scrollbarWidth: "thin",
                      "&::-webkit-scrollbar": {
                        width: "0.4em",
                      },
                      "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "#888",
                      },
                      "&::-webkit-scrollbar-thumb:hover": {
                        background: "#555",
                      },
                    }}
                  >
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
