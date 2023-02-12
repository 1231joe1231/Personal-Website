import React from "react";
import AppBar from "../Component/AppBar";
import { useParams } from "react-router-dom";

export default function Article() {
  let { id } = useParams();
  return (
    <div>
      <AppBar title="Article" />
      <div>
        <h3>ID: {id}</h3>
      </div>
    </div>
  );
}
