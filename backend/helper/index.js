const commonHelpers = require("./common");
const companyHelpers = require("./company");
const jobseekerHelpers = require("./jobseeker");
const jobHelpers = require("./job");
const jobHelpers2 = require("./jobHelpers");
const resumeHelper = require("./resumeHelper");

module.exports = {
  common: commonHelpers,
  company: companyHelpers,
  jobseeker: jobseekerHelpers,
  job: jobHelpers,
  jobhelper: jobHelpers2,
  resumeHelper : resumeHelper
};
