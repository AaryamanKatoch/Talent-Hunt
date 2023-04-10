const {ObjectId} = require('mongodb');

const isValidString = (string, parameter) => {
    if (!string) throw {status: '400', error : `You must provide an ${parameter} to search for`};
    if (typeof string !== 'string') throw {status: '400', error : `${parameter} must be a string`};
    string = string.trim()
    if (string.length === 0)
      throw {status: '400', error : `${parameter} cannot be an empty string or just spaces`};
    return string;
}

const isValidId = (id) => {
    id = isValidString(id, "ID");
    if (!ObjectId.isValid(id)) throw {status: '400', error : 'Invalid object ID'};
    return id;
}

const isValidEmail = (email) => {
    email = isValidString(email, "Email");
    if(!email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ))
      throw {status: '400', error : 'Invalid Email'}
    return email.toLowerCase();
}

const isBoolean = (val) => {
  // if (!val) throw {status: "400", error: "No value provided"};
  if(typeof val !== "boolean") throw {status: "400", error: "value invalid"};
  return val
}

module .exports = {
    isValidString,
    isValidId,
    isValidEmail,
    isBoolean
}