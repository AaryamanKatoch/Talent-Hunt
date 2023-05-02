import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import noImage from "../assets/css/download.jpeg";
import { AuthContext } from "../firebase/Auth";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [jobsData, setJobsData] = useState(undefined);
  let [hasError, setError] = useState(false);
  const { currentUser } = useContext(AuthContext);
  let card = null;
  const regex = /(<([^>]+)>)/gi;

  useEffect(() => {
    console.log("on load useeffect");
    async function fetchData() {
      try {
        const { data } = await axios.get(
          "http://localhost:3000/jobs/getJobByEmail",
          { params: { email: currentUser.email } }
        );
        setJobsData(data);
        setLoading(false);
        setError(false);
      } catch (e) {
        console.log(e);
        setError(true);
      }
    }
    fetchData();
  }, []);

  const buildCard = (job) => {
    return (
      <Grid item xs={10} sm={10} md={10} lg={10} xl={10} key={job._id}>
        <Card
          sx={{
            maxWidth: 550,
            height: "auto",
            marginLeft: "auto",
            marginRight: "auto",
            borderRadius: 5,
            border: "1px solid #1e8678",
            boxShadow:
              "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);",
          }}
        >
          <Link className="Link-for-eventcard" to={`/editJob/${job._id}`}>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Role: {job.name}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Visa Requirements: {job.visaRequirements}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Minimum Qualification: {job.minimumQualification}
              </Typography>
            </CardContent>
          </Link>
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
      <div>
        <h2>Loading....</h2>
      </div>
    );
  } else if (hasError) {
    return (
      <div>
        <h2>has error</h2>
      </div>
    );
  } else {
    return (
      <div className="main-div">
        <h1>Jobs created by {currentUser.email}</h1>
        <br />
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
};

export default Home;
