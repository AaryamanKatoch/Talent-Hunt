const jobSeekerRoutes = require("./jobseeker");
const companyRoutes = require("./company");

const constructorMethod = (app) => {
  app.use('/company', companyRoutes);
  app.use('/jobseeker', jobSeekerRoutes);

  app.use('*', (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;