const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
const configRoutes = require("./routes");
const redis = require("redis");
const client = redis.createClient();
client.connect().then(() => {});

app.use(express.json({ limit: "50mb" }));
app.use(cors());
app.use(
  session({
    name: "AuthCookie",
    secret: "some secret string!",
    resave: false,
    saveUninitialized: true,
  })
);

app.use("/jobseeker/HistoryOfApplications", async (req, res, next) => {
  if (await client.exists("jobSeekerEmail")) {
    const e = await client.get("jobSeekerEmail");
    if (
      req.method === "GET" &&
      req.baseUrl.split("/").slice(-1)[0] === "HistoryOfApplications" &&
      req.query.email === e
    ) {
      let exists = await client.exists("jobSeekerApplications");
      if (exists) {
        let applications = await client.get("jobSeekerApplications");
        applications = JSON.parse(applications);
        return res.status(200).json(applications);
      }
    }
  }
  next()
});

app.use("/jobs/getJobByEmail", async (req, res, next) => {
  if (await client.exists("companyEmail")) {
    const e = await client.get("companyEmail");
    if (
      req.method === "GET" &&
      req.baseUrl.split("/").slice(-1)[0] === "getJobByEmail" &&
      req.query.email === e
    ) {
      let exists = await client.exists("companyJobs");
      if (exists) {
        let posts = await client.get("companyJobs");
        posts = JSON.parse(posts);
        return res.status(200).json(posts);
      }
    }
  }
  next()
});

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
