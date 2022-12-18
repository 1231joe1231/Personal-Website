import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Drawer from "@mui/material/Drawer";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemIcon from "@mui/material/ListItemIcon";
import CollectionsIcon from "@mui/icons-material/Collections";
import HomeIcon from "@mui/icons-material/Home";
import DescriptionIcon from "@mui/icons-material/Description";
import ToysIcon from "@mui/icons-material/Toys";
import NoteIcon from "@mui/icons-material/Note";
import Link from "@mui/material/Link";
import * as PropTypes from "prop-types";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: 20,
  },
  title: {
    flexGrow: 1,
  },
  list: {
    width: 250,
  },
}));

ButtonAppBar.propTypes = {
  title: PropTypes.string.isRequired,
};

export default function ButtonAppBar(props) {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            size="large"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {props.title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor={"left"}
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <List
          className={classes.list}
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Welcome to my site!
            </ListSubheader>
          }
        >
          <ListItem component={Link} href="/" underline="none">
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem component={Link} href="/techblog" underline="none">
            <ListItemIcon>
              <NoteIcon />
            </ListItemIcon>
            <ListItemText primary="Tech blog" />
          </ListItem>
          <ListItem component={Link} href="/gallery" underline="none">
            <ListItemIcon>
              <CollectionsIcon />
            </ListItemIcon>
            <ListItemText primary="Gallery" />
          </ListItem>
          <ListItem component={Link} href="/sudoku" underline="none">
            <ListItemIcon>
              <ToysIcon />
            </ListItemIcon>
            <ListItemText primary="Sudoku!" />
          </ListItem>
          <ListItem component={Link} href="/coverletter" underline="none">
            <ListItemIcon>
              <DescriptionIcon />
            </ListItemIcon>
            <ListItemText primary="Cover letter" />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
}
