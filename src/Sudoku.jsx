import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";

import Grid from "@material-ui/core/Grid";

import { makeStyles } from "@material-ui/core/styles";
import { sudokuLibConstructor } from "./Sudoku-lib";

function Sudoku() {
  const [sudokuArr, setSudokuArr] = useState([]);
  const [difficulty, setDifficulty] = useState("medium");
  var sudokuLib = null;

  const sudokuLibGetter = () => {
    var obj = {}
    sudokuLibConstructor(obj)
    return obj.sudoku
  }

  useEffect(() => {
    // initialize sudokuLib
    generateSudoku()
  }, []);

  const generateSudoku = () => {
    sudokuLib = sudokuLibGetter()
    var str = sudokuLib.generate(difficulty)
    setSudokuArr(sudokuLib.board_string_to_grid(str))
  }

  const solveSudoku = () => {
    sudokuLib = sudokuLibGetter()
    var cur = sudokuLib.board_grid_to_string(sudokuArr)
    var answer = sudokuLib.solve(cur)
    setSudokuArr(sudokuLib.board_string_to_grid(answer))
  }

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
          <Typography variant="h6">Sudoku!</Typography>
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
          <Button variant="contained" color="primary" onClick={solveSudoku}>
            解答
          </Button>
          <Button variant="contained" color="primary" onClick={generateSudoku}>
            生成
          </Button>
        </Box>
        <Grid container className={classes.root} spacing={0}>
          <Grid item xs={12}>
            {sudokuArr.map((row, i) => (
              <Grid container justify="center" spacing={0} key={i}>
                {row.map((value, j) => (
                  <Grid key={j} item>
                    {/* TODO: highlighted as a prop, use highlightArr to record */}
                    <Box
                      onClick={()=>{console.log("Current index is " + i + ", " + j)}}
                      className={classes.input}
                      borderLeft={j === 0 ? 4 : 
                                  j === 3 || j === 6 ? 2 : 1}
                      borderRight={j === 8 ? 4 : 
                                  j === 2 || j === 5 ? 2 : 1}
                      borderTop={i === 0 ? 4 : 
                                  i === 3 || i === 6 ? 2 : 1}
                      borderBottom={i === 8 ? 4 : 
                                  i === 2 || i === 5 ? 2 : 1}
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
    flexGrow: 1,
  },
  input: {
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
      fontSize: "25px",
      height: "60px",
      width: "60px",
    },
  },
}));

// const RenderRow = (props) => {
//   const { cell } = tableCellStyling(props);
//   return (
//     <TableRow>
//       {props.data.map((col, i) => (
//         <TableCell className={cell}>{col}</TableCell>
//       ))}
//     </TableRow>
//   );
// };

// const tableCellStyling = makeStyles(() => ({
//   cell: {
//     textAlign: "center",
//     fontSize: "30px",
//     border: "2px solid black",
//     borderRadius: "5px",
//     backgroundColor: ({ color }) => color,
//   },
// }));

export default Sudoku;
