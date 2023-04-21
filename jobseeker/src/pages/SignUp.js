import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Autocomplete,
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
    skills: [],
    experience: "",
    field: "",
  });
  const [error, setError] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("token_data"))) {
      navigate("/dashboard");
    }
  }, []);

  const validateRegister = (e) => {
    e.preventDefault();
    try {
      console.log(data);
      helper.common.isValidEmail(data.email);
      helper.common.isValidPassword(data.password);
      helper.common.isPasswordSame(data.confirmPassword, data.password);
      helper.common.isValidURL(data.profilePicture);
      data.skills.map(s => {
        helper.common.isValidString(s, "skills");
      });      
      helper.common.isValidString(data.experience, "Experience");
      helper.common.isValidString(data.field, "Field");

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
            <Autocomplete
              multiple
              required
              id="combo-box-demo"
              options={helper.skillList}
              sx={{ width: 300 }}
              onChange={(_, vals) => {
                setData({
                  ...data,
                  skills: vals.map((v) => {
                    return v.label;
                  }),
                });
              }}
              renderInput={(params) => (
                <TextField {...params} label="Skills" color="secondary" />
              )}
            />
            <FormControl
              sx={{ m: 1, minWidth: 300 }}
              style={{ position: "absolute", left: "8px", marginTop: "23px" }}
            >
              <InputLabel
                id="demo-simple-select-helper-label"
                color="secondary"
              >
                Experience
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                color="secondary"
                value={data.experience}
                label="Type"
                onChange={(e) =>
                  setData({ ...data, experience: e.target.value })
                }
                required
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"Senior"}>Senior</MenuItem>
                <MenuItem value={"Mid Level"}>Mid Level</MenuItem>
                <MenuItem value={"Junior"}>Junior</MenuItem>
                <MenuItem value={"Fresher"}>Fresher</MenuItem>
              </Select>
            </FormControl>
            <FormControl
              sx={{ m: 1, minWidth: 300 }}
              style={{ position: "absolute", left: "8px", marginTop: "102px" }}
            >
              <InputLabel
                id="demo-simple-select-helper-label"
                color="secondary"
              >
                Field
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={data.field}
                label="Type"
                onChange={(e) => setData({ ...data, field: e.target.value })}
                required
                color="secondary"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"IT"}>IT</MenuItem>
                <MenuItem value={"Automobile"}>Automobile</MenuItem>
                <MenuItem value={"Civil"}>Civil</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="outlined"
              color="secondary"
              type="submit"
              style={{ marginTop: "14em" }}
            >
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
