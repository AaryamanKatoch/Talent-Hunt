import Box from "@mui/material/Box";
import React, { useState, useEffect, useContext } from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import PersonalDetails from "./PersonalDetails";
import Education from "./Education";
import Experience from "./Experience";
import Skills from "./Skills";
import Projects from "./Projects";
import { api } from "../api";
import { AuthContext } from "../firebase/Auth";
import { Link } from "react-router-dom";

function CreateResume() {
  const [value, setValue] = React.useState("1");
  const [flag, setFlag] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  useEffect(() => {
    const fetch = async () => {
      try {
        const jobSeeker = await api.routes.jobseeker(currentUser.email);
        if (jobSeeker.data.message === "No profile is created for the user") {
          setFlag(true);
          return;
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);

  if (flag) {
    return (
      <div className="container">
        Please Create a profile in dashboard before creating your resume.
        <Link to="/dashboard" style={{textDecoration:"none"}}> Go To Dashboard</Link>
      </div>
    );
  } else {
    return (
      <Box sx={{ width: "45%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange}>
              <Tab label="Personal Details" value="1" key={1} />
              <Tab label="Education" value="2" key={2} />
              <Tab label="Experience" value="3" key={3} />
              <Tab label="Skills" value="4" key={4} />
              <Tab label="Project" value="5" key={5} />
            </TabList>
          </Box>
          <TabPanel value="1" key={1}>
            <PersonalDetails />
          </TabPanel>
          <TabPanel value="2" key={2}>
            <Education />
          </TabPanel>
          <TabPanel value="3" key={3}>
            <Experience />
          </TabPanel>
          <TabPanel value="4" key={4}>
            <Skills />
          </TabPanel>
          <TabPanel value="5" key={5}>
            <Projects />
          </TabPanel>
        </TabContext>
      </Box>
    );
  }
}
export default CreateResume;
