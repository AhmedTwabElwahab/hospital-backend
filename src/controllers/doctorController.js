const Doctor = require('../models/Doctor');


/**
 * @route GET /Doctors
 * @desc Get all Doctors
 * @access Public
 */
async function index (req, res)
{
    try 
    {
        const Doctors = await Doctor.find();
        if(!Doctors)
        {
            throw 'No Doctors found';
        }
        res.json(Doctors);
    } catch (err)
    {
        global.error(res,500,err,"internal error");
    }
} 

/**
 * @route GET /Doctor/:id
 * @desc Get Doctor by id
 * @access Public
 */

async function show (req, res)
{
    const DoctorId = req.params.doctor;
    try 
    {
        const DoctorData = await Doctor.findById(DoctorId).catch(error=>{
           throw error;
        });
        res.json(DoctorData);
    } catch (error)
    {
        global.error(res,500,error,"internal error")
    }   
}

/**
 * @route POST /Doctors/create
 * @desc Create a new Doctor
 * @access Public
 */
async function create (req, res)
{
    try 
    {
        const newDoctor = await new Doctor({
            name: req.body.name,
            nickname: req.body.nickname,
            number_id: req.body.number_id,
            email: req.body.email,
            governorate: req.body.governorate,
            city: req.body.city,
            street: req.body.street,
            building: req.body.building,
            floor: req.body.floor,
            apartment: req.body.apartment,
            address: req.body.address,
            phone: req.body.phone,
            whatsapp: req.body.whatsapp,
            password:req.body.password
        });
        newDoctor.save()
            .then(() => res.json(newDoctor))
            .catch((err) => {
              res.json({massage:  err.message});  
            });
    } catch (error)
    {
        global.error(res,500,error,"internal error")
    }
}

/**
 * @route PUT /Doctors/:id
 * @desc Update Doctor by id
 * @access Public
 */
async function update (req, res)
{
    const id = req.params.doctor;    
    try 
    {
        let updateDoctor = await Doctor.findById(id);
        if (!updateDoctor)
        {
            throw "Not Found";
        }
        //update Doctor
        updateDoctor.name         = req.body.name,
        updateDoctor.nickname     = req.body.nickname,
        updateDoctor.number_id    = req.body.number_id,
        updateDoctor.email        = req.body.email,
        updateDoctor.governorate  = req.body.governorate,
        updateDoctor.city         = req.body.city,
        updateDoctor.street       = req.body.street,
        updateDoctor.building     = req.body.building,
        updateDoctor.floor        = req.body.floor,
        updateDoctor.apartment    = req.body.apartment,
        updateDoctor.address      = req.body.address,
        updateDoctor.phone        = req.body.phone,
        updateDoctor.whatsapp     = req.body.whatsapp,
        updateDoctor.password     = req.body.password;

        // save Doctor to database
        await updateDoctor.save();
        res.json(updateDoctor);
        
    } catch (error) 
    {
        global.error(res,500,error,"internal error");
    }
}

/**
 * @route DELETE /Doctors/:id
 * @desc Delete Doctor by id
 * @access Public
 */
async function destroy (req, res)
{
    const DoctorId = req.params.doctor;
    try 
    {
        // check if Doctor exists
        const doctor = await Doctor.findByIdAndDelete(DoctorId);
        if (!doctor)
        {
            throw "Not Found";
        }else
        {
            // delete Doctor from database
            res.json({message: 'Doctor deleted successfully'});
        }
    } catch (error)
    {
        global.error(res,500,error,"internal error");
    }
}



module.exports = {index, show, create, update, destroy};