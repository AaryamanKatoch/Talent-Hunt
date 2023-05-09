const { Error } = require("mongoose");

async function checkifpropername(vari){
    // returns name
    if(!vari)
    throw new Error("No personal name provided");
    if(typeof(vari)!=="string")
    throw new Error('Name is not a string');
    if(vari.trim().length===0)
    throw new Error("Name cant be empty or all white spaces");

    vari=vari.trim()
    vari=vari.toLowerCase()
    
    if(vari.length<2 || vari.length>50)
    throw new Error('Name must be atleast two characters long or less than 50 characters');


let regex1 = /^[a-z ']+$/i
if(!regex1.test(vari))
throw new Error('Name can only have alphabets and some some special characters');
return vari
}


async function isValidEmail(email){
    email = isValidString(email, "Email");
    if (
      !email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    )
      throw new Error("Invalid Email");
    return email.toLowerCase();
  };

  // testing required
  const isValidContact = (contact) => {
    // (123) 456-7890
  // 123-456-7890
  // 123.456.7890
  // 1234567890
  // +1 123 456 7890
  // +1 (123) 456-7890
  contact = isValidString(contact, "Contact Number");
  if(!contact.match(/^\+?1?\s*[-.\s]?\(?\d{3}\)?\s*[-.\s]?\d{3}\s*[-.\s]?\d{4}$/))
    throw new Error('Invalid Contact Number')
  return contact;
  }


  async function checkifproperaddress(vari){ 
    //flight code is alphanumeric; first character has to be an aplhabet//min length 2; max length:6
   if(!vari)
   throw new Error("Missing address");
   if(typeof(vari)!=="string")
   throw new Error("Address should be a string");
   if(vari.trim().length===0)
   throw new Error("Address cant be empty or all white spaces");

   vari=vari.trim()
   
   if(vari.length<6)
   throw new Error("Minimum length of address should be six");
  
   if(vari.length>100)
   throw new Error("Maximum length of description is 100 ");
   

   return vari
}

const isValidLinkedIn = (url) => {
    url = isValidString(url, "LinkedIn URL");
    if(!url.match(/^(http(s)?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/))
      throw new Error('Invalid Linkedin URL')
    return url;
  }


  async function checkifproperschool(vari){ 
    //flight code is alphanumeric; first character has to be an aplhabet//min length 2; max length:6
   if(!vari)
   throw new Error("Missing school");
   if(typeof(vari)!=="string")
   throw new Error("school should be a string");
   if(vari.trim().length===0)
   throw new Error("school cant be empty or all white spaces");

   vari=vari.trim()
   
   if(vari.length<6)
   throw new Error("Minimum length of school should be six");
  
   if(vari.length>30)
   throw new Error("Maximum length of school is 30 ");
   let regex1 = /^[a-z ']+$/i
   if(!regex1.test(vari))
   throw new Error('Name can only have alphabets and some some special characters');
   return vari

}


async function checkifproperdegree(vari){ 
    //flight code is alphanumeric; first character has to be an aplhabet//min length 2; max length:6
   if(!vari)
   throw new Error("Missing school");
   if(typeof(vari)!=="string")
   throw new Error("degree should be a string");
   if(vari.trim().length===0)
   throw new Error("degree cant be empty or all white spaces");

   vari=vari.trim()
   
   if(vari.length<6)
   throw new Error("Minimum length of degree should be six");
  
   if(vari.length>30)
   throw new Error("Maximum length of degree is 30 ");
   let regex1 = /^[a-z ']+$/i
   if(!regex1.test(vari))
   throw new Error('Degree can only have alphabets and some some special characters');
   return vari

}


const isValidString = (string, parameter) => {
    if (!string)
      throw new Error(`You must provide a ${parameter}`);
    if (typeof string !== "string")
      throw new Error(`${parameter} must be a string`);
    string = string.trim();
    if (string.length === 0)
      throw new Error(`${parameter} cannot be an empty string or just spaces`,
      );
    return string;
  };


const isValidGpa = (gpa)=>{
    gpa = isValidString(gpa, "GPA");
    let gpaNum = Number(gpa);
    if(isNaN(gpaNum)){
      throw new Error("GPA is not a Number!");
    }
  
    if(gpaNum > 4 || gpaNum < 0){
      throw new Error("GPA should be a number between 0 and 4!")
    }
  
    return gpa;
  }

const isValidYear=(year)=>{
  year = isValidString(year, "Year");
  const special = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  if(special.test(year)) throw {status : "400", error : "Year is not valid!"}; 
  let yearNum = Number(year);

  if(isNaN(yearNum)){
    throw new Error("Year is not valid!");
  }
  let current_year = new Date().getFullYear();

  if(yearNum < 1900 || yearNum > current_year + 6){
    throw new Error("Year should be between 1900 and current year + 6!");
  }
  return year
}

const isValidStartEndYear=(start_year, end_year,start_month,end_month)=>{
    start_year = isValidYear(start_year);
    end_year = isValidYear(end_year);
    start_year = Number(start_year);
    end_year = Number(end_year);
    d={"January":1,"February":2,"March":3,"April":4,"May":5,"June":6,"July":7,"August":8,"September":9,"October":10,"November":11,"December":12}
    if(start_year>end_year){
      throw new Error("Start year should be less than end year");
    }

else if(start_year==end_year && d[start_month]>d[end_month]){
    throw new Error("Start month should be less than end month");
}
  }


  async function checkifproperbullet(vari){ 
    //flight code is alphanumeric; first character has to be an aplhabet//min length 2; max length:6
   if(!vari)
   throw new Error("Missing bullets");
   if(typeof(vari)!=="string")
   throw new Error("Bullet should be a string");
   if(vari.trim().length===0)
   throw new Error("Bullet cant be empty or all white spaces");
   vari=vari.trim()
   
   if(vari.length<6)
   throw new Error("Minimum length of bullet should be six");
  
   if(vari.length>1000)
   throw new Error("Maximum length of bullet is 1000 ");
   

   return vari
}

async function checkifproperskills(vari){ 
    //flight code is alphanumeric; first character has to be an aplhabet//min length 2; max length:6
   if(!vari)
   throw new Error("Missing skills");
   if(typeof(vari)!=="string")
   throw new Error("Skills should be a string");
   if(vari.trim().length===0)
   throw new Error("Skills cant be empty or all white spaces");

   vari=vari.trim()
   
   if(vari.length<6)
   throw new Error("Minimum length of Skills should be six");
  
   if(vari.length>100)
   throw new Error("Maximum length of skills is 100");
   

   return vari
}


async function checkifproperprojectname(vari){ 
    //flight code is alphanumeric; first character has to be an aplhabet//min length 2; max length:6
   if(!vari)
   throw new Error("Missing project name");
   if(typeof(vari)!=="string")
   throw new Error("Project name should be a string");
   if(vari.trim().length===0)
   throw new Error("Project name cant be empty or all white spaces");

   vari=vari.trim()
   
   if(vari.length<6)
   throw new Error("Minimum length of project name should be six");
  
   if(vari.length>100)
   throw new Error("Maximum length of project name is 100")
   

   return vari
}

async function checkifproperprojectdescription(vari){ 
    //flight code is alphanumeric; first character has to be an aplhabet//min length 2; max length:6
   if(!vari)
   throw new Error("Missing project description");
   if(typeof(vari)!=="string")
   throw new Error("Project description should be a string");
   if(vari.trim().length===0)
   throw new Error("Project description cant be empty or all white spaces");

   vari=vari.trim()
   
   if(vari.length<6)
   throw new Error("Minimum length of project descriptiojn should be six");
  
   if(vari.length>10000)
   throw new Error("Maximum length of project description is 10000");
   

   return vari
}


module.exports = {
checkifpropername,
checkifproperaddress,
isValidEmail,
isValidContact,
isValidGpa,
isValidLinkedIn,
isValidStartEndYear,
isValidYear,
isValidString,
checkifproperdegree,
checkifpropername,
checkifproperprojectdescription,
checkifproperprojectname,
checkifproperschool,
checkifproperskills
  };
  