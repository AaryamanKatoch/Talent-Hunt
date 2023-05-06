import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import noImage from "../assets/css/download.jpeg";
import { AuthContext } from "../firebase/Auth";
import ApplicantCard from "../components/ApplicantsCard";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

const Applicants = () => {
  const [loading, setLoading] = useState(true);
  const [applicantsData, setApplicantsData] = useState(undefined);
  let [hasError, setError] = useState(false);
  const { currentUser } = useContext(AuthContext);
  let { id } = useParams();
  let card = null;
  const regex = /(<([^>]+)>)/gi;

  useEffect(() => {
    console.log("on load useeffect");
    async function fetchData() {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/jobs/applicants/${id}`,
          { params: { email: currentUser.email } }
        );
        setApplicantsData(data);
        setLoading(false);
        setError(false);
      } catch (e) {
        console.log(e);
        setError(true);
      }
    }
    fetchData();
  }, []);

  console.log(applicantsData);
  card =
    applicantsData &&
    applicantsData.map((applicant) => {
      return <ApplicantCard key={applicant._id} applicant={applicant} />;
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
        <h1>Applicants</h1>
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

export default Applicants;
