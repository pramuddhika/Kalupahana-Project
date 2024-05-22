//####################### validate vehicle number #########################
export const validateVehicleNumber = (vehicleNumber) => {
  //vehicle number can contain 2 or 3 letters with 4 number
  //vechile number can contain 2 or 3 numbers with 4 numbers
  const regexVehicleNumber = /^([A-Z]{2,3}|\d{2,3})-\d{4}$/;

  //check vehicle number lenght
  if((vehicleNumber.length !== 7) && (vehicleNumber.length !== 8)){
    return 'Invalid vehicle number!';
  }
  //check number pattern
  if (!regexVehicleNumber.test(vehicleNumber)) {
    return 'Invalid vehicle number';
  }

  return null;

};
//#########################################################################


//####################### validate vehicle fault ##########################
export const validateVehicleFault = (vehicleFault) => {
  
  const regexFault = /^[a-zA-Z0-9 ]*$/;

  //check vehicle fault is empty or not
  if(!vehicleFault.length){
    return 'Vehicle fault can not be empty!';
  }

  //check vehicle fault conatin any symble
  if(!regexFault.test(vehicleFault)){
    return 'Vehicle fault should not contain any symbols';
  }
  return null;
};
//########################################################################

