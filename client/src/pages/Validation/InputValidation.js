//validate contact number
export const validateContactNumber = (contactNumber) => {
    const contactNumberRegex = /^07[0-8]\d{7}$/;
    if (!contactNumberRegex.test(contactNumber)) {
      return 'Invalid contact number.';
    }
    return null;
  };

  