//####################### validate vehicle number #########################
export const validateVehicleNumber = (vehicleNumber) => {
  //vehicle number can contain 2 or 3 letters with 4 number
  //vehicle number can contain 2 or 3 numbers with 4 numbers
  //first part can't be '00' and last 4 digits can't be '0000'
  const regexVehicleNumber = /^((?!00)[A-Z]{2,3}|(?!00)\d{2,3})-(?!0000)\d{4}$/;
  const motorcycleRegex = /^B[A-Z]{2}-\d{4}$/;
  const motorcycleNumbers = /^(8[0-9]|9[0-7]|1[0-5][0-6])-\d{4}$/;
  const motorcycleLetters = /^M[A-Z]-\d{4}$/;

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