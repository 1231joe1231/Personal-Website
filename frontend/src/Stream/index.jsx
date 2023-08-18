import React, { useState } from "react";
import AppBar from "../Component/AppBar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import VideoJS from "./VideoJS";

function Stream() {
  const [videoSrc, setVideoSrc] = useState("");
  const [input, setInput] = useState("");
  const playerRef = React.useRef(null);

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    height: "720px",
    width: "1280px",
    sources: [
      {
        src: videoSrc,
        type: "application/x-mpegURL",
      },
    ],
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;
  };

  return (
    <div>
      <AppBar title="Stream" />
      <Container maxWidth="sm">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "20px",
          }}
        >
          <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              margin: "20px",
            }}
          >
            <TextField
              id="standard-basic"
              label="Stream url"
              variant="standard"
              onChange={(event) => {
                setInput(event.target.value);
              }}
              sx={{ marginRight: "20px" }}
            />
            <Button
              variant="contained"
              size="large"
              onClick={() => {
                setVideoSrc("https://joe-zhuang.com/hls/" + input + ".m3u8");
              }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default Stream;
