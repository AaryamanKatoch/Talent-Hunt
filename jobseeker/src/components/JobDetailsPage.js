import React from 'react';
import {
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';

const JobDetailsPage = () => {
  const cardStyle = {
    maxWidth: 600,
    margin: 'auto',
    marginTop: 50,
  };

  const titleStyle = {
    marginBottom: 20,
  };

  const contentStyle = {
    marginBottom: 20,
  };

  const actionsStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
  };

  return (
    <Card style={cardStyle}>
      <CardContent>
        <Typography variant="h4" style={titleStyle}>
          Job Description
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Company Name
        </Typography>
        <Typography variant="body1" style={contentStyle}>
          Minimum Qulaification
        </Typography>
        <Typography variant="body1" style={contentStyle}>
          Visa Requirements
        </Typography>
        <ul>
          <li>no Sponsorsjip</li>
          <li>dod clearance</li>
          <li>greencard</li>
          <li>N/AA</li>
        </ul>
        <Typography variant="body1" style={contentStyle}>
          Responsibilities:
        </Typography>

        <ul>
          <li>Design and develop software systems</li>
          <li>Collaborate with cross-functional teams</li>
          <li>Write clean, maintainable code</li>
          <li>Ensure software is properly tested and meets quality standards</li>
        </ul>
       
    
      </CardContent>
      <CardActions style={actionsStyle}>
        <Button size="small" color="primary">
          Apply Now
        </Button>
      </CardActions>
    </Card>
  );
};

export default JobDetailsPage;