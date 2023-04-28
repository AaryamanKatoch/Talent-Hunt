const express = require("express");
const router = express.Router();
const xss = require("xss");
const jobsData = require("../data/jobs");
const helper = require("../helper");
const { ObjectId } = require("mongodb");

router.route("/jobdetails").get(async (req, res) => {
  try {
    let id = "";
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
    description = helper.jobHelper.checkifproperdescription(description);
    responsibilities = await helper.jobhelper.checkifproperresponsibilities(
      responsibilities
    );
    visaRequirements = await helper.jobhelper.checkifpropervisarequirements(
      visaRequirements
    );
    minimumQualification =
      await helper.jobhelper.checkifproperminimumqualification(
        minimumQualification
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
