import CssBaseline from "@mui/material/CssBaseline";
import "./assets/css/App.css";
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
import React, { useState, useEffect, useContext } from "react";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div style={{ display: "flex" }}>
          <pages.MyDrawer />
          <Routes>
            {/* dashboard */}
            <Route path="/dashboard" element={<PrivateRoute />}>
              <Route path="/dashboard" element={<pages.Dashboard />} />
            </Route>

            {/* post job */}
            <Route path="/postJob" element={<PrivateRoute />}>
              <Route path="/postJob" element={<pages.PostJob />} />
            </Route>

            {/* edit job */}
            <Route path="/editJob/:id" element={<PrivateRoute />}>
              <Route path="/editJob/:id" element={<pages.EditJob />} />
            </Route>

            {/* job applicants*/}
            <Route path="/applicants/:id" element={<PrivateRoute />}>
              <Route path="/applicants/:id" element={<pages.Applicants />} />
            </Route>

            {/* find People */}
            <Route path="/findPeople" element={<PrivateRoute />}>
              <Route path="/findPeople" element={<pages.FindPeople />} />
            </Route>

            {/* single job seeker */}
            <Route path="/jobSeeker/:id" element={<PrivateRoute />}>
              <Route path="/jobSeeker/:id" element={<pages.SinglePerson />} />
            </Route>

            {/* home */}
            <Route path="/" element={<PrivateRoute />}>
              <Route path="/" element={<pages.Home />} />
            </Route>

            {/* my jobs */}

            <Route path="/login" element={<pages.Login />} />
            <Route path="/signup" element={<pages.SignUp />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
