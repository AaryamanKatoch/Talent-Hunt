import { Card, CardContent, Typography, Button } from "@mui/material";

function JobCard(props) {
  const { jobData, onEditClick, onDeleteClick } = props;

  return (
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
          Role: {jobData.name}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {jobData.description}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Responsibilities: {jobData.responsibilities}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Visa Requirements: {jobData.visaRequirements}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Minimum Qualification: {jobData.minimumQualification}
        </Typography>
        <Button variant="outlined" onClick={onEditClick}>
          Edit
        </Button>
        <Button variant="outlined" onClick={onDeleteClick}>
          Delete
        </Button>
      </CardContent>
    </Card>
  );
}

export default JobCard;
