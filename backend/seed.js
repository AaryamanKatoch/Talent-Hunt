const job = require("./data/jobs");
const data = require("./data");
const jobseekerData = require("./data/jobseeker");
const companyData = require("./data/company");
const jobData = require("./data/jobs");
const resumes = require("./data/resumes");
const educationData = require("./data/education");
const experienceData = require("./data/experience");
const projectsData = require("./data/projects");
const mongoCollections = require("./config/mongoCollections");
const jobSeekers = mongoCollections.jobSeekers;
const connection = require("./config/mongoConnection");
// const { jobs } = require("./config/mongoCollections");
const { applications } = require("./config/mongoCollections");
const { jobseeker } = require("./helper");
const { ObjectId } = require("mongodb");

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


  let resume1, resume2, resume3, resume4;

  try {
    resume1 = await resumes.createResume(
      jobseeker1._id,
      "Parth Patel",
      "Jersey City, NJ",
      "https://www.linkedin.com/in/parthpatel33/",
      jobseeker1.email,
      "5514367610",
      ["Java", "C++", "C", "Node.js", "HTML", "CSS"]
    );
  } catch (e) {
    console.log(e.error);
  }
  let ed1 = {
    school : 'Stevens Institute of Technology',
    address : 'Hoboken, NJ',
    degree : 'Masters in Computer Science',
    gpa : '4',
    startYear  : '2022',
    endYear : '2024'
  }
  let ed2 = {
    school : 'Nirma Institute of Technology',
    address : 'Ahmedabad, India',
    degree : 'Bachelors in Computer Science',
    gpa : '3',
    startYear  : '2017',
    endYear : '2021'
  }
  let edu = [ed1,ed2];
  try {
    for(let i = 0; i < edu.length; i++){
       let education1 = await educationData.createEducation(
        resume1._id,
        edu[i].school,
        edu[i].address,
        edu[i].degree,
        edu[i].gpa,
        edu[i].startYear,
        edu[i].endYear
      );
    }
  } catch (e) {
    console.log(e);
  }

  
let exp1 = {     
          
  company: "Tata Consultancy Services",
  address: "Gandhinagar, India",
  bulletPoints: ["Created an automation framework which tests the performance of scalability and reliability of ITSI Splunk application.", "Drove the development of a model-based automated testing framework for the Aurora database engine in an attempt to replace manually programmed tests in collaboration with the Aurora Storage team.", "The framework helped in identifying the weak performing features of the ITSI app, which after the fixes reduced 22% of data loss happening in previous version of the app."],
  position: "Software Development Engineer",
  startYear: "2021",
  startMonth:"July",
  endYear: "2022",
  endMonth:"July" 

}

let exp2 = {      
          
  company: "Amazon",
  address: "Banglore, India",
  bulletPoints: ["Created an automation framework which tests the performance of scalability and reliability of ITSI Splunk application.", "Drove the development of a model-based automated testing framework for the Aurora database engine in an attempt to replace manually programmed tests in collaboration with the Aurora Storage team.", "The framework helped in identifying the weak performing features of the ITSI app, which after the fixes reduced 22% of data loss happening in previous version of the app."],
  position: "Software Development Engineer",
  startYear: "2017",
  startMonth:"July",
  endYear: "2022",
  endMonth:"July" 

}

let exper = [exp1,exp2];
  try {
    for(let i = 0; i < exper.length; i++){
      let createdExperience = await experienceData.createExperience(
        resume1._id,
        exper[i].company,
        exper[i].address,
        exper[i].position,
        exper[i].bulletPoints,
        exper[i].startYear,
        exper[i].endYear,
        exper[i].startMonth,
        exper[i].endMonth
      );
    }
  } catch (e) {
    console.log(e);
  }

  let pro1 = {
  name : 'Messaging App',
  description : 'Created a secure real-time messaging platform where users can connect and share texts, images, videos and documents using websockets as the mode of communication. Used micro-services to manage each and every detail on UI. Used cryptographic algorithm to secure the messages exchanged between the users.'
}

let pro2 = {
  name : 'Stay N Eat',
  description : 'Created a secure, robust and resilient micro-service oriented platform for booking hotel rooms and ordering food. Implemented an asynchronous messaging queue for preparation and delivery of orders based on multiple parameters like preparation time, delivery time and customer type which increased the customer satisfaction by 25%.'
}
let pro = [pro1,pro2];

