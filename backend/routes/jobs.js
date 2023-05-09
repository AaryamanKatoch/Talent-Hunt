const express = require("express");
const router = express.Router();
const xss = require("xss");
const jobsData = require("../data/jobs");
const applicationData = require("../data/application");
const companyData = require("../data/company");
const helper = require("../helper");
// const { ObjectId } = require("mongodb");
const redis = require("redis");
const client = redis.createClient();
client.connect().then(() => {});

router.route("/jobDetails/:id").get(async (req, res) => {
  try {
    let id = req.params.id;
    const data = await jobsData.getJobById(id);
    return res.json(data);
  } catch (e) {
    if (typeof e !== "object" || !("status" in e)) {
      console.log(e);
      res.status(500).json("Internal server error");
    } else {
      res.status(parseInt(e.status)).json(e.error);
    }
  }
});

router.route("/postJob").post(async (req, res) => {
  let {
    description,
    responsibilities,
    visaRequirements,
    minimumQualification,
  } = req.body;
  try {
    description = xss(
      await helper.jobhelper.checkifproperdescription(description)
    );
    responsibilities = xss(
      await helper.jobhelper.checkifproperresponsibilities(responsibilities)
    );
    visaRequirements = xss(
      await helper.jobhelper.checkifpropervisarequirements(visaRequirements)
    );
    minimumQualification = xss(
      await helper.jobhelper.checkifproperminimumqualification(
        minimumQualification
      )
    );
  } catch (e) {
    if (typeof e !== "object" || !("status" in e)) {
      console.log(e);
      res.status(500).json("Internal server error");
    } else {
      res.status(parseInt(e.status)).json(e.error);
    }
  }
  try {
    const job = await jobsData.createJob(
      description,
      responsibilities,
      visaRequirements,
      minimumQualification
    );
    return res.status(200).json(job);
  } catch (e) {
    if (typeof e !== "object" || !("status" in e)) {
      console.log(e);
      res.status(500).json("Internal server error");
    } else {
      res.status(parseInt(e.status)).json(e.error);
    }
  }
});

router.route("/postJobByEmail").post(async (req, res) => {
  try {
    let data = req.body;
    for (let i in data) {
      if (Array.isArray(data[i])) {
        data[i] = data[i].map((item) => xss(item));
      } else {
        data[i] = xss(data[i]);
      }
    }
    let companyEmail = data.email;
    companyEmail = helper.common.isValidEmail(companyEmail);
    data = helper.job.isValidJobData(data);
    const company = await companyData.getCompanyByEmail(companyEmail);
    data.image = company.image;
    const job = await jobsData.createJobByCompanyEmail(companyEmail, data);
    if (job) {
      const allJobs = await jobsData.getAllJobsByCompanyEmail(companyEmail);
      await client.set("companyEmail", companyEmail);
      await client.set("companyJobs", JSON.stringify(allJobs));
    }
    return res.status(200).json(job);
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
  .route("/editJobByEmail/:jobId")
  .get(async (req, res) => {
    try {
      const jobId = helper.common.isValidId(req.params.jobId);
      const job = await jobsData.getJobById(jobId);
      let companyEmail = req.query.email;
      companyEmail = helper.common.isValidEmail(companyEmail);
      if (companyEmail !== job.companyEmail) {
        throw {
          status: "403",
          error: "You have not posted the job so you cannot edit it",
        };
      }
      return res.status(200).json(job);
    } catch (e) {
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
      const jobId = helper.common.isValidId(req.params.jobId);
      const job = await jobsData.getJobById(jobId);
      let data = req.body;
      for (let i in data) {
        if (Array.isArray(data[i])) {
          data[i] = data[i].map((item) => xss(item));
        } else {
          data[i] = xss(data[i]);
        }
      }
      let companyEmail = data.email;
      companyEmail = helper.common.isValidEmail(companyEmail);
      data = helper.job.isValidJobData(data);
      const updatedJob = await jobsData.updateJobByCompanyEmail(
        jobId,
        companyEmail,
        data
      );
      if (updatedJob) {
        const allJobs = await jobsData.getAllJobsByCompanyEmail(companyEmail);
        await client.set("companyEmail", companyEmail);
        await client.set("companyJobs", JSON.stringify(allJobs));
      }
      return res.status(200).json(updatedJob);
    } catch (e) {
      if (typeof e !== "object" || !("status" in e)) {
        console.log(e);
        return res.status(500).json("Internal server error");
      } else {
        return res.status(parseInt(e.status)).json(e.error);
      }
    }
  })
  .delete(async (req, res) => {
    try {
      const jobId = helper.common.isValidId(req.params.jobId);
      const job = await jobsData.getJobById(jobId);
      let companyEmail = req.query.email;
      companyEmail = helper.common.isValidEmail(companyEmail);

      const response = await jobsData.deleteJobByCompanyEmail(
        jobId,
        companyEmail
      );
      if (response) {
        const allJobs = await jobsData.getAllJobsByCompanyEmail(companyEmail);
        await client.set("companyEmail", companyEmail);
        await client.set("companyJobs", JSON.stringify(allJobs));
      }
      return res.status(200).json(response);
    } catch (e) {
      if (typeof e !== "object" || !("status" in e)) {
        console.log(e);
        return res.status(500).json("Internal server error");
      } else {
        return res.status(parseInt(e.status)).json(e.error);
      }
    }
  });

router.route("/applicants/:jobId").get(async (req, res) => {
  try {
    const jobId = helper.common.isValidId(req.params.jobId);
    const job = await jobsData.getJobById(jobId);
    let companyEmail = req.query.email;
    companyEmail = helper.common.isValidEmail(companyEmail);
    if (companyEmail !== job.companyEmail) {
      throw {
        status: "403",
        error: "You have not posted the job so you cannot edit it",
      };
    }
    const applicants = await applicationData.getAllApplicationsByJobId(jobId);
    return res.status(200).json(applicants);
  } catch (e) {
    if (typeof e !== "object" || !("status" in e)) {
      console.log(e);
      return res.status(500).json("Internal server error");
    } else {
      return res.status(parseInt(e.status)).json(e.error);
    }
  }
});

router.route("/getJobByEmail").get(async (req, res) => {
  try {
    let companyEmail = req.query.email;
    companyEmail = helper.common.isValidEmail(companyEmail);
    const jobs = await jobsData.getAllJobsByCompanyEmail(companyEmail);
    if (jobs) {
      await client.set("companyEmail", companyEmail);
      await client.set("companyJobs", JSON.stringify(jobs));
    }
    return res.status(200).json(jobs);
  } catch (e) {
    if (typeof e !== "object" || !("status" in e)) {
      console.log(e);
      return res.status(500).json("Internal server error");
    } else {
      return res.status(parseInt(e.status)).json(e.error);
    }
  }
});

module.exports = router;
