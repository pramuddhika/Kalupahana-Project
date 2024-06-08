import { resolve } from "path"
import {db,PORT} from '../env.js';

//################################## check record data - start ############################
export const checkVehicleService = (searchNumber) => {
    return new Promise( (resolve,reject) => {
        const record = `SELECT *
                        FROM records
                        WHERE VEHICLE_NUMBER = ?`;

        db.query(record,[searchNumber], (err,data)=> {
            if(err){
                reject({message:'Server side error!'});
                return;
            }else if(data.length === 0){
                reject({message:'No data founed!'});
                return;
            }else{
                resolve({message:'record exist'});
            }
        })
    })
}
//################################## check record data - end   ############################

//################################## get record data - start ############################
export const getRecordsDataService = (recordNumber) => {
    return new Promise((resolve, reject) => {
        const recordQuery = `SELECT 
                        r.JOB_ID,r.PRE_REPAIR_DOC_ID,r.POST_REPAIR_DOC_ID,DATE_FORMAT(r.START_DATE, '%Y-%m-%d') as START_DATE,DATE_FORMAT(r.END_DATE, '%Y-%m-%d') as END_DATE,
                        c.CUSTOMER_NAME,c.EMAIL,c.PHONE_NUMBER,
                        w.EMPLOYEE_ID,w.MECHANIC_NOTE,
                        p.BATTERY_HEALTH,p.ENGINE_PERFORMANCE,p.TIRE_CONDITION,p.FLUID_LEVELS,p.MECHANIC_INSTRUCTION,p.SHOP_OWNER_NOTE,
                        pr.VEHICLE_FAULT,pr.ADDITIONAL_NOTE,pr.SPARE_TIRE,pr.TIRE_JACK,pr.LUG_WRENCH,pr.TOOL_BOX,pr.JUMPER_CABLES,
                        ch.ITEM_NAME,
                        s.IMAGE
                        FROM records r
                        LEFT JOIN vehicle v              ON r.VEHICLE_NUMBER = v.VEHICLE_NUMBER
                        LEFT JOIN customer c             ON v.NIC_NUMBER = c.NIC_NUMBER
                        LEFT JOIN work_allocation w      ON r.JOB_ID = w.JOB_ID
                        LEFT JOIN post_repair_document p ON r.POST_REPAIR_DOC_ID = p.DOCUMENT_ID
                        LEFT JOIN pre_repair_document pr ON r.PRE_REPAIR_DOC_ID = pr.DOCUMENT_ID
                        LEFT JOIN check_list ch          ON r.PRE_REPAIR_DOC_ID = ch.PREREPAIR_DOC_ID
                        LEFT JOIN scratch_marks s        ON r.PRE_REPAIR_DOC_ID = s.PREREPAIR_DOC_ID   
                        WHERE r.VEHICLE_NUMBER = ?`;

        db.query(recordQuery, [recordNumber], (err, data) => {
            if (err) {
                reject({ message: err.message });
                return;
            } else if (data.length === 0) {
                reject({ message: 'No data found!' });
                return;
            } else {
                const groupedRecords = data.reduce((acc, list) => {
                    if (!acc[list.JOB_ID]) {
                        acc[list.JOB_ID] = {
                            vehicleNumber: recordNumber,
                            jobId: list.JOB_ID,
                            startDate: list.START_DATE,
                            endDate: list.END_DATE,
                            preDoc: list.PRE_REPAIR_DOC_ID,
                            postDoc: list.POST_REPAIR_DOC_ID,
                            customer: list.CUSTOMER_NAME,
                            email: list.EMAIL,
                            phone: list.PHONE_NUMBER,
                            batteryHealth: list.BATTERY_HEALTH,
                            enginePerformance: list.ENGINE_PERFORMANCE,
                            tireCondition: list.TIRE_CONDITION,
                            fluidLevels: list.FLUID_LEVELS,
                            mechanicInstruction: list.MECHANIC_INSTRUCTION,
                            shopOwnerNote: list.SHOP_OWNER_NOTE,
                            vehicleFault: list.VEHICLE_FAULT,
                            additionalNote: list.ADDITIONAL_NOTE,
                            spareTire: list.SPARE_TIRE,
                            tireJack: list.TIRE_JACK,
                            lugWrench: list.LUG_WRENCH,
                            toolBox: list.TOOL_BOX,
                            jumperCables: list.JUMPER_CABLES,
                            otheritems:[],
                            scratchMarks:[],
                            workAllocation: []
                        };
                    }

                    if (list.EMPLOYEE_ID || list.MECHANIC_NOTE) {
                        acc[list.JOB_ID].workAllocation.push({
                            employeeId: list.EMPLOYEE_ID,
                            mechNote: list.MECHANIC_NOTE
                        });
                    }
                    if(list.ITEM_NAME){
                       if(acc[list.JOB_ID].otheritems){
                          acc[list.JOB_ID].otheritems += ' ' + list.ITEM_NAME+',';
                        } else {
                          acc[list.JOB_ID].otheritems = list.ITEM_NAME;
                        }
                    }
                    if(list.IMAGE){
                        if(acc[list.JOB_ID].scratchMarks){
                            acc[list.JOB_ID].scratchMarks +=' '+`http://localhost:${PORT}/images/${list.IMAGE}`+',';
                        }
                    }

                    return acc;
                }, {});

                const transformedRecords = Object.values(groupedRecords);
                resolve({ record: transformedRecords });
            }
        });
    });
};

//################################## get record data - end   ############################