import CssBaseline from '@mui/material/CssBaseline';
import "./assets/css/App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { pages } from "./pages";
import { components } from "./components";

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <Router>
        <components.AppNavbar />
        <Routes>
          <Route path="/login" element={<pages.Login />} />
          <Route path="/signup" element={<pages.SignUp />} />
          <Route path="/home" element={<pages.Home />} />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
