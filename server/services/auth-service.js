import { db, JWT_SECRET, EMAIL_USER, EMAIL_PASS } from '../env.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

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
                reject({ message:'user name or password wrong!'});
            } else {
                const user = users[0];
                const passwordMatch = bcrypt.compareSync(password, user.PASSWORD);

                if (!passwordMatch) {
                    reject({ message: 'user name or password wrong!' });
                } else {
                    if (user.USER_TYPE === 'owner') {
                        const generatePin = () => Math.floor(100000 + Math.random() * 900000).toString();
                        const pin = generatePin();
                        const q = `UPDATE users SET PIN = ? WHERE USER_TYPE = ?`;
                        db.query(q, [pin, user.USER_TYPE], (err) => {
                            if (err) {
                                reject({ message:err.message});
                            } else {
                                var transporter = nodemailer.createTransport({
                                    service: 'gmail',
                                    auth: {
                                      user: EMAIL_USER,
                                      pass: EMAIL_PASS
                                    },
                                    tls: {
                                      rejectUnauthorized: false
                                    }
                                });
                                  
                                var mailOptions = {
                                    from: EMAIL_USER,
                                    to: user.EMAIL,
                                    subject: 'Your login PIN',
                                    text: `Your PIN is ${pin}`
                                };
                               
                                return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            reject({message:err.message});
        } else {
            resolve({message:'Email sent!'});
        }
    });
}).catch(err => console.error(err));
                            }
                        });
                    } else {
                        const token = jwt.sign(
                            { id: user.ID, type: user.USER_TYPE, name: user.USER_NAME },
                            JWT_SECRET,
                            {
                                expiresIn: user.USER_TYPE === 'shop_owner' ? '30m' : '2h'
                            }
                        );
                        resolve({ token, user: { type: user.USER_TYPE, name: user.USER_NAME } });
                    }
                }
            }
        });
    });
};
//################# login - end    ########################################

//################## verify pin - start ########################################
export const verifyPinService = (userName, pin) => {
    return new Promise((resolve, reject) => {
        const q = `SELECT * 
                   FROM users 
                   WHERE USER_NAME = ? AND PIN = ?`;

        db.query(q, [userName, pin], (err, users) => {
            if (err) {
                reject({ message: 'Server side error!' });
            } else if (users.length === 0) {
                reject({ message: 'Invalid PIN!' });
            } else {
                const user = users[0];
                const token = jwt.sign(
                    { type: user.USER_TYPE, name: user.USER_NAME },
                    JWT_SECRET,
                    {
                        expiresIn: '2h'
                    }
                );
                resolve({ token, user: { type: user.USER_TYPE, name: user.USER_NAME } });
            }
        });
    });
};
//################## verify pin - end ########################################
