import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import { Link, useParams, useNavigate } from "react-router-dom";
import { api } from "../api";

const JobDetailsPage = () => {
  const params = useParams();
  const id = params.jobId;
  const [data, setData] = useState();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await api.routes.getJobDetails(id);
        // console.log(data);
        setData(data);
      } catch (error) {
        console.log(error.response.data);
        setError(error.response.data);
      }
    };
    fetch();
  }, []);

  const handleClick = () => {
    navigate(`/apply/${data._id}`);
  };

  const cardStyle = {
    maxWidth: "600px",
    margin: "auto",
    marginTop: "50px",
  };

  const titleStyle = {
    fontSize: "30px",
    marginBottom: "20px",
  };

  const contentStyle = {
    marginBottom: "20px",
  };

  const actionsStyle = {
    display: "flex",
    justifyContent: "flex-end",
  };

  return (
    <Card style={cardStyle}>
      {error ? (
        <div className="container">
          <div className="text-danger">{error}</div>
        </div>
      ) : (
        data && (
          <>
            <CardContent>
              <Typography
                variant="div"
                color="textSecondary"
                style={titleStyle}
              >
                {data.companyName}
              </Typography>
              <Typography variant="body1" style={contentStyle}>
                Job Name: {data.name}
              </Typography>
              <Typography variant="body1" style={contentStyle}>
                Job Description: {data.description}
              </Typography>
              <Typography variant="body1" style={contentStyle}>
                Minimum Qulaification: {data.minimumQualification}
              </Typography>
              <Typography variant="body1" style={contentStyle}>
                Visa Requirements: {data.visaRequirements}
              </Typography>
              <Typography variant="body1" style={contentStyle}>
                Responsibilities: {data.responsibilities}
              </Typography>
            </CardContent>
            <CardActions style={actionsStyle}>
              <Button size="small" color="primary" onClick={handleClick}>
                Apply Now
              </Button>
            </CardActions>
          </>
        )
      )}
    </Card>
  );
};

export default JobDetailsPage;
