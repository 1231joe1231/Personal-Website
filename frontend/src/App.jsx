import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Sudoku from "./Sudoku/Sudoku";
import CoverLetter from "./CoverLetterGenerator";
import PageNotFound from "./NotFound";
import Home from "./Home";
import TechBlog from "./TechBlog";
import Article from "./TechBlog/article.jsx";
import Gallery from "./Gallery";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/techblog">
          <TechBlog />
        </Route>
        <Route path="/gallery">
          <Gallery />
        </Route>
        <Route path="/sudoku">
          <Sudoku />
        </Route>
        <Route path="/coverletter">
          <CoverLetter />
        </Route>
        <Route path="/article/:id">
          <Article />
        </Route>
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
    </Router>
  );
}
