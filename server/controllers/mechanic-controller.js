import {addMechanicService} from '../services/mechanic-service.js';

//############################### add mechanic - start ########################
export const addMechanicController = async (req,res) => {
    const {employeeId,employeeName,contactNumber,livingArea,joinDate,mainArea,subArea} = req.body;
    try{
        const data = await addMechanicService(employeeId,employeeName,contactNumber,livingArea,joinDate,mainArea,subArea);
        return res.status(200).json(data);
    }catch(err){
        if (err.code == 'ER_DUP_ENTRY') {
          return res.status(409).json('This employee ID taken!');
      } else {
          return res.status(500).json('Sever side error!');
      } 
    }
}
//############################### add mechanic - end   ########################