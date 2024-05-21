//validate contact number
export const validateContactNumber = (contactNumber) => {
    const contactNumberRegex = /^07[0-8]\d{7}$/;
    if (!contactNumberRegex.test(contactNumber)) {
      return 'Invalid contact number.';
    }
    return null;
  };

  //check input is empty
  export const validateInputField = (inputValue) => {
    const emptyFieldRegex = /^\s*$/;
    if (emptyFieldRegex.test(inputValue)) {
      return 'Required fields can not be empty!';
    }
    return null;
  };
  