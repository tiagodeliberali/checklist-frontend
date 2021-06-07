import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./App.css";
import Summary from "./summary/Summary";
import IssueSummary from "./summary/IssueSummary";
import Grade from "./service/Grade";
import AddService from "./service/AddService";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Drawer from "@material-ui/core/Drawer";
import Fab from "@material-ui/core/Fab";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import BookmarksIcon from "@material-ui/icons/Bookmarks";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import MenuIcon from "@material-ui/icons/Menu";
import AddIcon from "@material-ui/icons/Add";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

const axios = require("axios");

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  menuButton: {
    position: "fixed",
    top: 25,
    right: 35,
  },
}));

function App() {
  const classes = useStyles();
  const [serviceList, setServiceList] = useState([]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [selectedService, setSelectedService] = useState("");

  const loadServices = () => {
    const url = "http://localhost:8080/service";

    axios
      .get(url)
      .then(function (response) {
        console.log(response);
        setServiceList(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    loadServices();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const toggleDrawer = (isOpen) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpenDrawer(isOpen);
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Fab
            className={classes.menuButton}
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </Fab>
          <Drawer
            className={classes.drawer}
            open={openDrawer}
            onClose={toggleDrawer(false)}
            anchor="left"
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <List>
              <ListItem
                button
                component="a"
                href="/"
                key="checklist"
              >
                <ListItemIcon>
                  <EqualizerIcon />
                </ListItemIcon>
                <ListItemText primary="Sumário" />
              </ListItem>

              <ListItem
                button
                component="a"
                href="/issues"
                key="issues"
              >
                <ListItemIcon>
                  <ErrorOutlineIcon />
                </ListItemIcon>
                <ListItemText primary="Problemas" />
              </ListItem>

              <ListItem button onClick={handleClickOpen} key="create-service">
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText primary="Criar serviço" />
              </ListItem>

              <Divider />

              {serviceList.map((service) => (
                <ListItem
                  button
                  component="a"
                  href={"/service/" + service}
                  key={service}
                  selected={service === selectedService}
                >
                  <ListItemIcon>
                    <BookmarksIcon />
                  </ListItemIcon>
                  <ListItemText primary={service} />
                </ListItem>
              ))}
            </List>
          </Drawer>

          <Switch>
            <Route path="/service/:serviceName">
              <Grade setSelectedService={setSelectedService} />
            </Route>
            <Route path="/issues">
              <IssueSummary />
            </Route>
            <Route path="/">
              <Summary serviceList={serviceList} />
            </Route>
          </Switch>
        </header>
        <AddService open={open} onClose={handleClose} reload={loadServices} />
      </div>
    </Router>
  );
}

export default App;
