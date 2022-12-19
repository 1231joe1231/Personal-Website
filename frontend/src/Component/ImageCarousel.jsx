import React from "react";
import Carousel from "react-material-ui-carousel";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LinearProgress from "@mui/material/LinearProgress";

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
    author: "@bkristastucchio",
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
    author: "@rollelflex_graphy726",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
    author: "@helloimnik",
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
    author: "@nolanissac",
  },
  {
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
    author: "@hjrc33",
  },
  {
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
    author: "@arwinneil",
  },
  {
    img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    title: "Basketball",
    author: "@tjdragotta",
  },
  {
    img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "Fern",
    author: "@katie_wasserman",
  },
  {
    img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    title: "Mushrooms",
    author: "@silverdalex",
  },
  {
    img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    title: "Tomato basil",
    author: "@shelleypauls",
  },
  {
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    title: "Sea star",
    author: "@peterlaster",
  },
  {
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "Bike",
    author: "@southside_customs",
  },
];

export default function ImageCarousel() {
  // const [progress, setProgress] = React.useState(0);

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
      {itemData.map((item) => (
        <ImageListItem key={item.img}>
          <img
            src={item.img}
            alt={item.title}
            loading="lazy"
            style={{ height: "40vh", width: "100%", objectFit: "cover" }}
          />
          <LinearProgress
            variant="determinate"
            style={{
              position: "absolute",
              bottom: 10,
              left: 0,
              right: 0,
              height: "4px",
            }}
          />
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
