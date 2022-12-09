import React from "react";
import AppBar from "../Component/AppBar";
import QuicknoteCard from "../Component/QuicknoteCard";
// import ReactMarkdown from 'react-markdown'
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";

export default function TechBlog() {
  return (
    <div>
      <AppBar title="Tech blog" />
      {/* <h1>This is the techblog of Joe zhuang's personal website</h1>
            <ReactMarkdown># The First Note</ReactMarkdown>
            <ReactMarkdown>## The First Note</ReactMarkdown>
            <ReactMarkdown>### The First Note</ReactMarkdown>
            <ReactMarkdown>_Another note_</ReactMarkdown>
            <ReactMarkdown>Visit [this page](https://www.digitalocean.com/community/tutorials) for more tutorials.</ReactMarkdown> */}
      <Container>
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "20px",
            marginTop: "20px",
          }}
        >
          <QuicknoteCard
            title="lorem"
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor in"
          />
          <QuicknoteCard
            title="lorem"
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor in"
          />
          <QuicknoteCard
            title="lorem"
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor in"
          />
        </Box>
      </Container>
    </div>
  );
}
