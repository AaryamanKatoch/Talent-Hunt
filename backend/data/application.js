const mongoCollections = require("../config/mongoCollections");
const applications = mongoCollections.applications;
const { ObjectId } = require("mongodb");
const helper = require("../helper/common");
const jobhelper = require("../helper/jobHelpers");

const createApplication = async (
  jobSeekerId,
  jobId,
  firstName,
  lastName,
  email,
  resumeId,
  sex,
  visaStatus
) => {
  if (!jobSeekerId) throw { status: "400", error: "No jobSeeker Id exists" };
  if (typeof jobSeekerId !== "string")
    throw { status: "400", error: "Type of jobSeeker Id is not a string" };
  if (jobSeekerId.trim().length === 0)
    throw {
      status: "400",
      error: "jobSeeker Id cannot be empty or all white spaces",
    };
  jobSeekerId = jobSeekerId.trim();
  if (!ObjectId.isValid(jobSeekerId))
    throw { status: "400", error: "jobSeeker Id is not valid" };

  if (!jobId) throw { status: "400", error: "No job Id exists" };
  if (typeof jobId !== "string")
    throw { status: "400", error: "Type of job Id is not a string" };
  if (jobId.trim().length === 0)
    throw {
      status: "400",
      error: "job Id cannot be empty or all white spaces",
    };
  jobId = jobId.trim();
  if (!ObjectId.isValid(jobId))
    throw { status: "400", error: "job Id is not valid" };

   

  if (!resumeId) throw { status: "400", error: "No resume Id exists" };
  if (typeof resumeId !== "string")
    throw { status: "400", error: "Type of resume Id is not a string" };
  if (resumeId.trim().length === 0)
    throw {
      status: "400",
      error: "resume Id cannot be empty or all white spaces",
    };
  resumeId = resumeId.trim();
  if (!ObjectId.isValid(resumeId))
    throw { status: "400", error: "resume Id is not valid" };

  firstName = await jobhelper.checkifproperflname(firstName);
  last = await jobhelper.checkifproperflname(lastName);
  email = await helper.isValidEmail(email);
  sex = await jobhelper.checkifpropersex(sex);
  visaStatus = await jobhelper.checkifpropervisarequirements(visaStatus); //to be modified

  const applicationsCollection = await applications();

  let application = {
    jobSeekerId: jobSeekerId,
    jobId: jobId,
    firstName: firstName,
    lastName: lastName,
    email: email,
    resumeId: resumeId,
    sex: sex,
    visaStatus: visaStatus
  };

  const insertInfo = await applicationsCollection.insertOne(application);

  if (!insertInfo.acknowledged || !insertInfo.insertedId)
    throw { status: "400", error: "Could not add application" };

  const newId = insertInfo.insertedId.toString();

  const application1 = await getApplicationById(newId);

  application1._id = application1._id.toString();

  return application1;
};

const getAllApplications = async () => {
  const applicationsCollection = await applications();
  const arr = await applicationsCollection.find({}).toArray();
  if (arr === null) return [];
  for (i in arr) {
    arr[i]._id = arr[i]._id.toString();
  }
  return arr;
};

const getApplicationById = async (applicationId) => {
  if (!applicationId)
    throw { status: "400", error: "No application id exists" };
  if (typeof applicationId !== "string")
    throw { status: "400", error: "Type of application id is not a string" };
  if (applicationId.trim().length === 0)
    throw {
      status: "400",
      error: "Application id cannot be empty or all white spaces",
    };

  applicationId = applicationId.trim();
  if (!ObjectId.isValid(applicationId))
    throw { status: "400", error: "Application id is not valid" };
  const applicationsCollection = await applications();

  const applicationbyid = await applicationsCollection.findOne({
    _id: ObjectId(applicationId),
  });
  if (applicationbyid === null)
    throw { status: "400", error: "No application found with that id" };

  applicationbyid._id = applicationbyid._id.toString();

  return applicationbyid;
};

const removeApplication = async (applicationId) => {
  if (!applicationId)
    throw { status: "400", error: "No application id exists" };
  if (typeof applicationId !== "string")
    throw { status: "400", error: "Type of application id is not a string" };
  if (applicationId.trim().length === 0)
    throw {
      status: "400",
      error: "Application id cannot be empty or all white spaces",
    };

  applicationId = applicationId.trim();

  if (!ObjectId.isValid(applicationId))
    throw { status: "400", error: "Applications id is not valid" };

  const applicationsCollection = await applications();
  var deletename = await getApplicationById(applicationId);
  if (!deletename || deletename === undefined) {
    throw {
      status: "400",
      error: `Could not delete with id of ${applicationId}`,
    };
  }

  const deletedapplication = await applicationsCollection.deleteOne({
    _id: ObjectId(applicationId),
  });
  if (deletedapplication.deletedCount === 0) {
    throw {
      status: "400",
      error: `Could not delete application with id of ${applicationId}`,
    };
  }
  return `${deletename.applicationId} has been successfully deleted! `;
};

const updateApplication = async (
  id,
  firstName,
  lastName,
  email,
  resumeId,
  sex,
  visaStatus
) => {
  if (!id) throw { status: "400", error: "No application id exists" };
  if (typeof id !== "string")
    throw { status: "400", error: "Type of application id is not a string" };
  if (id.trim().length === 0)
    throw {
      status: "400",
      error: "Application id cannot be empty or all white spaces",
    };

  id = id.trim();
  if (!ObjectId.isValid(id))
    throw { status: "400", error: "Application id is not valid" };

  // flightCode=await helper.checkifproperflightcode(flightCode)
  // departure=await helper.checkifproperdeparr(departure)
  // arrival=await helper.checkifproperdeparr(arrival)
  // departureDate=await helper.checkifproperDate(departureDate)
  // departureTime=await helper.checkifproperarrdepttime(departureTime)
  // arrivalDate=await helper.checkifproperDate(arrivalDate)
  // arrivalTime=await helper.checkifproperarrdepttime(arrivalTime)

  const applicationsCollection = await applications();
  let application1 = await getApplicationById(id);

  let updatedapplication = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    resumeId: resumeId,
    sex: sex,
    visaStatus: visaStatus,
  };
  const updatedInfo = await applicationsCollection.updateOne(
    { _id: ObjectId(id) },
    { $set: updatedapplication }
  );
  //if (updatedInfo.modifiedCount === 0) {
  // throw 'could not update flight successfully';

  //}
  return await getApplicationById(id);
};

module.exports = {
  getAllApplications,
  createApplication,
  removeApplication,
  updateApplication,
  getApplicationById,
};
