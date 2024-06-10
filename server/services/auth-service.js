import {db} from '../env.js';
import bcrypt from 'bcryptjs';

//################## register user - start ###############################
export const registerService = (type,name,password,email) => {
    return new Promise( (resolve,reject) => {
        // Hash the password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const q = `INSERT INTO users
                   (USER_TYPE,USER_NAME,PASSWORD,EMAIL)
                   VALUES (?,?,?,?)`;
        db.query(q,[type,name,hashedPassword,email],(err,data) => {
            if(err){
                reject(err);
            }else{
                resolve('User registered!');
            }
        })
    })
}
//################## register user - end  ###############################