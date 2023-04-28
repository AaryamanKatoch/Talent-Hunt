import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { doSignOut } from '../firebase/functions';
import { styled } from "@mui/material/styles"
import ListItem from '@mui/material/ListItem';
import {Drawer}  from '@mui/material';
import {ListItemIcon} from '@mui/material';
import {ListItemText} from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';
import {Container} from '@mui/material';
import {Switch} from '@mui/material';
import {Typography} from '@mui/material';
import "../assets/css/App.css"
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import { AuthProvider } from '../firebase/Auth';
import PrivateRoute from '../components/PrivateRoute';
import { AuthContext } from '../firebase/Auth';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange, deepPurple } from '@mui/material/colors';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link
} from "react-router-dom";
import { pages } from ".";
import { components } from "../components";
import React, { useState, useEffect , useContext} from "react";
const drawerWidth = 240;

function MyDrawer(){
  const {currentUser} = useContext(AuthContext);
    return (
      <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
              },
            }}
            variant="permanent"
            anchor="left"
            open={true}
          >
            <Divider/>
            {currentUser? (<div><Stack direction="row" spacing={2} justifyContent="center" sx={{marginTop:'30px', marginBottom:'30px'}}>
              <Avatar sx={{ width: 60, height: 60 }}>{currentUser ? currentUser.displayName[0] : ''}</Avatar>
            </Stack>
            <h6 className='makeCenter'>{currentUser ? currentUser.email : ''}</h6></div>) : null}
            <Divider/>
            <List>
            <Link to={`/page/${1}`} className="navBarLink">
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <HomeIcon/>
                    </ListItemIcon>
                    <ListItemText primary={"Home"} />
                  </ListItemButton>
                </ListItem>
              </Link>
              <Divider />
              {currentUser? null : (<Link to="/login" className="navBarLink">
                <ListItem disablePadding>
                  <ListItemButton>
                  <ListItemIcon>
                    <LoginIcon/>
                  </ListItemIcon>
                    <ListItemText primary={"Login"} />
                  </ListItemButton>
                </ListItem>
              </Link>)}
              <Divider />
              {currentUser ? (<Link onClick={doSignOut} className="navBarLink">
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <HomeIcon/>
                    </ListItemIcon>
                    <ListItemText primary={"LogOut"} />
                  </ListItemButton>
                </ListItem>
              </Link>) : null}
            </List>
    </Drawer>);
}

export default MyDrawer;