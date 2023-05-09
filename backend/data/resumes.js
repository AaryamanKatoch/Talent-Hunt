const mongoCollections = require("../config/mongoCollections");
const resumes = mongoCollections.resumes;
const { ObjectId } = require("mongodb");
const helper = require("../helper");

async function getResumeById(id){
    id = helper.common.isValidId(id);
    const resumeCollection = await resumes();
    const resume = await resumeCollection.findOne( { _id: new ObjectId(id) });
    if (!resume) {
        throw { status: "404", error: "Resume not found" };
    }
    resume._id = resume._id.toString();
  return resume;
}

async function deleteResumeById(id){
    id = helper.common.isValidId(id);
    const resumeCollection = await resumes();
    const deletedResume = await resumeCollection.findOne( { _id: new ObjectId(id) });

    const deleteResume = await resumeCollection.deleteOne( { _id: new ObjectId(id) });

    if(deleteResume.deletedCount === 0){
        throw { status: "404", error: "Resume could not be deleted" };
    }

    return deletedResume;
}

async function createResume(userId,name, address, linkedin, email, contact, skills){
    userId = helper.common.isValidId(userId);
    name = helper.common.isValidString(name, 'Name');
    address = helper.common.isValidString(address, 'Address');
    linkedin = helper.common.isValidURL(linkedin);
    email = helper.common.isValidEmail(email);
    contact = helper.common.isValidContact(contact);
    for(let i = 0; i < skills.length; i++){
        skills[i] = helper.common.isValidString(skills[i], 'Skill');
    }
    // achievements = helper.common.isValidString(achievements,'Achievements');
    let education = [];
    let experience = [];
    let projects = [];
    const resumeCollection = await resumes();
    let resumeObj = {        
        name : name,
        address : address,
        linkedin : linkedin,
        email : email,
        contact : contact,
        skills : skills,
        education : education,
        experience: experience,
        projects : projects,
        jobSeekerId : userId
    };
    
    const insertInfo = await resumeCollection.insertOne(resumeObj);
    if (!insertInfo.acknowledged || !insertInfo.insertedId)
      throw {status: '500', error : 'Could not add resume to the database!'};
   
    const newId = insertInfo.insertedId.toString();
    const resume1 = await resumeCollection.findOne({_id: new ObjectId(newId)});
    
    if (resume1 === null) throw {status: '500', error : 'No resume found in the database with that id!'};  
    let newResume = {
        _id: newId,
        ...resumeObj
    }
    newResume._id = newResume._id.toString();
    return newResume;
}
async function updateResume(resumeId, name, address, linkedin, email, contact, skills){
    if(!resumeId || !name || !address || !linkedin || !email || !contact || !skills){
        throw {status : '404', error : 'At least one field needs to be passed!'};
    }
    resumeId = helper.common.isValidId(resumeId);
    name = helper.common.isValidString(name, 'Name');
    address = helper.common.isValidString(address, 'Address');
    linkedin = helper.common.isValidURL(linkedin);
    email = helper.common.isValidEmail(email);
    contact = helper.common.isValidContact(contact);
    for(let i = 0; i < skills.length; i++){
        skills[i] = helper.common.isValidString(skills[i], 'Skill');
    }
   
    let resumeCollection = await resumes();
    let resumeUpdation = await resumeCollection.findOne({_id: ObjectId(resumeId)});
    //console.log(updated);
    if (resumeUpdation === null) throw {status: '500', error : 'No resume found in the database with that id!'};

    let updatedResume = {
        name : name,
        address : address,
        linkedin : linkedin,
        email : email,
        contact : contact,
        skills : skills,
        education : resumeUpdation.education,
        experience: resumeUpdation.experience,
        projects : resumeUpdation.projects,
       
    }

    const updatedInfo = await resumeCollection.updateOne(
        {_id: ObjectId(resumeId)},
        {$set: updatedResume}
      );
      //console.log(updatedInfo.modifiedCount);
      if (updatedInfo.modifiedCount === 0) {
        throw {status: '500', error : 'Could not update Resume successfully!'};
      }

    let getResume = await getResumeById(resumeId);
    return getResume;

}
module.exports = {
    getResumeById,
    deleteResumeById,
    createResume,
    updateResume
};