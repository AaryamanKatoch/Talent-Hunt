import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import ListItem from "@mui/material/ListItem";
import { Drawer } from "@mui/material";
import { ListItemIcon } from "@mui/material";
import { ListItemText } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import { Container } from "@mui/material";
import { Switch } from "@mui/material";
import { Typography } from "@mui/material";
import "./assets/css/App.css";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import { AuthProvider } from "./firebase/Auth";
import PrivateRoute from "./components/PrivateRoute";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import { pages } from "./pages";
import { components } from "./components";
import JobDetailsPage from "./components/JobDetailsPage";
import React, { useState, useEffect, useContext } from "react";
import { ResumeProvider } from "./ContextResume";

// function App() {
//   return (
//   <AuthProvider>
//     <div className="App">
//       <CssBaseline />
//       <Router>
//         <components.AppNavbar />
//         <Routes>
//           <Route path="/login" element={<pages.Login />} />
//           <Route path="/signup" element={<pages.SignUp />} />
//           <Route path="/home" element={<pages.Home />} />
//           <Route path="*" element={<Navigate to="/home" />} />
//         </Routes>
//       </Router>
//     </div>
//     </AuthProvider>
//   );
// }
// const drawerWidth = 240;
// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <div style={{ display: 'flex' }}>
//           <Drawer
//             sx={{
//               width: drawerWidth,
//               flexShrink: 0,
//               '& .MuiDrawer-paper': {
//                 width: drawerWidth,
//                 boxSizing: 'border-box',
//               },
//             }}
//             variant="permanent"
//             anchor="left"
//             open={true}
//           >
//             <Divider/>
//             <List>
//             <Link to="/" className="navBarLink">
//                 <ListItem disablePadding>
//                   <ListItemButton>
//                     <ListItemIcon>
//                       <HomeIcon/>
//                     </ListItemIcon>
//                     <ListItemText primary={"Home"} />
//                   </ListItemButton>
//                 </ListItem>
//               </Link>
//               <Divider />
//               <Link to="/login" className="navBarLink">
//                 <ListItem disablePadding>
//                   <ListItemButton>
//                   <ListItemIcon>
//                     <LoginIcon/>
//                   </ListItemIcon>
//                     <ListItemText primary={"Login"} />
//                   </ListItemButton>
//                 </ListItem>
//               </Link>
//               <Divider />
//             </List>
//           </Drawer>
//           <Routes>
//             <Route path='/' element={<PrivateRoute />}>
//               <Route path="/" element={<pages.Home />} />
//             </Route>
//             <Route path="/login" element={<pages.Login />} />
//             <Route path="/signup" element={<pages.SignUp />} />
//           </Routes>
//         </div>
//       </Router>
//     </AuthProvider>
//   );
// }
function App() {
  return (
    <ResumeProvider>
      <AuthProvider>
        <Router>
          <div style={{ display: "flex" }}>
            <pages.MyDrawer />
            <Routes>
              {/* home */}
              <Route path="/" element={<PrivateRoute />}>
                <Route path="/page/:page" element={<pages.Home />} />
              </Route>
              {/* apply */}
              <Route path="/apply/:jobId" element={<PrivateRoute />}>
                <Route path="/apply/:jobId" element={<pages.Application />} />
              </Route>
              {/* job details */}
              <Route path="/jobDetails/:jobId" element={<PrivateRoute />}>
                <Route path="/jobDetails/:jobId" element={<components.JobDetailsPage />} />
              </Route>
              {/* dashboard */}
              <Route path="/dashboard" element={<PrivateRoute />}>
                <Route path="/dashboard" element={<pages.Dashboard />} />
              </Route>
              {/* create resume */}
              <Route path="/create-resume" element={<PrivateRoute />}>
                <Route
                  path="/create-resume"
                  element={<components.CreateResume />}
                />
              </Route>
              {/* my applications */}
              <Route path="/myApplications" element={<PrivateRoute />}>
                <Route
                  path="/myApplications"
                  element={<pages.MyApplications />}
                />
              </Route>
              <Route path="/login" element={<pages.Login />} />
              <Route path="/signup" element={<pages.SignUp />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ResumeProvider>
  );
}

export default App;
