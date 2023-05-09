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
      {currentUser ? (
        <div>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            sx={{ marginTop: "30px", marginBottom: "30px" }}
          >
            <Avatar sx={{ width: 60, height: 60, backgroundColor: "#767676" }}>
              {currentUser && currentUser.displayName
                ? currentUser.displayName[0]
                : ""}
            </Avatar>
          </Stack>
          <div className="makeCenter">
            {currentUser ? currentUser.email : ""}
          </div>
        </div>
      ) : null}
      <List>
        {currentUser ? (
          <>
            <ListItem disablePadding>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <Link to={`/page/${1}`} className="navBarLink">
                <ListItemText primary={"Home"} />
              </Link>
            </ListItem>

            <ListItem disablePadding>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <Link to={`/dashboard`} className="navBarLink">
                <ListItemText primary={"Dashboard"} />
              </Link>
            </ListItem>

            <ListItem disablePadding>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <Link to={`/myApplications`} className="navBarLink">
                <ListItemText primary={"My Applications"} />
              </Link>
            </ListItem>
            <ListItem disablePadding>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <Link to={`/create-resume`} className="navBarLink">
                <ListItemText primary={"Create Resume"} />
              </Link>
            </ListItem>
          </>
        ) : null}
        {currentUser ? null : (
          <ListItem disablePadding>
            <ListItemIcon>
              <LoginIcon />
            </ListItemIcon>
            <Link to="/login" className="navBarLink">
              <ListItemText primary={"Login"} />
            </Link>
          </ListItem>
        )}
        {currentUser ? (
          <ListItem disablePadding>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <Link onClick={doSignOut} className="navBarLink">
              <ListItemText primary={"LogOut"} />
            </Link>
          </ListItem>
        ) : null}
      </List>
    </Drawer>
  );
}

export default MyDrawer;
