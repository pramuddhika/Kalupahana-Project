import {registerService,
       loginService,
       verifyPinService,
       changePassService,
       getSecurityDataService
    } from '../services/auth-service.js';

//################## register user - start ###############################
export const registerController = async(req,res) => {
    const {type,name,password,email,pin,step} = req.body;

    try{
        const data = await registerService(type,name,password,email,pin,step);
        return res.status(200).json(data);
    }catch(err){
        return res.status(500).json(err);
    }
}
//################## register user - end  ###############################

//################# log in - start ######################################
export const loginController = async(req,res) => {
    const {userName,password} = req.body;
    try{
        const data = await loginService(userName,password);
        return res.status(200).json(data);
    }catch(err){
        return res.status(500).json(err);
    }
}
//################# log in - end ######################################

//################# pin - start ######################################
export const verifyPinController = async(req,res) => {
    const {userName, pin} = req.body;
    try{
        const data = await verifyPinService(userName, pin);
        return res.status(200).json(data);
    }catch(err){
        return res.status(500).json(err);
    }
}
//################# pin - end ######################################

//################ get securuty data - strat ###########################
export const getSecurityDataController = async(req,res) => {
    try{
        const data = await getSecurityDataService();
        return res.status(200).json(data);
    }catch(err){
        
        return res.status(500).json(err);
    }
}
//############### get security data - end    ###########################

//############## change pass -start ####################################
export const  changePassController = async(req,res) => {
    const {user,newPassword} = req.body;

    try{
        const data = await changePassService(user,newPassword);
       
        return res.status(200).json(data);
    }catch(err){
        return res.status(500).json(err);
    }
}
//############## change pass - end  ####################################

