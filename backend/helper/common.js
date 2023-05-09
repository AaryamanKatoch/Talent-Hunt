const { ObjectId } = require("mongodb");
const isURL = require("isurl");

const isValidString = (string, parameter) => {
  if (!string)
    throw {
      status: "400",
      error: `You must provide a ${parameter}`,
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
    throw {
      status: "400",
      error: `${variableName} is undefined`,
    };
  }
  if (typeof array !== "object") {
    throw {
      status: "400",
      error: `${variableName} is not an array, it must be an array`,
    };
  }
  if (!Array.isArray(array)) {
    throw {
      status: "400",
      error: `${variableName} is not an array, it must be an array`,
    };
  }
  if (array.length === 0) {
    throw {
      status: "400",
      error: `${variableName} is an empty array`,
    };
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
    throw { status: "400", error: `Invalid Object ID` };
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
  if (isURL(new URL(url))) {
    if (/\.(jpg|png)$/.test(url)) {
      return url;
    } else {
      return {
        status: "400",
        error:
          "Image is not in proper image format(only jpg/png web images allowed)",
      };
    }
  } else {
    return { status: "400", error: "It is not a proper web image" };
  }
}

const isValidURL = (url) => {
  url = isValidString(url, "LinkedIn URL");
  if (
    !url.match(/^(http(s)?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/)
  )
    throw { status: "400", error: "Invalid Linkedin URL" };
  return url;
};

const isValidContact = (contact) => {
  // (123) 456-7890
  // 123-456-7890
  // 123.456.7890
  // 1234567890
  // +1 123 456 7890
  // +1 (123) 456-7890
  contact = isValidString(contact, "Contact Number");
  if (
    !contact.match(/^\+?1?\s*[-.\s]?\(?\d{3}\)?\s*[-.\s]?\d{3}\s*[-.\s]?\d{4}$/)
  )
    throw { status: "400", error: "Invalid Contact Number" };
  return contact;
};

const isValidGpa = (gpa) => {
  gpa = isValidString(gpa, "GPA");
  let gpaNum = Number(gpa);
  if (isNaN(gpaNum)) {
    throw { status: "400", error: "GPA is not a Number!" };
  }

  if (gpaNum > 4 || gpaNum < 0) {
    throw { status: "400", error: "GPA should be a number between 0 and 4!" };
  }

  return gpa;
};

const isValidYear = (year) => {
  year = isValidString(year, "Year");
  const special = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  if (special.test(year)) throw { status: "400", error: "Year is not valid!" };
  let yearNum = Number(year);

  if (isNaN(yearNum)) {
    throw { status: "400", error: "Year is not valid!" };
  }
  let current_year = new Date().getFullYear();

  if (yearNum < 1900 || yearNum > current_year + 6) {
    throw {
      status: "400",
      error: "Year should be between 1900 and current year + 6!",
    };
  }
  return year;
};

const isValidStartEndYear = (start_year, end_year) => {
  start_year = isValidYear(start_year);
  end_year = isValidYear(end_year);
  start_year = Number(start_year);
  end_year = Number(end_year);
  if (start_year > end_year) {
    throw { status: "400", error: "Start year should be less than end year" };
  }
};

const isValidMonth = (month) => {
  month = isValidString(month, "Month");
  const special = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  if (special.test(month))
    throw { status: "400", error: "Month is not valid!" };
  let lowerCaseMonth = month.toLowerCase();
  let checkJan = lowerCaseMonth === "jan" || lowerCaseMonth === "january";
  let checkFeb = lowerCaseMonth === "feb" || lowerCaseMonth === "february";
  let checkMar = lowerCaseMonth === "mar" || lowerCaseMonth === "march";
  let checkApr = lowerCaseMonth === "apr" || lowerCaseMonth === "april";
  let checkMay = lowerCaseMonth === "may" || lowerCaseMonth === "may";
  let checkJun = lowerCaseMonth === "jun" || lowerCaseMonth === "june";
  let checkJul = lowerCaseMonth === "jul" || lowerCaseMonth === "july";
  let checkAug = lowerCaseMonth === "aug" || lowerCaseMonth === "august";
  let checkSept = lowerCaseMonth === "sept" || lowerCaseMonth === "september";
  let checkOct = lowerCaseMonth === "oct" || lowerCaseMonth === "october";
  let checkNov = lowerCaseMonth === "nov" || lowerCaseMonth === "november";
  let checkDec = lowerCaseMonth === "dec" || lowerCaseMonth === "december";

  if (
    checkJan ||
    checkFeb ||
    checkMar ||
    checkApr ||
    checkMay ||
    checkJun ||
    checkJul ||
    checkAug ||
    checkSept ||
    checkOct ||
    checkNov ||
    checkDec
  ) {
    return month;
  } else {
    throw {
      status: "400",
      error: "Month should be in valid format! eg : Mar/March or Jan/January",
    };
  }
};

function checkForSpecialCharactersAndPunctuation(string, variableName) {
  const specialCharacters = `\`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`;
  const result = specialCharacters.split("").some((sCh) => {
    if (string.includes(sCh)) {
      return true;
    }
    return false;
  });
  if (result) {
    throw {
      status: "400",
      error: `${variableName} contains special characters/punctuations`,
    };
  }
  return string;
}

function checkForNumbers(string, variableName) {
  const numbers = `0123456789`;
  const result = numbers.split("").some((n) => {
    if (string.includes(n)) {
      return true;
    }
    return false;
  });
  if (result) {
    throw {
      status: "400",
      error: `${variableName} contains numbers`,
    };
  }
  return string;
}

function checkName(string, variableName) {
  let a = string.split(" ");
  if (a.length !== 2) {
    throw {
      status: "400",
      error: `The Name should be of format first_name <space> last_name`,
    };
  }
  if (a[0].length < 3) {
    throw {
      status: "400",
      error: `The length of first_name should be more than 3`,
    };
  }
  if (a[1].length < 3) {
    throw {
      status: "400",
      error: `The length of last_name should be more than 3`,
    };
  }
  return string;
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
  isValidURL,
  isValidContact,
  isValidGpa,
  isValidYear,
  isValidStartEndYear,
  isValidMonth,
  checkForSpecialCharactersAndPunctuation,
  checkForNumbers,
  checkName,
};
