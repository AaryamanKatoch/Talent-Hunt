const express = require("express");
const router = express.Router();
const xss = require("xss");
const jobsData = require("../data/jobs");

const helper = require("../helper");
const { ObjectId } = require("mongodb");

router.route("/jobdetails").get(async (req, res) => {

    try {
        let id =""
        const data = await jobsData.getJobById(id)
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

