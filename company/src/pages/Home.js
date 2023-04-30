import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  ButtonBase,
  Button,
} from "@mui/material";
import noImage from "../assets/css/download.jpeg";
// import { AuthContext } from "../firebase/Auth";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

const Home = () => {
  return(
    <div>
      <h1>Home</h1>
    </div>
  );
};

export default Home;
