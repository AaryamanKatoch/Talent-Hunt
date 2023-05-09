import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../api";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material/";
import { helper } from "../helper";
import { AuthContext } from "../firebase/Auth";
import { jobseeker } from "../api/routes";

function Application() {
  const navigate = useNavigate();
  const params = useParams();
  const jobId = params.jobId;
  // console.log(jobId);
  const [jobData, setJobData] = useState();
  const [error, setError] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const [application, setApplication] = useState({
    firstName: "",
    lastName: "",
    email: currentUser.email,
    sex: "",
    visaStatus: "",
  });
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await api.routes.getJobDetails(jobId);
        // console.log(data);
        setJobData(data);
      } catch (error) {
        // console.log(error);
        console.log(error.response.data);
        setError(error.response.data);
      }
    };
    fetch();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      try {
        const jobSeeker = await api.routes.jobseeker(currentUser.email);
        if (jobSeeker.data.message === "No profile is created for the user") {
          setError("Create a profile and Resume before applying");
          setFlag(true);
          return;
        }

        //checking for resume
        const resume = await api.routes.getResume(jobSeeker.data.resumeId);

        //checking for past application if any.
        const jobSeekerApplications = await api.routes.getJobSeekerApplications(
          currentUser.email
        );
        jobSeekerApplications.data.map((application) => {
          if (application._id === jobData._id) {
            setFlag(true);
            throw new Error("You have already applied for this job");
          }
          return application;
        });
      } catch (error) {
        if (error.message === "You have already applied for this job") {
          setError(error.message);
          setFlag(true);
          return;
        } else if (error.message) {
          console.log(error.message);
          if (error.message === "Request failed with status code 404") {
            setError("Create a profile and Resume before applying");
            setFlag(true);
          }
        } else if (error.response.data) {
          console.log(error.response.data);
          setError(error.response.data);
        }
      }
    };
    fetch();
  }, [jobData]);

  const validateApplication = async (e) => {
    e.preventDefault();
    try {
      application.firstName = await helper.jobHelper.checkifproperflname(
        application.firstName
      );
      application.lastName = await helper.jobHelper.checkifproperflname(
        application.lastName
      );
      application.email = await helper.common.isValidEmail(application.email);
      application.sex = await helper.jobHelper.checkifpropersex(
        application.sex
      );
      application.visaStatus =
        await helper.jobHelper.checkifpropervisarequirements(
          application.visaStatus
        );
    } catch (error) {
      console.log("frontend", error.message);
      setError(error.message);
    }

    try {
      const newApplication = { ...application, jobId: jobData._id };
      const { data } = await api.routes.postJobApplication(newApplication);
      console.log(data);
      // navigate to my applications
      navigate("/myApplications");
    } catch (error) {
      console.log("backend", error.response.data);
      setError(error.response.data);
    }
  };

  return (
    <div>
      {jobData && (
        <>
          <div className="container mt-2">
            <p>Company: {jobData.companyName}</p>
            <p>Job Name: {jobData.name}</p>
            <p>Description: {jobData.description}</p>
          </div>
          <div
            className="card"
            style={{
              width: "80rem",
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "2rem",
            }}
          >
            {error ? (
              <div className="card-header error text-danger">{error}</div>
            ) : (
              ""
            )}
            <div className="card-body">
              <h1 className="card-title">Apply</h1>
              <br />
              <form onSubmit={validateApplication} id="register-form">
                <TextField
                  label="First Name"
                  onChange={(e) =>
                    setApplication({
                      ...application,
                      firstName: e.target.value,
                    })
                  }
                  required
                  variant="filled"
                  type="text"
                  sx={{ mb: 3 }}
                  fullWidth
                  value={application.firstName}
                />
                <TextField
                  label="Last Name"
                  onChange={(e) =>
                    setApplication({ ...application, lastName: e.target.value })
                  }
                  required
                  variant="filled"
                  color="primary"
                  type="text"
                  value={application.lastName}
                  fullWidth
                  sx={{ mb: 3 }}
                />
                <FormControl sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel color="primary">Visa Status</InputLabel>
                  <Select
                    label="Visa Status"
                    variant="filled"
                    value={application.visaStatus || ""}
                    onChange={(e) =>
                      setApplication({
                        ...application,
                        visaStatus: e.target.value,
                      })
                    }
                    color="primary"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"Citizen"}>Citizen</MenuItem>
                    <MenuItem value={"GreenCard"}>Green Card</MenuItem>
                    <MenuItem value={"H1B"}>H1B</MenuItem>
                    <MenuItem value={"F1"}>F1</MenuItem>
                    <MenuItem value={"H4EAD"}>H4EAD</MenuItem>
                  </Select>
                </FormControl>
                <br />
                <FormControl sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel
                    id="demo-simple-select-helper-label"
                    color="primary"
                  >
                    Sex
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    label="Sex"
                    variant="filled"
                    value={application.sex || ""}
                    onChange={(e) =>
                      setApplication({ ...application, sex: e.target.value })
                    }
                    color="primary"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"Male"}>Male</MenuItem>
                    <MenuItem value={"Female"}>Female</MenuItem>
                    <MenuItem value={"Choose not to specify"}>
                      Choose not to specify
                    </MenuItem>
                  </Select>
                </FormControl>
                <br /> <br />
                <div className="text-center">
                  <Button
                    variant="outlined"
                    color="primary"
                    type="submit"
                    disabled={flag}
                  >
                    Apply
                  </Button>
                </div>
                <br />
                <br />
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Application;
