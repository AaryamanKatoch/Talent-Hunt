import CssBaseline from '@mui/material/CssBaseline';
import './assets/css/App.css';
import { BrowserRouter as Router, Routes, Route, Navigate  } from "react-router-dom";
import {pages} from "./pages";
// import { components } from "./components";

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/login" element={<pages.Login/>} />
          <Route path="/signup" element={<pages.SignUp/>} />
          <Route path="/dashboard" element={<pages.Dashboard/>} />
          <Route path="/findPeople" element={<pages.FindPeople />} />
          <Route path="/jobSeeker/:id" element={<pages.SinglePerson />} />
          <Route path="*" element={<Navigate  to="/dashboard"/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
