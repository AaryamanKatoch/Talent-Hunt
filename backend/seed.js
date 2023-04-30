const job = require("./data/jobs");
const application = require("./data/application");
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
  let alljobs = undefined;
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
      name: "Ujas Italia",
      address: "51 Hancock Avenue",
      education: "Masters",
      field_of_employment: "IT",
      profile_picture:
        "http://getwallpapers.com/wallpaper/full/8/d/1/798741-download-free-awesome-nature-backgrounds-1920x1080-for-tablet.jpg",
      skills: ["Python", "React"],
      years_of_experience: 3,
    };
    const updatedJobseeker2 = await jobseekerData.updateJobSeeker(
      jobseeker2._id,
      data
    );
    // console.log(updatedJobseeker2);
  } catch (e) {
    console.log(e);
  }

  // try {
  //   const find = await jobseekerData.getJobSeekerByEmail("ak34@gmail.com");
  //   // console.log(find);
  //   job1 = await job.createJob(
  //     "Testyyy job",
  //     "backend stuff",
  //     "will sponsor",
  //     "undersgrad in cs"
  //   );
  //   //console.log(fli1)
  // } catch (e) {
  //   console.log(e);
  // }

  try {
    let data = {
      name: "Dhavan Kanakia",
      address: "51 Hancock Avenue",
      education: "Bachelors",
      field_of_employment: "IT",
      profile_picture:
        "http://getwallpapers.com/wallpaper/full/8/d/1/798741-download-free-awesome-nature-backgrounds-1920x1080-for-tablet.jpg",
      skills: ["Node", "Python", "React"],
      years_of_experience: 3,
    };
    const updatedJobseeker1 = await jobseekerData.updateJobSeekerByEmail(
      "dkanakia34@gmail.com",
      data
    );
    // console.log(updatedJobseeker1);
  } catch (e) {
    console.log(e);
  }

  // try {
  //   const removeJobseeker2 = await jobseekerData.removeJobSeeker(
  //     jobseeker2._id
  //   );
  //   console.log(removeJobseeker2);
  // } catch (e) {
  //   console.log(e);
  // }

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

  try {
    let data = {
      name: "Boresquare but bad",
      description: "Foursquare adaptation",
      type: "IT",
      profile_picture:
        "http://getwallpapers.com/wallpaper/full/8/d/1/798741-download-free-awesome-nature-backgrounds-1920x1080-for-tablet.jpg",
    };
    let email = "gk34@apple.com";
    const updatedCompany4 = await companyData.updateCompanyByEmail(email, data);
    console.log(updatedCompany4);
  } catch (e) {
    console.log(e);
  }

  try {
    let companyEmail = "gk34@apple.com";
    let data = {
      name: "Backend Dev",
      description: "Backend Developer",
      responsibilities: "You know what is needed",
      visaRequirements: "Citizen",
      minimumQualification: "bachelors",
    };
    job1 = await jobData.createJobByCompanyEmail(companyEmail, data);
    console.log(job1);
  } catch (e) {
    console.log(e);
  }

  try {
    let companyEmail = "gk34@apple.com";
    let data = {
      name: "Frontend Dev",
      description: "Frontend Developer",
      responsibilities: "You know what is needed",
      visaRequirements: "h1b",
      minimumQualification: "masters",
    };
    const job2 = await jobData.createJobByCompanyEmail(companyEmail, data);
    console.log(job2);
  } catch (e) {
    console.log(e);
  }

  try {
    let companyEmail = "ab34@outlook.com";
    let data = {
      name: "Backend Dev",
      description: "Backend Developer",
      responsibilities: "You know what is needed",
      visaRequirements: "h4ead",
      minimumQualification: "phd",
    };
    const job3 = await jobData.createJobByCompanyEmail(companyEmail, data);
    console.log(job3);
  } catch (e) {
    console.log(e);
  }

  try {
    let companyEmail = "gk34@apple.com";
    let data = {
      name: "Backend Dev 2",
      description: "Backend Developer",
      responsibilities: "You know what is needed",
      visaRequirements: "Citizen",
      minimumQualification: "bachelors",
    };
    const updatedJob1 = await jobData.updateJobByCompanyEmail(
      job1._id,
      companyEmail,
      data
    );
    console.log(updatedJob1);
  } catch (e) {
    console.log(e);
  }

  try {
    let companyEmail = "gk314@apple.com";
    const apple = await jobData.getAllJobsByCompanyEmail(companyEmail);
    console.log(apple);
  } catch (e) {
    console.log(e);
  }

  // try {
  // job1 = await job.createJob(
  //   "Testyyy job",
  //   "backend stuff",
  //   "will sponsor",
  //   "undersgrad in cs"
  // );
  //   //console.log(fli1)
  // } catch (e) {
  //   console.log(e);
  // }

  /*
try {

    job2 = await job.createJob("Test job2 ","backend stuff 2","will sponsor2","undersgrad in ece");
    //console.log(flight1)
    } catch (e) {
        console.log(e);
    }

try {
        alljobs = await job.getAllJobs();
        console.log(alljobs)
        } catch (e) {
            console.log(e);
    }

    try {
        jobbyid = await job.getJobById("64456e7c0b6aca78c6b3ee2c");
        console.log(jobbyid)
        } catch (e) {
            console.log(e);
    }


try {
    jobbyid = await job.removeJob("64456e7c0b6aca78c6b3ee2c");
    } catch (e) {
        console.log(e);
}
try {
    alljobs = await job.getAllJobs();
    console.log(alljobs)
    } catch (e) {
        console.log(e);
}

try {

    app1 = await application.createApplication("jobseekerid","jobid","Aaryaman","Katoch","email@test.com","resume","male","F1");
    //console.log(flight1)
    } catch (e) {
        console.log(e);
    }

    try {
        allapps = await application.getAllApplications();
        console.log(allapps)
        } catch (e) {
            console.log(e);
    }


try {
    appbyid = await application.getApplicationById("64457066672df3082335c0e0");
    console.log(appbyid)
    } catch (e) {
        console.log(e);
}


try {
    ap = await application.removeApplication("64457066672df3082335c0e0");
  
    } catch (e) {
        console.log(e);
}
*/
  connection.closeConnection();
  console.log("Done!");
}

main();
