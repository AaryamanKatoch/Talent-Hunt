
import Box from '@mui/material/Box';
import React from 'react';
import Stack from '@mui/material/Stack';

import { FormControl } from '@mui/material';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import { useResume } from '../ContextResume';
import Textarea from '@mui/joy/Textarea';

function Education(){
 

  const { education, setEducation } = useResume();

    const addEducation = () => {
      let ed = {
      
        school: "",
        address:"",
        degree: "",
        gpa: "",                        
        startYear: "",
        endYear: "",
        
    }
    // console.log(education.push(ed));

    // setEducation();
         setEducation([...education, ed]);
    }
    const deleteEducation = (id) => {
      setEducation(education.filter((elem,index) => index !== id))
  }

  const onEducationChange = (e, index) => {
    
    const updatedEducation = education.map((edu, i) => (
        // edu.id === index ? Object.assign(edu, { id: uuidv4(), [e.target.name]: e.target.value }) : edu
        i === index ? {...edu, [e.target.name] : e.target.value}: edu
    ));
      // console.log(index);
      //  console.log(index);
    setEducation(updatedEducation);
}
  
     console.log(education); 

      const [expanded, setExpanded] = React.useState(false);

      const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
      };
    return (
        <Box sx={{ width: '100%' }}>
           
          {
            education.map((edu,index)=>(
              <Accordion expanded={expanded === index} onChange={handleChange(index)} key={index}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={index}
              id={index}
              key={index}
            >
              <Typography sx={{ width: '10%', flexShrink: 0 }}>
                Degree
              </Typography>
              
            </AccordionSummary>
            <AccordionDetails key={index}>
                <Stack spacing={2}>
                <Stack direction={{ xs: 'column', sm: 'row' }}  spacing={{ xs: 1, sm: 2, md: 4 }}>
                <FormControl>
                {/* <InputLabel  htmlFor="bootstrap-input">
                  School
                </InputLabel> */}
                {/* {console.log(index)} */}
                <Textarea name='school'  value={education[index].school || ''}   variant='soft' size='md' label='School' placeholder='School' onChange={(e)=>{onEducationChange(e,index)}}></Textarea>
                      {/* <FormLabel htmlFor="name">Full Name</FormLabel> */}
                      {/* <BootstrapInput label='School'/> */}
                  </FormControl>
                  <FormControl>
                  {/* <InputLabel htmlFor="bootstrap-input">
                    Degree
                  </InputLabel> */}
                      {/* <FormLabel htmlFor="name">Email</FormLabel> */}
                      <Textarea name='degree' value={education[index].degree || ''}  variant='soft' size='md' label='Degree' placeholder='Degree' onChange={(e)=>{onEducationChange(e,index)}}></Textarea>
                      {/* <BootstrapInput label='Degree'/> */}
                  </FormControl>
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }}  spacing={{ xs: 1, sm: 2, md: 4 }}>
                <FormControl>
                    {/* <InputLabel htmlFor="bootstrap-input">
                        Address
                      </InputLabel> */}
                      {/* <FormLabel htmlFor="name">Contact</FormLabel> */}
                      <Textarea name='address' value={education[index].address || ''}  variant='soft' size='md' label='Address' placeholder='Address' onChange={(e)=>{onEducationChange(e,index)}}></Textarea>
                      {/* <BootstrapInput label='Address'/> */}
                  </FormControl>
                  <FormControl>
                      {/* <InputLabel htmlFor="bootstrap-input">
                        GPA
                      </InputLabel> */}
                      {/* <FormLabel htmlFor="name">Address</FormLabel> */}
                      <Textarea name='gpa' value={education[index].gpa || ''}  variant='soft' size='md' label='GPA'  placeholder='GPA' onChange={(e)=>{onEducationChange(e,index)}}></Textarea>
                      {/* <BootstrapInput label='GPA'/> */}
                  </FormControl>
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }}  spacing={{ xs: 1, sm: 2, md: 4 }}>
                <FormControl>
                    {/* <InputLabel htmlFor="bootstrap-input">
                        Start Year
                      </InputLabel>
                       <BootstrapInput label='Start Year'/>  */}
                       <Textarea name='startYear' value={education[index].startYear || ''}  variant='soft' size='md' label='Start year' placeholder='Start Year' onChange={(e)=>{onEducationChange(e,index)}}></Textarea>
                  </FormControl>
                  <FormControl>
                      {/* <InputLabel htmlFor="bootstrap-input">
                        End Year
                      </InputLabel> */}
                      {/* <FormLabel htmlFor="name">Address</FormLabel> */}
                      <Textarea name='endYear' value={education[index].endYear || ''}  variant='soft' size='md' label='End year' placeholder='End Year' onChange={(e)=>{onEducationChange(e,index)}}></Textarea>
                      {/* <BootstrapInput label='End Year'/> */}
                  </FormControl>
                </Stack>
                <Stack direction="row" spacing={2}>
                  <Button variant="contained" size="small" color='error' onClick={() => deleteEducation(index)}>Delete</Button>
                </Stack>
              </Stack>
            </AccordionDetails>
          </Accordion>
            ))
          }
          {
            education.length < 3 && (
              
              <Box sx={{marginTop:2}}>
                <Stack direction="row" spacing={2}>
                  <Button variant="contained" size="small" onClick={addEducation}>Add Education</Button>
                </Stack>
              </Box>
              
            )
          }
          
         
        </Box>
    );
}

export default Education;