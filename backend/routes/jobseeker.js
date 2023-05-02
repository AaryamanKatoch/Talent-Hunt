const express = require("express");
const router = express.Router();
const xss = require("xss");
const data = require("../data");
const jobSeekerData = data.jobSeeker;
const helper = require("../helper");
const common_helper = require("../helper/common");

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
      const pageNumber = parseInt(req.query.page) || 1;
      const data = await jobSeekerData.getAllJobs(pageNumber);
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

router.route("/HistoryOfApplications").get(async (req, res) => {
  try {
    let email = req.body.email;
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

module.exports = router;
