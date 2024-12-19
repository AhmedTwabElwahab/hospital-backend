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
            address: req.body.address,
            whatsapp: req.body.whatsapp,
            weight:req.body.weight,
            height: req.body.height,
            bloodType: req.body.bloodType, // فصيلة الدم
            allergies: req.body.allergies, //الحساسية
            birthdate: new Date(req.body.birthdate),
        });

        newPatient.save()
            .then(() =>
                success(res,200,newPatient,'successful create patient'))
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
        const updatePatient = await Patient.findById(id);
        if (!updatePatient){
            throw "Not Found";
        }else
        {
            //update Patient
            updatePatient.name        = req.body.name,
            updatePatient.number_id   = req.body.number_id,
            updatePatient.email       = req.body.email,
            updatePatient.address     = req.body.address,
            updatePatient.phone       = req.body.phone,
            updatePatient.password    = req.body.password,
            updatePatient.whatsapp    = req.body.whatsapp,
            updatePatient.weight      = req.body.weight,
            updatePatient.height      = req.body.height,
            updatePatient.bloodType   = req.body.bloodType, // فصيلة الدم
            updatePatient.allergies   = req.body.allergies, //الحساسية
            updatePatient.birthdate   = new Date(req.body.birthdate),
            
            // save Patient to database
            await updatePatient.save();
            res.json(updatePatient);
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
        let patient = await Patient.findByIdAndDelete(PatientId);
        if (!patient)
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