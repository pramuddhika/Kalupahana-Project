import {db} from '../.env';

//############## check vehicle is online book vechicle or not ########################
export const  checkBookingService = async(jobOpenNumber) => {
    return new Promise( (resolve,reject) => {

        const check = `SELECT VEHICLE_NUMBER
                       FROM booking
                       WHERE VEHICLE_NUMBER = ? AND STATUS='pending'`;

        db.query(check,[jobOpenNumber],(err,data)=> {
            if(err){
                reject(err);
                return;
            }else if (data.length === 0 ){
                resolve("Not a online booked vehicle!")
                return;
            }

            const changeStatus = `UPDATE booking
                                  SET STATUS = 'completed'
                                  WHERE VEHICLE_NUMBER = ? AND STATUS='pending'`;

            db.query(changeStatus,[jobOpenNumber], (err,data)=> {
                if(err){
                    reject(err);
                    return;
                }
                resolve('Online booked vehicle!');
            })
        });
    });
}
//######################### check vehicle - end  #########################################

//##################### check vehicle is registered or not - start ########################
export const checkRegisteredVehicleService = async (jobOpenNumber) => {
    return new Promise ( (resolve,reject) => {

        const check = `SELECT VEHICLE_NUMBER,NIC_NUMBER
                       FROM vehicle
                       where VEHICLE_NUMBER =?`;

        db.query(check,[jobOpenNumber], (err,data) => {
           if(err){
             reject(err);
            return;
           }else if (data.length === 0 ){
             resolve("NEW");
            return;
           }else {
            const checkVehicleData = data.map(vehicle => ({
                vehicleNumber : vehicle.VEHICLE_NUMBER,
                NICnumber     : vehicle.NIC_NUMBER
            }) );
            resolve(checkVehicleData);
            return;
           }
        });
    });
}
//##################### check vehicle is registered or not - end   ########################

//########################### check customer data - start ##################################
export const checkCustomerService = async (NICnumber) => {
    return new Promise ( (resolve,reject) => {

        const q = `SELECT CUSTOMER_NAME,EMAIL,PHONE_NUMBER
                   FROM customer
                   WHERE NIC_NUMBER = ?`;
        
        db.query(q,[NICnumber], (err,data) => {
            if(err){
                reject({message: "An error occurred", error: err});
                return;
            }else if (data.length === 0){
                resolve({ message: "New customer!" });
                return;
            }else {
                const checkCustomer = data.map(customer => ({
                    name : customer.CUSTOMER_NAME,
                    email : customer.EMAIL,
                    phoneNumber : customer.PHONE_NUMBER
                }));
                resolve({checkCustomer});
            }
        })
    })
}
//########################## cheeck customer data = end   ##################################

//######################### update customer data - start ###################################
export const customerDataUpdateService = async (customerName,customerEmail,customerPhoneNumber,NICnumbe) => {
    return new Promise( (resolve,reject) => {

        const q = `UPDATE customer
                   SET CUSTOMER_NAME =? , EMAIL = ? , PHONE_NUMBER =?
                   WHERE NIC_NUMBER = ?`;
        
        db.query(q,[customerName,customerEmail,customerPhoneNumber,NICnumbe],(err,data) => {
            if(err){
                reject({message: "An error occurred", error: err});
                return;
            }else{
                resolve({message:"Details updated!"});
                return;
            }
        })
    })
}
//######################### update customer data - end   ###################################

//######################### register customer data - start ###################################
export const customerRegisterService = async (customerName,customerEmail,customerPhoneNumber,NICnumber) => {
    return new Promise( (resolve,reject) => {

        const q = `INSERT INTO customer
                   (CUSTOMER_NAME,EMAIL,PHONE_NUMBER,NIC_NUMBER)
                   VALUES (?,?,?,?)`;
        
        db.query(q,[customerName,customerEmail,customerPhoneNumber,NICnumber],(err,data) => {
            if(err){
                reject({message: "An error occurred", error: err});
                return;
            }else{
                resolve({message:"Customer Registered!"});
                return;
            }
        })
    })
}
//######################### register customer data - end   ###################################

//######################## register vehicle - satrt  #########################################
export const vehicleRegisterService = async (vehicleNumber,brand,model,fuleType,NICnumbe) => {
    return new Promise( (resolve,reject) => {
        const q = `INSERT INTO vehicle
                   (VEHICLE_NUMBER,BARND,MODEL,FULE_TYPE,NIC_NUMBER)
                   VALUES (?,?,?,?,?)`;
        db.query(q,[vehicleNumber,brand,model,fuleType,NICnumbe],(err,data) => {
            if(err){
                reject({message:"An error occurred!", error:err});
                return;
            }else{
                resolve({message:"Vehicle registered!"});
                return;
            }
        })
    })
}
//######################## register vehicle - end    #########################################

//######################## vehicle ownerShip change - satrt  #################################
export const ownerChangeService = async (NICnumber,vehicleNumber) => {
    return new Promise( (resolve,reject) => {
        const q = `UPDATE vehicle
                   SET NIC_NUMBER =? 
                   WHERE VEHICLE_NUMBER =?`;
        db.query( q,[NICnumber,vehicleNumber], (err,data) => {
            if(err){
                reject({message:"An error occurred!",error: err});
                return;
            }else{
                resolve({message:"Owner change successful!"});
                return;
            }
        })
    })
}
//######################## vehicle ownerShip change - end    #################################