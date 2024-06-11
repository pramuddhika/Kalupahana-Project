import {registerService,
       loginService,
       verifyPinService
    } from '../services/auth-service.js';

//################## register user - start ###############################
export const registerController = async(req,res) => {
    const {type,name,password,email} = req.body;

    try{
        const data = await registerService(type,name,password,email);
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
        console.log(err)
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
        console.log(err)
        return res.status(500).json(err);
    }
}
//################# pin - end ######################################

