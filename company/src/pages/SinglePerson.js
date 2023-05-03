import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../api";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import {Button, Divider} from "@mui/material";
import Typography from "@mui/material/Typography";

function SinglePerson() {
  const params = useParams();
  const id = params.id;
  const [error, setError] = useState(null);
  const [jobSeeker, setJobSeeker] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await api.routes.getSingleJobSeeker(id);
        setJobSeeker(data);
      } catch (error) {
        setError(error.response.message);
      }
    };
    fetch();
  }, []);

  return (
    <div className="container">
      {jobSeeker && (
        <Card
          sx={{
            maxWidth: 1000,
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "100px",
          }}
        >
          <CardContent>
            <br />
            <div className="row">
              <div className="col-2">
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  NAME
                </Typography>
              </div>
              <div className="col-3">
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  {jobSeeker.name}
                </Typography>
              </div>
            </div>
            <Divider /><br />
            <div className="row">
              <div className="col-2">
                <Typography variant="body1" color="text.secondary" gutterBottom>
                  EMAIL
                </Typography>
              </div>
              <div className="col-3">
                <Typography variant="body1" color="text.secondary" gutterBottom>
                  {jobSeeker.email}
                </Typography>
              </div>
            </div><Divider /><br />
            <div className="row">
              <div className="col-2">
                <Typography variant="body1" color="text.secondary" gutterBottom>
                  SKILLS
                </Typography>
              </div>
              <div className="col-3">
                <Typography variant="body1" color="text.secondary" gutterBottom>                    
                  <ul style={{ listStyle: "none" }}>                    
                    {jobSeeker.skills.map((skill) => {
                      return <li key={Math.random()}>{skill}</li>;
                    })}
                  </ul>
                </Typography>
              </div>
            </div><Divider /><br />
            <div className="row">
              <div className="col-2">
                <Typography variant="body1" color="text.secondary" gutterBottom>
                  FIELD
                </Typography>
              </div>
              <div className="col-3">
                <Typography variant="body1" color="text.secondary" gutterBottom>
                  {jobSeeker.field_of_employment}
                </Typography>
              </div>
            </div><Divider /><br />
            <div className="row">
              <div className="col-2">
                <Typography variant="body1" color="text.secondary" gutterBottom>
                  EXPERIENCE
                </Typography>
              </div>
              <div className="col-3">
                <Typography variant="body1" color="text.secondary" gutterBottom>
                  {jobSeeker["years_of_experience"]} years
                </Typography>
              </div>
            </div>
          </CardContent>
          <CardActions>
            <Button size="normal" color="info">
              Get Resume
            </Button>
            <Link to='/findPeople'><Button size="normal" color="info" style={{marginLeft: "5px"}}>
              Go Back
            </Button></Link>
          </CardActions>
        </Card>
      )}
    </div>
  );
}

export default SinglePerson;
