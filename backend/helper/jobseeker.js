const common = require("./common");

const isValidJobseekerData = (data) => {
  for (key in data) {
    switch (key) {
      case "name":
        data.name = common.checkIsProperString(data.name, "Name");
        break;
      case "email":
        data.email = common.isValidEmail(data.email);
      case "profile_picture":
        data.profile_picture = common.isValidWebImage(data.profile_picture);
        break;
      case "skills":
        data.skills = common.checkIsProperArrayOfStrings(data.skills);
        break;
      case "address":
        data.address = common.checkIsProperString(data.address, "Address");
        break;
      case "years_of_experience":
        data.years_of_experience = common.isValidInteger(
          data.years_of_experience
        );
        break;
      case "field_of_employment":
        data.field_of_employment = common.checkIsProperString(
          data.field_of_employment,
          "Field of employment"
        );
        break;
      case "education":
        data.education = common.checkIsProperString(
          data.education,
          "Education"
        );
        break;
      default:
        throw { status: "400", error: `Invalid key - ${key}` };
    }
  }
  return data;
};

module.exports = {
  isValidJobseekerData,
};
