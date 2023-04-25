const express = require("express");
const router = express.Router();
const xss = require("xss");
const jobsData = require("../data/jobs");
const applicationData=require("../data/application")

const helper = require("../helper");
const { ObjectId } = require("mongodb");

// after making form frontend
// 1 get to get form
// 1 post to submit response