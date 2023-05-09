const common = require("./common");

function checkSkills(array) {
  let skills = [
    "javascript",
    "react",
    "node",
    "angular",
    "vue",
    "python",
    "java",
    "nursing",
    "doctor",
    "clinical",
    "teaching",
    "sdministrative",
    "marketing",
    "sales",
    "leadership",
    "autocad",
    "design",
    "construction",
  ];
  for (let i = 0; i < array.length; i++) {
    if (!skills.includes(array[i].toLowerCase())) {
      throw {
        status: 400,
        error: `Skills is not from the specified values`,
      };
    }
  }
  return array;
}

function checkFoe(string, variableName) {
  let foe = ["it", "automobile", "civil", "healthcare", "education", "law"];
  if (!foe.includes(string.toLowerCase())) {
    throw {
      status: 400,
      error: `${variableName} is not from the specified values`,
    };
  }
  return string;
}

const isValidJobseekerData = (data) => {
  for (key in data) {
    switch (key) {
      case "name":
        data.name = common.checkIsProperString(data.name, "Name");
        data.name = common.checkForSpecialCharactersAndPunctuation(
          data.name,
          "Name"
        );
        data.name = common.checkForNumbers(data.name, "Name");
        data.name = common.checkName(data.name, "Name");
        break;
      case "email":
        data.email = common.isValidEmail(data.email);
      case "profile_picture":
        data.profile_picture = common.isValidWebImage(data.profile_picture);
        break;
      case "skills":
        data.skills = common.checkIsProperArrayOfStrings(data.skills);
        data.skills = checkSkills(data.skills);
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
        data.field_of_employment = checkFoe(
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
