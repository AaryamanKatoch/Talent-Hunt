import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../firebase/Auth";
import PostJobForm from "../components/PostJobForm";

function PostJob() {
  const [hasProfile, setHasProfile] = useState(false);
  const [error, setError] = useState(undefined);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    console.log("on load");
    checkuser();
  });

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

  const handlePostJob = async (formData) => {
    formData.email = currentUser.email;
    // console.log(formData);
    await axios
      .post("http://localhost:3000/jobs/postJobByEmail", formData)
      .then((response) => {
        // handle success
        setHasProfile(true);
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
      <h1>Job Post Page</h1>
      {hasProfile ? (
        <PostJobForm onSubmit={handlePostJob} />
      ) : (
        <h1>No Profile created to Post</h1>
      )}
    </div>
  );
}

export default PostJob;
