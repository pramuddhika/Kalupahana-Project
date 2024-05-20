import {addMechanicService,getMechanicService,updateMechanicService} from '../services/mechanic-service.js';

//############################### add mechanic - start ########################
export const addMechanicController = async (req,res) => {
    const {employeeId,employeeName,contactNumber,livingArea,joinDate,mainArea,subArea} = req.body;
    console.log(subArea);
    try{
        const data = await addMechanicService(employeeId,employeeName,contactNumber,livingArea,joinDate,mainArea,subArea);
        return res.status(200).json(data);
    }catch(err){
        if (err.code == 'ER_DUP_ENTRY') {
          return res.status(409).json('This employee ID taken!');
      } else {
          console.log(err.message)
          return res.status(500).json('Server side error!');
      } 
    }
}
//############################### add mechanic - end   ########################

//########################### get mechanic data - start ###############################
export const getMechanicController = async (req,res) => {
    try{
        const data = await getMechanicService();
        return res.status(200).json(data);
    }catch(err){
        return res.status(500).json('Sever side error!');
    } 
}
//########################### get mechanic data - end   ###############################

//######################### update mechanic data - start ##############################
export const updateMechanicController = async (req,res) => {
    const {employeeName,contactNumber,livingArea,joinDate,mainArea,subArea,resignDate,employeeId} = req.body;
    
    try{
      const data =await updateMechanicService(employeeName,contactNumber,livingArea,joinDate,mainArea,subArea,resignDate,employeeId);
      return res.status(200).json(data);
    }catch(err){
        return res.status(500).json(err.message);
    }
}
//######################### update mechanic data - end   ##############################