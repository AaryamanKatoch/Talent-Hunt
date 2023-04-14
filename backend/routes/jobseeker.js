const express = require("express");
const router = express.Router();
const xss = require("xss");
const data = require("../data");
const jobSeekerData = data.jobSeeker;
const helper = require("../helper");

router
  .route("/jobs") //GET all jobs
  .get(async (req, res) => {
    try {
      const data = await jobSeekerData.getAllJobs();
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
  .post(async (req, res) => {
    let data = req.body;
    try {
    } catch (error) {
      if (typeof e !== "object" || !("status" in e)) {
        console.log(e);
        res.status(500).json("Internal server error");
      } else {
        res.status(parseInt(e.status)).json(e.error);
      }
    }
  });

module.exports = router;
