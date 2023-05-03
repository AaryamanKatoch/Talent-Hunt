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
  Stack 
} from "@mui/material";
import noImage from "../assets/css/download.jpeg";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import MuiAlert from '@mui/material/Alert';

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [searchData, setSearchData] = useState(undefined);
  const [jobsData, setJobsData] = useState(undefined);
  const [searchTerm, setSearchTerm] = useState("");
  const [pageNo, setPageNo] = useState(1);
  const [b_disabled, setBDisable] = useState(false);
  let page_player = useParams().page;
  let [hasError, setError] = useState(false);
  let [errorMessage, setErrorMessage] = useState("");
  // const {currentUser} = useContext(AuthContext);
  let card = null;
  const regex = /(<([^>]+)>)/gi;

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const clickEvent = () => {
    setBDisable(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setBDisable(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [b_disabled]);

  useEffect(() => {
    // console.log("on load useeffect");
    // console.log(currentUser);
    // console.log(currentUser.email)
    // console.log(currentUser.displayName)
    async function fetchData() {
      try {
        const { data } = await axios.get(
          "http://localhost:3000/jobseeker/jobs",
          { params: { page: page_player } }
        );
        console.log(data.jobs)
        console.log(data.moreJobsExist)
        // if(data==null || data.jobs.length<1){
        //   setErrorMessage('something went wrong! \n please Try Again!');
        //   setError(true);
        //   setLoading(false);
        // }
        setJobsData(data);
        setLoading(false);
      }catch (e) {
        setErrorMessage(e.response.data);
        setError(true);
        setLoading(false);
      }
    }
    fetchData();
  }, [page_player]);

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
          <CardMedia
            component="img"
            sx={{ width: 151 }}
            image={job.companylogo ? job.companylogo : noImage}
            alt="Live from space album cover"
          />
          <CardActionArea>
            <Link className="Link-for-eventcard" to={`/jobDetails/${job._id}`}>
              <CardContent>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    height: "40px",
                  }}
                  component="h3"
                >
                  {job.name}
                </Typography>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    height: "40px",
                  }}
                  component="h3"
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
    jobsData && jobsData.jobs && 
    jobsData.jobs.map((job) => {
      return buildCard(job);
    });

  if (loading) {
    return (
      <Box sx={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
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
        <div className="page-div makeCenter">
          {page_player > 1 && (
            <Link to={`/page/${Number(page_player) - 1}`}>
              <Button
                variant="outlined"
                color="secondary"
                type="submit"
                className="page_button"
                disabled={b_disabled}
                onClick={clickEvent}
              >
                previous
              </Button>
            </Link>
          )}
          <h4 className="page_indicator">{page_player}</h4>
          {jobsData.moreJobsExist && (
            <Link to={`/page/${Number(page_player) + 1}`}>
              <Button
                variant="outlined"
                color="secondary"
                type="submit"
                className="page_button"
                disabled={b_disabled}
                onClick={clickEvent}
              >
                next
              </Button>
            </Link>
          )}
          <br></br>
          <br></br>
        </div>
        <Grid
          container
          spacing={1}
          sx={{
            //flexGrow: 1,
            //flexDirection: 'column'
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {card}
        </Grid>
      </div>
    );
  }
};

export default Home;
