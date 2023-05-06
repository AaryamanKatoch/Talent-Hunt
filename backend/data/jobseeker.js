const mongoCollections = require("../config/mongoCollections");
const jobSeekers = mongoCollections.jobSeekers;
const jobs = mongoCollections.jobs;
const resumes = mongoCollections.resumes;
const helper = require("../helper");
const applications = mongoCollections.applications;
const { ObjectId } = require("mongodb");
const jobsFuns=require('./jobs');

const getAllJobs = async (page,search,visaReq,minQual) => {
  if (!page) throw "please provide page number for the data function!";
  if (isNaN(page)) throw "page number should be valid number";
  if (page < 1) throw "page number should be greater than 1";

  // console.log('1',search,"*****");
  // console.log('2',visaReq,"*****");
  // console.log('3',minQual,"*****");

  const each_page = 20;
  const skip = (page - 1) * each_page;
  let moreJobsExist=false;

  const jobsCollection = await jobs();

  let query = {};
  if (search) {
    query = { name: { $regex: search, $options: "i" } };
  }
  if (visaReq) {
    query.visaRequirements = visaReq;
  }
  if (minQual) {
    query.minimumQualification = minQual;
  }

  console.log(query)

  const allJobs = await jobsCollection
    .find(query)
    .skip(skip)
    .limit(each_page)
    .toArray();

  if (!allJobs) throw { status: "400", error: "Could not get all Jobs" };
  if(allJobs.length<1) throw { status: "404", error: "No More Jobs" };

  for (let i = 0; i < allJobs.length; i++)
    allJobs[i]._id = allJobs[i]._id.toString();

  // const moreJobsExist = (await jobsCollection.find({}).count()) > skip + each_page;
  // const totalJobsCount = await jobsCollection.countDocuments({});
  // const moreJobsExist = totalJobsCount > skip + each_page;

  const allJobsnext = await jobsCollection
  .find(query)
  .skip(skip + each_page)
  .limit(each_page)
  .toArray();

  if(allJobsnext.length>1){
    moreJobsExist=true;
  }

  console.log(moreJobsExist);

  return { jobs: allJobs, moreJobsExist };
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

const profileExists = async (email) => {
  email = helper.common.isValidEmail(email);
  const jobSeekerCollection = await jobSeekers();
  let jobSeeker = await jobSeekerCollection.findOne({
    email: email,
  });
  if (jobSeeker === null) {
    return false;
  }
  return true;
};

const getJobSeekerByEmail = async (email) => {
  email = helper.common.isValidEmail(email);
  const jobSeekerCollection = await jobSeekers();
  let jobSeeker = await jobSeekerCollection.findOne({
    email: email,
  });
  if (jobSeeker === null) {
    throw { status: "404", error: `No jobseeker corresponds to the Email` };
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

const createJobSeeker = async (data, email) => {
  data = helper.jobseeker.isValidJobseekerData(data);
  email = helper.common.isValidEmail(email);
  const jobSeekerCollection = await jobSeekers();
  let jobSeekerExists = await jobSeekerCollection.findOne({
    email: email,
  });
  if (jobSeekerExists) {
    throw { status: "400", error: `Email already has a profile` };
  }
  const newJobSeeker = {
    name: data.name,
    email: email,
    address: data.address,
    education: data.education,
    field_of_employment: data.field_of_employment,
    profile_picture: data.profile_picture,
    skills: data.skills,
    years_of_experience: data.years_of_experience,
    resumeId: "",
    jobs_applied: [],
  };
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
  if (!jobSeeker) {
    throw {
      status: "400",
      error: `Could not find any jobseeker with ID: ${jobSeekerId}`,
    };
  }
  const updatedJobSeeker = {
    name: data.name,
    email: jobSeeker.email,
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

const updateJobSeekerByEmail = async (email, data) => {
  email = helper.common.isValidEmail(email);
  data = helper.jobseeker.isValidJobseekerData(data);
  const jobSeekerCollection = await jobSeekers();
  const jobSeeker = await getJobSeekerByEmail(email);
  if (!jobSeeker) {
    throw {
      status: "400",
      error: `Could not find any jobseeker with Email: ${email}`,
    };
  }
  const updatedJobSeeker = {
    name: data.name || jobSeeker.name,
    email: jobSeeker.email,
    address: data.address || jobSeeker.address,
    education: data.education || jobSeeker.education,
    field_of_employment:
      data.field_of_employment || jobSeeker.field_of_employment,
    profile_picture: data.profile_picture || jobSeeker.profile_picture,
    skills: data.skills || jobSeeker.skills,
    years_of_experience:
      data.years_of_experience || jobSeeker.years_of_experience,
    resumeId: jobSeeker.resumeId,
    jobs_applied: jobSeeker.jobs_applied,
  };

  const updatedInfo = await jobSeekerCollection.updateOne(
    { email: email },
    { $set: updatedJobSeeker }
  );
  if (updatedInfo.modifiedCount === 0) {
    throw {
      status: "400",
      error: "All new details exactly match the old details",
    };
  }
  return await getJobSeekerByEmail(email);
};

async function removeJobSeeker(jobSeekerId) {
  jobSeekerId = helper.common.checkIsProperId(jobSeekerId);
  const jobSeekerCollection = await jobSeekers();
  const jobSeeker = await getJobSeekerByID(jobSeekerId);
  if (!jobSeeker) {
    throw {
      status: "400",
      error: `Could not find any jobseeker with ID: ${jobSeekerId}`,
    };
  }
  const deletionInfo = await jobSeekerCollection.deleteOne({
    _id: new ObjectId(jobSeekerId),
  });

  if (deletionInfo.deletedCount === 0) {
    throw {
      status: 500,
      error: `Could not delete jobseeker with id: ${jobSeekerId}`,
    };
  }
  let statement = {
    jobSeekerId: jobSeekerId,
    deleted: true,
  };
  return statement;
}

const get_history_of_applications = async (jobSeekerId) => {
  jobSeekerId = helper.common.isValidId(jobSeekerId);
  const jobSeekersCollection = await jobSeekers();
  const applicationsCollection = await applications();
  const jobseeker = await jobSeekersCollection.findOne({
    _id: ObjectId(jobSeekerId),
  });

  if (jobseeker == null) {
    throw { status: "400", error: "Could not get Jobseeker" };
  }

  const applications_IDs = jobseeker.Jobs_applied;
  applications_IDs.forEach((element) => {
    element = ObjectId(element);
  });

  const all_applications = await applicationsCollection
    .find({ _id: { $in: applications_IDs } })
    .toArray();

  if (!all_applications) {
    throw { status: "400", error: "Could not get applications" };
  }

  all_applications.forEach((element) => {
    element._id = element._id.toString();
  });

  return all_applications;
};

const get_history_of_applications_by_email = async (email) => {
  email = helper.common.isValidEmail(email);
  const jobSeekersCollection = await jobSeekers();
  const applicationsCollection = await applications();
  const jobsCollection = await jobs();
  let jobids=[];
  let data=[];
  const jobseeker = await jobSeekersCollection.findOne({
    email: email,
  });

  if (jobseeker == null) {
    throw { status: "404", error: "Profile is not created for jobSeeker" };
  }

  let applications_IDs = jobseeker.jobs_applied;
  applications_IDs = applications_IDs.map(element => ObjectId(element));

  const all_applications = await applicationsCollection
    .find({ _id: { $in: applications_IDs } })
    .toArray();

  if (!all_applications) {
    throw { status: "404", error: "Could not get applications" };
  }

  if(all_applications.length <1){
    throw { status: "404", error: "There's no any applications found in your profile" };
  }

  all_applications.forEach((element) => {
    element._id = element._id.toString();
    jobids.push(ObjectId(element.jobId));
  });

  const F_applications = await jobsCollection
  .find({ _id: { $in: jobids } })
  .toArray();

  if(F_applications.length <1 || F_applications===null){
    throw { status: "404", error: "There's no any applications found in your profile" };
  }
  return F_applications;
};

const getAllJobSeekers = async () => {
  const jobSeekerCollection = await jobSeekers();
  let allJobSeekers = await jobSeekerCollection.find({}).toArray();
  if (allJobSeekers === null) {
    throw { status: "404", error: `No jobseekers found` };
  }
  allJobSeekers.map((jobSeeker) => {
    jobSeeker._id = jobSeeker._id.toString();
    jobSeeker.resumeId = jobSeeker.resumeId.toString();
    return jobSeeker;
  });
  return allJobSeekers;
};

const addApplicationToJobseeker = async (jobSeekerId,applicationId) => {
  if (!jobSeekerId) throw { status: "400", error: "No job seeker id exists" };
  if (typeof jobSeekerId !== "string")
    throw { status: "400", error: "Type of job seeker id is not a string" };
  if (jobSeekerId.trim().length === 0)
    throw {
      status: "400",
      error: "Job seeker id cannot be empty or all white spaces",
    };

  jobSeekerId = jobSeekerId.trim();
  if (!ObjectId.isValid(jobSeekerId))
    throw { status: "400", error: "Job seeker id is not valid" };

    if (!applicationId) throw { status: "400", error: "No application id exists" };
    if (typeof applicationId !== "string")
      throw { status: "400", error: "Type of application id is not a string" };
    if (applicationId.trim().length === 0)
      throw {
        status: "400",
        error: "application id cannot be empty or all white spaces",
      };
  
    applicationId = applicationId.trim();
    if (!ObjectId.isValid(applicationId))
      throw { status: "400", error: "application id is not valid" };


  const jobSeekersCollection = await jobSeekers()

  const jobseekerbyid = await jobSeekersCollection.findOne({ _id: ObjectId(jobSeekerId) });
  if (jobseekerbyid === null)
    throw { status: "400", error: "No job seeker found with that id" };

  jobseekerbyid._id = jobseekerbyid._id.toString();
  

  updatedJobsApplied=[]
  for(i=0;i<jobseekerbyid.jobs_applied.length;i++){
    updatedJobsApplied.push(jobseekerbyid.jobs_applied[i])
  }
updatedJobsApplied.push(applicationId)

  let updated = await jobSeekersCollection.updateOne({_id : ObjectId(jobSeekerId)},{$set : {"jobs_applied" : updatedJobsApplied}});
  // console.log(updateFlightClass);
  if(updated.modifiedCount === 0) throw 'Cannot add application id to jobseeker collection';
   
  const jobseekerbyidd = await jobSeekersCollection.findOne({ _id: ObjectId(jobSeekerId) });
return jobseekerbyidd
};



module.exports = {
  getAllJobs,
  getJobSeekerByID,
  getJobSeekerByEmail,
  profileExists,
  getResumeByID,
  createJobSeeker,
  updateJobSeeker,
  updateJobSeekerByEmail,
  removeJobSeeker,
  get_history_of_applications,
  getAllJobSeekers,
  addApplicationToJobseeker,
  get_history_of_applications_by_email
};