try {
  for(let i = 0; i < pro.length; i++){
    let createdProject = await projectsData.createProject(
      resume1._id,
      pro[i].name,
      pro[i].description
    );
  }
} catch (e) {
  console.log(e);
}

try {
  let data;
    // email = helper.common.isValidEmail(email);
    const profileExists = await jobseekerData.profileExists(jobseeker1.email);
    // console.log(profileExists);
    if (profileExists) {
      data = await jobseekerData.getJobSeekerByEmail(jobseeker1.email);
      // console.log(data);
    
    } else {
      console.log("Profile Not created");
    }
    const jobSeekerCollection = await mongoCollections.jobSeekers;
    const coll = await jobSeekerCollection()
    const updatedJobSeeker = {
      name: data.name,
      email: data.email,
      address: data.address,
      education: data.education,
      field_of_employment: data.field_of_employment,
      profile_picture: data.profile_picture,
      skills: data.skills,
      years_of_experience: data.years_of_experience,
      resumeId: resume1._id,
      jobs_applied: data.jobs_applied,
    };

    const updatedInfo = await coll.updateOne(
      { _id: new ObjectId(data._id) },
      { $set: updatedJobSeeker }
    );
    if (updatedInfo.modifiedCount === 0) {
      throw {
        status: "400",
        error: "All new details exactly match the old details",
      };
    }
} catch (e) {
  console.log(e);
}

/* Resume 2 for jobseeker 2 *************************************************************** */

try {
  resume2 = await resumes.createResume(
    jobseeker2._id,
    "Ridham Patel",
    "Jersey City, NJ",
    "https://www.linkedin.com/in/parthpatel33/",
    jobseeker2.email,
    "5513367810",
    ["Java", "C++", "C", "Node.js"]
  );
} catch (e) {
  console.log(e.error);
}
let ed1_1 = {
  school : 'Stevens Institute of Technology',
  address : 'Hoboken, NJ',
  degree : 'Masters in Computer Science',
  gpa : '4',
  startYear  : '2022',
  endYear : '2024'
}
let ed2_1 = {
  school : 'Raman Institute of Technology',
  address : 'Ahmedabad, India',
  degree : 'Bachelors in Computer Science',
  gpa : '3',
  startYear  : '2018',
  endYear : '2022'
}
let edu_1 = [ed1_1,ed2_1];
try {
  for(let i = 0; i < edu_1.length; i++){
     let education1 = await educationData.createEducation(
      resume2._id,
      edu_1[i].school,
      edu_1[i].address,
      edu_1[i].degree,
      edu_1[i].gpa,
      edu_1[i].startYear,
      edu_1[i].endYear
    );
  }
} catch (e) {
  console.log(e);
}


let exp1_1 = {     
        
company: "Infosys",
address: "Gandhinagar, India",
bulletPoints: ["Created an automation framework which tests the performance of scalability and reliability of ITSI Splunk application.", "Drove the development of a model-based automated testing framework for the Aurora database engine in an attempt to replace manually programmed tests in collaboration with the Aurora Storage team.", "The framework helped in identifying the weak performing features of the ITSI app, which after the fixes reduced 22% of data loss happening in previous version of the app."],
position: "Software Development Engineer",
startYear: "2021",
startMonth:"July",
endYear: "2022",
endMonth:"July" 

}

let exp2_1 = {      
        
company: "Adobe",
address: "Banglore, India",
bulletPoints: ["Created an automation framework which tests the performance of scalability and reliability of ITSI Splunk application.", "Drove the development of a model-based automated testing framework for the Aurora database engine in an attempt to replace manually programmed tests in collaboration with the Aurora Storage team.", "The framework helped in identifying the weak performing features of the ITSI app, which after the fixes reduced 22% of data loss happening in previous version of the app."],
position: "Software Development Engineer",
startYear: "2017",
startMonth:"July",
endYear: "2022",
endMonth:"July" 

}

