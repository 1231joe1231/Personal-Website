import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Drawer from "@material-ui/core/Drawer";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import HomeIcon from "@material-ui/icons/Home";
import DescriptionIcon from "@material-ui/icons/Description";
import ToysIcon from "@material-ui/icons/Toys";
import Link from "@material-ui/core/Link";
import * as PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
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
  const [isOpen, setIsOpen] = React.useState(false);

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
              Pages
            </ListSubheader>
          }
        >
          <ListItem button component={Link} href="/" underline="none">
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button component={Link} href="/techblog" underline="none">
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Tech blog" />
          </ListItem>
          <ListItem button component={Link} href="/sudoku" underline="none">
            <ListItemIcon>
              <ToysIcon />
            </ListItemIcon>
            <ListItemText primary="Sudoku!" />
          </ListItem>
          <ListItem
            button
            component={Link}
            href="/coverletter"
            underline="none"
          >
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
