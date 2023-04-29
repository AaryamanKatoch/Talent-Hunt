import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../firebase/Auth";
import CreateProfile from "../components/CreateProfile";
import EditProfile from "../components/EditProfile";

function Dashboard() {
  const [hasProfile, setHasProfile] = useState(false);
  const [profileData, setProfileData] = useState(undefined);
  const [error, setError] = useState(undefined);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    console.log("on load");
    checkuser();
  }, []);

  const checkuser = async () => {
    // Send formData to server to create profile
    console.log(currentUser.email);
    await axios
      .get("http://localhost:3000/jobseeker/dashboard", {
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
          setProfileData(response.data);
        }
      })
      .catch((error) => {
        // handle error
        setHasProfile(false);
        setError(error.response.data);
      });

    // try {
    //   const response = await api.routes.jobseeker();
    //   if (response.data.noProfileExists) {
    //     setHasProfile(false);
    //   } else {
    //     setHasProfile(true);
    //     setProfileData(response.data);
    //   }
    // } catch (e) {
    //   setHasProfile(false);
    // }
  };

  const handleCreateProfile = async (formData) => {
    // Send formData to server to create profile
    formData.email = currentUser.email;
    console.log(formData);
    await axios
      .post("http://localhost:3000/jobseeker/dashboard", formData)
      .then((response) => {
        // handle success
        setHasProfile(true);
        setProfileData(response.data);
        setError(undefined);
      })
      .catch((error) => {
        // handle error
        setError(error.response.data);
      });
  };

  const handleEditProfile = async (formData) => {
    // Send formData to server to update profile
    formData.email = currentUser.email;
    console.log(formData);
    await axios
      .patch("http://localhost:3000/jobseeker/dashboard", formData)
      .then((response) => {
        // handle success
        setHasProfile(true);
        setProfileData(response.data);
        setError(undefined);
        console.log(response.data);
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
      <h1>User Dashboard</h1>
      {hasProfile ? (
        <EditProfile data={profileData} onSubmit={handleEditProfile} />
      ) : (
        <CreateProfile onSubmit={handleCreateProfile} />
      )}
    </div>
  );
}

export default Dashboard;
