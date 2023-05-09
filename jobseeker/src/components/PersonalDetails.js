import Box from "@mui/material/Box";
import React, { useContext, useEffect } from "react";
import Stack from "@mui/material/Stack";
import { AuthContext } from "../firebase/Auth";
import { FormControl } from "@mui/material";
import FormLabel from '@mui/joy/FormLabel';
import Textarea from "@mui/joy/Textarea";
import Button from "@mui/material/Button";
// import { useState } from 'react';
import { useResume } from "../ContextResume";

function PersonalDetails() {
  const { currentUser } = useContext(AuthContext);
  const {
    personalDetails,
    setPersonalDetails,
    education,
    setEducation,
    skills,
    setSkills,
    experience,
    setExperience,
    projects,
    setProjects,
  } = useResume();
  useEffect(() => {
    setPersonalDetails({ ...personalDetails, email: currentUser.email });
  }, []);

  // const { personalDetails, setPersonalDetails } = useResume();
  const onDetailsChange = (e) => {
    setPersonalDetails({ ...personalDetails, [e.target.name]: e.target.value });
  };

  //  console.log(personalDetails);

//    const populateValues=()=>{
//     setPersonalDetails({ ...personalDetails, email: currentUser.email, name : 'Parth Rajeshkumar Patel', contact : '5512547630', address : 'Jersey City, NJ', linkedin : 'https://www.linkedin.com/in/parthpatel33/' });

//     let ed1 = {
      
//       school: "Stevens Institute of Technology",
//       address:"Hoboken, NJ",
//       degree: "Masters of Science in Computer Science",
//       gpa: "4",                        
//       startYear: "2022",
//       endYear: "2024",
      
//   }
//   let ed2 = {
      
//     school: "Nirma University",
//     address:"Ahmedabad, India",
//     degree: "Bachelors of Science in Computer Science",
//     gpa: "3",                        
//     startYear: "2017",
//     endYear: "2021",
    
// }
// let edu = [ed1, ed2];
// setEducation(edu);

// let exp1 = {      
          
//   company: "Tata Consultancy Services",
//   address: "Gandhinagar, India",
//   bulletPoints: ["Created an automation framework which tests the performance of scalability and reliability of ITSI Splunk application.", "Drove the development of a model-based automated testing framework for the Aurora database engine in an attempt to replace manually programmed tests in collaboration with the Aurora Storage team.", "The framework helped in identifying the weak performing features of the ITSI app, which after the fixes reduced 22% of data loss happening in previous version of the app."],
//   position: "Software Development Engineer",
//   startYear: "2021",
//   startMonth:"July",
//   endYear: "2022",
//   endMonth:"July" 

// }

// let exp2 = {      
          
//   company: "Amazon",
//   address: "Banglore, India",
//   bulletPoints: ["Created an automation framework which tests the performance of scalability and reliability of ITSI Splunk application.", "Drove the development of a model-based automated testing framework for the Aurora database engine in an attempt to replace manually programmed tests in collaboration with the Aurora Storage team.", "The framework helped in identifying the weak performing features of the ITSI app, which after the fixes reduced 22% of data loss happening in previous version of the app."],
//   position: "Software Development Engineer",
//   startYear: "2017",
//   startMonth:"July",
//   endYear: "2022",
//   endMonth:"July" 

// }

// let exper = [exp1,exp2];
// setExperience(exper);

// let ski = ['Java', 'C++','Node.js', 'Python', 'Javascript', 'HTML', 'CSS', 'C', 'PHP', 'React.js'];
// setSkills(ski);

// let pro1 = {
//   name : 'Messaging App',
//   description : 'Created a secure real-time messaging platform where users can connect and share texts, images, videos and documents using websockets as the mode of communication. Used micro-services to manage each and every detail on UI. Used cryptographic algorithm to secure the messages exchanged between the users.'
// }

// let pro2 = {
//   name : 'Stay N Eat',
//   description : 'Created a secure, robust and resilient micro-service oriented platform for booking hotel rooms and ordering food. Implemented an asynchronous messaging queue for preparation and delivery of orders based on multiple parameters like preparation time, delivery time and customer type which increased the customer satisfaction by 25%.'
// }
// let pro = [pro1,pro2];
// setProjects(pro);
// }

  return (
    <Box sx={{ width: "100%" }}>
      <Stack spacing={3}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
        >
          <FormControl>
            {/* <InputLabel  htmlFor="bootstrap-input">
              Full Name
            </InputLabel> */}
           <label htmlFor="name">Full Name</label>
            <Textarea
            slotProps={{
              textarea: {
                id: 'name',
              }
            }}
            id="name"
              name="name"
              value={personalDetails.name || ''}
              variant="soft"
              size="md"
              label="Full Name"
              placeholder="Full Name"
              required
              onChange={(e) => {
                onDetailsChange(e);
              }}
            ></Textarea>

            {/* <FormLabel htmlFor="name">Full Name</FormLabel> */}
            {/* <BootstrapInput fullWidth label='Full Name'/> */}
          </FormControl>
          <FormControl>
            {/* <InputLabel htmlFor="bootstrap-input">
                Email
              </InputLabel> */}
              <label htmlFor="email">Email</label>
            <Textarea
            slotProps={{
              textarea: {
                id: 'email',
              }
            }}
              name="email"
              id="email"
              variant="soft"
              size="md"
              label="Email"
              placeholder="Email"
              value={currentUser.email}
              disable='true'
            ></Textarea>
            {/* <FormLabel htmlFor="name">Email</FormLabel> */}
            {/* <BootstrapInput fullWidth label='Email'/> */}
          </FormControl>
        </Stack>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
        >
          <FormControl>
            {/* <InputLabel htmlFor="bootstrap-input">
                    Contact
                  </InputLabel> */}
            <label htmlFor="contact">Contact</label>
            <Textarea
            slotProps={{
              textarea: {
                id: 'contact',
              }
            }}
              name="contact"
              id="contact"
              value={personalDetails.contact || ''} 
              color="neutral"
              variant="soft"
              size="md"
              label="Contact"
              placeholder="Contact"
              onChange={(e) => {
                onDetailsChange(e);
              }}
            ></Textarea>
            {/* <FormLabel htmlFor="name">Contact</FormLabel> */}
            {/* <BootstrapInput label='Contact'/> */}
          </FormControl>
          <FormControl>
            {/* <InputLabel htmlFor="bootstrap-input">
                    Address
                  </InputLabel> */}
            <label htmlFor="address">Address</label>
            <Textarea
            slotProps={{
              textarea: {
                id: 'address',
              }
            }}
              name="address"
              id="address"
              value={personalDetails.address || ''}
              variant="soft"
              size="md"
              label="Address"
              placeholder="Address"
              onChange={(e) => {
                onDetailsChange(e);
              }}
            ></Textarea>
            {/* <FormLabel htmlFor="name">Address</FormLabel> */}
            {/* <BootstrapInput label='Address'/> */}
          </FormControl>
        </Stack>
        <FormControl>
          {/* <InputLabel htmlFor="bootstrap-input">
                    LinkedIn
                  </InputLabel> */}
          <label htmlFor="linkedin">Linkedin</label>
          <Textarea
          slotProps={{
            textarea: {
              id: 'linkedin',
            }
          }}
            name="linkedin"
            id="linkedin"
            value={personalDetails.linkedin || ''} 
            variant="soft"
            size="md"
            label="Linkedin"
            placeholder="Linkedin"
            onChange={(e) => {
              onDetailsChange(e);
            }}
          ></Textarea>
          {/* <FormLabel htmlFor="name">Address</FormLabel> */}
          {/* <BootstrapInput label='LinkedIn'/> */}
        </FormControl>
      </Stack>
{/* 
      {(
        <Box sx={{ marginTop: 2 }}>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" size="small" onClick={populateValues}>
              Try Sample
            </Button>
          </Stack>
        </Box>
      )} */}
    </Box>
  );
}

export default PersonalDetails;
