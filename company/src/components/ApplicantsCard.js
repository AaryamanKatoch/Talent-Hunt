import { Card, CardContent, Typography, Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";

function ApplicantCard(props) {
  const { applicant } = props;
  return (
    <Grid item xs={10} sm={10} md={10} lg={10} xl={10} key={applicant._id}>
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
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            Name: {applicant.firstName} {applicant.lastName}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Email: {applicant.email}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Visa Status: {applicant.visaStatus}
          </Typography>
        </CardContent>
        <Button
          component={Link}
          to={`/jobSeeker/${applicant.jobSeekerId}`}
          variant="contained"
          color="primary"
        >
          More Details
        </Button>
      </Card>
    </Grid>
  );
}

export default ApplicantCard;
