const Doctor = require('../models/Doctor');
const {init_appointment} = require('../controllers/appointmentController');

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
        success(res,200,Doctors,"get all doctoors")
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
    try 
    {
        const DoctorId = req.params.doctor;

        const DoctorData = await Doctor.findById(DoctorId).populate(['patient','appointment']);
    
        if (!DoctorData)
        {
            throw "Not Found";
        }
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
            password:req.body.password,
            specialty:req.body.specialty,
            duration_medical:req.body.duration_medical,
            appointment:req.body.appointment?? []
        });

        //update appointemnt
        newDoctor.save()
            .then(async (newDoctor) =>{
               await init_appointment(newDoctor._id);
               success(res,200,newDoctor,"successfull create Doctor");
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
        updateDoctor.name         = req.body.name || updateDoctor.name;
        updateDoctor.nickname     = req.body.nickname || updateDoctor.nickname;
        updateDoctor.number_id    = req.body.number_id|| updateDoctor.number_id;
        updateDoctor.email        = req.body.email|| updateDoctor.email;
        updateDoctor.governorate  = req.body.governorate|| updateDoctor.governorate;
        updateDoctor.city         = req.body.city|| updateDoctor.city;
        updateDoctor.street       = req.body.street|| updateDoctor.street;
        updateDoctor.building     = req.body.building|| updateDoctor.building;
        updateDoctor.floor        = req.body.floor|| updateDoctor.floor;
        updateDoctor.apartment    = req.body.apartment|| updateDoctor.apartment;
        updateDoctor.address      = req.body.address|| updateDoctor.address;
        updateDoctor.phone        = req.body.phone|| updateDoctor.phone;
        updateDoctor.whatsapp     = req.body.whatsapp|| updateDoctor.whatsapp;
        updateDoctor.password     = req.body.password|| updateDoctor.password;
        updateDoctor.specialty    = req.body.specialty || updateDoctor.specialty;
        updateDoctor.duration_medical    = req.body.duration_medical || updateDoctor.duration_medical;
        updateDoctor.appointment    = req.body.appointment || updateDoctor.appointment;

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