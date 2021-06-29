import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

class Sudoku extends React.Component {
  render() {
    return (
      <div>
        <AppBar position="static">
          <Toolbar  style={{
              display: "flex",
              justifyContent: "space-between"
            }}>
            <Typography variant="h6">
              News
            </Typography>
            <Button color="inherit" style={{marginRight: "10px"}}>Login</Button>
          </Toolbar>
        </AppBar>
        <Container maxWidth="lg">
          <Box style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "20px"
          }}>
            <Button variant="contained" color="primary">
              解答
            </Button>
            <Button variant="contained" color="primary">
              生成
            </Button>
          </Box>
        </Container>
      </div>
    );
  }
}

export default Sudoku;
