import isUrl from 'is-url';

export const isValidString = (string, parameter) => {
  if (!string) throw new Error(`You must provide a ${parameter}`);
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
  if(isUrl(url)){
    return true;
  }
  throw new Error("Invalid URL");
}