let exper_1 = [exp1_1,exp2_1];
try {
  for(let i = 0; i < exper_1.length; i++){
    let createdExperience = await experienceData.createExperience(
      resume2._id,
      exper_1[i].company,
      exper_1[i].address,
      exper_1[i].position,
      exper_1[i].bulletPoints,
      exper_1[i].startYear,
      exper_1[i].endYear,
      exper_1[i].startMonth,
      exper_1[i].endMonth
    );
  }
} catch (e) {
  console.log(e);
}

let pro1_1 = {
name : 'Travelling App',
description : 'Created a secure real-time messaging platform where users can connect and share texts, images, videos and documents using websockets as the mode of communication. Used micro-services to manage each and every detail on UI. Used cryptographic algorithm to secure the messages exchanged between the users.'
}

let pro2_1 = {
name : 'Stay N Fit',
description : 'Created a secure, robust and resilient micro-service oriented platform for booking hotel rooms and ordering food. Implemented an asynchronous messaging queue for preparation and delivery of orders based on multiple parameters like preparation time, delivery time and customer type which increased the customer satisfaction by 25%.'
}
let pro_1 = [pro1_1,pro2_1];

try {
for(let i = 0; i < pro_1.length; i++){
  let createdProject = await projectsData.createProject(
    resume2._id,
    pro_1[i].name,
    pro_1[i].description
  );
}
} catch (e) {
console.log(e);
}

try {
  let data;
    // email = helper.common.isValidEmail(email);
    const profileExists = await jobseekerData.profileExists(jobseeker2.email);
    // console.log(profileExists);
    if (profileExists) {
      data = await jobseekerData.getJobSeekerByEmail(jobseeker2.email);
      // console.log(data);
    
    } else {
      console.log("Profile Not created");
    }
    const jobSeekerCollection = await mongoCollections.jobSeekers;
    const coll = await jobSeekerCollection()
    const updatedJobSeeker = {
      name: data.name,
      email: data.email,
      address: data.address,
      education: data.education,
      field_of_employment: data.field_of_employment,
      profile_picture: data.profile_picture,
      skills: data.skills,
      years_of_experience: data.years_of_experience,
      resumeId: resume2._id,
      jobs_applied: data.jobs_applied,
    };

    const updatedInfo = await coll.updateOne(
      { _id: new ObjectId(data._id) },
      { $set: updatedJobSeeker }
    );
    if (updatedInfo.modifiedCount === 0) {
      throw {
        status: "400",
        error: "All new details exactly match the old details",
      };
    }
} catch (e) {
  console.log(e);
}


/* Resume 3 for jobseeker 3 *************************************************************** */

try {
  resume3 = await resumes.createResume(
    jobseeker3._id,
    "Ujas Italia",
    "Jersey City, NJ",
    "https://www.linkedin.com/in/parthpatel33/",
    jobseeker3.email,
    "5513367810",
    ["Java", "C++", "C", "Node.js"]
  );
} catch (e) {
  console.log(e.error);
}
let ed1_2 = {
  school : 'Stevens Institute of Technology',
  address : 'Hoboken, NJ',
  degree : 'Masters in Computer Science',
  gpa : '4',
  startYear  : '2022',
  endYear : '2024'
}
let ed2_2 = {
  school : 'Mohan Institute of Technology',
  address : 'Ahmedabad, India',
  degree : 'Bachelors in Computer Science',
  gpa : '3',
  startYear  : '2018',
  endYear : '2022'
}
let edu_2 = [ed1_2,ed2_2];
try {
  for(let i = 0; i < edu_2.length; i++){
     let education1 = await educationData.createEducation(
      resume3._id,
      edu_2[i].school,
      edu_2[i].address,
      edu_2[i].degree,
      edu_2[i].gpa,
      edu_2[i].startYear,
      edu_2[i].endYear
    );
  }
} catch (e) {
  console.log(e);
}


let exp1_2 = {     
        
company: "TCS",
address: "Gandhinagar, India",
bulletPoints: ["Created an automation framework which tests the performance of scalability and reliability of ITSI Splunk application.", "Drove the development of a model-based automated testing framework for the Aurora database engine in an attempt to replace manually programmed tests in collaboration with the Aurora Storage team.", "The framework helped in identifying the weak performing features of the ITSI app, which after the fixes reduced 22% of data loss happening in previous version of the app."],
position: "Software Development Engineer",
startYear: "2021",
startMonth:"July",
endYear: "2022",
endMonth:"July" 

}

