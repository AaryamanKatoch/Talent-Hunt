const jobSeekerRoutes = require("./jobseeker");
const companyRoutes = require("./company");
const jobRoutes = require("./jobs");
const application = require("./application");

const constructorMethod = (app) => {
  app.use("/company", companyRoutes);
  app.use("/jobseeker", jobSeekerRoutes);
  app.use("/jobs", jobRoutes);
  app.use("/application", application);
  app.use("*", (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;
