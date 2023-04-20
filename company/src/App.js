import './assets/css/App.css';
import { BrowserRouter as Router, Routes, Route, Navigate  } from "react-router-dom";
import {pages} from "./pages";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<pages.Login/>} />
          <Route path="/signup" element={<pages.SignUp/>} />
          <Route path="/dashboard" element={<pages.Dashboard/>} />
          <Route path="*" element={<Navigate  to="/dashboard"/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
