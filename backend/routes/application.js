const express = require("express");
const router = express.Router();
const xss = require("xss");
const jobsData = require("../data/jobs");
const jobseekerData = require("../data/jobseeker");
const applicationData = require("../data/application");
const jobhelper = require("../helper/jobHelpers");
const commonHelper = require("../helper/common");
const { ObjectId } = require("mongodb");
const redis = require("redis");
const os = require("os");
const client = redis.createClient();
client.connect().then(() => {});

router.route("/apply").post(async (req, res) => {
  let { jobId, firstName, lastName, email, sex, visaStatus } = req.body;

  let jobSeeker = await jobseekerData.getJobSeekerByEmail(email);
  let jobSeekerId = jobSeeker._id;
  let resumeId = "639eb64f29a0a99a2e5bfae5"; //random resume id

  try {
    firstName = req.body.firstName;
    lastName = req.body.lastName;
    email = req.body.email;
    visaStatus = req.body.visaStatus;
    //xss checking
    firstName = xss(firstName);
    lastName = xss(lastName);
    email = xss(email);
    visaStatus = xss(visaStatus);

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

    if (!firstName) throw { status: "400", error: "Firstname is not provided" };
    if (!lastName) throw { status: "400", error: "Lastname is not provided" };
    if (!email) throw { status: "400", error: "email is not provided" };
    if (!sex) throw { status: "400", error: "sex is not provided" };
    if (!visaStatus)
      throw { status: "400", error: "visa status is not provided" };

    firstName = await jobhelper.checkifproperflname(firstName);
    last = await jobhelper.checkifproperflname(lastName);
    email = await commonHelper.isValidEmail(email);
    sex = await jobhelper.checkifpropersex(sex);
    visaStatus = await jobhelper.checkifpropervisarequirements(visaStatus); //to be modified
  } catch (error) {
    console.log(error);
  }

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

    await jobsData.addApplicationToJobs(jobId, application._id.toString());
    await jobseekerData.addApplicationToJobseeker(
      jobSeekerId,
      application._id.toString()
    );
    const allApplications =
      await jobseekerData.get_history_of_applications_by_email(email);
    if (allApplications) {
      await client.set("jobSeekerEmail", email);
      await client.set(
        "jobSeekerApplications",
        JSON.stringify(allApplications)
      );
    }
    return res.status(200).json(application);
  } catch (e) {
    if (typeof e !== "object" || !("status" in e)) {
      res.status(500).json("Internal server error");
    } else {
      res.status(parseInt(e.status)).json(e.error);
    }
  }
});

module.exports = router;
