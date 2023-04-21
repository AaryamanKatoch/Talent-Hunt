const mongoCollections = require("../config/mongoCollections");
const jobSeekers = mongoCollections.jobSeekers;
const jobs = mongoCollections.jobs;
const resumes = mongoCollections.resumes;
const helper = require("../helper");
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

const getJobSeekerByID = async (jobSeekerId) => {
  jobSeekerId = helper.common.checkIsProperId(jobSeekerId);
  const jobSeekerCollection = await jobSeekers();
  let jobSeeker = await jobSeekerCollection.findOne({
    _id: new ObjectId(jobSeekerId),
  });
  if (jobSeeker === null) {
    throw { status: "404", error: `No jobseeker corresponds to the ID` };
  }
  jobSeeker._id = jobSeeker._id.toString();
  jobSeeker.resumeId = jobSeeker.resumeId.toString();
  return jobSeeker;
};

const getResumeByID = async (resumeId) => {
  resumeId = helper.common.checkIsProperId(resumeId);
  const resumeCollection = await resumes();
  let resume = await resumeCollection.findOne({
    _id: new ObjectId(resumeId),
  });
  if (resume === null) {
    throw { status: "404", error: `No resume corresponds to the ID` };
  }
  resume._id = resume._id.toString();
  return resume;
};

const createJobSeeker = async (hashedPassword, data) => {
  data = helper.jobseeker.isValidJobseekerData(data);
  const newJobSeeker = {
    email: data.email,
    hashedPassword: hashedPassword,
    address: data.address,
    education: data.education,
    field_of_employment: data.field_of_employment,
    profile_picture: data.profile_picture,
    skills: data.skills,
    years_of_experience: data.years_of_experience,
    resumeId: "",
    jobs_applied: [],
  };

  const jobSeekerCollection = await jobSeekers();
  const insertInfo = await jobSeekerCollection.insertOne(newJobSeeker);
  if (!insertInfo.insertedId || !insertInfo.acknowledged) {
    throw {
      status: "400",
      error: "Could not add the jobseeker",
    };
  }
  const newId = insertInfo.insertedId.toString();

  const jobSeeker = await jobSeekerCollection.findOne({
    _id: new ObjectId(newId),
  });
  jobSeeker._id = newId;
  return jobSeeker;
};

const updateJobSeeker = async (jobSeekerId, data) => {
  jobSeekerId = helper.common.checkIsProperId(jobSeekerId);
  data = helper.jobseeker.isValidJobseekerData(data);
  const jobSeekerCollection = await jobSeekers();
  const jobSeeker = await getJobSeekerByID(jobSeekerId);
  const updatedJobSeeker = {
    email: data.email,
    hashedPassword: jobSeeker.hashedPassowrd,
    address: data.address,
    education: data.education,
    field_of_employment: data.field_of_employment,
    profile_picture: data.profile_picture,
    skills: data.skills,
    years_of_experience: data.years_of_experience,
    resumeId: jobSeeker.resumeId,
    jobs_applied: jobSeeker.jobs_applied,
  };

  const updatedInfo = await jobSeekerCollection.updateOne(
    { _id: new ObjectId(jobSeekerId) },
    { $set: updatedJobSeeker }
  );
  if (updatedInfo.modifiedCount === 0) {
    throw {
      status: "400",
      error: "All new details exactly match the old details",
    };
  }
  return await getJobSeekerByID(jobSeekerId);
};

async function removeJobSeeker(jobSeekerId) {
  jobSeekerId = helper.common.checkIsProperId(jobSeekerId);
  const jobSeekerCollection = await jobSeekers();
  const jobSeeker = await getJobSeekerByID(jobSeekerId);
  const deletionInfo = await jobSeekerCollection.deleteOne({
    _id: new ObjectId(jobSeekerId),
  });

  if (deletionInfo.deletedCount === 0) {
    throw `Could not delete jobseeker with id: ${jobSeekerId}`;
  }
  let statement = {
    jobSeekerId: jobSeekerId,
    deleted: true,
  };
  return statement;
}

module.exports = {
  getAllJobs,
  getJobSeekerByID,
  getResumeByID,
  createJobSeeker,
  updateJobSeeker,
  removeJobSeeker,
};
