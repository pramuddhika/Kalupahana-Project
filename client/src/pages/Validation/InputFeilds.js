//############## validate contact number ###########################
export const validateContactNumber = (contactNumber) => {

  const contactNumberRegex = /^07[0-8]\d{7}$/;
  //check phone number is empty
  if(!contactNumber.length){
    return 'Contact number can not be empty!';
  }
  //check phone number in correct pattern
  if (!contactNumberRegex.test(contactNumber)) {
    return 'Invalid contact number.';
  }
  return null;
  };
//##################################################################

//################# check input is empty ###########################
export const validateInputField = (inputValue) => {

  const emptyFieldRegex = /^\s*$/;

  if (emptyFieldRegex.test(inputValue)) {
    return 'All fields required!';
  }

  return null;

};
//##################################################################

//############### check human name ################################
export const validateHumanName = (personName) => {
  //name can only conatin lettters
  const nameregex = /^[a-zA-Z\s]*$/;

  if(nameregex.test(personName)){
    return ("Invalid name!");
  }
  return null;
}
  