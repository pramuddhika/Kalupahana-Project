import { resolve } from 'path';
import {db} from '../env.js';


//##########################  get vehicle data by groups - start ##############################
export const getvehicleCategoryService = () => {
    return new Promise( (resolve,reject) => {
        const q = `SELECT FULE_TYPE,COUNT(VEHICLE_NUMBER) AS NUMBER
                   FROM vehicle
                   GROUP BY FULE_TYPE`;

        db.query(q,(err,data) => {
            if(err){
                reject({ message:"Server side error!"});
            }else if ( !data || data.length === 0){
                reject({message:'Data can not be found!'});
            }else {
                const vehicleFuleType = data.map(list => ({
                    fuleType : list.FULE_TYPE,
                    count    : list.NUMBER,
                }));
                resolve({vehicleFuleType});
            }
        })
    })
}
//##########################  get vehicle data by groups - end   ##############################

//##########################  get vehicle data by brands - start ##############################
export const getvehicleBrandsService = () => {
    return new Promise( (resolve,reject) => {
        const q = `SELECT BARND,COUNT(VEHICLE_NUMBER) AS NUMBER
                   FROM vehicle
                   GROUP BY BARND`;

        db.query(q,(err,data) => {
            if(err){
                reject({ message:"Server side error!"});
            }else if ( !data || data.length === 0){
                reject({message:'Data can not be found!'});
            }else {
                const vehicleBrands = data.map(list => ({
                    brand : list.BARND,
                    count    : list.NUMBER,
                }));
                resolve({vehicleBrands});
            }
        })
    })
}
//##########################  get vehicle data by brands - end   ##############################

//##########################  get number og complete job - start ##############################
export const completeJobsService = () => {
    return new Promise( (resolve,reject) => {
        const q = `SELECT COUNT(END_DATE) AS NUMBER
                   FROM records`;

        db.query(q,(err,data) => {
            if(err){
                reject({ message:"Server side error!"});
            }else if ( !data || data.length === 0){
                reject({message:'Data can not be found!'});
            }else {
                const completeJobs = data.map(list => ({
                    jobs : list.NUMBER,
                }));
                resolve({completeJobs});
            }
        })
    })
}
//##########################  get number og complete job - end   ##############################

//##########################  get holidays - start ##############################
export const getHolidaysService = () => {
    return new Promise((resolve, reject) => {
        const q = `
            SELECT  m.MONTH, IFNULL(h.NUMBER, 0) AS NUMBER
            FROM (
                SELECT 1 AS MONTH UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL
                SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL
                SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9 UNION ALL
                SELECT 10 UNION ALL SELECT 11 UNION ALL SELECT 12
            ) AS m
            LEFT JOIN (
                SELECT  MONTH(HOLIDATE) AS MONTH, COUNT(HOLIDATE) AS NUMBER
                FROM holidays
                WHERE YEAR(HOLIDATE) = YEAR(CURDATE())
                GROUP BY MONTH(HOLIDATE)
            ) AS h ON m.MONTH = h.MONTH
            ORDER BY m.MONTH`;

        db.query(q, (err, data) => {
            if (err) {
                reject({ message: "Server side error!" });
            } else if (!data || data.length === 0) {
                reject({ message: 'Data can not be found!' });
            } else {
                const completeJobs = data.map(list => ({
                    month: list.MONTH,
                    count: list.NUMBER,
                }));
                resolve({ completeJobs });
            }
        })
    })
}
//##########################  get holidays - end   ##############################

//##########################  get employee number - start ##############################
export const getEmployeeCountService = () => {
    return new Promise((resolve, reject) => {
        const q = `
            SELECT SUM(IF(RESIGN_DATE IS NULL, 1, 0)) AS IN_COUNT,
                   SUM(IF(RESIGN_DATE IS NOT NULL, 1, 0)) AS OUT_COUNT
            FROM mechanic`;

        db.query(q, (err, data) => {
            if (err) {
                reject({ message: "Server side error!" });
            } else if (!data || data.length === 0) {
                reject({ message: 'Data can not be found!' });
            } else {
                const employeeCount = {
                    in: data[0].IN_COUNT,
                    out: data[0].OUT_COUNT,
                };
                resolve({ employeeCount });
            }
        })
    })
}
//##########################  get  employee number - end   ##############################

