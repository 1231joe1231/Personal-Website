import React, { useState, useEffect } from "react";
import AppBar from "../Component/AppBar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import SpeedIcon from "@mui/icons-material/Speed";
import Grid from "@mui/material/Grid";

import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import { sudokuLibConstructor } from "./Sudoku-lib";

function Sudoku() {
  const [sudokuArr, setSudokuArr] = useState([]);
  const [difficulty, setDifficulty] = useState(55);
  const [sudokuStr, setSudokuStr] = useState("");
  // const [candidateShowed, setCandidateShowed] = useState(true);
  var sudokuLib = null;

  const sudokuLibGetter = () => {
    var obj = {};
    sudokuLibConstructor(obj);
    return obj.sudoku;
  };

  const generateSudoku = () => {
    sudokuLib = sudokuLibGetter();
    var str = sudokuLib.generate(81 - difficulty);
    setSudokuStr(str);
    setSudokuArr(sudokuLib.board_string_to_grid(str));
  };

  useEffect(() => {
    // initialize sudokuLib
    generateSudoku();
  }, []);

  const solveSudoku = () => {
    sudokuLib = sudokuLibGetter();
    setSudokuArr(sudokuLib.dlx_solve(sudokuStr));
  };

  const handleChange = (event, newValue) => {
    setDifficulty(newValue);
  };

  // const showCandidate = () => {
  //   sudokuLib = sudokuLibGetter();
  //   if (candidateShowed) {
  //     var answer = sudokuLib.get_candidates(sudokuStr);
  //     setSudokuArr(answer);
  //   } else {
  //     setSudokuArr(sudokuLib.board_string_to_grid(sudokuStr));
  //   }
  //   setCandidateShowed(!candidateShowed);
  // };

  // const handleDifficulty = (event) => {
  //   setDifficulty(event.target.value);
  //   console.log(difficulty);
  // };

  // Experiment
  const classes = useStyles();
  // Experiment

  return (
    <div>
      <AppBar title="Sudoku!" />
      <Container maxWidth="md">
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "20px",
            marginTop: "20px",
          }}
        >
          <Button variant="contained" color="primary" onClick={solveSudoku}>
            解答
          </Button>
          <Grid
            container
            spacing={2}
            alignItems="center"
            alignContent="center"
            justifyContent="center"
          >
            <Grid item>
              <SpeedIcon style={{ transform: "rotateY(180deg)" }} />
            </Grid>
            <Grid item className={classes.slider}>
              <Slider
                value={difficulty}
                onChange={handleChange}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="on"
                min={45}
                max={60}
              />
            </Grid>
            <Grid item>
              <SpeedIcon />
            </Grid>
          </Grid>
          <Button variant="contained" color="primary" onClick={generateSudoku}>
            生成
          </Button>
        </Box>
        <Grid container className={classes.root} spacing={0}>
          <Grid item xs={12}>
            {sudokuArr.map((row, i) => (
              <Grid container justifyContent="center" spacing={0} key={i}>
                {row.map((value, j) => (
                  <Grid key={j} item>
                    {/* TODO: highlighted as a prop, use highlightArr to record */}
                    <Box
                      onClick={() => {
                        console.log("Current index is " + i + ", " + j);
                      }}
                      className={classes.input}
                      borderLeft={j === 0 ? 4 : j === 3 || j === 6 ? 2 : 1}
                      borderRight={j === 8 ? 4 : j === 2 || j === 5 ? 2 : 1}
                      borderTop={i === 0 ? 4 : i === 3 || i === 6 ? 2 : 1}
                      borderBottom={i === 8 ? 4 : i === 2 || i === 5 ? 2 : 1}
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

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  input: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    wordWrap: "break-word",
    [useTheme().breakpoints.down("md")]: {
      fontSize: "15px",
      height: "8vw",
      width: "8vw",
    },
    [useTheme().breakpoints.up("md")]: {
      fontSize: "25px",
      height: "60px",
      width: "60px",
    },
    [useTheme().breakpoints.up("lg")]: {
      fontSize: "25px",
      height: "60px",
      width: "60px",
    },
  },
  slider: {
    [useTheme().breakpoints.down("md")]: {
      width: "200px",
    },
    [useTheme().breakpoints.up("sm")]: {
      width: "300px",
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
