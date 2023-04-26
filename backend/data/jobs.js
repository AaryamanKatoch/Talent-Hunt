const mongoCollections = require('../config/mongoCollections');
const jobs = mongoCollections.jobs;
const {ObjectId} = require('mongodb');
const jobhelper =require("../helper/jobHelpers");

const createJob = async (
    description,
    responsibilities,
    visaRequirements,
    minimumQualification,
    
  ) => {
  
    description=await jobhelper.checkifproperdescription(description)
    responsibilities=await jobhelper.checkifproperresponsibilities(responsibilities)
    visaRequirements=await jobhelper.checkifpropervisarequirements(visaRequirements)
    minimumQualification=await jobhelper.checkifproperminimumqualification(minimumQualification)
   
    const jobsCollection = await jobs();
  
    let job = {
      description: description,
      responsibilities: responsibilities,
      visaRequirements: visaRequirements,
      minimumQualification: minimumQualification,
      applications: [] //array of application docs id
    }
  
    const insertInfo = await jobsCollection.insertOne(job);
  
    if (!insertInfo.acknowledged || !insertInfo.insertedId)
    throw { status: "400", error: "Could not add Job" };
  
    const newId = insertInfo.insertedId.toString();
  
    const job1 = await getJobById(newId);
  
    job1._id = job1._id.toString();
  
    return job1;
  };
  

const getAllJobs = async () => {
    const jobsCollection = await jobs();
    const arr = await jobsCollection.find({}).toArray();
    if (arr===null) return [];
    for(i in arr){
      arr[i]._id=arr[i]._id.toString();
    }
    return arr;
  };

const getJobById = async (jobId) => {  

    if(!jobId)
    throw { status: "400", error: "No job id exists" };
    if(typeof(jobId)!=="string")
    throw { status: "400", error: "Type of job id is not a string" };
    if(jobId.trim().length===0)
    throw { status: "400", error: "Job id cannot be empty or all white spaces" };
    
    jobId=jobId.trim();
    if(!ObjectId.isValid(jobId))
    throw { status: "400", error: "Job id is not valid" };
    const jobsCollection =await jobs();
  
   const jobbyid = await jobsCollection.findOne({_id:ObjectId(jobId)});
   if(jobbyid===null) 
   throw { status: "400", error: "No job found with that id" };

   jobbyid._id=jobbyid._id.toString()

   return jobbyid;
  };


const removeJob = async (jobId) => {
  
    if(!jobId)
        throw { status: "400", error: "No job id exists" };
    if(typeof(jobId)!=="string")
        throw { status: "400", error: "Type of job id is not a string" };
    if(jobId.trim().length===0)
        throw { status: "400", error: "Job id cannot be empty or all white spaces" };
    
    jobId=jobId.trim();

    if(!ObjectId.isValid(jobId))
        throw { status: "400", error: "Job id is not valid" };

    const jobsCollection =await jobs();
    var deletename = await getJobById(jobId);
    if (!deletename || deletename === undefined) {
        throw { status: "400", error: `Could not delete  with id of ${jobId}` };
     
    }

    const deletedjob = await jobsCollection.deleteOne({_id: ObjectId(jobId)});
    if (deletedjob.deletedCount === 0) {
        throw { status: "400", error: `Could not delete flight with id of ${jobId}` };
    }
    return (`${deletename.jobId} has been successfully deleted! `);
  };



  const updateJob = async (
    id,
    description,
    responsibilities,
    visaRequirements,
    minimumQualification
  ) => {
  
    if(!id)
    throw { status: "400", error: "No job id exists" };
    if(typeof(id)!=="string")
    throw { status: "400", error: "Type of job id is not a string" };
    if(id.trim().length===0)
    throw { status: "400", error: "Job id cannot be empty or all white spaces" };
    
    id=id.trim();
    if(!ObjectId.isValid(id))
    throw { status: "400", error: "Job id is not valid" };
  
    description=await jobhelper.checkifproperdescription(description)
    responsibilities=await jobhelper.checkifproperresponsibilities(responsibilities)
    visaRequirements=await jobhelper.checkifpropervisarequirements(visaRequirements)
    minimumQualification=await jobhelper.checkifproperminimumqualification(minimumQualification)

    const jobsCollection = await jobs();
    let job1=await getJobById(id)
  
    let updatedjob = {
        description: description,
        responsibilities: responsibilities,
        visaRequirements: visaRequirements,
        minimumQualification: minimumQualification
    }
    const updatedInfo = await jobsCollection.updateOne({_id: ObjectId(id)},
    {$set: updatedjob}
  );
  //if (updatedInfo.modifiedCount === 0) {
   // throw 'could not update flight successfully';
    
  //}
  return await getJobById(id);
  };



module.exports = {
    getAllJobs,
    createJob,
    removeJob,
    updateJob, 
    getJobById
  };
  