//##########################  get details employee number - start ##############################
export const getDetailEmployeeService = () => {
    return new Promise((resolve, reject) => {
        const q = `
            SELECT MAIN_AREA,SUM(IF(RESIGN_DATE IS NULL, 1, 0)) AS IN_COUNT,
                   SUM(IF(RESIGN_DATE IS NOT NULL, 1, 0)) AS OUT_COUNT
            FROM mechanic
            GROUP BY MAIN_AREA`;

        db.query(q, (err, data) => {
            if (err) {
                reject({ message: "Server side error!" });
            } else if (!data || data.length === 0) {
                reject({ message: 'Data can not be found!' });
            } else {
                const employeeCount = data.map(row => ({
                    mainArea: row.MAIN_AREA,
                    in: row.IN_COUNT,
                    out: row.OUT_COUNT,
                }));
                resolve({ employeeCount });
            }
        })
    })
}
//##########################  get details  employee number - end   ##############################

//##########################  get job dates count - start ##############################
export const jobDatesCounterService = () => {
    return new Promise((resolve, reject) => {
        const q = `
            SELECT VEHICLE_NUMBER,JOB_ID,DATEDIFF(CURDATE(), START_DATE) AS ACTIVE_DAYS
            FROM records
            WHERE END_DATE IS NULL`;

        db.query(q, (err, data) => {
            if (err) {
                reject({ message: "Server side error!" });
            } else if (!data || data.length === 0) {
                reject({ message: 'Data can not be found!' });
            } else {
                const jobDetails = data.map(row => ({
                    vehicleNumber: row.VEHICLE_NUMBER,
                    jobId: row.JOB_ID,
                    activeDays: row.ACTIVE_DAYS,
                }));
                resolve({ jobDetails });
            }
        })
    })
}
//##########################  get job dates count - end   ##############################

//##########################  get mechanic note - start ##############################
export const mechanicNotesService = () => {
    return new Promise((resolve, reject) => {
        const q = `
            SELECT w.MECHANIC_NOTE,w.EMPLOYEE_ID,w.STATUS,
                   r.VEHICLE_NUMBER
            FROM work_allocation w
            JOIN records r ON w.JOB_ID = r.JOB_ID
            WHERE w.STATUS NOT IN ('complete', 'withdraw')`;

        db.query(q, (err, data) => {
            if (err) {
                reject({ message: "Server side error!" });
            } else if (!data || data.length === 0) {
                reject({ message: 'Data can not be found!' });
            } else {
                const mechanicNotes = data.map(row => ({
                    mechanicNote: row.MECHANIC_NOTE,
                    employeeId: row.EMPLOYEE_ID,
                    status: row.STATUS,
                    vehicleNumber: row.VEHICLE_NUMBER,
                }));
                resolve({ mechanicNotes });
            }
        })
    })
}
//##########################  get mechanic note - end   ##############################

//##########################  get dates - start ##############################
export const getDatesService = () => {
    return new Promise((resolve, reject) => {
        const startDatesQuery = `SELECT DATE_FORMAT(START_DATE, '%Y-%m-%d') as START_DATE FROM records`;
        const endDatesQuery = `SELECT DATE_FORMAT(END_DATE, '%Y-%m-%d') as END_DATE FROM records WHERE END_DATE IS NOT NULL`;
        const reservedDatesQuery = `SELECT DATE_FORMAT(RESERVED_DATE, '%Y-%m-%d') as RESERVED_DATE FROM booking`;

        Promise.all([
            new Promise((res, rej) => db.query(startDatesQuery, (err, data) => err ? rej(err) : res(data))),
            new Promise((res, rej) => db.query(endDatesQuery, (err, data) => err ? rej(err) : res(data))),
            new Promise((res, rej) => db.query(reservedDatesQuery, (err, data) => err ? rej(err) : res(data)))
        ]).then(([startDatesData, endDatesData, reservedDatesData]) => {
            if (!startDatesData || !endDatesData || !reservedDatesData) {
                reject({ message: 'Data can not be found!' });
            } else {
                const startDates = startDatesData.map(row => row.START_DATE);
                const endDates = endDatesData.map(row => row.END_DATE);
                const reservedDates = reservedDatesData.map(row => row.RESERVED_DATE);
                resolve({ startDates, endDates, reservedDates });
            }
        }).catch(err => {
            reject({ message:err.message });
        });
    })
}
//##########################  get mechanic note - end   ##############################