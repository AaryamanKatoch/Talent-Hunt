
import Box from '@mui/material/Box';
import React from 'react';
import Stack from '@mui/material/Stack';

import { FormControl } from '@mui/material';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


import Button from '@mui/material/Button';
import { useResume } from '../ContextResume';


 import Textarea from '@mui/joy/Textarea';

function Projects(){
//   const [inputValue, setInputValue] = useState("");

  const { projects, setProjects } = useResume();

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
                      <Textarea name='name'  onChange={(e)=>{onProjectChange(e,index)}} variant='soft' size='md' label='Name' placeholder='Name'></Textarea>
                      {/* <BootstrapInput  label='Address'/> */}
                  </FormControl>
                </Stack>
                <Stack  spacing={{ xs: 1, sm: 2, md: 4 }}>
                  <FormControl>
                      {/* <InputLabel htmlFor="bootstrap-input">
                        Description
                      </InputLabel> */}
                      <Textarea name='description' onChange={(e)=>{onProjectChange(e,index)}} minRows={4}   variant='soft' size='md' label='Description' placeholder='Description'></Textarea>
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
          
         
        </Box>
    );
}

export default Projects;