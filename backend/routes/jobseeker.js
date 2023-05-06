const express = require("express");
const router = express.Router();
const xss = require("xss");
const data = require("../data");
const jobSeekerData = data.jobSeeker;
const helper = require("../helper");
const pdfCreateResume = require('../data/pdfCreateResume');
const resumes = require('../data/resumes');
const educationData = require('../data/education');
const experienceData = require('../data/experience');
const projectsData = require('../data/projects');
const fs = require('fs');
const common_helper = require("../helper/common");
const redis = require('redis');
const client = redis.createClient();
client.connect().then(() => {});
router
  .route("/dashboard")
  .get(async (req, res) => {
    try {
      // let id = "64406ecb4339df491dac4d4b";
      // id = helper.common.checkIsProperId(id);
      // const data = await jobSeekerData.getJobSeekerByID(id);
      let email = req.query.email;
      email = helper.common.isValidEmail(email);
      const profileExists = await jobSeekerData.profileExists(email);
      if (profileExists) {
        const data = await jobSeekerData.getJobSeekerByEmail(email);
        return res.json(data);
      } else {
        res.json({
          noProfileExists: true,
          message: "No profile is created for the user",
        });
      }
    } catch (e) {
      if (typeof e !== "object" || !("status" in e)) {
        return res.status(500).json("Internal server error");
      } else {
        return res.status(parseInt(e.status)).json(e.error);
      }
    }
  })
  .post(async (req, res) => {
    try {
      let data = req.body;
      // let id = "64406ecb4339df491dac4d4b";
      // id = helper.common.checkIsProperId(id);
      // data = helper.jobseeker.isValidJobseekerData(data);
      // const updatedJobSeeker = await jobSeekerData.updateJobSeeker(
      //   id,
      //   data
      // );
      let email = data.email;
      email = helper.common.isValidEmail(email);
      data = helper.jobseeker.isValidJobseekerData(data);
      const newJobSeeker = await jobSeekerData.createJobSeeker(data, email);
      return res.json(newJobSeeker);
    } catch (e) {
      console.log(e);
      if (typeof e !== "object" || !("status" in e)) {
        console.log(e);
        return res.status(500).json("Internal server error");
      } else {
        return res.status(parseInt(e.status)).json(e.error);
      }
    }
  })
  .patch(async (req, res) => {
    try {
      let data = req.body;
      // let id = "64406ecb4339df491dac4d4b";
      // id = helper.common.checkIsProperId(id);
      // data = helper.jobseeker.isValidJobseekerData(data);
      // const updatedJobSeeker = await jobSeekerData.updateJobSeeker(
      //   id,
      //   data
      // );
      let email = data.email;
      email = helper.common.isValidEmail(email);
      data = helper.jobseeker.isValidJobseekerData(data);
      const updatedJobSeeker = await jobSeekerData.updateJobSeekerByEmail(
        email,
        data
      );
      return res.json(updatedJobSeeker);
    } catch (e) {
      if (typeof e !== "object" || !("status" in e)) {
        console.log(e);
        return res.status(500).json("Internal server error");
      } else {
        return res.status(parseInt(e.status)).json(e.error);
      }
    }
  });

router
  .route("/singleJobSeeker/:id")
  .get(async (req, res) => {
    let id = req.params.id;
    try {
      id = helper.common.checkIsProperId(id);
      const data = await jobSeekerData.getJobSeekerByID(id);
      res.json(data);
    } catch (e) {
      if (typeof e !== "object" || !("status" in e)) {
        // console.log(e);
        return res.status(500).json("Internal server error");
      } else {
        return res.status(parseInt(e.status)).json(e.error);
      }
    }
  })
  .patch(async (req, res) => {
    try {
      let data = req.body;
      let id = req.params.id;
      id = helper.common.checkIsProperId(id);
      data = helper.jobseeker.isValidJobseekerData(data);
      const updatedJobSeeker = await jobSeekerData.updateJobSeeker(id, data);
      res.json(updatedJobSeeker);
      return;
    } catch (e) {
      if (typeof e !== "object" || !("status" in e)) {
        console.log(e);
        return res.status(500).json("Internal server error");
      } else {
        return res.status(parseInt(e.status)).json(e.error);
      }
    }
  });

router
  .route("/jobs") //GET all jobs
  .get(async (req, res) => {
    try {
      //console.log(req.query)
      const pageNumber = parseInt(req.query.page) || 1;
      const search = req.query.search || "";
      const visaReq = req.query.visaReq || "";
      const minQual = req.query.minQual || "";
      // console.log('0',pageNumber,"*****");
      // console.log('1',search,"*****");
      // console.log('2',visaReq,"*****");
      // console.log('3',minQual,"*****");
      const data = await jobSeekerData.getAllJobs(pageNumber,search,visaReq,minQual);
      res.json(data);
      return;
    } catch (e) {
      if (typeof e !== "object" || !("status" in e)) {
        console.log(e);
        res.status(500).json("Internal server error");
      } else {
        res.status(parseInt(e.status)).json(e.error);
      }
    }
  });

router
  .route("/HistoryOfApplications")
  .get(async (req, res) => {
    try {
      let email = req.query.email;
      email = common_helper.isValidEmail(email);
      const data = await jobSeekerData.get_history_of_applications_by_email(email);
      if(data){
        await client.set('jobSeekerApplications', JSON.stringify(data));
      }
      res.json(data);
      return;
    } catch (e) {
      if (typeof e !== "object" || !("status" in e)) {
        console.log(e);
        res.status(500).json("Internal server error");
      } else {
        res.status(parseInt(e.status)).json(e.error);
      }
    }
});

