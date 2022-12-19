import React, { useState, useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import LinearProgress from "@mui/material/LinearProgress";
import axios from "axios";

const backend = axios.create({
  // always get image from server
  baseURL: "https://joe-zhuang.com/api",
});

export default function ImageCarousel() {
  // const [progress, setProgress] = React.useState(0);
  const [imageArr, setImageArr] = useState([]);

  const fetchImages = () => {
    backend
      .get("/images/recent", { params: { count: 5 } })
      .then((response) => setImageArr(response.data));
  };

  useEffect(() => {
    // fetch notes from backend
    fetchImages();
  }, []);

  return (
    <Carousel
      fullHeightHover={false}
      navButtonsWrapperProps={{
        // Move the buttons to the bottom. Unsetting top here to override default style.
        style: {
          bottom: "20vh",
        },
      }}
      NextIcon={<ChevronRightIcon fontSize="large" />}
      PrevIcon={<ChevronLeftIcon fontSize="large" />}
    >
      {imageArr.map((item) => (
        <ImageListItem key={item.id}>
          <img
            src={item.path}
            alt={item.title}
            loading="lazy"
            style={{ height: "40vh", width: "100%", objectFit: "cover" }}
          />
          {/* <LinearProgress
            variant="determinate"
            style={{
              position: "absolute",
              bottom: 10,
              left: 0,
              right: 0,
              height: "4px",
            }}
          /> */}
          <ImageListItemBar
            sx={{
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
                "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
            }}
            title={item.title}
            position="top"
          />
        </ImageListItem>
      ))}
    </Carousel>
  );
}
