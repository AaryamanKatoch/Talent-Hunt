
import Box from '@mui/material/Box';
import React from 'react';
import Stack from '@mui/material/Stack';

import { FormControl} from '@mui/material';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Button from '@mui/material/Button';
import { useResume } from '../ContextResume';


 import Textarea from '@mui/joy/Textarea';

function Experience(){


  const { experience, setExperience } = useResume();

    const addExperience = () => {
      let ex = {
        
          
          company: "",
          address: "",
          description: "",
          position: "",
          startYear: "",
          starMonth:"",
          endYear: "",
          endMonth:""
          
      
      }
        setExperience([...experience, ex]);
    }

    const deleteExperience = (id) => {
      setExperience(experience.filter((e,index) => index !== id))
  }

  const onExperienceChange = (e, i) => {
    
    const updatedExperience = experience.map((exp, index) => (
      i === index ? {...exp, [e.target.name] : e.target.value}: exp
    ));

    setExperience(updatedExperience);
}

console.log(experience);
  

      const [expanded, setExpanded] = React.useState(false);

      const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
      };
    return (
        <Box sx={{ width: '100%' }}>
           
          {
            experience.map((edu,index)=>(
              <Accordion expanded={expanded === index} onChange={handleChange(index)} key={index}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={index}
              id={index}
              key={index}
            >
              <Typography sx={{ width: '10%', flexShrink: 0 }}>
                Experience
              </Typography>
              
            </AccordionSummary>
            <AccordionDetails key={index}>
                <Stack spacing={2}>
                <Stack direction={{ xs: 'column', sm: 'row' }}  spacing={{ xs: 1, sm: 2, md: 4 }}>
                <FormControl>
                {/* <InputLabel  htmlFor="bootstrap-input">
                  Company
                </InputLabel> */}
                <Textarea name='company' onChange={(e)=>{onExperienceChange(e,index)}}  variant='soft' size='md' label='company' placeholder='Company'></Textarea>
                      {/* <FormLabel htmlFor="name">Full Name</FormLabel> */}
                      {/* <BootstrapInput label='Company'/> */}
                  </FormControl>
                  <FormControl>
                  {/* <InputLabel htmlFor="bootstrap-input">
                    Position
                  </InputLabel> */}
                  <Textarea name='position' onChange={(e,i)=>{onExperienceChange(e,index)}}  variant='soft' size='md' label='Position' placeholder='Position'></Textarea>
                      {/* <FormLabel htmlFor="name">Email</FormLabel>  */}
                      {/* <BootstrapInput label='Position'/> */}
                  </FormControl>
                </Stack>
                
                
                  {/* <FormControl>
                      <InputLabel htmlFor="bootstrap-input">
                        GPA
                      </InputLabel>
                        <FormLabel htmlFor="name">Address</FormLabel> 
                      <BootstrapInput label='GPA'/>
                  </FormControl> */}
                
                <Stack direction={{ xs: 'column', sm: 'row' }}  spacing={{ xs: 1, sm: 2, md: 4 }}>
                <FormControl>
                    {/* <InputLabel htmlFor="bootstrap-input">
                        Start Month
                      </InputLabel> */}
                      <Textarea name='startMonth' onChange={(e,i)=>{onExperienceChange(e,index)}}  variant='soft' size='md' label='Start Month' placeholder='Start Month'></Textarea>
                       {/* <BootstrapInput label='Start Month'/>  */}
                  </FormControl>
                  <FormControl>
                      {/* <InputLabel htmlFor="bootstrap-input">
                        Start Year
                      </InputLabel> */}
                      <Textarea name='startYear' onChange={(e,i)=>{onExperienceChange(e,index)}}  variant='soft' size='md' label='Start Year' placeholder='Start Year'></Textarea>
                      {/* <FormLabel htmlFor="name">Address</FormLabel> */}
                      {/* <BootstrapInput label='Start Year'/> */}
                  </FormControl>
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }}  spacing={{ xs: 1, sm: 2, md: 4 }}>
                <FormControl>
                    {/* <InputLabel htmlFor="bootstrap-input">
                        End Month
                      </InputLabel> */}
                      <Textarea name='endMonth' onChange={(e,i)=>{onExperienceChange(e,index)}}  variant='soft' size='md' label='End Month' placeholder='End Month'></Textarea>
                       {/* <BootstrapInput label='End Month'/>  */}
                  </FormControl>
                  <FormControl>
                      {/* <InputLabel htmlFor="bootstrap-input">
                        End Year
                      </InputLabel> */}
                      {/* <FormLabel htmlFor="name">Address</FormLabel> */}
                      <Textarea name='endYear' onChange={(e,i)=>{onExperienceChange(e,index)}}  variant='soft' size='md' label='End Year' placeholder='End Year'></Textarea>
                      {/* <BootstrapInput label='End Year'/> */}
                  </FormControl>
                </Stack>
                <Stack spacing={{ xs: 1, sm: 2, md: 4 }}>
                <FormControl>
                    {/* <InputLabel htmlFor="bootstrap-input">
                        Address
                      </InputLabel> */}
                      {/* <FormLabel htmlFor="name">Contact</FormLabel> */}
                      <Textarea name='address' onChange={(e,i)=>{onExperienceChange(e,index)}} variant='soft' size='md' label='Address' placeholder='Address'></Textarea>
                      {/* <BootstrapInput  label='Address'/> */}
                  </FormControl>
                </Stack>
                <Stack  spacing={{ xs: 1, sm: 2, md: 4 }}>
                  <FormControl>
                      {/* <InputLabel htmlFor="bootstrap-input">
                        Description
                      </InputLabel> */}
                      <Textarea name='description' onChange={(e,i)=>{onExperienceChange(e,index)}} minRows={4}   variant='soft' size='md' label='Description' placeholder='Description'></Textarea>
                      {/* <BootstrapTextarea  minRows={4} style={{ ':focus' : { bordercolor: "#90caf9" }}}/> */}
                </FormControl>

                </Stack>
                <Stack direction="row" spacing={2}>
                  <Button variant="contained" size="small" color='error' onClick={() => deleteExperience(index)}>Delete</Button>
                </Stack>
              </Stack>
            </AccordionDetails>
          </Accordion>
            ))
          }
          {
            experience.length < 5 && (
              
              <Box sx={{marginTop:2}}>
                <Stack direction="row" spacing={2}>
                  <Button variant="contained" size="small" onClick={addExperience}>Add Experience</Button>
                </Stack>
              </Box>
              
            )
          }
          
         
        </Box>
    );
}

export default Experience;