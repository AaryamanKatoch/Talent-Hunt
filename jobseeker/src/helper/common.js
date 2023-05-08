import isUrl from "is-url";

export const isValidString = (string, parameter) => {
  if (!string) {
    throw new Error(`You must provide a ${parameter}`);
  }
  if (typeof string !== "string")
    throw new Error(`${parameter} must be a string`);
  string = string.trim();
  if (string.length === 0)
    throw new Error(`${parameter} cannot be an empty string or just spaces`);
  return string;
};

export const isValidEmail = (email) => {
  email = isValidString(email, "Email");
  if (
    !email.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  )
    throw new Error("Invalid Email");
  return email.toLowerCase();
};

export const isPasswordSame = (repassword, password) => {
  repassword = isValidPassword(repassword);
  if (repassword === password) return repassword;
  throw new Error("Passwords dont match");
};

export const isValidPassword = (passowrd) => {
  if (
    !passowrd.match(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,12}$/)
  )
    throw new Error("Invalid Password");
  return passowrd;
};

export const isValidName = (inputName) => {
  inputName = isValidString(inputName, "Name");
  let name = inputName.split(" ");
  if (name.length !== 2) throw new Error("Invalid name");
  if (name[0].length < 3)
    throw new Error("First name should be atleast 3 character");
  if (name[1].length < 3)
    throw new Error("Last name should be atleast 3 character");
  if (
    name[0].match(/^[^a-zA-Z0-9]+$/) ||
    (name[0].replace(/[^a-zA-Z0-9 ]/g, "").length !== name[0].length &&
      name[0].replace(/[^a-zA-Z0-9 ]/g, "").length !== name[0].length - 1)
  )
    throw new Error("Invalid first name");
  if (
    name[1].match(/^[^a-zA-Z0-9]+$/) ||
    (name[1].replace(/[^a-zA-Z0-9 ]/g, "").length !== name[1].length &&
      name[1].replace(/[^a-zA-Z0-9 ]/g, "").length !== name[1].length - 1)
  )
    throw new Error("Invalid last name");
  if (!name[0].match(/^[a-z.'-]+$/i)) throw new Error("Invalid first name");
  if (!name[1].match(/^[a-z.'-]+$/i)) throw new Error("Invalid last name");
  return inputName;
};

export const isValidURL = (url) => {
  if (!url) return;
  if (isUrl(url)) {
    return true;
  }
  throw new Error("Invalid URL");
};

export const checkIsProperString = (string, variableName) => {
  if (typeof string === "undefined") {
    throw new Error(`${variableName} is undefined`);
  }
  if (typeof string !== "string") {
    throw new Error(`${variableName} is not a string, it must be a string`);
  }
  if (string.length === 0) {
    throw new Error(`${variableName} is an empty string`);
  }
  if (string.trim().length === 0) {
    throw new Error(`${variableName} is a string with only empty spaces`);
  }
  return string;
};

export const checkIsProperArrayOfStrings = (array, variableName) => {
  if (typeof array === "undefined") {
    throw new Error(`${variableName} is undefined`);
  }
  if (typeof array !== "object") {
    throw new Error(`${variableName} is not an array, it must be an array`);
  }
  if (!Array.isArray(array)) {
    throw new Error(`${variableName} is not an array, it must be an array`);
  }
  if (array.length === 0) {
    throw new Error(`${variableName} is an empty array`);
  }
  for (let i = 0; i < array.length; i++) {
    checkIsProperString(array[i], "Array element");
  }
  return array;
};

export const isValidInteger = (n) => {
  if (!isNaN(parseInt(n)) && n >= 0) {
    return parseInt(n);
  } else {
    throw new Error("Not a non negative integer");
  }
};

export const isValidWebImage = (url) => {
  if (isUrl(url)) {
    if (/\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url)) {
      return url;
    } else {
      throw new Error("Image is not in proper image format");
    }
  } else {
    throw new Error("It is not a proper web image");
  }
};

export const isValidString2 = (string, parameter) => {
  if (!string) throw new Error(`You must provide a ${parameter}`);
  if (typeof string !== "string")
    throw new Error(`${parameter} must be a string`);
  string = string.trim();
  if (string.length === 0)
    throw new Error(`${parameter} cannot be an empty string or just spaces`);
  return string;
};
export const isValidLinkedinURL = (url) => {
  url = isValidString2(url, "LinkedIn URL");
  if(!url.match(/^(http(s)?:\/\/)?(www\.)?linkedin\.com\/in\/[a-z0-9]+\/?$/))
    throw new Error('Invalid Linkedin URL');
  return url;
}

export const isValidContact = (contact) => {
contact = isValidString2(contact, "Contact Number");
if(!contact.match(/^\+?1?\s*[-.\s]?\(?\d{3}\)?\s*[-.\s]?\d{3}\s*[-.\s]?\d{4}$/))
  throw new Error(`Invalild Contact Number`);
return contact;
}

export const isValidGpa = (gpa)=>{
  gpa = isValidString2(gpa, "GPA");
  let gpaNum = Number(gpa);
  if(isNaN(gpaNum)){
    throw new Error(`GPA is Not a Number`);
  }

  if(gpaNum > 4 || gpaNum < 0){
    throw new Error(`GPA should be between 0 and 4!`);;
  }

  return gpa;
}


export const isValidEmail2 = (email) => {
  email = isValidString(email, "Email");
  if (
    !email.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  )
    throw new Error(`Invalid Email`);
  return email.toLowerCase();
};

export const isValidYear=(year)=>{
  year = isValidString2(year, "Year");
  const special = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  if(special.test(year)) throw new Error(`Year Is not Valid`);
  let yearNum = Number(year);

  if(isNaN(yearNum)){
    throw new Error(`Year Is not Valid`);
  }
  let current_year = new Date().getFullYear();

  if(yearNum < 1900 || yearNum > current_year + 6){
    throw new Error(`Year shouold be between 1900 and current year + 6!`);
  }
  return year
}

export const isValidStartEndYear=(start_year, end_year)=>{
  start_year = isValidYear(start_year);
  end_year = isValidYear(end_year);
  start_year = Number(start_year);
  end_year = Number(end_year);
  if(start_year>end_year){
    throw new Error(`Start Year should be less than end year`);
  }
}

export const isValidMonth=(month)=>{
  month = isValidString2(month, "Month");
  const special = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  if(special.test(month)) throw {status : "400", error : "Month is not valid!"}; 
  let lowerCaseMonth = month.toLowerCase();
  let checkJan = lowerCaseMonth === 'jan' || lowerCaseMonth === 'january';
  let checkFeb = lowerCaseMonth === 'feb' || lowerCaseMonth === 'february';
  let checkMar = lowerCaseMonth === 'mar' || lowerCaseMonth === 'march';
  let checkApr = lowerCaseMonth === 'apr' || lowerCaseMonth === 'april';
  let checkMay = lowerCaseMonth === 'may' || lowerCaseMonth === 'may';
  let checkJun = lowerCaseMonth === 'jun' || lowerCaseMonth === 'june';
  let checkJul = lowerCaseMonth === 'jul' || lowerCaseMonth === 'july';
  let checkAug = lowerCaseMonth === 'aug' || lowerCaseMonth === 'august';
  let checkSept = lowerCaseMonth === 'sept' || lowerCaseMonth === 'september';
  let checkOct = lowerCaseMonth === 'oct' || lowerCaseMonth === 'october';
  let checkNov = lowerCaseMonth === 'nov' || lowerCaseMonth === 'november';
  let checkDec = lowerCaseMonth === 'dec' || lowerCaseMonth === 'december';
  
  if(checkJan || checkFeb || checkMar || checkApr || checkMay || checkJun || checkJul || checkAug || checkSept || checkOct || checkNov || checkDec){
    return month;
  }
  else {
    throw new Error(`Month should be in valid format i.e March/Mar or June/Jun`);;
  }
}
