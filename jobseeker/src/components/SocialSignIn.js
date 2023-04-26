import React from 'react';
import { doSocialSignIn } from '../firebase/functions';
import {
    TextField,
    Button,
    Autocomplete,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
  } from "@mui/material/";
  import GoogleIcon from '@mui/icons-material/Google';


const SocialSignIn = () => {
  const socialSignOn = async (provider) => {
    try {
      await doSocialSignIn(provider);
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div>
        <Button
            variant="outlined"
            color="secondary"
            style={{ marginTop: "1em" }}
            onClick={() => socialSignOn('google')}
            startIcon={<GoogleIcon style={{ color: 'currentColor' }} />}
        >
            Sign Up with google 
        </Button>
      {/* <img
        onClick={() => socialSignOn('google')}
        alt='google signin'
        src='/imgs/btn_google_signin.png'
      /> */}
    </div>
  );
};

export default SocialSignIn;