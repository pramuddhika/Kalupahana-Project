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
  // Name should start with a capital letter and can only contain letters and spaces
  const nameRegex = /^[A-Z][a-zA-Z\s]*$/;
  const capitalLetterRegex = /^[A-Z]/;

  // Check if name is empty
  if(!personName.length){
    return ("Name can't be empty!");
  }
  // Check if name starts with a capital letter
  if(!capitalLetterRegex.test(personName)){
    return ("Name should start with a capital letter!");
  }
  // Check if name only contains letters and spaces
  if(!nameRegex.test(personName)){
    return ("Invalid name! Name can only contain letters and spaces.");
  }
  return null;
}
//###################################################################

//################## check human NIC NUMBER #########################
export const validateHumanNIC = (NICnumber) => {
  //NIC can contain 12 numbers or 9 numbers with 'V'
  const NICregex = /^(\d{12}|\d{9}V)$/;

  //NIC can not be empty
  if(!NICnumber.length){
    return("NIC number can't be empty!")
  }
  if(!NICregex.test(NICnumber)){
    return("Invalid NIC number!");
  }
  // If NIC number is 12 digits long, check the first 4 digits
  if(NICnumber.length === 12 && parseInt(NICnumber.substring(0, 4)) > 2018){
    return("Invalid NIC number!");
  }
  // If NIC number is 9 digits long with 'V', check the first 2 digits
  if(NICnumber.length === 10 && (parseInt(NICnumber.substring(0, 2)) < 24 || parseInt(NICnumber.substring(0, 2)) > 99)){
    return("Invalid NIC number!");
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

//############### validate quntity value ################################
export const validateQuantity = (quantity) => {
  // Check if quantity is empty
  if (!quantity) {
    return ("Quantity cannot be empty");
  }

  // Check if quantity is negative
  if (quantity < 0) {
    return ("Quantity cannot be negative");
  }

  const quantityRegex = /^(\d{1,3}(\.\d{1,2})?)$/;
  
  if (!quantityRegex.test(quantity)) {
    return ("Invalid quantity");
  }

  return null;
}
//#######################################################################

//################# validate password ##################################
export const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!passwordRegex.test(password)) {
    return ("Password must contain at least one uppercase letter, one lowercase letter, one digit, one special character, and be at least 8 characters in length.");
  }

  return null;
}
//######################################################################
