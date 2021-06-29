import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import Grid from "@material-ui/core/Grid";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";

import { makeStyles } from "@material-ui/core/styles";
import { board_string_to_grid } from "./Sudoku-lib-test";

function Sudoku() {
  const [sudokuArr, setSudokuArr] = useState([]);

  const str =
    "23.94.67.8..3259149..76.32.1.....7925.321.4864..68.5317..1....96598721433...9...7";

  useEffect(() => {
    // Update the document title using the browser API
    setSudokuArr(board_string_to_grid(str));
  }, []);

  // Experiment
  const classes = useStyles();
  // Experiment

  return (
    <div>
      <AppBar position="static">
        <Toolbar
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6">News</Typography>
          <Button color="inherit" style={{ marginRight: "10px" }}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md">
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "20px",
          }}
        >
          <Button variant="contained" color="primary">
            解答
          </Button>
          <Button variant="contained" color="primary">
            生成
          </Button>
        </Box>
        {/* <Table >
            <TableBody>
              {sudokuArr.map((row, i) => (
                // TODO: highlighted as a prop, use highlightArr to record
                <RenderRow data={row} color={i % 2 === 0 ? "cyan" : "white"} />
              ))}
            </TableBody>
          </Table> */}
        <Grid container className={classes.root} spacing={0}>
          <Grid item xs={12}>
            {sudokuArr.map((row, i) => (
              <Grid container justify="center" spacing={0}>
                {row.map((value, j) => (
                  <Grid key={value} item>
                    <Box
                      className={classes.paper}
                      borderLeft={j === 0 ? 3 : 1}
                      borderRight={j === 8 ? 3 : 1}
                      borderTop={i === 0 ? 3 : 1}
                      borderBottom={i === 8 ? 3 : 1}
                    >
                      {value}
                    </Box>
                  </Grid>
                ))}
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "5vh",
    flexGrow: 1,
  },
  paper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      fontSize: "15px",
      height: "8vw",
      width: "8vw",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "25px",
      height: "60px",
      width: "60px",
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "30px",
      height: "80px",
      width: "80px",
    },
  },
}));

const RenderRow = (props) => {
  const { cell } = tableCellStyling(props);
  return (
    <TableRow>
      {props.data.map((col, i) => (
        <TableCell className={cell}>{col}</TableCell>
      ))}
    </TableRow>
  );
};

const tableCellStyling = makeStyles(() => ({
  cell: {
    textAlign: "center",
    fontSize: "30px",
    border: "2px solid black",
    borderRadius: "5px",
    backgroundColor: ({ color }) => color,
  },
}));

export default Sudoku;
