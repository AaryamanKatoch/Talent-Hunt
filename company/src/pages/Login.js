import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
} from "@mui/material/";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { helper } from "../helper";
import { api } from "../api";

function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("token_data"))) {
      navigate("/dashboard");
    }
  }, []);

  const validateLogin = async (e) => {
    e.preventDefault();
    try {
      helper.common.isValidEmail(data.email);
      helper.common.isValidPassword(data.password);
    } catch (e) {
      setError(e.response.data);
      return;
    }

    try {
      // const response = await api.routes.login(data);
      // localStorage.setItem("token_data", JSON.stringify(response.data.token));
      // localStorage.setItem("id", JSON.stringify(response.data.patientData._id));
      navigate("/dashboard");
    } catch (error) {
      setError(e.response.data);
      return;
    }
  };

  return (
    <>
      <div
        className="card"
        style={{
          width: "80rem",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "4rem",
        }}
      >
        {error ? <h5 className="card-header error">{error}</h5> : ""}
        <div className="card-body">
          <h5 className="card-title">Login</h5>
          <br />
          <form onSubmit={validateLogin} id="register-form">
            <TextField
              label="Email"
              onChange={(e) => setData({ ...data, email: e.target.value })}
              required
              variant="outlined"
              color="secondary"
              type="email"
              sx={{ mb: 3 }}
              fullWidth
              value={data.email}
            />
            <TextField
              label="Password"
              onChange={(e) => setData({ ...data, password: e.target.value })}
              required
              variant="outlined"
              color="secondary"
              type="password"
              value={data.password}
              fullWidth
              sx={{ mb: 3 }}
            />
            <br />
            <br />
            <Button variant="outlined" color="secondary" type="submit">
              Login
            </Button>
            <br />
            <br />
            <small>
              Don't have an account? <Link to="/register ">Register</Link>
            </small>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
