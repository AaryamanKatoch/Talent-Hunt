import React, { useState, useEffect ,useContext} from "react";
import {
  TextField,
  Button,
} from "@mui/material/";
import Alert from '@mui/material/Alert';
import { Link } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";
import { helper } from "../helper";
import { api } from "../api";
import { doSignInWithEmailAndPassword , doPasswordReset} from "../firebase/functions";
import { AuthContext } from "../firebase/Auth";
import { components } from "../components";
import Divider from '@mui/material/Divider';

function Login() {
  const {currentUser} = useContext(AuthContext);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (JSON.parse(localStorage.getItem("token_data"))) {
  //     navigate("/dashboard");
  //   }
  // }, []);

  const validateLogin = async (e) => {
    e.preventDefault();
    try {
      helper.common.isValidEmail(data.email);
      helper.common.isValidPassword(data.password);
      // console.log('done with the helper stuff!');

    } catch (e) {
      // console.log('caought in ')
      setError(e);
      return;
    }

    try {
      // const response = await api.routes.login(data);
      // localStorage.setItem("token_data", JSON.stringify(response.data.token));
      // localStorage.setItem("id", JSON.stringify(response.data.patientData._id));
      // console.log(data.email)
      // console.log(data.password)    
      await doSignInWithEmailAndPassword(data.email, data.password);

      //navigate("/dashboard");
    } catch (error) {
      setError(error);
      return;
    }
  };

  const passwordReset = async (e) => {
    e.preventDefault();
    try{
      helper.common.isValidEmail(data.email);
    }catch(e){
      setError(e);
      return;
    }
    try {
        await doPasswordReset(data.email).then(()=> {
          setSuccess({message:'Password Reset Link has been sent to this email id'});
        });
    }catch(error){
      setError(error);
      return;
    }
  };

  if (currentUser) {
    return <Navigate to={`/dashboard`} />;
  }

  return (
      <div
        className="card"
        style={{
          width: "80rem",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "10rem",
        }}>
        {/* {error ? <h5 className="card-header error">{error}</h5> : ""} */}
        {error ? <Alert severity="error" onClose={() => {console.log('here'); setError(null);}}><h5>{error.message}</h5></Alert> : ""}
        {success ? <Alert onClose={() => {console.log('here in'); setSuccess(null);}}><h5>{success.message}</h5></Alert> : ""}
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
            <br/>
            <br />
            <div>
              <small>
                Don't have an account? <Link to="/signup">Register</Link>
              </small>
              <br />
              <small>
              <Link onClick={passwordReset}>Forgot Password ? </Link>
              </small>
            </div>
            <br />
            <Divider variant="middle">
              OR
            </Divider>
            <div className="makeCenter"><components.socialSignIn /></div>
            <br />
            {/* <button className='forgotPassword' onClick={passwordReset}>
              Forgot Password
            </button> */}
          </form>
        </div>
      </div>
  );
}

export default Login;
