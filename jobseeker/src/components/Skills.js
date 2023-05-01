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

                    
                        
                     
                       <Textarea  name='skill'  value={inputValue} size='lg' label='Skills' onChange={handleInputChange} placeholder="Skill" variant="soft" />
                    {/* <BootstrapInput  name='skill' value={inputValue} label='Skills' onChange={handleInputChange}/> */}
                </FormControl>
                
                    <Box paddingTop='13px'>
                        <Stack direction="row" spacing={2}>
                            <Button variant="contained" size="small" onClick={addSkill}>Add Skill</Button>
                        </Stack>
                    </Box>
                
                </Stack> 
                <Box sx={{ display: 'flex',alignItems: 'flex-start', border: '1px solid #EDF2F7',backgroundColor: '#EDF2F7', marginTop: 5, borderWidth : '1px', justifyContent: 'flex-start', width: '75%' }} borderColor={'#EDF2F7'}>
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