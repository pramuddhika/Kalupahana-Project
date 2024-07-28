//####################### validate vehicle number #########################
export const validateVehicleNumber = (vehicleNumber) => {
  //vehicle number can contain 2 or 3 letters with 4 number
  //vehicle number can contain 2 or 3 numbers with 4 numbers
  //first part can't be '00' and last 4 digits can't be '0000'
  const regexVehicleNumber = /^((?!00|21|79)[A-Z]{2,3}|(?!00|200|201|202|203|204|205|206|207)\d{2,3})-(?!0000)\d{4}$/;

  //when first part start with 3 letters it can not start with 'B'
  const motorcycleRegex = /^B[A-Z]{2}-\d{4}$/;
  
  // Motorcycle numbers starting with 8 or 9 followed by 4 digits
  // or starting with 1 followed by a number between 0-5 and 4 digits
  const motorcycleNumbers = /^(8[0-9]|9[0-7]|1[0-5][0-6])-\d{4}$/;

  // Motorcycle letters starting with 'M' followed by a letter and 4 digits
  const motorcycleLetters = /^M[A-Z]-\d{4}$/;

  //when first part start with 2 numbers, it can't start with 21, and 79
  const threeWheelNumbers = /^(21|79)\d{2}-\d{4}$/;

  //when first part start with 2 letters it can not start with 'Q'
  const threeWheelLetters = /^Q[A-Z]-\d{4}$/;
  
  //when first part start with 3 numbers it can not between 200 to 207 number including these values
  const threeWheelNumbers3 = /^2(00|01|02|03|04|05|06|07)\d{1}-\d{4}$/;
  
  // Three-wheel vehicle letters starting with 'B' followed by 2 letters and 4 digits
  const threeWheelLetters3 = /^B[A-Z]{2}-\d{4}$/;

  //check empty vehicle number
  if(!vehicleNumber.length){
    return ("Vehicle number can't be empty!");
  }
  //check number pattern
  if (!regexVehicleNumber.test(vehicleNumber)) {
    return ("Invalid vehicle number");
  }
  //check vehicle number length
  if((vehicleNumber.length !== 7) && (vehicleNumber.length !== 8)){
    return ("Invalid vehicle number!");
  }
  //check if vehicle number is for a motorcycle
  if(motorcycleRegex.test(vehicleNumber) || motorcycleNumbers.test(vehicleNumber) || motorcycleLetters.test(vehicleNumber)){
    return ("Motorcycles are not repairing");
  }
  //check if vehicle number is for a three-wheel
  if(threeWheelNumbers.test(vehicleNumber) || threeWheelLetters.test(vehicleNumber) || threeWheelNumbers3.test(vehicleNumber) || threeWheelLetters3.test(vehicleNumber)){
    return ("3-wheels are not repairing");
  }
  return null;
};
//#########################################################################


//####################### validate vehicle fault ##########################
export const validateVehicleFault = (vehicleFault) => {
  
  const regexFault = /^[a-zA-Z0-9 ]*$/;

  //check vehicle fault is empty or not
  if(!vehicleFault.length){
    return ("Vehicle fault can't be empty!");
  }
  //check vehicle fault conatin any symble
  if(!regexFault.test(vehicleFault)){
    return ("Vehicle fault should not contain any symbols");
  }
  return null;
};
//########################################################################

//################## validate vehicle brand ##############################
export const validateVehicleBrand  = (vehicleBrand) => {
  const regexBrand = /^[a-zA-Z]*$/;

  // Check if vehicleBrand is empty
  if(!vehicleBrand.length){
   return ("Vehicle brand can't be empty!");
  }

  // Check if vehicleBrand only contains letters
  if(!regexBrand.test(vehicleBrand)){
   return ("Vehicle brand should only contain letters");
  }

  return null;
};
//########################################################################

//############### validate vehicle model #################################
export const validateVehicleModel = (vehicleModel) => {
  // Vehicle model can contain letters, numbers, and spaces
  const regexModel = /^[a-zA-Z0-9\s]*$/;

  // Check if vehicleModel is empty
  if(!vehicleModel.length){
   return ("Vehicle model can't be empty!");
  }

  // Check if vehicleModel only contains letters, numbers, and spaces
  if(!regexModel.test(vehicleModel)){
   return ("Vehicle model should only contain letters, numbers, and spaces");
  }

  return null;
};
//########################################################################