import {registerService,
       loginService
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
        return res.status(500).json(err);
    }
}
//################# log in - start ######################################

