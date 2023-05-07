const express = require("express");
const router = express.Router();
const xss = require("xss");
const data = require("../data");
const companyData = data.company;
const jobseekerData = data.jobSeeker;
const helper = require("../helper");
const axios = require("axios");
var im = require("imagemagick");
const fs = require("fs");

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
      console.log(data);
      let email = data.email;
      email = helper.common.isValidEmail(email);
      data = helper.company.isValidCompanyData(data);
      const response = await axios.get(data.profile_picture, {
        responseType: "arraybuffer",
      });
      const buffer = Buffer.from(response.data, "utf-8");
      im.resize(
        {
          srcData: buffer,
          widht: 150,
          height: 150,
        },
        function (err, stdout, stderr) {
          if (err) return console.error(err.stack || err);
          fs.writeFileSync("image.jpg", stdout, "binary");
        }
      );
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
      let email = data.email;
      email = helper.common.isValidEmail(email);
      data = helper.company.isValidCompanyData(data);
      if (data.profile_picture) {
        const response = await axios.get(data.profile_picture, {
          responseType: "arraybuffer",
        });
        const buffer = Buffer.from(response.data, "utf-8");
        im.resize(
          {
            srcData: buffer,
            widht: 150,
            height: 150,
          },
          function (err, stdout, stderr) {
            if (err) return console.error(err.stack || err);
            fs.writeFileSync("image.jpg", stdout, "binary");
          }
        );
      }
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
});

module.exports = router;
