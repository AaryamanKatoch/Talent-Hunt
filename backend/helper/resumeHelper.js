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

async function checkifpropername(vari){
    
    if(!vari)
    throw {status: '400', error : "No personal name provided"};
    if(typeof(vari)!=="string")
    throw {status: '400', error : 'Name is not a string'};
    if(vari.trim().length===0)
    throw {status: '400', error : "Name cant be empty or all white spaces"};

    vari=vari.trim()
    vari=vari.toLowerCase()
    
    if(vari.length<2 || vari.length>80)
    throw {status: '400', error : 'Name must be atleast two characters long or less than 80 characters'};


let regex1 = /^[a-z ']+$/i
if(!regex1.test(vari))
throw {status: '400', error : 'Name can only have alphabets and some some special characters'};
return vari
}


async function isValidEmail(email){
    email = isValidString(email, "Email");
    if (
      !email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    )
      throw { status: "400", error: "Invalid Email" };
    return email.toLowerCase();
  };

  const isValidContact = (contact) => {
    // (123) 456-7890
  // 123-456-7890
  // 123.456.7890
  // 1234567890
  // +1 123 456 7890
  // +1 (123) 456-7890
 
  contact = isValidString(contact, "Contact Number");
  if(!contact.match(/^\+?1?\s*[-.\s]?\(?\d{3}\)?\s*[-.\s]?\d{3}\s*[-.\s]?\d{4}$/))
    throw {status: '400', error : 'Invalid Contact Number'}
  return contact;
  }

  // console.log(isValidContact('+1 551-246-8510'));

  async function checkifproperaddress(vari){ 
    //flight code is alphanumeric; first character has to be an aplhabet//min length 2; max length:6
   if(!vari)
   throw {status: '400', error : "Missing address"};
   if(typeof(vari)!=="string")
   throw {status: '400', error : "Address should be a string"};
   if(vari.trim().length===0)
   throw {status: '400', error : "Address cant be empty or all white spaces"};

   vari=vari.trim()
   
   if(vari.length<2)
   throw {status: '400', error : "Minimum length of address should be two"};
  
   if(vari.length>200)
   throw {status: '400', error : "Maximum length of description is 200 "};
   

   return vari
}

const isValidLinkedIn = (url) => {
    url = isValidString(url, "LinkedIn URL");
    if(!url.match(/^(http(s)?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/))
      throw {status: '400', error : 'Invalid Linkedin URL'}
    return url;
  }


  async function checkifproperschool(vari){ 
    //flight code is alphanumeric; first character has to be an aplhabet//min length 2; max length:6
   if(!vari)
   throw {status: '400', error : "Missing School"};
   if(typeof(vari)!=="string")
   throw {status: '400', error : "School should be a string"};
   if(vari.trim().length===0)
   throw {status: '400', error : "School cant be empty or all white spaces"};

   vari=vari.trim()
   
   if(vari.length<2)
   throw {status: '400', error : "Minimum length of school should be two"};
  
   if(vari.length>100)
   throw {status: '400', error : "Maximum character length of school is 100 "};
   let regex1 = /^[a-z ']+$/i
   if(!regex1.test(vari))
   throw {status: '400', error : 'School can only have alphabets and some some special characters'};
   return vari

}

console.log(checkifproperschool('STEVENS'))
async function checkifproperdegree(vari){ 
    //flight code is alphanumeric; first character has to be an aplhabet//min length 2; max length:6
   if(!vari)
   throw {status: '400', error : "Missing Degree"};
   if(typeof(vari)!=="string")
   throw {status: '400', error : "Degree should be a string"};
   if(vari.trim().length===0)
   throw {status: '400', error : "Degree cant be empty or all white spaces"};

   vari=vari.trim()
   
   if(vari.length<2)
   throw {status: '400', error : "Minimum length of Degree should be two"};
  
   if(vari.length>100)
   throw {status: '400', error : "Maximum length of Degree is 100 "};
   
   let regex1 = /^[a-z ']+$/i
  if(!regex1.test(vari))
throw {status: '400', error : 'Degree can only have alphabets and some special characters'};
return vari

}





const isValidGpa = (gpa)=>{
    gpa = isValidString(gpa, "GPA");
    let gpaNum = Number(gpa);
    if(isNaN(gpaNum)){
      throw {status : "400" , error : "GPA is not a Number!"};
    }
  
    if(gpaNum > 4 || gpaNum < 0){
      throw {status : "400" , error : "GPA should be a number between 0 and 4!"};
    }
  
    return gpa;
  }

const isValidYear=(year)=>{
  year = isValidString(year, "Year");
  const special = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  if(special.test(year)) throw {status : "400", error : "Year is not valid!"}; 
  let yearNum = Number(year);

  if(isNaN(yearNum)){
    throw {status : "400" , error : "Year is not valid!"};
  }
  let current_year = new Date().getFullYear();

  if(yearNum < 1900 || yearNum > current_year + 6){
    throw {status : "400" , error : "Year should be between 1900 and current year + 6!"};
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
      throw {status : "400" , error: "Start year should be less than end year"};
    }

else if(start_year==end_year && d[start_month]>d[end_month]){
    throw {status : "400" , error: "Start Date should be less than end date"};
}
  }


  async function checkifproperbullet(vari){ 
    //flight code is alphanumeric; first character has to be an aplhabet//min length 2; max length:6
   if(!vari)
   throw {status: '400', error : "Missing bullets"};
   if(typeof(vari)!=="string")
   throw {status: '400', error : "Bullet should be a string"};
   if(vari.trim().length===0)
   throw {status: '400', error : "Bullet cant be empty or all white spaces"};

   vari=vari.trim()
   
   if(vari.length<2)
   throw {status: '400', error : "Minimum length of bullet should be two"};
  
   if(vari.length>1000)
   throw {status: '400', error : "Maximum length of bullet is 1000 "};
   

   return vari
}

async function checkifproperskills(vari){ 
    //flight code is alphanumeric; first character has to be an aplhabet//min length 2; max length:6
   if(!vari)
   throw {status: '400', error : "Missing skills"};
   if(typeof(vari)!=="string")
   throw {status: '400', error : "Skills should be a string"};
   if(vari.trim().length===0)
   throw {status: '400', error : "Skills cant be empty or all white spaces"};

   vari=vari.trim()
   
   if(vari.length<6)
   throw {status: '400', error : "Minimum length of Skills should be six"};
  
   if(vari.length>100)
   throw {status: '400', error : "Maximum length of skills is 100"};
   

   return vari
}


async function checkifproperprojectname(vari){ 
    //flight code is alphanumeric; first character has to be an aplhabet//min length 2; max length:6
   if(!vari)
   throw {status: '400', error : "Missing project name"};
   if(typeof(vari)!=="string")
   throw {status: '400', error : "Project name should be a string"};
   if(vari.trim().length===0)
   throw {status: '400', error : "Project name cant be empty or all white spaces"};

   vari=vari.trim()
   
   if(vari.length<2)
   throw {status: '400', error : "Minimum length of project name should be two"};
  
   if(vari.length>200)
   throw {status: '400', error : "Maximum length of project name is 200"};
   

   return vari
}

async function checkifproperprojectdescription(vari){ 
    //flight code is alphanumeric; first character has to be an aplhabet//min length 2; max length:6
   if(!vari)
   throw {status: '400', error : "Missing project description"};
   if(typeof(vari)!=="string")
   throw {status: '400', error : "Project description should be a string"};
   if(vari.trim().length===0)
   throw {status: '400', error : "Project description cant be empty or all white spaces"};

   vari=vari.trim()
   
   if(vari.length<2)
   throw {status: '400', error : "Minimum length of project descriptiojn should be two"};
  
   if(vari.length>10000)
   throw {status: '400', error : "Maximum length of project description is 10000"};
   

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
checkifproperbullet,
checkifproperprojectdescription,
checkifproperprojectname,
checkifproperschool,
checkifproperskills
  };