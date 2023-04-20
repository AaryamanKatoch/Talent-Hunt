import React, { useState, useEffect } from "react";
import {
  TextField,
  Button, 
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material/";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { helper } from "../helper";
import { api } from "../api";

function SignUp() {
  const [data, setData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    profilePicture: "",
    type: "",
    description: "",
  });
  const [error, setError] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("token_data"))) {
      navigate("/dashboard");
    }
  }, []);

  const validateRegister = async (e) => {
    e.preventDefault();
    console.log(data);
    try {
      helper.common.isValidEmail(data.email);
      helper.common.isValidPassword(data.password);
      helper.common.isPasswordSame(data.confirmPassword, data.password);
      helper.common.isValidURL(data.profilePicture);
      helper.common.isValidString(data.type, "type");
      helper.common.isValidString(data.description, "Description");
    } catch (e) {
      setError(e.message);
      return;
    }

    try {
      // const response = await api.routes.signup(data);
      // console.log(response.data);
      // localStorage.setItem("token_data", JSON.stringify(response.data.token));
      // localStorage.setItem("id", JSON.stringify(response.data._id));
      navigate("/dashboard");
    } catch (e) {
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
          marginTop: "10rem",
        }}
      >
        {error ? <h5 className="card-header error">{error}</h5> : ""}
        <div className="card-body">
          <h5 className="card-title">Sign Up</h5>
          <br />
          <form onSubmit={validateRegister} id="register-form">
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
            <TextField
              label="Confirm Password"
              onChange={(e) =>
                setData({ ...data, confirmPassword: e.target.value })
              }
              required
              variant="outlined"
              color="secondary"
              type="password"
              value={data.confirmPassword}
              fullWidth
              sx={{ mb: 3 }}
            />
            <TextField
              label="Profile Picture URL"
              onChange={(e) =>
                setData({ ...data, profilePicture: e.target.value })
              }
              variant="outlined"
              color="secondary"
              type="url"
              value={data.profilePicture}
              fullWidth
              sx={{ mb: 3 }}
            />
            <TextField
              label="Description"
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
              required
              variant="outlined"
              color="secondary"
              type="text"
              value={data.description}
              fullWidth
              sx={{ mb: 3 }}
            />
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-helper-label">Type</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={data.type}
                label="Type"
                onChange={(e) => setData({ ...data, type: e.target.value })}
                required
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"IT"}>IT</MenuItem>
                <MenuItem value={"Automobile"}>Automobile</MenuItem>
                <MenuItem value={"Civil"}>Civil</MenuItem>
              </Select>
            </FormControl>
            <br />
            <br />
            <Button variant="outlined" color="secondary" type="submit">
              Sign Up
            </Button>
            <br />
            <br />
            <small>
              Already have an account? <Link to="/login ">Login</Link>
            </small>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
