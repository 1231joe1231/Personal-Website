import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Sudoku from "./Sudoku/Sudoku";
import CoverLetter from "./CoverLetterGenerator";
import PageNotFound from "./NotFound";
import Home from "./Home";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/sudoku">
          <Sudoku />
        </Route>
        <Route path="/coverletter">
          <CoverLetter />
        </Route>
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
    </Router>
  );
}
