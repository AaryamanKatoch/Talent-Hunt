//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.
//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.

const isAlphaNumeric = str => /^[a-z0-9]+$/gi.test(str);
const {ObjectId} = require('mongodb');
const re_for_specialcharacter=/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

async function checkifinputexists(vari) {
    if(!vari)
    throw {status: '400', error : "No input is provided in some field"}};
  

async function checkifstring(vari){
    if(typeof(vari)!=="string")
    throw {status: '400', error : 'Input is not a string'};
}

async function checkifemptystring(vari){
if(vari.trim().length===0)
throw {status: '400', error : "string cant be empty or all white spaces"};

}

async function checkifarray(vari){
    if(!Array.isArray(vari))
    throw {status: '400', error : "input is not array"} };

async function checkifproperdescription(vari){ 
     //flight code is alphanumeric; first character has to be an aplhabet//min length 2; max length:6
    if(!vari)
    throw {status: '400', error : "Missing description"};
    if(typeof(vari)!=="string")
    throw {status: '400', error : "Description should be a string"};
    if(vari.trim().length===0)
    throw {status: '400', error : "Description cant be empty or all white spaces"};

    vari=vari.trim()
    
    if(vari.length<6)
    throw {status: '400', error : "minimum length of description should be two"};
   
    if(vari.length>40000)
    throw {status: '400', error : "maximum length of description is 6 "};
    

    return vari
}

async function checkifproperresponsibilities(vari){ 
    //flight code is alphanumeric; first character has to be an aplhabet//min length 2; max length:6
   if(!vari)
   throw {status: '400', error : "Missing responsibilities"};
   if(typeof(vari)!=="string")
   throw {status: '400', error : "Responsibilities should be a string"};
   if(vari.trim().length===0)
   throw {status: '400', error : "Responsibilities cant be empty or all white spaces"};

   vari=vari.trim()
   
   if(vari.length<6)
   throw {status: '400', error : "minimum length of responsibilities should be two"};
   if(vari.length>40000)
   throw {status: '400', error : "minimum length of responsibilities should be two"};

   return vari
}

async function checkifpropervisarequirements(vari){ 
    //flight code is alphanumeric; first character has to be an aplhabet//min length 2; max length:6
   if(!vari)
   throw {status: '400', error : "Missing visa requirements"};
   if(typeof(vari)!=="string")
   throw {status: '400', error : "Visa requirements should be a string"};
   if(vari.trim().length===0)
   throw {status: '400', error : "Visa requirements cant be empty or all white spaces"};

   vari=vari.trim()
   if(!["Citizen", "GreenCard", "H1B", "F1", "H4EAD"].includes(vari)) throw new Error("Invalid Visa Status")
//    if(vari.length<6)
//    throw {status: '400', error : "minimum length of visa requirements should be 6"};
//    if(vari.length>40000)
//    throw {status: '400', error : "maximum length of responsibilities should be 40000"};
   return vari
}

async function checkifproperminimumqualification(vari){ 
    //flight code is alphanumeric; first character has to be an aplhabet//min length 2; max length:6
   if(!vari)
   throw {status: '400', error : "Missing minimum qualification"};
   if(typeof(vari)!=="string")
   throw {status: '400', error : "Minimum qualification should be a string"};
   if(vari.trim().length===0)
   throw {status: '400', error : "Minimum qualification cant be empty or all white spaces"};

   vari=vari.trim()
   
   if(vari.length<6)
   throw {status: '400', error : "minimum length of minimum qualifications should be 6"};
   if(vari.length>40000)
   throw {status: '400', error : "maximum length of minimum qualifications should be 40000"};
   return vari
}

async function checkifproperflname(vari){
    if(!vari)
    throw {status: '400', error : "No first or last name provided"};
    if(typeof(vari)!=="string")
    throw {status: '400', error : 'name is not a string'};
    if(vari.trim().length===0)
    throw {status: '400', error : "name cant be empty or all white spaces"};

    vari=vari.trim()
    vari=vari.toLowerCase()
    
    if(vari.length<2)
    throw {status: '400', error : 'both first and last names must be atleast two characters long'};


let regex1 = /^[a-z ']+$/i
if(!regex1.test(vari))
throw {status: '400', error : 'name can only have alphabets and some some special characters'};
return vari
}


async function checkifpropersex(vari){
    //can be male, female, other

    if(!vari)
    throw {status: '400', error : "No gender provided"};
    if(typeof(vari)!=="string")
    throw {status: '400', error : 'gender is not a string'};
    if(vari.trim().length===0)
    throw {status: '400', error : "gender cant be empty or all white spaces"};
    vari=vari.trim()
    vari=vari.toLowerCase()
    if(vari!=="male" && vari!=="female")
    throw {status: '400', error : 'kindly select from: male,female'};

return vari
}


module.exports = {
    checkifarray,
    checkifemptystring,
    checkifinputexists,
    checkifstring,
    checkifproperdescription,
    checkifproperflname,
    checkifproperminimumqualification,
    checkifproperresponsibilities,
    checkifpropersex,
    checkifpropervisarequirements
  
}