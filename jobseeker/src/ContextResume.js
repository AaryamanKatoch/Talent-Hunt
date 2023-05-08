import { createContext, useContext, useState } from "react";

const ResumeContext = createContext();

export const useResume = () => useContext(ResumeContext);

export const ResumeProvider = ({ children }) => {

    const [personalDetails, setPersonalDetails] = useState({
        name: "",
        address: "",
        email: "",
        linkedin: "",
        contact: "",      
        
    });

    const [education, setEducation] = useState([
        {
            
            school: "",
            address:"",
            degree: "",
            gpa: "",                        
            startYear: "",
            endYear: "",
            
        },
    ]);

    const [skills, setSkills] = useState([]);

    const [experience, setExperience] = useState([
        {
         
            company: "",
            address: "",
            bulletPoints: [""],
            position: "",
            startYear: "",
            startMonth:"",
            endYear: "",
            endMonth:""
            
        },
    ]);

    const [projects, setProjects] = useState([
        {
           
            name: "",
            description: "",
        },
    ]);


    const value = { personalDetails, setPersonalDetails, education, setEducation, skills, setSkills, experience, setExperience, projects, setProjects};

    return (
        <ResumeContext.Provider value={value}>
            {children}
        </ResumeContext.Provider>
    )
}