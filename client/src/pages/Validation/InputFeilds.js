//############## validate contact number ###########################
export const validateContactNumber = (contactNumber) => {

  const contactNumberRegex = /^07[0-8]\d{7}$/;
  //check phone number is empty
  if(!contactNumber.length){
    return ("Contact number can't be empty!");
  }
  //check phone number in correct pattern
  if (!contactNumberRegex.test(contactNumber)) {
    return ("Invalid contact number.");
  }
  return null;
  };
//##################################################################

//################# check input is empty ###########################
export const validateInputField = (inputValue) => {

  const emptyFieldRegex = /^\s*$/;

  if (emptyFieldRegex.test(inputValue)) {
    return 'required!';
  }

  return null;

};
//##################################################################

//############### check human name #################################
export const validateHumanName = (personName) => {
  //name can only conatin lettters
  const nameregex = /^[a-zA-Z\s]*$/;
  
  //check name is emapty
  if(!personName.length){
    return ("Name can't be empty!");
  }
  if(!nameregex.test(personName)){
    return ("Invalid name!");
  }
  return null;
}
//###################################################################

//################## check human NIC NUMBER #########################
export const validateHumanNIC = (NICnumber) => {
  //NIC can conatin 12 numbers or 9 numbers with 'V'
  const NICregex = /^(\d{12}|\d{9}V)$/;

  //NIC can not be emapty
  if(!NICnumber.length){
    return("NIC number can't be empty!")
  }
  if(!NICregex.test(NICnumber)){
    return("Invaild NIC number!");
  }
  return null;
}
//####################################################################

//######################### check email ##############################
export const validateEmail = (email) => {
  // Email regex
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
  //check empty email
  if(!email){
    return("Email can't be empty!");
  }
  if(!emailRegex.test(email)){
    return("Invalid email address!");
  }
  return null;
}
//####################################################################

//############### handle file selection #################################
export const validateFileType = (files) => {
  const acceptedFileTypes = /(\.jpg|\.jpeg|\.png)$/i;
  const invalidFiles = [];

  files.forEach(file => {
    if (!acceptedFileTypes.exec(file.name)) {
        invalidFiles.push(file.name);
    }
  });

  if (invalidFiles.length > 0) {
    return ("Suported for only .jpg, .jpeg & .png");
  }

return null;
}
//#######################################################################
  