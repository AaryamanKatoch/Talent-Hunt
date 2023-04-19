const common = require('./common');

const isValidCompanyData = (data) => {
    for (key in data){
        switch(key) {
            case "email":
                // console.log(data.email);
                data.email = common.isValidEmail(data.email);
                break;
            case "password":
                data.password = common.isValidPassword(data.password);
                break;
            case "type":
                data.type = common.isValidString(data.type);
                break;
            case "description":
                data.description = common.isValidString(data.description);
                break;
            default:
                throw {status: '400', error: `Invalid key - ${key}`}; 
        }
    }
    return data;
}

module.exports = {
    isValidCompanyData
}