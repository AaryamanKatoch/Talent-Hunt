const companyData = require("./company");
const jobseekerData = require("./jobseeker");
const applicationData = require("./application");
const jobsData = require("./jobs");
const resumeData = require('./resumes');
const educationData = require('./education');
const experienceData = require('./experience');
const projectData = require('./projects');


module.exports = {
  company: companyData,
  jobSeeker: jobseekerData,
  application: applicationData,
  jobs: jobsData,
  resumes : resumeData,
  education : educationData,
  experience : experienceData,
  projects : projectData
};
