import Box from "@mui/material/Box";
import React, { useContext, useEffect } from "react";
import Stack from "@mui/material/Stack";
import { AuthContext } from "../firebase/Auth";
import { FormControl } from "@mui/material";
import FormLabel from '@mui/joy/FormLabel';
import Textarea from "@mui/joy/Textarea";
// import { useState } from 'react';
import { useResume } from "../ContextResume";

function PersonalDetails() {
  const { currentUser } = useContext(AuthContext);
  useEffect(() => {
    setPersonalDetails({ ...personalDetails, email: currentUser.email });
  }, []);

  const { personalDetails, setPersonalDetails } = useResume();
  const onDetailsChange = (e) => {
    setPersonalDetails({ ...personalDetails, [e.target.name]: e.target.value });
  };

   console.log(personalDetails);

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
    </Box>
  );
}

export default PersonalDetails;
