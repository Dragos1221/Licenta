import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SearchIcon from "@material-ui/icons/Search";
import ListIcon from "@material-ui/icons/List";

export const mainListItems = (
  <div>
    <ListItem
      button
      onClick={() => {
        window.location.assign("/main");
      }}
    >
      <ListItemIcon>
        <SearchIcon></SearchIcon>
      </ListItemIcon>
      <ListItemText primary="Search Movie" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListItem
      button
      onClick={() => {
        window.location.assign("/myList");
      }}
    >
      <ListItemIcon>
        <ListIcon />
      </ListItemIcon>
      <ListItemText primary="My movies list" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <SearchIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <SearchIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem>
  </div>
);
