//validate vehicle number
export const validateVehicleNumber = (vehicleNumber) => {
    const regexVehicleNumber = /^([A-Z]{2,3}|\d{2,3})-\d{4}$/;
    if (!regexVehicleNumber.test(vehicleNumber)) {
      return 'Invalid vehicle number';
    }
    return null;
  };

//validate vehicle fault
export const validateVehicleFault = (vehicleFault) => {
    const regexFault = /^[a-zA-Z0-9 ]*$/;
    if(!regexFault.test(vehicleFault)){
      return 'Vehicle fault should not contain any symbols';
    }
    return null;
  };

