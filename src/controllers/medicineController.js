const Medicine = require('../models/PationtMedicine');
const {addMedicine} =require('../helper/functions')

/**
 * @route GET /medicine
 * @desc Get all medicine
 * @access Public
 */
async function index (req, res)
{
    try 
    {
        let medicine = await Medicine.find({}).populate(["doctor",'pation']);
        if(!medicine)
        {
            throw 'No medicine found';
        }
        res.json(medicine);
    } catch (err)
    {
        global.error(res,500,err,"internal error");
    }
} 

/**
 * @route GET /medicine/:id
 * @desc Get medicine by id
 * @access Public
 */

async function show (req, res)
{
    const medicineId = req.params.medicine;
    try 
    {
        const medicineData = await Medicine
        .findById(medicineId).catch(error=>{
           throw error;
        });
        res.json(medicineData);
    } catch (error)
    {
        global.error(res,500,error,"internal error")
    }   
}

/**
 * @route POST /medicine/create
 * @desc Create a new medicine
 * @access Public
 */
async function create (req, res)
{
    try 
    {
        const newMedicine = await new Medicine({
            name: req.body.name,
            period: req.body.period,
            dosage: req.body.dosage,
            frequency: req.body.frequency,
            side_effects: req.body.side_effects,
            // doctor: req.body.doctor,
            // patient: req.body.patient,
            examination: req.body.examination,
        });
        newMedicine.save()
            .then(async () => {
                await addMedicine(newMedicine._id,newMedicine.examination);
                res.json(newMedicine)
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
 * @route PUT /medicines/:id
 * @desc Update medicine by id
 * @access Public
 */
async function update (req, res)
{
    const id = req.params.medicine;    
    try 
    {
        let updateMedicine = await Medicine.findById(id);
        if (!updateMedicine)
        {
            throw "Not Found";
        }
        //update medicine
        updateMedicine.name             =  req.body.name;
        updateMedicine.period           =  req.body.period;
        updateMedicine.dosage           =  req.body.dosage;
        updateMedicine.frequency        =  req.body.frequency;
        updateMedicine.side_effects     =  req.body.side_effects;
        // updateMedicine.doctor           =  req.body.doctor;
        // updateMedicine.patient          =  req.body.patient;
        updateMedicine.examination      =  req.body.examination;
        
        // save medicine to database
        await updateMedicine.save();
        res.json(updateMedicine);
        
    } catch (error) 
    {
        global.error(res,500,error,"internal error");
    }
}

/**
 * @route DELETE /medicines/:id
 * @desc Delete medicine by id
 * @access Public
 */
async function destroy (req, res)
{
    const medicineId = req.params.medicine;
    try 
    {
        // check if medicine exists
        const medicine = await medicine.findByIdAndDelete(medicineId);
        if (!medicine)
        {
            throw "Not Found";
        }else
        {
            // delete medicine from database
            res.json({message: 'medicine deleted successfully'});
        }
    } catch (error)
    {
        global.error(res,500,error,"internal error");
    }
}



module.exports = {index, show, create, update, destroy};