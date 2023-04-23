const { ObjectId } = require("mongodb");
const isUrl = require("is-url");

const isValidString = (string, parameter) => {
  if (!string)
    throw {
      status: "400",
      error: `You must provide an ${parameter} to search for`,
    };
  if (typeof string !== "string")
    throw { status: "400", error: `${parameter} must be a string` };
  string = string.trim();
  if (string.length === 0)
    throw {
      status: "400",
      error: `${parameter} cannot be an empty string or just spaces`,
    };
  return string;
};

const isValidId = (id) => {
  id = isValidString(id, "ID");
  if (!ObjectId.isValid(id))
    throw { status: "400", error: "Invalid object ID" };
  return id;
};

const isValidEmail = (email) => {
  email = isValidString(email, "Email");
  if (
    !email.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  )
    throw { status: "400", error: "Invalid Email" };
  return email.toLowerCase();
};

const isBoolean = (val) => {
  // if (!val) throw {status: "400", error: "No value provided"};
  if (typeof val !== "boolean") throw { status: "400", error: "value invalid" };
  return val;
};

const isValidPassword = (passowrd) => {
  if (
    !passowrd.match(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,12}$/)
  )
    throw { status: "400", error: "Invalid Password" };
  return passowrd;
};

function checkIsProperString(string, variableName) {
  if (typeof string === "undefined") {
    throw { status: "400", error: `${variableName} is undefined` };
  }
  if (typeof string !== "string") {
    throw {
      status: "400",
      error: `${variableName} is not a string, it must be a string`,
    };
  }
  if (string.length === 0) {
    throw { status: "400", error: `${variableName} is an empty string` };
  }
  if (string.trim().length === 0) {
    throw {
      status: "400",
      error: `${variableName} is a string with only empty spaces`,
    };
  }
  return string;
}

function checkIsProperArrayOfStrings(array, variableName) {
  if (typeof array === "undefined") {
    throw `${variableName} is undefined`;
  }
  if (typeof array !== "object") {
    throw `${variableName} is not an array, it must be an array`;
  }
  if (!Array.isArray(array)) {
    throw `${variableName} is not an array, it must be an array`;
  }
  if (array.length === 0) {
    throw `${variableName} is an empty array`;
  }
  for (let i = 0; i < array.length; i++) {
    checkIsProperString(array[i], "Array element");
  }
  return array;
}

function checkIsProperId(id) {
  id = checkIsProperString(id, "ID");
  id = id.trim();
  if (!ObjectId.isValid(id)) {
    throw `Invalid Object ID`;
  }
  return id;
}
function isValidInteger(n) {
  if (!isNaN(parseInt(n)) && n >= 0) {
    return parseInt(n);
  } else {
    return { status: "400", error: "Not a non negative integer" };
  }
}

function isValidWebImage(url) {
  if (isUrl(url)) {
    if (/\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url)) {
      return url;
    } else {
      return { status: "400", error: "Image is not in proper image format" };
    }
  } else {
    return { status: "400", error: "It is not a proper web image" };
  }
}

module.exports = {
  isValidString,
  isValidId,
  isValidEmail,
  isBoolean,
  isValidPassword,
  checkIsProperString,
  checkIsProperId,
  checkIsProperArrayOfStrings,
  isValidInteger,
  isValidWebImage,
};
