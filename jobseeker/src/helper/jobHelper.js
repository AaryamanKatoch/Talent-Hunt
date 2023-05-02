// const isAlphaNumeric = str => /^[a-z0-9]+$/gi.test(str);
// const {ObjectId} = require('mongodb');
// const re_for_specialcharacter=/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

export async function checkifinputexists(vari) {
  if (!vari) throw new Error("No input is provided in some field");
}

export async function checkifstring(vari) {
  if (typeof vari !== "string") throw new Error("Input is not a string");
}

export async function checkifemptystring(vari) {
  if (vari.trim().length === 0)
    throw new Error("string cant be empty or all white spaces");
}

export async function checkifarray(vari) {
  if (!Array.isArray(vari)) throw new Error("input is not array");
}

export async function checkifproperdescription(vari) {
  //flight code is alphanumeric; first character has to be an aplhabet//min length 2; max length:6
  if (!vari) throw new Error("Missing description");
  if (typeof vari !== "string")
    throw new Error("Description should be a string");
  if (vari.trim().length === 0)
    throw new Error("Description cant be empty or all white spaces");

  vari = vari.trim();

  if (vari.length < 6)
    throw new Error("minimum length of description should be two");

  if (vari.length > 40000)
    throw new Error("maximum length of description is 6 ");

  return vari;
}

export async function checkifproperresponsibilities(vari) {
  //flight code is alphanumeric; first character has to be an aplhabet//min length 2; max length:6
  if (!vari) throw new Error("Missing responsibilities");
  if (typeof vari !== "string")
    throw new Error("Responsibilities should be a string");
  if (vari.trim().length === 0)
    throw new Error("Responsibilities cant be empty or all white spaces");

  vari = vari.trim();

  if (vari.length < 6)
    throw new Error("minimum length of responsibilities should be two");
  if (vari.length > 40000)
    throw new Error("minimum length of responsibilities should be two");

  return vari;
}

export async function checkifpropervisarequirements(vari) {
  //flight code is alphanumeric; first character has to be an aplhabet//min length 2; max length:6
  if (!vari) throw new Error("Missing visa requirements");
  if (typeof vari !== "string")
    throw new Error("Visa requirements should be a string");
  if (vari.trim().length === 0)
    throw new Error("Visa requirements cant be empty or all white spaces");

  vari = vari.trim();
  if(!["Citizen", "GreenCard", "H1B", "F1", "H4EAD"].includes(vari)) throw new Error("Invalid Visa Status")
  // if (vari.length < 6)
  //   throw new Error("minimum length of visa requirements should be 6");
  // if (vari.length > 40000)
  //   throw new Error("maximum length of responsibilities should be 40000");
  return vari;
}

export async function checkifproperminimumqualification(vari) {
  //flight code is alphanumeric; first character has to be an aplhabet//min length 2; max length:6
  if (!vari) throw new Error("Missing minimum qualification");
  if (typeof vari !== "string")
    throw new Error("Minimum qualification should be a string");
  if (vari.trim().length === 0)
    throw new Error("Minimum qualification cant be empty or all white spaces");

  vari = vari.trim();

  if (vari.length < 6)
    throw new Error("minimum length of minimum qualifications should be 6");
  if (vari.length > 40000)
    throw new Error("maximum length of minimum qualifications should be 40000");
  return vari;
}

export async function checkifproperflname(vari) {
  if (!vari) throw new Error("No first or last name provided");
  if (typeof vari !== "string") throw new Error("name is not a string");
  if (vari.trim().length === 0)
    throw new Error("name cant be empty or all white spaces");

  vari = vari.trim();
  vari = vari.toLowerCase();

  if (vari.length < 2)
    throw new Error(
      "both first and last names must be atleast two characters long"
    );

  let regex1 = /^[a-z ']+$/i;
  if (!regex1.test(vari))
    throw new Error(
      "name can only have alphabets and some some special characters"
    );
  return vari;
}

export async function checkifpropersex(vari) {
  //can be male, female, other

  if (!vari) throw new Error("No gender provided");
  if (typeof vari !== "string") throw new Error("gender is not a string");
  if (vari.trim().length === 0)
    throw new Error("gender cant be empty or all white spaces");
  vari = vari.trim();
  vari = vari.toLowerCase();
  if (vari !== "male" && vari !== "female")
    throw new Error("kindly select from: male,female");

  return vari;
}
