const mongoCollections = require("../config/mongoCollections");
const companies = mongoCollections.companies;
const { ObjectId } = require("mongodb");
const helper = require("../helper");
const bcrypt = require("bcryptjs");
const saltRounds = 10;
const path = require("path");
const fs = require("fs");

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

const getCompanyByEmail = async (email) => {
  email = helper.common.isValidEmail(email);
  const companyCollection = await companies();
  let company = await companyCollection.findOne({
    email: email,
  });
  if (company === null) {
    throw { status: "404", error: `No company corresponds to the Email` };
  }
  company._id = company._id.toString();
  return company;
};

const createCompany = async (data, email) => {
  data = helper.company.isValidCompanyData(data);
  email = helper.common.isValidEmail(email);
  const companyCollection = await companies();
  let companyExists = await companyCollection.findOne({
    email: email,
  });
  if (companyExists) {
    throw { status: "400", error: `Email already has a profile` };
  }
  const newCompany = {
    name: data.name,
    email: email,
    type: data.type,
    description: data.description,
    profile_picture: data.profile_picture,
    jobs_posted: [],
  };
  newCompany.image = fs.readFileSync(path.resolve(__dirname, "../image.jpg"));
  newCompany.image = newCompany.image.toString("base64");
  const insertInfo = await companyCollection.insertOne(newCompany);
  if (!insertInfo.insertedId || !insertInfo.acknowledged) {
    throw {
      status: "400",
      error: "Could not add the company",
    };
  }
  const newId = insertInfo.insertedId.toString();

  const company = await companyCollection.findOne({
    _id: new ObjectId(newId),
  });
  company._id = newId;
  return company;
};

const updateCompanyByEmail = async (email, data) => {
  email = helper.common.isValidEmail(email);
  data = helper.company.isValidCompanyData(data);
  const companyCollection = await companies();
  const company = await getCompanyByEmail(email);
  if (!company) {
    throw {
      status: "400",
      error: `Could not find any company with Email: ${email}`,
    };
  }
  const updatedCompany = {
    name: data.name || company.name,
    email: email,
    type: data.type || company.type,
    description: data.description || company.description,
    profile_picture: data.profile_picture || company.profile_picture,
    jobs_posted: company.jobs_posted,
  };
  if (updatedCompany.profile_picture) {
    updatedCompany.image = fs.readFileSync(
      path.resolve(__dirname, "../image.jpg")
    );
    updatedCompany.image = updatedCompany.image.toString("base64");
  }
  const updatedInfo = await companyCollection.updateOne(
    { email: email },
    { $set: updatedCompany }
  );
  if (updatedInfo.modifiedCount === 0) {
    throw {
      status: "400",
      error: "All new details exactly match the old details",
    };
  }
  return await getCompanyByEmail(email);
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

const profileExists = async (email) => {
  email = helper.common.isValidEmail(email);
  const companyCollection = await companies();
  let company = await companyCollection.findOne({
    email: email,
  });
  if (company === null) {
    return false;
  }
  return true;
};

module.exports = {
  getCompanyDataById,
  updateCompany,
  getCompanyByEmail,
  createCompany,
  updateCompanyByEmail,
  profileExists,
};
