/* eslint-disable react/no-unescaped-entities */
import React from "react";
import AppBar from "../Component/AppBar";
import ImageCarousel from "../Component/ImageCarousel";

export default function Home() {
  return (
    <div>
      <AppBar title="Home" />
      <h1>This is the homepage of Joe zhuang's personal website</h1>
      <ImageCarousel />
    </div>
  );
}
