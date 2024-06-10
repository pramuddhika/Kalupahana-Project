import { db,JWT_SECRET } from '../env.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

//################## register user - start ###############################
export const registerService = (type, name, password, email) => {
    return new Promise((resolve, reject) => {
        // Hash the password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const q = `INSERT INTO users
                   (USER_TYPE, USER_NAME, PASSWORD, EMAIL)
                   VALUES (?, ?, ?, ?)`;
        db.query(q, [type, name, hashedPassword, email], (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve('User registered!');
            }
        });
    });
};
//################## register user - end  ###############################

//################## login - start ########################################
export const loginService = (userName, password) => {
    return new Promise((resolve, reject) => {
        const q = `SELECT * 
                   FROM users 
                   WHERE USER_NAME = ?`;

        db.query(q, [userName], (err, users) => {
            if (err) {
                reject({ message: 'Server side error!' });
            } else if (users.length === 0) {
                reject(new Error({ message: 'User not found' }));
            } else {
                const user = users[0];
                const passwordMatch = bcrypt.compareSync(password, user.PASSWORD);

                if (!passwordMatch) {
                    reject(new Error({ message: 'User name or password wrong!' }));
                } else {
                    const token = jwt.sign(
                        { id: user.ID, type: user.USER_TYPE, name: user.USER_NAME },
                        JWT_SECRET,
                        {
                            expiresIn: user.USER_TYPE === 'shop_owner' ? '30m' : '2h'
                        }
                    );
                    resolve({ token, user: {type: user.USER_TYPE, name: user.USER_NAME, email: user.EMAIL } });
                }
            }
        });
    });
};
//################# login - end    ########################################
