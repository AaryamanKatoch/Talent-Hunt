const mongoCollections = require("../config/mongoCollections");
const resumes = mongoCollections.resumes;
const resume = require('./resumes')
const { ObjectId } = require("mongodb");
const helper = require("../helper");

async function createEducation(resumeId, school, address,degree, gpa, start_year, end_year){
    resumeId = helper.common.isValidId(resumeId);
    school = helper.common.isValidString(school,'School');
    address = helper.common.isValidString(address,'Address');
    degree = helper.common.isValidString(degree,'Degree');
    gpa = helper.common.isValidGpa(gpa);
    start_year = helper.common.isValidYear(start_year);
    end_year = helper.common.isValidYear(end_year);
    helper.common.isValidStartEndYear(start_year,end_year);

    const resumeCollection = await resumes();
    let educationData = {
        _id : new ObjectId(),
        school : school,
        address : address,
        degree : degree,
        gpa : gpa,
        start_year : start_year,
        end_year : end_year
    }

    const checkResume = await resumeCollection.findOne({_id: ObjectId(resumeId)});
    if (checkResume === null) throw {status : "500",error : 'Resume not found with that id!'};

    let create = await resumeCollection.updateOne({_id : ObjectId(resumeId)}, {$push : {education : educationData}});

    if(create.modifiedCount === 0)
    {
        throw {status : "500",error : 'Could not update the education details.'};
    }
    let educationId = educationData._id.toString();
    let getCreatedEducation = await getEducationById(educationId);
    return getCreatedEducation;
}

async function getEducationById(educationId){
    educationId = helper.common.isValidId(educationId);
    const resumeCollection = await resumes();
    const findEducationId = await resumeCollection
  .findOne({'education._id': ObjectId(educationId)},
  {projection: {_id: 0,  education: { $elemMatch: { _id: ObjectId(educationId)}}}});

  if(findEducationId == null) throw {status : "500" , error : "Could not found the Resume with that resume id!"};

  findEducationId.education[0]._id = findEducationId.education[0]._id.toString();
  return findEducationId.education[0];
}

async function getAllEducation(resumeId){
    resumeId = helper.common.isValidId(resumeId);
    const resumeCollection = await resumes();
    let resumeById = await resume.getResumeById(resumeId);
    let allEducation = await resumeCollection.find({_id: ObjectId(resumeId)},{projection :{education:1}}).toArray();
    if(allEducation === null || allEducation.length == 0)
    {
        throw {status : "500" , error : "Education not Found!"};
    }
    for(let i = 0 ; i < allEducation.length; i++)
    {
        allEducation[i]._id = allEducation[i]._id.toString();
    }
    return resumeById.education;
}

async function removeEducation(educationId){
    educationId = helper.common.isValidId(educationId);
    const resumeCollection = await resumes();
    const findResumeId = await resumeCollection.findOne({'education._id': ObjectId(educationId)});
    if(findResumeId == null) throw {status : "500" , error : "Resume not Found!"};
    let resumeId = findResumeId._id.toString();
    let removeEducationById = await resumeCollection.updateOne(
        {_id: ObjectId(resumeId)},
        {$pull: {education : {_id: ObjectId(educationId)}}}
      );

    if(removeEducationById.modifiedCount == 0) throw {status : "500", error : "Education Deletion failed!"};

    let getResumes = await resume.getResumeById(resumeId);

    return getResumes;

}

module.exports = {
    createEducation,
    getEducationById,
    getAllEducation,
    removeEducation
};