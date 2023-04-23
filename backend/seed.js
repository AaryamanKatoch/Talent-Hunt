const job = require('./data/jobs');
const application = require('./data/application')

const connection = require('./config/mongoConnection');
const { jobs } = require('./config/mongoCollections');
const { applications } = require('./config/mongoCollections');


// manual testing using comments

async function main() {
    const db = await connection.dbConnection();
    let alljobs=undefined
    
 
    

  await db.dropDatabase();



   try {

    job1 = await job.createJob("Testyyy job","backend stuff","will sponsor","undersgrad in cs");
    //console.log(fli1)
    } catch (e) {
        console.log(e);
    }



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
    await connection.closeConnection();
    console.log('Done!');


}


main();