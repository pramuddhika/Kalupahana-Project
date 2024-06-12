import { rejects } from 'assert';
import { db, JWT_SECRET, EMAIL_USER, EMAIL_PASS } from '../env.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { resolve } from 'path';

//################## register user - start ###############################
export const registerService = (type, name, password, email,pin,step) => {
    return new Promise((resolve, reject) => {
        // Hash the password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        const hashedPin = bcrypt.hashSync(pin, salt);

        const q = `INSERT INTO users
                   (USER_TYPE, USER_NAME, PASSWORD, EMAIL,PIN,STEP)
                   VALUES (?, ?, ?, ?,?,?)`;
        db.query(q, [type, name, hashedPassword, email,hashedPin,step], (err, data) => {
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
       const q = `SELECT * FROM users WHERE USER_NAME = ?`;

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
                if (user.STEP === 'no') {
                    const token = jwt.sign(
                        { id: user.ID, type: user.USER_TYPE, name: user.USER_NAME },
                        JWT_SECRET,
                        {
                            expiresIn: user.USER_TYPE === 'shop_owner' ? '30m' : '2h'
                        }
                    );
                    resolve({ token, user: { type: user.USER_TYPE, name: user.USER_NAME, step: user.STEP } });
} else {
    const generatePin = () => Math.floor(100000 + Math.random() * 900000).toString();
    const pinInit = generatePin();
    const salt = bcrypt.genSaltSync(10);
    const hashedPin = bcrypt.hashSync(pinInit, salt);
    const q = `UPDATE users SET PIN = ? WHERE USER_TYPE = ?`;
    db.query(q, [hashedPin, user.USER_TYPE], (err) => {
        if (err) {
            console.error(err.message);
            // Fall back to the 'no' process
            const token = jwt.sign(
                { id: user.ID, type: user.USER_TYPE, name: user.USER_NAME,step:'no' },
                JWT_SECRET,
                {
                    expiresIn: user.USER_TYPE === 'shop_owner' ? '30m' : '2h'
                }
            );
            resolve({ token, user: { type: user.USER_TYPE, name: user.USER_NAME,step:user.STEP } });
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
                text: `Your PIN is ${pinInit}`
            };
           
            transporter.sendMail(mailOptions, (err, data) => {
                if (err) {
                    console.error(err.message);
                    // Fall back to the 'no' process
                    const token = jwt.sign(
                        { id: user.ID, type: user.USER_TYPE, name: user.USER_NAME},
                        JWT_SECRET,
                        {
                            expiresIn: user.USER_TYPE === 'shop_owner' ? '30m' : '2h'
                        }
                    );
                    resolve({ token, user: { type: user.USER_TYPE, name: user.USER_NAME,step:'no'} });
                } else {
                    resolve({ token, user: { type: user.USER_TYPE, name: user.USER_NAME,step:user.STEP } });
                }
            });
        }
    });
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

//################ get securuty data - strat ###########################
export const getSecurityDataService = () => {
    return new Promise((resolve, reject) => {
        const q = `SELECT USER_TYPE,EMAIL,STEP FROM users`;

        db.query(q, (err, data) => {
            if (err) {
                reject({ message: 'Server side error!' });
            } else if (data.length === 0) {
                reject({ message: 'No data found!' });
            } else {
                const secuData = data.map(list => ({
                    user: list.USER_TYPE,
                    email: list.EMAIL,
                    step: list.STEP
                }));
                resolve({ secuData });
            }
        });
    });
};
//############### get security data - end    ###########################

