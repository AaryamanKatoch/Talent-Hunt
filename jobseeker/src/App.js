import CssBaseline from "@mui/material/CssBaseline";
import "./assets/css/App.css";
import { AuthProvider } from "./firebase/Auth";
import PrivateRoute from "./components/PrivateRoute";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { pages } from "./pages";
import { components } from "./components";
import React from "react";
import { ResumeProvider } from "./ContextResume";

function App() {
  return (
    <ResumeProvider>
      <AuthProvider>
        <Router>
          <div style={{ display: "flex" }}>
            <CssBaseline />
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
                <Route
                  path="/jobDetails/:jobId"
                  element={<components.JobDetailsPage />}
                />
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
