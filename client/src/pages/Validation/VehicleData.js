//####################### validate vehicle number #########################
export const validateVehicleNumber = (vehicleNumber) => {
  //vehicle number can contain 2 or 3 letters with 4 number
  //vechile number can contain 2 or 3 numbers with 4 numbers
  const regexVehicleNumber = /^([A-Z]{2,3}|\d{2,3})-\d{4}$/;
  
  //check empty vehicle number
  if(!vehicleNumber.length){
    return ("Vehicle number can't be ematy!");
  }
  //check number pattern
  if (!regexVehicleNumber.test(vehicleNumber)) {
    return ("Invalid vehicle number");
  }
  //check vehicle number lenght
  if((vehicleNumber.length !== 7) && (vehicleNumber.length !== 8)){
    return ("Invalid vehicle number!");
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
  const regexModel = /^[a-zA-Z0-9]*$/;

  // Check if vehicleModel is empty
  if(!vehicleModel.length){
   return ("Vehicle model can't be empty!");
  }

  // Check if vehicleModel only contains letters and numbers
  if(!regexModel.test(vehicleModel)){
   return ("Vehicle model should only contain letters and numbers");
  }

  return null;
};
//########################################################################