const job = require("./data/jobs");
const data = require("./data");
const jobseekerData = require("./data/jobseeker");
const companyData = require("./data/company");
const jobData = require("./data/jobs");

const connection = require("./config/mongoConnection");
const { jobs } = require("./config/mongoCollections");
const { applications } = require("./config/mongoCollections");
const { jobseeker } = require("./helper");

// manual testing using comments

async function main() {
  const db = await connection.dbConnection();
  let alljobs = [];
  let jobseeker1, jobseeker2, jobseeker3, jobseeker4;
  let company1, company2, company3, company4;
  let job1;

  await db.dropDatabase();

  try {
    let data = {
      name: "Dhavan Kanakia",
      address: "51 Hancock Avenue",
      education: "Masters",
      field_of_employment: "IT",
      profile_picture:
        "http://getwallpapers.com/wallpaper/full/8/d/1/798741-download-free-awesome-nature-backgrounds-1920x1080-for-tablet.jpg",
      skills: ["Node", "React"],
      years_of_experience: 3,
    };
    jobseeker1 = await jobseekerData.createJobSeeker(
      data,
      "dkanakia34@gmail.com"
    );
    // console.log(jobseeker1);
  } catch (e) {
    console.log(e);
  }

  try {
    let data = {
      name: "Ujas Italia",
      address: "51 Hancock Avenue",
      education: "Masters",
      field_of_employment: "IT",
      profile_picture:
        "http://getwallpapers.com/wallpaper/full/8/d/1/798741-download-free-awesome-nature-backgrounds-1920x1080-for-tablet.jpg",
      skills: ["Node", "React", "MongoDb"],
      years_of_experience: 3,
    };
    jobseeker2 = await jobseekerData.createJobSeeker(data, "ui34@gmail.com");
    // console.log(jobseeker2);
  } catch (e) {
    console.log(e);
  }

  try {
    let data = {
      name: "aaryaman katoch",
      address: "51 Hancock Avenue",
      education: "Masters",
      field_of_employment: "IT",
      profile_picture:
        "http://getwallpapers.com/wallpaper/full/8/d/1/798741-download-free-awesome-nature-backgrounds-1920x1080-for-tablet.jpg",
      skills: ["Node", "React"],
      years_of_experience: 3,
    };
    jobseeker3 = await jobseekerData.createJobSeeker(data, "ak34@gmail.com");
    // console.log(jobseeker3);
  } catch (e) {
    console.log(e);
  }

  try {
    let data = {
      name: "Ridham Patel",
      address: "51 Hancock Avenue",
      education: "Masters",
      field_of_employment: "IT",
      profile_picture:
        "http://getwallpapers.com/wallpaper/full/8/d/1/798741-download-free-awesome-nature-backgrounds-1920x1080-for-tablet.jpg",
      skills: ["React"],
      years_of_experience: 3,
    };
    jobseeker4 = await jobseekerData.createJobSeeker(data, "rd34@gmail.com");
    // console.log(jobseeker4);
  } catch (e) {
    console.log(e);
  }

  try {
    let data = {
      name: "Apple",
      description: "Well you know what Apple is",
      type: "IT",
      profile_picture:
        "http://getwallpapers.com/wallpaper/full/8/d/1/798741-download-free-awesome-nature-backgrounds-1920x1080-for-tablet.jpg",
    };
    let email = "tc34@apple.com";
    company1 = await companyData.createCompany(data, email);
    console.log(company1);
  } catch (e) {
    console.log(e);
  }

  try {
    let data = {
      name: "Microsoft",
      description: "Well you know what Microsoft is",
      type: "IT",
      profile_picture:
        "http://getwallpapers.com/wallpaper/full/8/d/1/798741-download-free-awesome-nature-backgrounds-1920x1080-for-tablet.jpg",
    };
    let email = "bg34@microsoft.com";
    company2 = await companyData.createCompany(data, email);
    console.log(company2);
  } catch (e) {
    console.log(e);
  }

  try {
    let data = {
      name: "Foursquare",
      description: "Well you know what Foursquare is",
      type: "IT",
      profile_picture:
        "http://getwallpapers.com/wallpaper/full/8/d/1/798741-download-free-awesome-nature-backgrounds-1920x1080-for-tablet.jpg",
    };
    let email = "ab34@outlook.com";
    company3 = await companyData.createCompany(data, email);
    console.log(company3);
  } catch (e) {
    console.log(e);
  }

  try {
    let data = {
      name: "Boresquare",
      description: "Foursquare adaptation",
      type: "IT",
      profile_picture:
        "http://getwallpapers.com/wallpaper/full/8/d/1/798741-download-free-awesome-nature-backgrounds-1920x1080-for-tablet.jpg",
    };
    let email = "gk34@apple.com";
    company4 = await companyData.createCompany(data, email);
    console.log(company4);
  } catch (e) {
    console.log(e);
  }

  for (let i = 0; i < 2; i++) {
    try {
      let data = {
        name: `SDE${i}`,
        description: "This is job for SDE",
        responsibilities: "working on react and node",
        visaRequirements: "f1",
        minimumQualification: "masters",
      };
      let email = "tc34@apple.com";
      const addedjob = await jobData.createJobByCompanyEmail(email, data);
      alljobs.push(addedjob._id);
      console.log("*****************************", addedjob);
    } catch (e) {
      console.log(e);
    }
  }

  for (let i = 0; i < 2; i++) {
    try {
      let data = {
        name: `DA${i}`,
        description: "This is job for Data Analyst",
        responsibilities: "working on SQL and R",
        visaRequirements: "f1",
        minimumQualification: "masters",
      };
      let email = "gk34@apple.com";
      const addedjob = await jobData.createJobByCompanyEmail(email, data);
      alljobs.push(addedjob._id);
      console.log("*****************************", addedjob);
    } catch (e) {
      console.log(e);
    }
  }

  for (let i = 0; i < 2; i++) {
    try {
      let data = {
        name: `Automobile designer ${i}`,
        description: "This is job for Automobile designer",
        responsibilities: "working on CAD",
        visaRequirements: "H1B",
        minimumQualification: "masters",
      };
      let email = "ab34@outlook.com";
      const addedjob = await jobData.createJobByCompanyEmail(email, data);
      alljobs.push(addedjob._id);
      console.log("*****************************", addedjob);
    } catch (e) {
      console.log(e);
    }
  }

  let jobSeekers = [jobseeker1, jobseeker2, jobseeker3, jobseeker4];

  for (let i = 0; i < 3; i += 1) {
    try {
      let jobSeekerId = jobSeekers[i]._id;
      let jobId = alljobs[0];
      let firstName = jobSeekers[i].name.split(" ")[0];
      let lastName = jobSeekers[i].name.split(" ")[1];
      let email = jobSeekers[i].email;
      let resumeId = jobSeekers[i].resumeId;
      let sex = "Male";
      let visaStatus = "H1B";
      let application = await data.application.createApplication(
        jobSeekerId,
        jobId,
        firstName,
        lastName,
        email,
        resumeId,
        sex,
        visaStatus
      );
    } catch (e) {
      console.log(e);
    }
  }

  for (let i = 0; i < 3; i += 1) {
    try {
      let jobSeekerId = jobSeekers[i]._id;
      let jobId = alljobs[2];
      let firstName = jobSeekers[i].name.split(" ")[0];
      let lastName = jobSeekers[i].name.split(" ")[1];
      let email = jobSeekers[i].email;
      let resumeId = jobSeekers[i].resumeId;
      let sex = "Male";
      let visaStatus = "H1B";
      let application = await data.application.createApplication(
        jobSeekerId,
        jobId,
        firstName,
        lastName,
        email,
        resumeId,
        sex,
        visaStatus
      );
    } catch (e) {
      console.log(e);
    }
  }

  for (let i = 0; i < 3; i += 1) {
    try {
      let jobSeekerId = jobSeekers[i]._id;
      let jobId = alljobs[4];
      let firstName = jobSeekers[i].name.split(" ")[0];
      let lastName = jobSeekers[i].name.split(" ")[1];
      let email = jobSeekers[i].email;
      let resumeId = jobSeekers[i].resumeId;
      let sex = "Male";
      let visaStatus = "H1B";
      let application = await data.application.createApplication(
        jobSeekerId,
        jobId,
        firstName,
        lastName,
        email,
        resumeId,
        sex,
        visaStatus
      );
    } catch (e) {
      console.log(e);
    }
  }

  connection.closeConnection();
  console.log("Done!");
}

main();
