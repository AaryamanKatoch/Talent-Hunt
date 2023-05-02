import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../firebase/Auth";
import EditJobForm from "../components/EditJobForm";
import { useParams, useNavigate } from "react-router-dom";
import JobCard from "../components/JobCard";

function EditJob() {
  const [hasProfile, setHasProfile] = useState(false);
  const [hasCreatedJob, setHasCreatedJob] = useState(false);
  const [jobData, setJobData] = useState(undefined);
  const [error, setError] = useState(undefined);
  const { currentUser } = useContext(AuthContext);
  let { id } = useParams();
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();

  const handleEditClick = () => {
    setEditing(true);
  };

  useEffect(() => {
    console.log("on load");
    checkuser();
    checkuserPostedJob();
  }, []);

  const checkuser = async () => {
    // Send formData to server to create profile
    await axios
      .get("http://localhost:3000/company/dashboard", {
        params: {
          email: currentUser.email,
        },
      })
      .then((response) => {
        // handle success
        if (response.data.noProfileExists) {
          setHasProfile(false);
        } else {
          setHasProfile(true);
        }
      })
      .catch((error) => {
        // handle error
        setHasProfile(false);
        setError(error.response.data);
      });
  };

  const checkuserPostedJob = async () => {
    // Send formData to server to create profile
    await axios
      .get(`http://localhost:3000/jobs/editJobByEmail/${id}`, {
        params: {
          email: currentUser.email,
        },
      })
      .then((response) => {
        // handle success
        setHasCreatedJob(true);
        setJobData(response.data);
      })
      .catch((error) => {
        // handle error
        setHasCreatedJob(false);
        setError(error.response.data);
      });
  };

  const handleEditJob = async (formData) => {
    formData.email = currentUser.email;
    // console.log(formData);
    await axios
      .patch(`http://localhost:3000/jobs/editJobByEmail/${id}`, formData)
      .then((response) => {
        // handle success
        setHasProfile(true);
        setJobData(response.data);
        setEditing(false);
        setError(undefined);
        console.log(response.data);
      })
      .catch((error) => {
        // handle error
        setError(error.response.data);
      });
  };

  const handleDeleteJob = async (formData) => {
    formData.email = currentUser.email;
    // console.log(formData);
    await axios
      .delete(`http://localhost:3000/jobs/editJobByEmail/${id}`, {
        params: {
          email: currentUser.email,
        },
      })
      .then((response) => {
        // handle success
        setHasProfile(true);
        setEditing(false);
        setError(undefined);
        navigate("/");
      })
      .catch((error) => {
        // handle error
        setError(error.response.data);
      });
  };

  if (error) {
    alert(error);
  }

  return (
    <div>
      <h1>Job Edit Page</h1>
      {hasProfile ? (
        <div>
          {hasCreatedJob && jobData ? (
            <div>
              {editing ? (
                <EditJobForm data={jobData} onSubmit={handleEditJob} />
              ) : (
                <JobCard
                  jobData={jobData}
                  onEditClick={handleEditClick}
                  onDeleteClick={handleDeleteJob}
                />
              )}
            </div>
          ) : (
            <h1>Job Not Found</h1>
          )}
        </div>
      ) : (
        <div>
          <h1>Please create Profile first.</h1>
        </div>
      )}
    </div>
  );
}

export default EditJob;
