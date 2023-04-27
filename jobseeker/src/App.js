import CssBaseline from '@mui/material/CssBaseline';
import "./assets/css/App.css";
import { AuthProvider } from './firebase/Auth';
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
  <AuthProvider>
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
    </AuthProvider>
  );
}

export default App;