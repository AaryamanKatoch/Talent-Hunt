
import Box from '@mui/material/Box';
import React, {useState} from 'react';
import Stack from '@mui/material/Stack';

import { FormControl } from '@mui/material';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import { useResume } from '../ContextResume';


 import Textarea from '@mui/joy/Textarea';

function Projects(){
//   const [inputValue, setInputValue] = useState("");

const { personalDetails, setPersonalDetails, education, setEducation, skills, setSkills, experience, setExperience, projects, setProjects } = useResume();

    const addProjects = () => {
      let pr = {
          
            name: "",
            description: "",
      }
        setProjects([...projects, pr]);
    }
    const deleteProject = (id) => {
      setProjects(projects.filter((e,index) => index !== id))
  }

  const onProjectChange = (e, i) => {
    
    const updatedProject = projects.map((pro, index) => (
      i === index ? {...pro, [e.target.name] : e.target.value}: pro
    ));

    setProjects(updatedProject);
}

console.log(projects);
//   const theme = useTheme();
const [openSnackbar, setOpenSnackbar] = React.useState(false);
const [snackbarMessage, setSnackbarMessage] = React.useState('');

const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
const [errorSnackbarMessage, setErrorSnackbarMessage] = useState('');

async function postData(){
  try {
    let resumeData = {
      personalDetails : personalDetails,
      education : education,
      skills : skills,
      experience : experience,
      projects : projects
    };
    // console.log(resumeData);
    const postResumeData = await axios.post(`http://localhost:3000/jobseeker/create-resume`, resumeData,  { responseType: 'arraybuffer' });
    // const binaryData = atob(response.data);
    // const buffer = new ArrayBuffer(binaryData.length);
    // const view = new Uint8Array(buffer);

    // for (let i = 0; i < binaryData.length; i++) {
    //   view[i] = binaryData.charCodeAt(i);
    // }
    const blob = new Blob([postResumeData.data], { type: 'application/pdf' });
    // const blob = new Blob([buffer], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'resume.pdf';
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
    setOpenSnackbar(true);
    setSnackbarMessage('Your resume has been created!');
  } catch (e) {
    console.log(e);
     // console.log(e);
     const buffer = e.response.data;
     // console.log(buffer);
   const decoder = new TextDecoder('utf-8');
   // console.log(decoder);
   // console.log(decoder.decode(buffer));
   const errorResponse = JSON.parse(decoder.decode(buffer));
     console.log(errorResponse.error);
     setErrorSnackbarOpen(true);
     setErrorSnackbarMessage(errorResponse.error);
  }
}
  
     
      const [expanded, setExpanded] = React.useState(false);

      const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
      };
    return (
        <Box sx={{ width: '100%' }}>
           
          {
            projects.map((pro,index)=>(
             <Accordion expanded={expanded === index} onChange={handleChange(index)} key={index}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={index}
              id={index}
              key={index}
            >
              <Typography sx={{ width: '10%', flexShrink: 0 }}>
                Projects
              </Typography>
              
            </AccordionSummary>
            <AccordionDetails key={index}>
                <Stack spacing={2}>
                
                
                              
                
                <Stack spacing={{ xs: 1, sm: 2, md: 4 }}>
                <FormControl>
                    {/* <InputLabel htmlFor="bootstrap-input">
                        Address
                      </InputLabel> */}
                      {/* <FormLabel htmlFor="name">Contact</FormLabel> */}
                      <Textarea name='name' value={projects[index].name || ''} onChange={(e)=>{onProjectChange(e,index)}} variant='soft' size='md' label='Name' placeholder='Name'></Textarea>
                      {/* <BootstrapInput  label='Address'/> */}
                  </FormControl>
                </Stack>
                <Stack  spacing={{ xs: 1, sm: 2, md: 4 }}>
                  <FormControl>
                      {/* <InputLabel htmlFor="bootstrap-input">
                        Description
                      </InputLabel> */}
                      <Textarea name='description' value={projects[index].description || ''} onChange={(e)=>{onProjectChange(e,index)}} minRows={4}   variant='soft' size='md' label='Description' placeholder='Description'></Textarea>
                      {/* <BootstrapTextarea  minRows={4} style={{ ':focus' : { bordercolor: "#90caf9" }}}/> */}
                </FormControl>

                </Stack>
                <Stack direction="row" spacing={2}>
                  <Button variant="contained" size="small" color='error' onClick={() => deleteProject(index)}>Delete</Button>
                </Stack>
              </Stack>
            </AccordionDetails>
          </Accordion>
            ))
          }
          {
            projects.length < 6 && (
              
              <Box sx={{marginTop:2}}>
                <Stack direction="row" spacing={2}>
                  <Button variant="contained" size="small" onClick={addProjects}>Add Project</Button>
                </Stack>
              </Box>
              
            )
          }
          {
            <Box sx={{marginTop:2}}>
                <Stack direction='row' spacing={2}>
                  <Button variant='contained' size='small'onClick={postData}>Download</Button>
                </Stack>
            </Box>
          }
          {
            <Box>
              <Snackbar
                  open={openSnackbar}
                  autoHideDuration={6000}
                  onClose={() => setOpenSnackbar(false)}
                >
                  <MuiAlert
                    elevation={6}
                    variant="filled"
                    onClose={() => setOpenSnackbar(false)}
                    severity="success"
                  >
                    {snackbarMessage}
                  </MuiAlert>
                </Snackbar>
            </Box>
          }

          {
            <Box>
              <Snackbar open={errorSnackbarOpen} autoHideDuration={8000} onClose={()=> setErrorSnackbarOpen(false)}>
                <MuiAlert elevation={6} variant="filled" onClose={()=> setErrorSnackbarOpen(false)} severity="error">
                  {errorSnackbarMessage}
                </MuiAlert>
             </Snackbar>
            </Box>
          }

          
         
        </Box>
    );
}

export default Projects;