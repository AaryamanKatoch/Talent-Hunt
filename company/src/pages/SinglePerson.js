import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../api";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { Button, Divider } from "@mui/material";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";
import { helper } from "../helper";

function SinglePerson() {
  const params = useParams();
  const id = params.id;
  const [error, setError] = useState(null);
  const [jobSeeker, setJobSeeker] = useState(null);
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
  const [errorSnackbarMessage, setErrorSnackbarMessage] = useState("");

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

  async function getResume() {
    let resumeData;

    try {
      if (jobSeeker && jobSeeker.resumeId) {
        const { data } = await api.routes.getResume(jobSeeker.resumeId);
        resumeData = data;
      }
    } catch (e) {
      setErrorSnackbarOpen(true);
      setErrorSnackbarMessage(e.toString());
      return;
    }

    try {
      resumeData.name = helper.resumeHelper.checkifpropername(resumeData.name);

      resumeData.address = helper.resumeHelper.checkifproperaddress(
        resumeData.address
      );

      resumeData.linkedin = helper.resumeHelper.isValidLinkedIn(
        resumeData.linkedin
      );

      resumeData.email = helper.resumeHelper.isValidEmail(resumeData.email);
      // console.log("Project : " + personalDetails.email)
      // console.log("here");
      resumeData.contact = helper.resumeHelper.isValidContact(resumeData.contact);
      // console.log("here");

      for (let i = 0; i < resumeData.skills.length; i++) {
        resumeData.skills[i] = helper.resumeHelper.checkifproperskills(
          resumeData.skills[i]
        );
      }
      setErrorSnackbarOpen(false);
    } catch (e) {
      // console.log(e.toString());
      setErrorSnackbarOpen(true);
      setErrorSnackbarMessage(e.toString());
      return;
    }

    try {
      for (let i = 0; i < resumeData.education.length; i++) {
        resumeData.education[i].school = helper.resumeHelper.checkifproperschool(
          resumeData.education[i].school
        );
        resumeData.education[i].address = helper.resumeHelper.checkifproperaddress(
          resumeData.education[i].address
        );
        resumeData.education[i].degree = helper.resumeHelper.checkifproperdegree(
          resumeData.education[i].degree
        );
        resumeData.education[i].gpa = helper.resumeHelper.isValidGpa(
          resumeData.education[i].gpa
        );
        resumeData.education[i].startYear = helper.resumeHelper.isValidYear(
          resumeData.education[i].startYear
        );
        resumeData.education[i].endYear = helper.resumeHelper.isValidYear(
          resumeData.education[i].endYear
        );
        helper.resumeHelper.isValidStartEndYear(
          resumeData.education[i].startYear,
          resumeData.education[i].endYear
        );
      }
      setErrorSnackbarOpen(false);
    } catch (e) {
      // console.log(e.toString());
      setErrorSnackbarOpen(true);
      setErrorSnackbarMessage(e.toString());
      return;
    }

    try {
      for (let i = 0; i < resumeData.experience.length; i++) {
        resumeData.experience[i].company = helper.resumeHelper.checkifpropercompany(
          resumeData.experience[i].company
        );
        resumeData.experience[i].address = helper.resumeHelper.checkifproperaddress(
          resumeData.experience[i].address
        );
        resumeData.experience[i].position = helper.resumeHelper.checkifproperposition(
          resumeData.experience[i].position
        );
        resumeData.experience[i].startYear = helper.resumeHelper.isValidYear(
          resumeData.experience[i].startYear
        );
        resumeData.experience[i].endYear = helper.resumeHelper.isValidYear(
          resumeData.experience[i].endYear
        );
        
        resumeData.experience[i].startMonth = helper.resumeHelper.isValidMonth(
          resumeData.experience[i].startMonth
        );
        resumeData.experience[i].endMonth = helper.resumeHelper.isValidMonth(
          resumeData.experience[i].endMonth
        );
        helper.resumeHelper.isValidStartEndYear(
          resumeData.experience[i].startYear,
          resumeData.experience[i].endYear,
          resumeData.experience[i].startMonth,
          resumeData.experience[i].endMonth
        );
        for (let j = 0; j < resumeData.experience[i].bulletPoints.length; j++) {
          resumeData.experience[i].bulletPoints[j] =
            helper.resumeHelper.checkifproperbullet(
              resumeData.experience[i].bulletPoints[j]
            );
        }
      }
      setErrorSnackbarOpen(false);
    } catch (e) {
      // console.log(e.toString());
      setErrorSnackbarOpen(true);
      setErrorSnackbarMessage(e.toString());
      return;
    }

    try {
      for (let i = 0; i < resumeData.projects.length; i++) {
        resumeData.projects[i].name = helper.resumeHelper.checkifproperprojectname(
          resumeData.projects[i].name
        );
        resumeData.projects[i].description = helper.resumeHelper.checkifproperprojectdescription(
          resumeData.projects[i].description
        );
      }
      setErrorSnackbarOpen(false);
    } catch (e) {
      // console.log(e.toString());
      setErrorSnackbarOpen(true);
      setErrorSnackbarMessage(e.toString());
      return;
    }
    try {
      // console.log(errorSnackbarOpen);
      if (errorSnackbarOpen === false) {
        // console.log(jobSeeker._id);
        resumeData.education = JSON.stringify(resumeData.education);
        resumeData.experience = JSON.stringify(resumeData.experience);
        resumeData.skills = JSON.stringify(resumeData.skills);
        resumeData.projects = JSON.stringify(resumeData.projects);
        const postResumeData = await axios.post(
          `http://localhost:3000/company/jobseeker/${jobSeeker._id}`,
          resumeData,
          { responseType: "arraybuffer" }
        );

        const blob = new Blob([postResumeData.data], {
          type: "application/pdf",
        });
        // const blob = new Blob([buffer], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "resume.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        // toast.success('Your resume has been created!');
        console.log(postResumeData.status);
        // if (postResumeData.status === 200) {
        //   console.log('here');
        //   setSnackbarMessage("Your resume has been created!");
        // }
        setErrorSnackbarOpen(false);
        // setOpenSnackbar(true);
        // setSnackbarMessage('Your resume has been created!');
      }
    } catch (e) {
      // console.log(e);
      // console.log(e);
      const buffer = e.response.data;
      // console.log(buffer);
      const decoder = new TextDecoder("utf-8");
      // console.log(decoder);
      // console.log(decoder.decode(buffer));
      const errorResponse = JSON.parse(decoder.decode(buffer));
      //  console.log(errorResponse.error);
      setErrorSnackbarOpen(true);
      setErrorSnackbarMessage(errorResponse.error);
    }
  }

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
            <Divider />
            <br />
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
            </div>
            <Divider />
            <br />
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
            </div>
            <Divider />
            <br />
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
            </div>
            <Divider />
            <br />
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
            <Button size="normal" color="info" onClick={getResume}>
              Get Resume
            </Button>
            <Link to="/">
              <Button size="normal" color="info" style={{ marginLeft: "5px" }}>
                Go Back
              </Button>
            </Link>
          </CardActions>
        </Card>
      )}
      <div>
        {
          <Snackbar
            open={errorSnackbarOpen}
            autoHideDuration={8000}
            onClose={() => setErrorSnackbarOpen(false)}
          >
            <MuiAlert
              elevation={6}
              variant="filled"
              onClose={() => setErrorSnackbarOpen(false)}
              severity="error"
            >
              {errorSnackbarMessage}
            </MuiAlert>
          </Snackbar>
        }
      </div>
    </div>
  );
}

export default SinglePerson;
