import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { api } from "../api";

const JobDetailsPage = () => {
  const params = useParams();
  const id = params.jobId;
  const [data, setData] = useState();
  const [error, setError] = useState(null);

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

  const cardStyle = {
    maxWidth: 600,
    margin: "auto",
    marginTop: 50,
  };

  const titleStyle = {
    fontSize: 30,
    marginBottom: 20,
  };

  const contentStyle = {
    marginBottom: 20,
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
              <Link to={`/apply/${data._id}`}>
                <Button size="small" color="primary">
                  Apply Now
                </Button>
              </Link>
            </CardActions>
          </>
        )
      )}
    </Card>
  );
};

export default JobDetailsPage;
