import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import { doSignOut } from "../firebase/functions";
import ListItem from "@mui/material/ListItem";
import { Drawer } from "@mui/material";
import { ListItemIcon } from "@mui/material";
import { ListItemText } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import "../assets/css/App.css";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import { AuthContext } from "../firebase/Auth";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import React, { useContext } from "react";
const drawerWidth = 240;

function MyDrawer() {
  const { currentUser } = useContext(AuthContext);
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
      open={true}
    >
      <Divider />
      {currentUser ? (
        <div>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            sx={{ marginTop: "30px", marginBottom: "30px" }}
          >
            <Avatar sx={{ width: 60, height: 60 }}>
              {currentUser && currentUser.displayName
                ? currentUser.displayName[0]
                : ""}
            </Avatar>
          </Stack>
          <h6 className="makeCenter">{currentUser ? currentUser.email : ""}</h6>
        </div>
      ) : null}
      <Divider />
      <List>
        {currentUser ? (
          <>
            <Link to={`/`} className="navBarLink">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Home"} />
                </ListItemButton>
              </ListItem>
            </Link>
            <Divider />
            <Link to={`/dashboard`} className="navBarLink">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Dashboard"} />
                </ListItemButton>
              </ListItem>
            </Link>
            <Divider />
            <Link to={`/postJob`} className="navBarLink">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Post A Job"} />
                </ListItemButton>
              </ListItem>
            </Link>
            <Divider />
            <Link to={`/findPeople`} className="navBarLink">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Find Job Seekers"} />
                </ListItemButton>
              </ListItem>
            </Link>
            <Divider />
          </>
        ) : (
          ""
        )}
        {currentUser ? null : (
          <Link to="/login" className="navBarLink">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <LoginIcon />
                </ListItemIcon>
                <ListItemText primary={"Login"} />
              </ListItemButton>
            </ListItem>
          </Link>
        )}
        <Divider />
        {currentUser ? (
          <Link onClick={doSignOut} className="navBarLink">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary={"LogOut"} />
              </ListItemButton>
            </ListItem>
          </Link>
        ) : null}
      </List>
    </Drawer>
  );
}

export default MyDrawer;
