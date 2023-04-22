const mongoCollections = require("../config/mongoCollections");
const jobSeekers = mongoCollections.jobSeekers;
const jobs = mongoCollections.jobs;
const applications=mongoCollections.applications;
const common_helper= require("../helper/common");
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

const get_history_of_applications = async(jobSeekerId) => {
  jobSeekerId= common_helper.isValidId(jobSeekerId);
  const jobSeekersCollection = await jobSeekers();
  const applicationsCollection = await applications();
  const jobseeker = await jobSeekersCollection.findOne({_id: ObjectId(jobSeekerId)});

  if(jobseeker==null){
    throw { status: "400", error: "Could not get Jobseeker" };
  }

  const applications_IDs= jobseeker.Jobs_applied;
  applications_IDs.forEach(element => {
    element=ObjectId(element);
  });

  const all_applications= await applicationsCollection.find({_id : { $in: applications_IDs} }).toArray();

  if(!all_applications){
    throw { status: "400", error: "Could not get applications" };
  }

  all_applications.forEach(element => {
    element._id=element._id.toString();
  });
  
  return all_applications;
}

module.export = {
  getAllJobs,
  get_history_of_applications
};
