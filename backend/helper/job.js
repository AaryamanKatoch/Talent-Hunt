const common = require("./common");

function isValidVisaRequirement(visaRequirements) {
  visaRequirements = common.checkIsProperString(
    visaRequirements,
    "Visa Requirements"
  );
  visaRequirements = visaRequirements.trim();
  if (
    visaRequirements.toLowerCase() !== "citizen" &&
    visaRequirements.toLowerCase() !== "greencard" &&
    visaRequirements.toLowerCase() !== "h1b" &&
    visaRequirements.toLowerCase() !== "f1" &&
    visaRequirements.toLowerCase() !== "h4ead"
  ) {
    throw {
      status: "400",
      error: `VisaRequirement needs to be from the values [citizen,greencard,h1b,f1, h4ead]`,
    };
  }
  return visaRequirements;
}

function isValidMinimumQualification(minimumQualification) {
  minimumQualification = common.checkIsProperString(
    minimumQualification,
    "Minimum Qualification"
  );
  minimumQualification = minimumQualification.trim();
  if (
    minimumQualification.toLowerCase() !== "bachelors" &&
    minimumQualification.toLowerCase() !== "masters" &&
    minimumQualification.toLowerCase() !== "phd" &&
    minimumQualification.toLowerCase() !== "other"
  ) {
    throw {
      status: "400",
      error: `minimumQualification needs to be from the values [bachelors,masters,phd,others]`,
    };
  }
  return minimumQualification;
}

const isValidJobData = (data) => {
  for (key in data) {
    switch (key) {
      case "name":
        data.name = common.checkIsProperString(data.name, "Name");
        break;
      case "email":
        data.email = common.isValidEmail(data.email);
        break;
      case "description":
        data.description = common.isValidString(
          data.description,
          "Description"
        );
        break;
      case "responsibilities":
        data.responsibilities = common.isValidString(
          data.responsibilities,
          "Responsibilities"
        );
        break;
      case "visaRequirements":
        data.visaRequirements = isValidVisaRequirement(data.visaRequirements);
        break;
      case "minimumQualification":
        data.minimumQualification = isValidMinimumQualification(
          data.minimumQualification
        );
        break;
      default:
        throw { status: "400", error: `Invalid key - ${key}` };
    }
  }
  return data;
};

module.exports = {
  isValidJobData,
};