router.get("/allJobSeekers", async (req, res) => {
  try {
    const data = await jobSeekerData.getAllJobSeekers();
    res.status(200).json(data);
    return;
  } catch (e) {
    if (typeof e !== "object" || !("status" in e)) {
      console.log(e);
      res.status(500).json("Internal server error");
    } else {
      res.status(parseInt(e.status)).json(e.error);
    }
  }
});

router
    .route("/create-resume")
    .post(async (req,res)=>{
        let resumeData = req.body;
        //  console.log(resumeData.personalDetails);
        let personalDetails = resumeData.personalDetails;
        let education = resumeData.education;
        let experience = resumeData.experience;
        let projects = resumeData.projects;
        let skills = resumeData.skills;

     try {
        personalDetails.name = helper.common.isValidString(personalDetails.name, 'Name');
        
        personalDetails.address = helper.common.isValidString(personalDetails.address, 'Address');
       
        personalDetails.linkedin = helper.common.isValidURL(personalDetails.linkedin);
        
        personalDetails.email = helper.common.isValidEmail(personalDetails.email);
        // console.log("here");
        personalDetails.contact = helper.common.isValidContact(personalDetails.contact);
        // console.log("here");

        for(let i = 0; i < skills.length; i++){
            skills[i] = helper.common.isValidString(skills[i], 'Skill');
        }
       
     } catch (e) {
      if (typeof e !== "object" || !("status" in e)) {
        console.log(e);
        return res.status(500).json("Internal server error");
      } else {
        return res.status(parseInt(e.status)).json(e.error);
      }
     }
     let createdResume;
        try {
            createdResume = await resumes.createResume(personalDetails.name,  personalDetails.address, personalDetails.linkedin, personalDetails.email, personalDetails.contact, skills)
            //  console.log(createdResume);
        } catch (e) {
          if (typeof e !== "object" || !("status" in e)) {
            console.log(e);
           return res.status(500).json("Internal server error");
          } else {
           return res.status(parseInt(e.status)).json(e.error);
          }
        }
        // console.log(education);
        try {
            for(let  i =0 ; i < education.length; i++){
                education[i].school = helper.common.isValidString(education[i].school,'School');
                education[i].address = helper.common.isValidString(education[i].address,'Address');
                education[i].degree = helper.common.isValidString(education[i].degree,'Degree');
                education[i].gpa = helper.common.isValidGpa(education[i].gpa);
                education[i].startYear = helper.common.isValidYear(education[i].startYear);
                education[i].endYear = helper.common.isValidYear(education[i].endYear);
                helper.common.isValidStartEndYear(education[i].startYear,education[i].endYear);
                let createdEducation = await educationData.createEducation(createdResume._id,education[i].school, education[i].address, education[i].degree, education[i].gpa, education[i].startYear, education[i].endYear);
                //  console.log(createdEducation);
            }
        } catch (e) {
          if (typeof e !== "object" || !("status" in e)) {
            console.log(e);
           return res.status(500).json("Internal server error");
          } else {
           return res.status(parseInt(e.status)).json(e.error);
          }
        }

        try {
            for(let  i =0 ; i < experience.length; i++){
                experience[i].company = helper.common.isValidString(experience[i].company,'Company');    
                experience[i].address = helper.common.isValidString(experience[i].address,'Address');
                experience[i].position = helper.common.isValidString(experience[i].position, 'Position');
                experience[i].startYear = helper.common.isValidYear(experience[i].startYear);                
                experience[i].endYear = helper.common.isValidYear(experience[i].endYear);                
                helper.common.isValidStartEndYear(experience[i].startYear,experience[i].endYear);            
                experience[i].startMonth = helper.common.isValidMonth(experience[i].startMonth);            
                experience[i].endMonth = helper.common.isValidMonth(experience[i].endMonth);                
                experience[i].description = helper.common.isValidString(experience[i].description);

                let createdExperience = await experienceData.createExperience(createdResume._id,experience[i].company, experience[i].address, experience[i].position, experience[i].description, experience[i].startYear, experience[i].endYear, experience[i].startMonth, experience[i].endMonth);
                 console.log(createdExperience);
            }
        } catch (e) {
          if (typeof e !== "object" || !("status" in e)) {
            console.log(e);
           return res.status(500).json("Internal server error");
          } else {
            return res.status(parseInt(e.status)).json(e.error);
          }
        }

        try {
            for(let  i =0 ; i < projects.length; i++){
                projects[i].name = helper.common.isValidString(projects[i].name,'Project Name');
                projects[i].description = helper.common.isValidString(projects[i].description, 'Project Description');

                let createdProject = await projectsData.createProject(createdResume._id,projects[i].name, projects[i].description);
                // console.log(createdProject);
            }
        } catch (e) {
          if (typeof e !== "object" || !("status" in e)) {
            console.log(e);
            return res.status(500).json("Internal server error");
          } else {
            return res.status(parseInt(e.status)).json(e.error);
          }
        }
        console.log("here done");
        let pdf =  await pdfCreateResume.createResumePdf(resumeData);
        // console.log(pdf);
        return res.send(pdf);
        // return;
    });


module.exports = router;
