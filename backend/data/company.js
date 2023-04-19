const mongoCollections = require("../config/mongoCollections");
const companies = mongoCollections.companies;
const { ObjectId } = require("mongodb");
const helper = require("../helper");
const bcrypt = require('bcryptjs');
const saltRounds = 10;

const getCompanyDataById = async (id) => {
  id = helper.common.isValidId(id);
  const companyCollection = await companies();
  const company = await companyCollection.findOne(
    { _id: new ObjectId(id) },
    { projection: { hashedPassword: 0 } }
  );

  if (!company) {
    throw { status: "404", error: "company not found" };
  }
  company._id = company._id.toString();
  return company;
};

const updateCompany = async (id, data) => {
  id = helper.common.isValidId(id);
  data = helper.company.isValidCompanyData(data);

  const companyCollection = await companies();
  await getCompanyDataById(id);

  if (data.password) {
    data.hashedPassword = await bcrypt.hash(data.password, saltRounds);
    delete data.password;
  }

  const updatedInfo = await companyCollection.updateMany(
    { _id: new ObjectId(id) },
    { $set: data }
  );
  
  if (updatedInfo.modifiedCount === 0) {
    throw {
      status: "400",
      error: "could not update because values are same as previous one",
    };
  }

  const company = await getCompanyDataById(id);
  return company;
};

module.exports = {
  getCompanyDataById,
  updateCompany
};
