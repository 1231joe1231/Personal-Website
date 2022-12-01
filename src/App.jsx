import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Sudoku from "./Sudoku/Sudoku";
import CoverLetter from "./CoverLetterGenerator";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Sudoku />
        </Route>
        <Route path="/coverletter">
          <CoverLetter />
        </Route>
      </Switch>
    </Router>
  );
}
