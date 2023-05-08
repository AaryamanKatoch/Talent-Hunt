import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../firebase/Auth";
import PostJobForm from "../components/PostJobForm";
import { useNavigate } from "react-router-dom";
import { Alert, Typography, CircularProgress } from "@mui/material";

function PostJob() {
  const [hasProfile, setHasProfile] = useState(false);
  const [error, setError] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("on load");
    checkuser();
  }, []);

  const checkuser = async () => {
    setLoading(true);
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
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handlePostJob = async (formData) => {
    formData.email = currentUser.email;
    setLoading(true);
    await axios
      .post("http://localhost:3000/jobs/postJobByEmail", formData)
      .then((response) => {
        // handle success
        setHasProfile(true);
        setError(undefined);
        navigate("/");
      })
      .catch((error) => {
        // handle error
        setError(error.response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <h1>Job Post Page</h1>
      {loading && (
        <div style={{ display: "flex", alignItems: "center" }}>
          <CircularProgress size={40} color="secondary" />
          <Typography variant="body1" style={{ marginLeft: 10 }}>
            Loading...
          </Typography>
        </div>
      )}
      {error && (
        <Alert severity="error" onClose={() => setError(undefined)}>
          {error}
        </Alert>
      )}
      {hasProfile ? (
        <PostJobForm onSubmit={handlePostJob} />
      ) : (
        <h1>No Profile created to Post</h1>
      )}
    </div>
  );
}

export default PostJob;
