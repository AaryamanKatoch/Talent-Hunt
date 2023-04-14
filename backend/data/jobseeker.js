const mongoCollections = require("../config/mongoCollections");
const jobSeekers = mongoCollections.jobSeekers;
const jobs = mongoCollections.jobs;
const { ObjectId } = require("mongodb");

const getAllJobs = async () => {
  const jobsCollection = await jobs();
  const allJobs = await jobsCollection.find(
    {},
    { projection: { applications: 0 } }
  );

  if (!allJobs) throw { status: "400", error: "Could not get all Jobs" };

  for (let i = 0; i < allJobs.length; i++)
    allJobs[i]._id = allJobs[i]._id.toString();

  return allJobs;
};

module.export = {
  getAllJobs,
};
