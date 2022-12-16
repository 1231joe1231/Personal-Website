import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Button } from "@mui/material";

export default function ImageCarousel() {
  var items = [
    {
      name: "Random Name #1",
      description: "Probably the most random thing you have ever seen!",
    },
    {
      name: "Random Name #2",
      description: "Hello World!",
    },
  ];

  const CarouselItem = (item) => {
    return (
      <Paper>
        <h2>{item.name}</h2>
        <p>{item.description}</p>

        <Button className="CheckButton">Check it out!</Button>
      </Paper>
    );
  };

  return (
    <Carousel>
      {items.map((item, i) => (
        <CarouselItem key={i} item={item} />
      ))}
    </Carousel>
  );
}
