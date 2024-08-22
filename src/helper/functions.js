const Doctor = require("../models/Doctor");
const MedicalExamination = require("../models/MedicalExamination");
const Patient = require("../models/Patients");

/**
 * Send response success to client.
 * 
 * @param {response} res Response.
 * @param {integer} code Status code.
 * @param {any} data Successful data.
 * @param {String} message Display message for client.
 * @param {String} token Access token.
 */
global.success = function (res,code, data, message,token)
{
    res.status(code).json({
        status: "success",
        data: data,
        token: token ?? null,
        message: message,
    });
}

/**
 * Send response error to client.
 * 
 * @param {response} res Response.
 * @param {integer} code Status code.
 * @param {any} error error object.
 * @param {String} message Display error message for client.
 */
global.error = function(res,code, error, message)
{
    res.status(code).json({
        status: "error",
        data: error,
        message: message,
        line:__filename,
    });
}

/**
 * add patient in doctor table.
 * 
 * @param {String} doctor_id 
 * @param {String} patient_id 
 */
const addPatient = async function(doctor_id,patient_id)
{
    const doctor = await Doctor.findById(doctor_id);
    if (!doctor){
        throw "Not Found";
    };
    const patients = doctor.patient;
    if(!patients.includes(patient_id))
    {
        doctor.patient.push(patient_id);
        doctor.save();
    }
};

/**
 * add doctor in patient table.
 * 
 * @param {String} doctor_id 
 * @param {String} patient_id 
 */
const addDoctor = async function(doctor_id,patient_id)
{
    const patient = await Patient.findById(patient_id);
    if (!patient){
        throw "Not Found";
    };
    const doctors = patient.doctors;
    if(!doctors.includes(doctor_id))
    {
        patient.doctors.push(doctor_id);
        patient.save();
    }
};

/**
 * add medicine in MedicalExamination table.
 * 
 * @param {String} medicine 
 * @param {String} Examination 
 */
const addMedicine = async function(medicine_id,Examination_id)
{
    const Examination = await MedicalExamination.findById(Examination_id);
    if (!Examination){
        throw "Not Found";
    };
    const Medicines = Examination.medicines;
    if(!Medicines.includes(medicine_id))
    {
        Examination.medicines.push(medicine_id);
        Examination.save();
    }
};

module.exports = {addPatient,addDoctor,addMedicine};