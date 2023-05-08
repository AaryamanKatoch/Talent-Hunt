const mongoCollections = require("../config/mongoCollections");
const resumes = mongoCollections.resumes;
const resume = require('./resumes')
const { ObjectId } = require("mongodb");
const helper = require("../helper");

async function createProject(resumeId,name,description){
    resumeId = helper.common.isValidId(resumeId);
    name = helper.common.isValidString(name,'Project Name');
    description = helper.common.isValidString(description);

    const resumeCollection = await resumes();
    let projectData = {
        _id : new ObjectId(),
        name : name,
        description : description,
    }

    const checkResume = await resumeCollection.findOne({_id: ObjectId(resumeId)});
    if (checkResume === null) throw {status : "500",error : 'Resume not found with that id!'};

    let create = await resumeCollection.updateOne({_id : ObjectId(resumeId)}, {$push : {projects : projectData}});

    if(create.modifiedCount === 0)
    {
        throw {status : "500",error : 'Could not update the project details.'};
    }
    let projectId = projectData._id.toString();
    let getCreatedProject = await getProjectById(projectId);
    return getCreatedProject;
}

async function getProjectById(projectId){
    projectId = helper.common.isValidId(projectId);
    const resumeCollection = await resumes();
    const findProjectId = await resumeCollection
  .findOne({'projects._id': ObjectId(projectId)},
  {projection: {_id: 0,  projects: { $elemMatch: { _id: ObjectId(projectId)}}}});

  if(findProjectId == null) throw {status : "500" , error : "Could not found the Resume with that resume id!"};

  findProjectId.projects[0]._id = findProjectId.projects[0]._id.toString();
  return findProjectId.projects[0];
}

async function getAllProject(resumeId){
    resumeId = helper.common.isValidId(resumeId);
    const resumeCollection = await resumes();
    let resumeById = await resume.getResumeById(resumeId);
    let allProject = await resumeCollection.find({_id: ObjectId(resumeId)},{projection :{projects:1}}).toArray();
    if(allProject === null || allProject.length == 0)
    {
        throw {status : "500" , error : "Project not Found!"};
    }
    for(let i = 0 ; i < allProject.length; i++)
    {
        allProject[i]._id = allProject[i]._id.toString();
    }
    return resumeById.project;
}

async function removeProject(projectId){
    projectId = helper.common.isValidId(projectId);
    const resumeCollection = await resumes();
    const findResumeId = await resumeCollection.findOne({'projects._id': ObjectId(projectId)});
    if(findResumeId == null) throw {status : "500" , error : "Resume not Found!"};
    let resumeId = findResumeId._id.toString();
    let removeProjectById = await resumeCollection.updateOne(
        {_id: ObjectId(resumeId)},
        {$pull: {projects : {_id: ObjectId(projectId)}}}
      );

    if(removeProjectById.modifiedCount == 0) throw {status : "500", error : "Project Deletion failed!"};

    let getResumes = await resume.getResumeById(resumeId);

    return getResumes;

}

module.exports = {
    createProject,
    getProjectById,
    getAllProject,
    removeProject
};