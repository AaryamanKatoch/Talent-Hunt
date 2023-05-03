const mongoCollections = require("../config/mongoCollections");
const resumes = mongoCollections.resumes;
const resume = require('./resumes')
const { ObjectId } = require("mongodb");
const helper = require("../helper");

async function createExperience(resumeId, company, address,position,description, start_year, end_year, start_month, end_month){
    resumeId = helper.common.isValidId(resumeId);
    
    company = helper.common.isValidString(company,'Company');
    
    address = helper.common.isValidString(address,'Address');
    position = helper.common.isValidString(position, 'Position');
    start_year = helper.common.isValidYear(start_year);
    
    end_year = helper.common.isValidYear(end_year);
    
    helper.common.isValidStartEndYear(start_year,end_year);
   
    start_month = helper.common.isValidMonth(start_month);
   
    end_month = helper.common.isValidMonth(end_month);
    
    description = helper.common.isValidString(description);
    // console.log("here");

    const resumeCollection = await resumes();
    let experienceData = {
        _id : new ObjectId(),
        company : company,
        address : address,
        position : position,
        description : description,
        start_year : start_year,
        start_month : start_month,        
        end_year : end_year,
        end_month : end_month
    }
    

    const checkResume = await resumeCollection.findOne({_id: new ObjectId(resumeId)});
    if (checkResume === null) throw {status : "500",error : 'Resume not found with that id!'};

    let create = await resumeCollection.updateOne({_id : new ObjectId(resumeId)}, {$push : {experience : experienceData}});

    if(create.modifiedCount === 0)
    {
        throw {status : "500",error : 'Could not update the experience details.'};
    }
    let experienceId = experienceData._id.toString();
    let getCreatedExperience = await getExperienceById(experienceId);
    return getCreatedExperience;
}

async function getExperienceById(experienceId){
    experienceId = helper.common.isValidId(experienceId);
    const resumeCollection = await resumes();
    const findExperienceId = await resumeCollection
  .findOne({'experience._id': ObjectId(experienceId)},
  {projection: {_id: 0,  experience: { $elemMatch: { _id: ObjectId(experienceId)}}}});

  if(findExperienceId == null) throw {status : "500" , error : "Could not found the Resume with that resume id!"};

  findExperienceId.experience[0]._id = findExperienceId.experience[0]._id.toString();
  return findExperienceId.experience[0];
}

async function getAllExperience(resumeId){
    resumeId = helper.common.isValidId(resumeId);
    const resumeCollection = await resumes();
    let resumeById = await resume.getResumeById(resumeId);
    let allExperience = await resumeCollection.find({_id: ObjectId(resumeId)},{projection :{experience:1}}).toArray();
    if(allExperience === null || allExperience.length == 0)
    {
        throw {status : "500" , error : "Experience not Found!"};
    }
    for(let i = 0 ; i < allExperience.length; i++)
    {
        allExperience[i]._id = allExperience[i]._id.toString();
    }
    return resumeById.experience;
}

async function removeExperience(experienceId){
    experienceId = helper.common.isValidId(experienceId);
    const resumeCollection = await resumes();
    const findResumeId = await resumeCollection.findOne({'experience._id': ObjectId(experienceId)});
    if(findResumeId == null) throw {status : "500" , error : "Resume not Found!"};
    let resumeId = findResumeId._id.toString();
    let removeExperienceById = await resumeCollection.updateOne(
        {_id: ObjectId(resumeId)},
        {$pull: {experience : {_id: ObjectId(experienceId)}}}
      );

    if(removeExperienceById.modifiedCount == 0) throw {status : "500", error : "Experience Deletion failed!"};

    let getResumes = await resume.getResumeById(resumeId);

    return getResumes;

}

module.exports = {
    createExperience,
    getExperienceById,
    getAllExperience,
    removeExperience
};