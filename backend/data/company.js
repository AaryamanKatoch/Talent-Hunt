const mongoCollections = require("../config/mongoCollections");
const companies = mongoCollections.companies;
const { ObjectId } = require("mongodb");
const helper = require("../helper");

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

module.exports = {
  getCompanyDataById,
};
