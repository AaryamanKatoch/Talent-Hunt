const express = require("express");
const router = express.Router();
const xss = require("xss");
const jobsData = require("../data/jobs");
const jobseekerData = require("../data/jobseeker");
const applicationData=require("../data/application")
const jobs = mongoCollections.jobs;
const applications=mongoCollections.applications
const companies = mongoCollections.companies;
const jobhelper = require("../helper/jobHelpers");
const { ObjectId } = require("mongodb");
const mongoCollections = require("../config/mongoCollections");

// after making form frontend
// 1 get to get form
// 1 post to submit response

router.route("/apply").post(async (req, res) => {
    
    let {
      jobSeekerId,
      jobId,
      firstName,
      lastName,
      email,
      resumeId,
      sex,
      visaStatus
    } = req.body;

  jobSeekerId=""
  jobId=""


  firstName=req.body.firstName
  lastName=req.body.lastName
  email=req.body.email
  resumeId=req.body.resumeId 
  // Have to get resume id from resume document. Will be done after parth pushes resume collection.
  visaStatus=req.body.visaStatus


  if (!jobSeekerId) throw { status: "400", error: "No jobSeeker Id exists" };
  if (typeof jobSeekerId !== "string")
    throw { status: "400", error: "Type of jobSeeker Id is not a string" };
  if (jobSeekerId.trim().length === 0)
    throw {
      status: "400",
      error: "jobSeeker Id cannot be empty or all white spaces",
    };
  jobSeekerId = jobSeekerId.trim();
  if (!ObjectId.isValid(jobSeekerId))
    throw { status: "400", error: "jobSeeker Id is not valid" };

  if (!jobId) throw { status: "400", error: "No job Id exists" };
  if (typeof jobId !== "string")
    throw { status: "400", error: "Type of job Id is not a string" };
  if (jobId.trim().length === 0)
    throw {
      status: "400",
      error: "job Id cannot be empty or all white spaces",
    };
  jobId = jobId.trim();
  if (!ObjectId.isValid(jobId))
    throw { status: "400", error: "job Id is not valid" };


 
  if (!resumeId) throw { status: "400", error: "No resume Id exists" };
  if (typeof resumeId !== "string")
    throw { status: "400", error: "Type of resume Id is not a string" };
  if (resumeId.trim().length === 0)
    throw {
      status: "400",
      error: "resume Id cannot be empty or all white spaces",
    };
  resumeId = resumeId.trim();
  if (!ObjectId.isValid(resumeId))
    throw { status: "400", error: "resume Id is not valid" };

if(!firstName)
throw {status: "400", error: "Firstname is not provided"}
if(!lastName)
throw {status: "400", error: "Lastname is not provided"}
if(!email)
throw {status: "400", error: "email is not provided"}
if(!sex)
throw {status: "400", error: "sex is not provided"}
if(!visaStatus)
throw {status: "400", error: "visa status is not provided"}


  firstName = await jobhelper.checkifproperflname(firstName);
  last = await jobhelper.checkifproperflname(lastName);
  email = await helper.isValidEmail(email);
  sex = await jobhelper.checkifpropersex(sex);
  visaStatus = await jobhelper.checkifpropervisarequirements(visaStatus); //to be modified

    try {
      const application = await applicationData.createApplication(
      jobSeekerId,
      jobId,
      firstName,
      lastName,
      email,
      resumeId,
      sex,
      visaStatus
      );
      
      await jobsData.addApplicationToJobs(jobId,application._id.toString());
      await jobseekerData.addApplicationToJobseeker("644ca5c8f5adb13b130287b9","644ca700951b480e31fa966c");

      return res.status(200).json(application);
    } catch (e) {
      if (typeof e !== "object" || !("status" in e)) {
        res.status(500).json("Internal server error");
      } else {
        res.status(parseInt(e.status)).json(e.error);
      }
    }
  });