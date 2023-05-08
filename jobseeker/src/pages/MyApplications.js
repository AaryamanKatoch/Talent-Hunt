import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Logout from "./Logout";
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
  Snackbar,
  Stack,
} from "@mui/material";
import noImage from "../assets/css/download.jpeg";
import MuiAlert from "@mui/material/Alert";
import { AuthContext } from "../firebase/Auth";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function MyApplications() {
  const [loading, setLoading] = useState(true);
  // const [searchData, setSearchData] = useState(undefined);
  const [jobsData, setJobsData] = useState(undefined);
  // const [searchTerm, setSearchTerm] = useState("");
  // const [pageNo, setPageNo] = useState(1);
  // const [b_disabled, setBDisable] = useState(false);
  const { currentUser } = useContext(AuthContext);
  let [hasError, setError] = useState(false);
  let [errorMessage, setErrorMessage] = useState("");
  let card = null;
  const regex = /(<([^>]+)>)/gi;

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(
          "http://localhost:3000/jobseeker/HistoryOfApplications",
          { params: { email: currentUser.email } }
        );
        if (data == null || data.length < 1) {
          setErrorMessage("something went wrong! \n please Try Again!");
          setError(true);
          setLoading(false);
        }
        setJobsData(data);
        setLoading(false);
      } catch (e) {
        setErrorMessage(e.response.data);
        setError(true);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const buildCard = (job) => {
    return (
      <Grid item xs={10} sm={10} md={10} lg={10} xl={10} key={job._id}>
        <Card
          sx={{
            width: "100%",
            height: "auto",
            display: "flex",
            // maxHeight:500,
            marginTop: 5,
            boxShadow:
              "0 15px 30px rgba(0,0,0,0.30), 0 10px 8px rgba(0,0,0,0.22);",
            textDecoration: "none",
          }}
        >
          {job.image ? (
            <img
              src={`data:image/png;base64,${job.image}`}
              style={{ width: "151px" }}
            />
          ) : (
            <CardMedia
              component="img"
              sx={{ width: 151 }}
              image={noImage}
              alt="Live from space album cover"
            />
          )}
          <CardActionArea>
            <Link className="Link-for-eventcard" to={`/jobDetails/${job._id}`}>
              <CardContent>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    height: "40px",
                    width: "200px",
                  }}
                  component="p"
                >
                  {job.name}
                </Typography>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    height: "40px",
                  }}
                  component="p"
                >
                  {job.description
                    .replace(regex, "")
                    .substring(0, 35)
                    .toString()}
                </Typography>
              </CardContent>
            </Link>
          </CardActionArea>
        </Card>
      </Grid>
    );
  };

  card =
    jobsData &&
    jobsData.map((job) => {
      return buildCard(job);
    });

  if (loading) {
    return (
      <Box
        sx={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <CircularProgress />
      </Box>
    );
  } else if (hasError) {
    return (
      <div className="makeCenter">
        <Alert severity="error">{errorMessage}</Alert>
      </div>
    );
  } else {
    return (
      <div className="main-div">
        <Grid
          container
          spacing={1}
          sx={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {card}
        </Grid>
      </div>
    );
  }
}

export default MyApplications;
