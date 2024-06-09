import {
    getvehicleCategoryService,
    getvehicleBrandsService,
    completeJobsService
       } from '../services/summary-service.js';

//######################  get vehicle data by groups - start ##############################
export const getvehicleCategoryController = async(req,res) => {
    try{
        const data = await getvehicleCategoryService();
        return res.status(200).json(data);
    }catch(err){
        return res.status(500).json(err);
    }
}
//######################  get vehicle data by groups - end   ##############################

//######################  get vehicle data by brand - start ##############################
export const getvehicleBrandsController = async(req,res) => {
    try{
        const data = await getvehicleBrandsService();
        return res.status(200).json(data);
    }catch(err){
        return res.status(500).json(err);
    }
}
//######################  get vehicle data by brands - end   ##############################

//######################  get number og complete jobs - start ##############################
export const completeJobsController = async(req,res) => {
    try{
        const data = await completeJobsService();
        return res.status(200).json(data);
    }catch(err){
        return res.status(500).json(err);
    }
}
//######################  get number og complete job  - end   ##############################