let exp2_2 = {      
        
company: "Myntra",
address: "Banglore, India",
bulletPoints: ["Created an automation framework which tests the performance of scalability and reliability of ITSI Splunk application.", "Drove the development of a model-based automated testing framework for the Aurora database engine in an attempt to replace manually programmed tests in collaboration with the Aurora Storage team.", "The framework helped in identifying the weak performing features of the ITSI app, which after the fixes reduced 22% of data loss happening in previous version of the app."],
position: "Software Development Engineer",
startYear: "2017",
startMonth:"July",
endYear: "2022",
endMonth:"July" 

}

let exper_2 = [exp1_2,exp2_2];
try {
  for(let i = 0; i < exper_2.length; i++){
    let createdExperience = await experienceData.createExperience(
      resume3._id,
      exper_2[i].company,
      exper_2[i].address,
      exper_2[i].position,
      exper_2[i].bulletPoints,
      exper_2[i].startYear,
      exper_2[i].endYear,
      exper_2[i].startMonth,
      exper_2[i].endMonth
    );
  }
} catch (e) {
  console.log(e);
}

let pro1_2 = {
name : 'Fitness App',
description : 'Created a secure real-time messaging platform where users can connect and share texts, images, videos and documents using websockets as the mode of communication. Used micro-services to manage each and every detail on UI. Used cryptographic algorithm to secure the messages exchanged between the users.'
}

let pro2_2 = {
name : 'Stay N Fit',
description : 'Created a secure, robust and resilient micro-service oriented platform for booking hotel rooms and ordering food. Implemented an asynchronous messaging queue for preparation and delivery of orders based on multiple parameters like preparation time, delivery time and customer type which increased the customer satisfaction by 25%.'
}
let pro_2 = [pro1_2,pro2_2];

try {
for(let i = 0; i < pro_2.length; i++){
  let createdProject = await projectsData.createProject(
    resume3._id,
    pro_2[i].name,
    pro_2[i].description
  );
}
} catch (e) {
console.log(e);
}

try {
  let data;
    // email = helper.common.isValidEmail(email);
    const profileExists = await jobseekerData.profileExists(jobseeker3.email);
    // console.log(profileExists);
    if (profileExists) {
      data = await jobseekerData.getJobSeekerByEmail(jobseeker3.email);
      // console.log(data);
    
    } else {
      console.log("Profile Not created");
    }
    const jobSeekerCollection = await mongoCollections.jobSeekers;
    const coll = await jobSeekerCollection()
    const updatedJobSeeker = {
      name: data.name,
      email: data.email,
      address: data.address,
      education: data.education,
      field_of_employment: data.field_of_employment,
      profile_picture: data.profile_picture,
      skills: data.skills,
      years_of_experience: data.years_of_experience,
      resumeId: resume3._id,
      jobs_applied: data.jobs_applied,
    };

    const updatedInfo = await coll.updateOne(
      { _id: new ObjectId(data._id) },
      { $set: updatedJobSeeker }
    );
    if (updatedInfo.modifiedCount === 0) {
      throw {
        status: "400",
        error: "All new details exactly match the old details",
      };
    }
} catch (e) {
  console.log(e);
}

/* Resume 4 for jobseeker 4 *************************************************************** */

try {
  resume4 = await resumes.createResume(
    jobseeker4._id,
    "Dhavan Kanakia",
    "Jersey City, NJ",
    "https://www.linkedin.com/in/parthpatel33/",
    jobseeker4.email,
    "5513337820",
    ["Java", "C++", "Node.js"]
  );
} catch (e) {
  console.log(e.error);
}
let ed1_3 = {
  school : 'Stevens Institute of Technology',
  address : 'Hoboken, NJ',
  degree : 'Masters in Computer Science',
  gpa : '4',
  startYear  : '2022',
  endYear : '2024'
}
let ed2_3 = {
  school : 'RK Institute of Technology',
  address : 'Ahmedabad, India',
  degree : 'Bachelors in Computer Science',
  gpa : '3',
  startYear  : '2018',
  endYear : '2022'
}
let edu_3 = [ed1_3,ed2_3];
try {
  for(let i = 0; i < edu_3.length; i++){
     let education1 = await educationData.createEducation(
      resume4._id,
      edu_3[i].school,
      edu_3[i].address,
      edu_3[i].degree,
      edu_3[i].gpa,
      edu_3[i].startYear,
      edu_3[i].endYear
    );
  }
} catch (e) {
  console.log(e);
}


