const Appointment = require('../models/Appointment');
const DoctorModel = require('../models/Doctor');


/**
 * @route GET /appointments
 * @desc Get all appointments
 * @access Public
 */
async function index (req, res)
{
    try 
    {
        const appointments = await Appointment.find();
        if(!appointments)
        {
            throw 'No appointments found';
        }
        res.json(appointments);
    } catch (error)
    {
        global.error(res,500,err,"internal error");
    }
} 

/**
 * @route GET /appointment/:id
 * @desc Get appointment by id
 * @access Public
 */

async function show (req, res)
{
    const appointmentId = req.params.appointment;
    try 
    {
        const appointmentData = await Appointment.findById(appointmentId).catch(error=>{
           throw error;
        });
        res.json(appointmentData);
    } catch (error)
    {
        global.error(res,500,error,"internal error");
    }   
}

/**
 * @route POST /appointments/create
 * @desc Create a new appointment
 * @access Public
 */
async function create (req, res)
{
    const {day,work,start_from,end_to,doctor} = req.body;

    try 
    {
        const newappointment = await new Appointment().createAppointment(day,work,start_from,end_to,doctor,DoctorModel);

        if(!newappointment)
        {
            success(res,200,newappointment,"successfull create appointemt");
        }
    } catch (error)
    {
        global.error(res,500,error,"internal error");
    }
}

/**
 * @route PUT /appointments/:id
 * @desc Update appointment by id
 * @access Public
 */
async function update (req, res)
{
    const id = req.params.appointment;    
    try 
    {
        const updateappointment = await Appointment.findById(id);
        if (!updateappointment){
            throw "Not Found";
        }else
        {
            //update appointment
            updateappointment.day         = req.body.day || updateappointment.day,
            updateappointment.work        = req.body.work || updateappointment.work,
            updateappointment.start_from  = req.body.start_from || updateappointment.start_from,
            updateappointment.end_to      = req.body.end_to || updateappointment.end_to,
            updateappointment.doctor      = req.body.doctor || updateappointment.doctor
            
            // save appointment to database
            await updateappointment.save();
            res.json(updateappointment);
        }
    } catch (error) {
        global.error(res,500,error,"internal error");
    }
}

/**
 * @route DELETE /appointments/:id
 * @desc Delete appointment by id
 * @access Public
 */
async function destroy (req, res)
{
    const appointmentId = req.params.appointment;
    try 
    {
        // check if appointment exists
        let appointment = await Appointment.findByIdAndDelete(appointmentId);
        if (!appointment)
        {
            throw "Not Found";
        }else
        {
            // delete appointment from database
            res.json({message: 'appointment deleted successfully'});
        }
    } catch (error)
    {
        global.error(res,500,error,"internal error");
    }
}


/**
 * @desc init appointment to doctor
 * @access Public
 */
async function init_appointment(doctor)
{
   const appoint = [
        {
            day: 'Sunday',
            work: true,
            start_from: '09:00',
            end_to: '11:00',
            doctor: doctor
        },
        {
            day: 'Monday',
            work: true,
            start_from: '09:00',
            end_to: '11:00',
            doctor: doctor
        },
        {
            day: 'Tuesday',
            work: true,
            start_from: '09:00',
            end_to: '11:00',
            doctor: doctor
        },
        {
            day: 'Wednesday',
            work: true,
            start_from: '09:00',
            end_to: '11:00',
            doctor: doctor
        },
        {
            day: 'Thursday',
            work: true,
            start_from: '09:00',
            end_to: '11:00',
            doctor: doctor
        },
        {
            day: 'Friday',
            work: false,
            start_from: '09:00',
            end_to: '11:00',
            doctor: doctor
        },
        {
            day: 'Saturday',
            work: true,
            start_from: '09:00',
            end_to: '11:00',
            doctor: doctor
        }
   ];

    try 
    {
        appoint.map(async (week)=>{
            let {day, work, start_from, end_to, doctor} = week;
            // create appointments
            const newappointment = await new Appointment().createAppointment(day,work,start_from,end_to,doctor,DoctorModel);
    
            if(!newappointment)
            {
                success(res,200,newappointment,"successfull create appointemt");
            }
       })    
    } catch (error)
    {
        global.error(res,500,error,"internal error");
    }
}



module.exports = {index, show, create, update, destroy, init_appointment};