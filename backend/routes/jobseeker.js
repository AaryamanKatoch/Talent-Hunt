const express = require("express");
const router = express.Router();
const xss = require("xss");
const data = require("../data");
const jobSeekerData = data.jobSeeker;
const helper = require("../helper");

router
  .route("/dashboard")
  .get(async (req, res) => {
    try {
      let id = "64406ecb4339df491dac4d4b";
      id = helper.common.checkIsProperId(id);
      const data = await jobSeekerData.getJobSeekerByID(id);
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
    try {
      let data = req.body;
      let id = "64406ecb4339df491dac4d4b";
      id = helper.common.checkIsProperId(id);
      data = helper.jobseeker.isValidJobseekerData(data);
      const updatedJobSeeker = await jobSeekerData.updateJobSeeker(id, data);
      res.json(updatedJobSeeker);
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
  });
//   .post(async (req, res) => {
//     let data = req.body;
//     try {
//     } catch (error) {
//       if (typeof e !== "object" || !("status" in e)) {
//         console.log(e);
//         res.status(500).json("Internal server error");
//       } else {
//         res.status(parseInt(e.status)).json(e.error);
//       }
//     }
//   });

module.exports = router;
