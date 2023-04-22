const common = require("./common");

const isValidJobseekerData = (data) => {
  for (key in data) {
    switch (key) {
      case "email":
        // console.log(data.email);
        data.email = common.isValidEmail(data.email);
        break;
      case "profile_picture":
        data.profile_picture = data.profile_picture;
        break;
      case "skills":
        data.skills = common.checkIsProperArrayOfStrings(data.skills);
        break;
      case "address":
        data.address = common.checkIsProperString(data.address);
        break;
      case "years_of_experience":
        data.years_of_experience = common.isValidInteger(
          data.years_of_experience
        );
        break;
      case "field_of_employment":
        data.field_of_employment = common.checkIsProperString(
          data.field_of_employment
        );
        break;
      case "education":
        data.education = common.checkIsProperString(data.education);
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
