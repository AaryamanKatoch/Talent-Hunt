import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../firebase/Auth";
import CreateProfile from "../components/CreateProfile";
import EditProfile from "../components/EditProfile";
import { Alert, Typography, CircularProgress } from "@mui/material";

function Dashboard() {
  const [hasProfile, setHasProfile] = useState(false);
  const [profileData, setProfileData] = useState(undefined);
  const [error, setError] = useState(undefined);
  const { currentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("on load");
    checkuser();
  }, []);

  const checkuser = async () => {
    setLoading(true);
    console.log(currentUser.email);
    await axios
      .get("http://localhost:3000/jobseeker/dashboard", {
        params: {
          email: currentUser.email,
        },
      })
      .then((response) => {
        if (response.data.noProfileExists) {
          setHasProfile(false);
        } else {
          setHasProfile(true);
          setProfileData(response.data);
        }
      })
      .catch((error) => {
        setHasProfile(false);
        setError(error.response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleCreateProfile = async (formData) => {
    formData.email = currentUser.email;
    setLoading(true);
    await axios
      .post("http://localhost:3000/jobseeker/dashboard", formData)
      .then((response) => {
        setHasProfile(true);
        setProfileData(response.data);
        setError(undefined);
      })
      .catch((error) => {
        setError(error.response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleEditProfile = async (formData) => {
    formData.email = currentUser.email;
    setLoading(true);
    await axios
      .patch("http://localhost:3000/jobseeker/dashboard", formData)
      .then((response) => {
        setHasProfile(true);
        setProfileData(response.data);
        setError(undefined);
      })
      .catch((error) => {
        setError(error.response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <h1>User Dashboard</h1>
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
        <EditProfile data={profileData} onSubmit={handleEditProfile} />
      ) : (
        <CreateProfile onSubmit={handleCreateProfile} />
      )}
    </div>
  );
}

export default Dashboard;
