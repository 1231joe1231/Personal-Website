import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

function CoverLetter() {
  return (
    <div>
      <AppBar position="static">
        <Toolbar
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h5">Cover letter!</Typography>
        </Toolbar>
      </AppBar>
      <div>
        test!!!!!!!!!!!!!!
      </div>
    </div>
  );
}
export default CoverLetter;