let exp1_3 = {     
        
company: "Tech Mahindra",
address: "Gandhinagar, India",
bulletPoints: ["Created an automation framework which tests the performance of scalability and reliability of ITSI Splunk application.", "Drove the development of a model-based automated testing framework for the Aurora database engine in an attempt to replace manually programmed tests in collaboration with the Aurora Storage team.", "The framework helped in identifying the weak performing features of the ITSI app, which after the fixes reduced 22% of data loss happening in previous version of the app."],
position: "Software Development Engineer",
startYear: "2021",
startMonth:"July",
endYear: "2022",
endMonth:"July" 

}

let exp2_3 = {      
        
company: "Google",
address: "Banglore, India",
bulletPoints: ["Created an automation framework which tests the performance of scalability and reliability of ITSI Splunk application.", "Drove the development of a model-based automated testing framework for the Aurora database engine in an attempt to replace manually programmed tests in collaboration with the Aurora Storage team.", "The framework helped in identifying the weak performing features of the ITSI app, which after the fixes reduced 22% of data loss happening in previous version of the app."],
position: "Software Development Engineer",
startYear: "2017",
startMonth:"July",
endYear: "2022",
endMonth:"July" 

}

let exper_3 = [exp1_3,exp2_3];
try {
  for(let i = 0; i < exper_3.length; i++){
    let createdExperience = await experienceData.createExperience(
      resume4._id,
      exper_3[i].company,
      exper_3[i].address,
      exper_3[i].position,
      exper_3[i].bulletPoints,
      exper_3[i].startYear,
      exper_3[i].endYear,
      exper_3[i].startMonth,
      exper_3[i].endMonth
    );
  }
} catch (e) {
  console.log(e);
}

let pro1_3 = {
name : 'Rail Booking App',
description : 'Created a secure real-time messaging platform where users can connect and share texts, images, videos and documents using websockets as the mode of communication. Used micro-services to manage each and every detail on UI. Used cryptographic algorithm to secure the messages exchanged between the users.'
}

let pro2_3 = {
name : 'Stay N Fit',
description : 'Created a secure, robust and resilient micro-service oriented platform for booking hotel rooms and ordering food. Implemented an asynchronous messaging queue for preparation and delivery of orders based on multiple parameters like preparation time, delivery time and customer type which increased the customer satisfaction by 25%.'
}
let pro_3 = [pro1_3,pro2_3];

try {
for(let i = 0; i < pro_3.length; i++){
  let createdProject = await projectsData.createProject(
    resume4._id,
    pro_3[i].name,
    pro_3[i].description
  );
}
} catch (e) {
console.log(e);
}

try {
  let data;
    // email = helper.common.isValidEmail(email);
    const profileExists = await jobseekerData.profileExists(jobseeker4.email);
    // console.log(profileExists);
    if (profileExists) {
      data = await jobseekerData.getJobSeekerByEmail(jobseeker4.email);
      // console.log(data);
    
    } else {
      console.log("Profile Not created");
    }
    const jobSeekerCollection = await mongoCollections.jobSeekers;
    const coll = await jobSeekerCollection()
    const updatedJobSeeker = {
      name: data.name,
      email: data.email,
      address: data.address,
      education: data.education,
      field_of_employment: data.field_of_employment,
      profile_picture: data.profile_picture,
      skills: data.skills,
      years_of_experience: data.years_of_experience,
      resumeId: resume4._id,
      jobs_applied: data.jobs_applied,
    };

    const updatedInfo = await coll.updateOne(
      { _id: new ObjectId(data._id) },
      { $set: updatedJobSeeker }
    );
    if (updatedInfo.modifiedCount === 0) {
      throw {
        status: "400",
        error: "All new details exactly match the old details",
      };
    }
} catch (e) {
  console.log(e);
}
  connection.closeConnection();
  console.log("Done!");
}

main();
