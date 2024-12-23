const MedicalExamination = require('../models/MedicalExamination');
const {addPatient,addDoctor} = require('../helper/functions');


/**
 * @route GET /MedicalExamination
 * @desc Get all MedicalExamination
 * @access Public
 */
async function index (req, res)
{
    try 
    {
        let medicalExamination = await MedicalExamination.find({}).populate(["doctor",'patient','medicines']);
        if(!medicalExamination)
        {
            throw 'No medicalExamination found';
        }
        res.json(medicalExamination);
    } catch (err)
    {
        global.error(res,500,err,"internal error");
    }
} 

/**
 * @route GET /medicalExamination/:id
 * @desc Get MedicalExamination by id
 * @access Public
 */

async function show (req, res)
{
    const MedicalExaminationId = req.params.MedicalExamination;
    try 
    {
        const MedicalExaminationData = await MedicalExamination
        .findById(MedicalExaminationId).populate(["doctor",'patient','medicines']);
        if(!MedicalExaminationData)
        {
            throw 'No medicalExamination found';
        }
        res.json(MedicalExaminationData);
    } catch (error)
    {
        global.error(res,500,error,"internal error")
    }   
}

/**
 * @route POST /medicalExamination/create
 * @desc Create a new MedicalExamination
 * @access Public
 */
async function create (req, res)
{
    try 
    {
        const newMedicalExamination = await new MedicalExamination({
            notes: req.body.notes,
            doctor: req.body.doctor,
            patient: req.body.patient,
            diagnosis: req.body.diagnosis,
            status: req.body.status ?? 'active',
        });
        newMedicalExamination.save()
            .then(async () => {
                await addPatient(newMedicalExamination.doctor,newMedicalExamination.patient)
                await addDoctor(newMedicalExamination.doctor,newMedicalExamination.patient)
                res.json(newMedicalExamination)
            })
            .catch((err) => {
            res.json({massage:  err.message});  
            });
    } catch (error)
    {
        global.error(res,500,error,"internal error")
    }
}

/**
 * @route PUT /MedicalExaminations/:id
 * @desc Update MedicalExamination by id
 * @access Public
 */
async function update (req, res)
{
    const id = req.params.MedicalExamination;    
    try 
    {
        let updateMedicalExamination = await MedicalExamination.findById(id);
        if (!updateMedicalExamination)
        {
            throw "Not Found";
        }
        //update MedicalExamination
        updateMedicalExamination.notes       = req.body.notes,
        updateMedicalExamination.doctor      = req.body.doctor_id,
        updateMedicalExamination.patient     = req.body.pation_id,
        updateMedicalExamination.diagnosis   = req.body.diagnosis,
        updateMedicalExamination.status      = req.body.status ?? 'active',
        
        // save MedicalExamination to database
        await updateMedicalExamination.save();
        res.json(updateMedicalExamination);
        
    } catch (error) 
    {
        global.error(res,500,error,"internal error");
    }
}

/**
 * @route DELETE /MedicalExaminations/:id
 * @desc Delete MedicalExamination by id
 * @access Public
 */
async function destroy (req, res)
{
    const MedicalExaminationId = req.params.MedicalExamination;
    try 
    {
        // check if MedicalExamination exists
        const medicalExamination = await MedicalExamination.findByIdAndDelete(MedicalExaminationId);
        if (!medicalExamination)
        {
            throw "Not Found";
        }else
        {
            // delete MedicalExamination from database
            res.json({message: 'MedicalExamination deleted successfully'});
        }
    } catch (error)
    {
        global.error(res,500,error,"internal error");
    }
}



module.exports = {index, show, create, update, destroy};