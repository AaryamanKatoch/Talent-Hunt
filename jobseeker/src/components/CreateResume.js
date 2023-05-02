// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
// import { blue, green, red } from '@mui/material/colors';
import React from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import PersonalDetails  from './PersonalDetails';
import Education from './Education';
import Experience from './Experience';
import Skills from './Skills';
import Projects from './Projects';
function CreateResume(){
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '45%', typography: 'body1' }}>
      <TabContext  value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList  onChange={handleChange}>
            <Tab label="Personal Details" value="1" key={1} />
            <Tab label="Education" value="2" key={2}/>
            <Tab label="Experience" value="3" key={3}/>
            <Tab label="Skills" value="4" key={4}/>
            <Tab label="Project" value="5" key={5}/>
          </TabList>
        </Box>
        <TabPanel value="1" key={1}><PersonalDetails /></TabPanel>
        <TabPanel value="2" key={2}><Education/></TabPanel>
        <TabPanel value="3" key={3}><Experience/></TabPanel>
        <TabPanel value="4" key={4}><Skills /></TabPanel>
        <TabPanel value="5" key={5}><Projects/></TabPanel>
      </TabContext>
    </Box>
  );
}
export default CreateResume;