const Patient = require('../models/Patients');


/**
 * @route GET /Patients
 * @desc Get all Patients
 * @access Public
 */
async function index (req, res)
{
    try 
    {
        const Patients = await Patient.find();
        if(!Patients)
        {
            throw 'No Patients found';
        }
        res.json(Patients);
    } catch (error)
    {
        global.error(res,500,err,"internal error");
    }
} 

/**
 * @route GET /Patient/:id
 * @desc Get Patient by id
 * @access Public
 */

async function show (req, res)
{
    const PatientId = req.params.Patient;
    try 
    {
        const PatientData = await Patient.findById(PatientId).catch(error=>{
           throw error;
        });
        res.json(PatientData);
    } catch (error)
    {
        global.error(res,500,error,"internal error");
    }   
}

/**
 * @route POST /Patients/create
 * @desc Create a new Patient
 * @access Public
 */
async function create (req, res)
{
    try 
    {
        const newPatient = await new Patient({
            name: req.body.name,
            number_id: req.body.number_id,
            email: req.body.email,
            address: req.body.address,
            phone: req.body.phone,
            password: req.body.password,
            whatsapp: req.body.whatsapp,
            weight:req.body.weight,
            height: req.body.height,
            bloodType: req.body.bloodType, // فصيلة الدم
            allergies: req.body.allergies, //الحساسية
            birthdate: new Date(req.body.birthdate),
        });
        
        newPatient.save()
            .then(() => res.json(newPatient))
            .catch((err) => {
              res.json({massage:  err.message});  
            });
    } catch (error)
    {
        global.error(res,500,error,"internal error");
    }
}

/**
 * @route PUT /Patients/:id
 * @desc Update Patient by id
 * @access Public
 */
async function update (req, res)
{
    const id = req.params.Patient;    
    try 
    {
        const Patient = await Patient.findById(id);
        if (!Patient){
            throw "Not Found";
        }else
        {
            //update Patient
            Patient.name        = req.body.name,
            Patient.number_id   = req.body.number_id,
            Patient.email       = req.body.email,
            Patient.address     = req.body.address,
            Patient.phone       = req.body.phone,
            Patient.password    = req.body.password,
            Patient.whatsapp    = req.body.whatsapp,
            Patient.weight      = req.body.weight,
            Patient.height      = req.body.height,
            Patient.bloodType   = req.body.bloodType, // فصيلة الدم
            Patient.allergies   = req.body.allergies, //الحساسية
            Patient.birthdate   = new Date(req.body.birthdate),
            
            // save Patient to database
            await Patient.save();
            res.json(Patient);
        }
    } catch (error) {
        global.error(res,500,error,"internal error");
    }
}

/**
 * @route DELETE /Patients/:id
 * @desc Delete Patient by id
 * @access Public
 */
async function destroy (req, res)
{
    const PatientId = req.params.Patient;
    try 
    {
        // check if Patient exists
        const Patient = await Patient.findByIdAndDelete(PatientId);
        if (!Patient)
        {
            throw "Not Found";
        }else
        {
            // delete Patient from database
            res.json({message: 'Patient deleted successfully'});
        }
    } catch (error)
    {
        global.error(res,500,error,"internal error");
    }
}



module.exports = {index, show, create, update, destroy};