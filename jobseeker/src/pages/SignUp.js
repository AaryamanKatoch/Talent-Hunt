import React, { useState, useEffect , useContext} from "react";
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
import { Navigate, useNavigate } from "react-router-dom";
import { helper } from "../helper";
import Alert from '@mui/material/Alert';
import { api } from "../api";
import { doCreateUserWithEmailAndPassword } from "../firebase/functions";
import { AuthContext } from "../firebase/Auth";
import { components } from "../components";

function SignUp() {
  const {currentUser} = useContext(AuthContext);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    // profilePicture: "",
    // skills: [],
    // experience: "",
    // field: "",
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
    try {
      helper.common.isValidEmail(data.email);
      helper.common.isValidPassword(data.password);
      helper.common.isPasswordSame(data.confirmPassword, data.password);
      // helper.common.isValidURL(data.profilePicture);
      // data.skills.map(s => {
      //   helper.common.isValidString(s, "skills");
      // });      
      // helper.common.isValidString(data.experience, "Experience");
      helper.common.isValidString(data.name, "Full Name");
      console.log('after checking stuff!!')

    } catch (e) {
      setError(e);
      return;
    }

    try {
      // const response = await api.routes.signup(data);
      await doCreateUserWithEmailAndPassword(
        data.email,
        data.password,
        data.name
      );
      console.log('in second trycatch');
      // localStorage.setItem("token_data", JSON.stringify(response.data.token));
      // localStorage.setItem("id", JSON.stringify(response.data._id));
      // navigate("/dashboard");
    } catch (e) {
      setError(e);
      return;
    }
  };

  if (currentUser) {
    return <Navigate to={`/page/${1}`} />;
  }

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
        {error ? <Alert severity="error" onClose={() => {console.log('here'); setError(null);}}><h5>{error.message}</h5></Alert> : ""}
        <div className="card-body">
          <h5 className="card-title">Sign Up</h5>
          <br />
          <form onSubmit={validateRegister} id="register-form">
            <TextField
                label="Full Name"
                onChange={(e) =>setData({ ...data, name: e.target.value })}
                required
                variant="outlined"
                color="secondary"
                type="text"
                value={data.name}
                fullWidth
                sx={{ mb: 3 }}
              />
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
            {/* <Autocomplete
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
            /> */}
            {/* <FormControl
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
            </FormControl> */}
            <Button
              variant="outlined"
              color="secondary"
              type="submit"
              style={{ marginTop: "1em" }}
            >
              Sign Up
            </Button>
            <br />
            <br />
            <small>
              Already have an account? <Link to="/login">Login</Link>
            </small>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
