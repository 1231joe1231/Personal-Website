import React, { useState, useEffect } from "react";
import AppBar from "../Component/AppBar";
import { useParams } from "react-router-dom";
import axios from "axios";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

const backend = axios.create({
  // always upload image to server
  baseURL: "https://joe-zhuang.com/api",
});

export default function Image() {
  let { id } = useParams();
  const [image, setImage] = useState(null);

  const fetchImage = () => {
    backend.get("/images", { params: { id } }).then((response) => {
      setImage(response.data);
    });
  };

  useEffect(() => {
    // fetch note from backend
    fetchImage();
  }, []);

  return (
    <div>
      <AppBar title="Image" />
      {image && (
        <div>
          <Container>
            <Box>
              <img
                src={`${image.path}`}
                srcSet={`${image.path}`}
                alt={image.title}
                loading="lazy"
                onClick={() => window.open(image.path, "_blank")}
                style={{ width: "100%", height: "100%" }}
              />
            </Box>
          </Container>
        </div>
      )}
    </div>
  );
}
