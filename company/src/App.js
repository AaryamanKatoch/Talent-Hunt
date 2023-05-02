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
            <Route path="/" element={<PrivateRoute />}>
              <Route path="/" element={<pages.Home />} />
              <Route path="/dashboard" element={<pages.Dashboard />} />
              <Route path="/postJob" element={<pages.PostJob />} />
              <Route path="/editJob/:id" element={<pages.EditJob />} />
              <Route path="/findPeople" element={<pages.FindPeople />} />
              <Route path="/jobSeeker/:id" element={<pages.SinglePerson />} />
            </Route>
            <Route path="/login" element={<pages.Login />} />
            <Route path="/signup" element={<pages.SignUp />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
