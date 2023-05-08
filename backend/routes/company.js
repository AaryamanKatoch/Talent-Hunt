const express = require("express");
const router = express.Router();
const xss = require("xss");
const data = require("../data");
const companyData = data.company;
const jobseekerData = data.jobSeeker;
const helper = require("../helper");
const { ObjectId } = require("mongodb");
const streamToBuffer = require('stream-to-buffer');
const pdfCreateResume = require("../data/pdfCreateResume");

router
  .route("/dashboard")
  .get(async (req, res) => {
    try {
      // let id = "64406ecb4339df491dac4d4b";
      // id = helper.common.checkIsProperId(id);
      // const data = await jobSeekerData.getJobSeekerByID(id);
      let email = req.query.email;
      email = helper.common.isValidEmail(email);
      const profileExists = await companyData.profileExists(email);
      if (profileExists) {
        const data = await companyData.getCompanyByEmail(email);
        return res.json(data);
      } else {
        res.json({
          noProfileExists: true,
          message: "No profile is created for the user",
        });
      }
    } catch (e) {
      if (typeof e !== "object" || !("status" in e)) {
        console.log(e);
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
      console.log(data);
      let email = data.email;
      email = helper.common.isValidEmail(email);
      data = helper.company.isValidCompanyData(data);
      const newCompany = await companyData.createCompany(data, email);
      return res.json(newCompany);
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
      data = helper.company.isValidCompanyData(data);
      const updatedCompany = await companyData.updateCompanyByEmail(
        email,
        data
      );
      return res.json(updatedCompany);
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
  .route("/")
  .get(async (req, res) => {
    try {
      // let id = req.session.id;
      let id = "643485c32aa19be61c88787b"; //temp id. In the future it'll be taken from the session/token/redis whatever we decide.
      id = helper.common.isValidId(id);
      const data = await companyData.getCompanyDataById(id);
      res.json(data);
    } catch (e) {
      if (typeof e !== "object" || !("status" in e)) {
        console.log(e);
        res.status(500).json("Internal server error");
      } else {
        res.status(parseInt(e.status)).json(e.error);
      }
    }
  })
  .patch(async (req, res) => {
    let data = req.body;
    // console.log(data);
    try {
      for (let i in data) {
        if (typeof data[i] === "object") {
          for (let j in data[i])
            if (Array.isArray(data[i][j]))
              data[i][j] = data[i][j].map((element) => {
                return xss(element);
              });
            else data[i][j] = xss(data[i][j]);
        } else {
          data[i] = xss(data[i]);
        }
      }

      // let id = req.session.company._id;
      let id = "643485c32aa19be61c88787b"; //temp id. In the future it'll be taken from the session/token/redis whatever we decide.
      id = helper.common.isValidId(id);
      data = helper.company.isValidCompanyData(data);

      const updatedCompany = await companyData.updateCompany(id, data);
      res.json(updatedCompany);
    } catch (e) {
      if (typeof e !== "object" || !("status" in e)) {
        console.log(e);
        res.status(500).json("Internal server error");
      } else {
        res.status(parseInt(e.status)).json(e.error);
      }
    }
  });

router.route("/jobseeker/:jobseekerId").get(async (req, res) => {
  try {
    // console.log("Here :  " + req.params.jobseekerId);
    const jobseekerId = helper.common.isValidId(req.params.jobseekerId);
    const jobseeker = await jobseekerData.getJobSeekerByID(jobseekerId);
    let resume;
    if (jobseeker.resumeId) {
      resume = await jobseekerData.getResumeByID(jobseeker.resumeId);
    }
    res.json(resume);
  } catch (e) {
    if (typeof e !== "object" || !("status" in e)) {
      console.log(e);
      res.status(500).json("Internal server error");
    } else {
      res.status(parseInt(e.status)).json(e.error);
    }
  }
})
.post(async (req,res)=>{
  let resumeData = req.body;
  
  try {
    resumeData.name = helper.common.isValidString(resumeData.name, 'Personal Name');
    resumeData.address = helper.common.isValidString(resumeData.address, 'Address');
    resumeData.linkedin = helper.common.isValidURL(resumeData.linkedin);
    resumeData.email = helper.common.isValidEmail(resumeData.email);
    resumeData.contact = helper.common.isValidContact(resumeData.contact);

        for(let i = 0; i < resumeData.skills.length; i++){
          resumeData.skills[i] = helper.common.isValidString(resumeData.skills[i], 'Skill');
        }
        
  } catch (e) {
    if (typeof e !== "object" || !("status" in e)) {
      return res.status(500).json({error : "Internal server error"});
    } else {
      return res.status(parseInt(e.status)).json({error : e.error});
    }
  }

  try {
    for(let  i =0 ; i < resumeData.education.length; i++){
      resumeData.education[i].school = helper.common.isValidString(resumeData.education[i].school,'School');
      resumeData.education[i].address = helper.common.isValidString(resumeData.education[i].address,'Address');
      resumeData.education[i].degree = helper.common.isValidString(resumeData.education[i].degree,'Degree');
      resumeData.education[i].gpa = helper.common.isValidGpa(resumeData.education[i].gpa);
      resumeData.education[i].startYear = helper.common.isValidYear(resumeData.education[i].startYear);
      resumeData.education[i].endYear = helper.common.isValidYear(resumeData.education[i].endYear);
      helper.common.isValidStartEndYear(resumeData.education[i].startYear,resumeData.education[i].endYear);
      // let createdEducation = await educationData.createEducation(createdResume._id,education[i].school, education[i].address, education[i].degree, education[i].gpa, education[i].startYear, education[i].endYear);
      // console.log(createdEducation);
      
  }
  } catch (e) {
    if (typeof e !== "object" || !("status" in e)) {
      return res.status(500).json({error : "Internal server error"});
    } else {
      return res.status(parseInt(e.status)).json({error : e.error});
    }
  }

  try {
    for(let  i =0 ; i < resumeData.experience.length; i++){
      resumeData.experience[i].company = helper.common.isValidString(resumeData.experience[i].company,'Company');    
      resumeData.experience[i].address = helper.common.isValidString(resumeData.experience[i].address,'Address');
      resumeData.experience[i].position = helper.common.isValidString(resumeData.experience[i].position, 'Position');
      resumeData.experience[i].startYear = helper.common.isValidYear(resumeData.experience[i].startYear);                
      resumeData.experience[i].endYear = helper.common.isValidYear(resumeData.experience[i].endYear);                
      helper.common.isValidStartEndYear(resumeData.experience[i].startYear,resumeData.experience[i].endYear);            
      resumeData.experience[i].startMonth = helper.common.isValidMonth(resumeData.experience[i].startMonth);            
      resumeData.experience[i].endMonth = helper.common.isValidMonth(resumeData.experience[i].endMonth);                
      // experience[i].description = helper.common.isValidString(experience[i].description);

      for(let j = 0; j < resumeData.experience[i].bulletPoints.length; j++){
        resumeData.experience[i].bulletPoints[j] = helper.common.isValidString(resumeData.experience[i].bulletPoints[j]);
      }
      
      // let createdExperience = await experienceData.createExperience(createdResume._id,experience[i].company, experience[i].address, experience[i].position, experience[i].bulletPoints, experience[i].startYear, experience[i].endYear, experience[i].startMonth, experience[i].endMonth);
      // console.log(createdExperience);
  }
  } catch (e) {
    if (typeof e !== "object" || !("status" in e)) {
      return res.status(500).json({error : "Internal server error"});
    } else {
      return res.status(parseInt(e.status)).json({error : e.error});
    }
  }

  try {
    console.log(resumeData.projects.length);
    for(let  i =0 ; i < resumeData.projects.length; i++){
      resumeData.projects[i].name = helper.common.isValidString(resumeData.projects[i].name,'Project Name');
      resumeData.projects[i].description = helper.common.isValidString(resumeData.projects[i].description, 'Project Description');
      
      // let createdProject = await projectsData.createProject(createdResume._id,projects[i].name, projects[i].description);
      // console.log(createdProject);
  }
  } catch (e) {
    if (typeof e !== "object" || !("status" in e)) {
      return res.status(500).json({error : "Internal server error"});
    } else {
      return res.status(parseInt(e.status)).json({error : e.error});
    }
  }
  let personalDetails = {
    name : resumeData.name,
    address : resumeData.address,
    email : resumeData.email,
    contact : resumeData.contact,
    linkedin : resumeData.linkedin
  }

  let resumeObj = {
    personalDetails : personalDetails,
    education : resumeData.education,
    experience : resumeData.experience,
    projects : resumeData.projects,
    skills : resumeData.skills
  }
 
  try {
    let pdf =  await pdfCreateResume.createResumePdf(resumeObj);
    console.log("here routes - " );
        streamToBuffer(pdf, (err, buffer) => {
            if (err) {
              throw {status : 500, error : 'Error generating the pdf'}
            } else {
              res.set('Content-Type', 'application/pdf');
              res.set('Content-Disposition', 'attachment; filename="resume.pdf"');
             return  res.send(buffer);
            }
          });
  } catch (e) {
    if (typeof e !== "object" || !("status" in e)) {
      return res.status(500).json({error : "Internal server error"});
    } else {
      return res.status(parseInt(e.status)).json({error : e.error});
    }
  }
});

module.exports = router;
