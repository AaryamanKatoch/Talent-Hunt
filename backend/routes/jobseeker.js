const express = require("express");
const router = express.Router();
const xss = require("xss");
const data = require('../data');
const jobSeekerData = data.jobSeeker;
const helper = require('../helper');


module.exports = router;