import Box from '@mui/material/Box';
import React, { useState, useCallback } from "react";
import Stack from '@mui/material/Stack';

import { FormControl } from '@mui/material';

import Button from '@mui/material/Button';
import { useResume } from '../ContextResume';
import Textarea from '@mui/joy/Textarea';

import Chip from '@mui/material/Chip';


function Skills(props){
    const AddSkills = () =>{
        const { skills, setSkills } = useResume();
    const [inputValue, setInputValue] = useState("");

    // const handleInputChange = (event) => {
    //     setInputValue(event.target.value);
    //   };

    


    const handleInputChange = useCallback((event) => {
        setInputValue(event.target.value);
      }, [setInputValue]);
    const addSkill = () => {
        
        if (inputValue.trim() !== "") {
            setSkills([...skills, inputValue.trim()]);
            setInputValue("");
          }
          
    }
    const deleteSkill = (skill) => {
      setSkills(skills.filter((elem,index) => skill !== elem))
  }
    
console.log(skills);
      return (
       
            <Box sx={{ width: '100%' }}>
            <Stack spacing={{ xs: 1, sm: 2, md: 4 }}>
                <Stack direction='row'  spacing={{ xs: 1, sm: 2, md: 4 }}>
                    <FormControl>
                    {/* <InputLabel htmlFor="Skills">
                        Skills
                    </InputLabel> */}
                    {/* <FormLabel htmlFor="name">Address</FormLabel> */}
                    {/* <TextField name='skill'  value={inputValue} variant='filled' size='small' label='Skills' onChange={handleInputChange} ></TextField> */}

                    
                        
                     
                    <label htmlFor="skill">Skills</label>
                      <Textarea
                       slotProps={{
                        textarea: {
                          id: 'skill',
                        }
                      }}
                       name='skill'  value={inputValue} size='lg' label='Skills' onChange={handleInputChange} placeholder="Skill" variant="soft" />
                    {/* <BootstrapInput  name='skill' value={inputValue} label='Skills' onChange={handleInputChange}/> */}
                </FormControl>
                
                    <Box paddingTop='32px'>
                        <Stack direction="row" spacing={2}>
                            <Button variant="contained" size="small" onClick={addSkill}>Add Skill</Button>
                        </Stack>
                    </Box>
                
                </Stack> 
                <Box sx={{ display: 'flex',alignItems: 'flex-start', marginTop: 5, justifyContent: 'flex-start' }} >
                    {skills.length > 0 && skills.map((skill,index)=>(
                         <Chip
                         color="primary"
                         label={skill}
                         key={index}
                         style={{ margin: 5 }}
                         onDelete={() => deleteSkill(skill)}
                       />
                    ))}
                </Box>               
            </Stack>
        </Box>
       
      );
    }

    return  (
        <AddSkills/>
    );
}

export default Skills;