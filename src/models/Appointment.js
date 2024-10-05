const mongoose = require('mongoose');
const schema = mongoose.Schema;

const appointmentSchema = new schema({
    day: String,
    work:Boolean,
    start_from: String,
    end_to: String,
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'doctors' }
});
  
/**
 * @desc Get token
 * @access Public
 */
appointmentSchema.methods.createAppointment = async function(day,work,start_from,end_to,doc,DoctorModel)
{

    try {
        const newappointment = await new Appointment({
            day:day,
            work:work?? true,
            start_from:start_from,
            end_to:end_to,
            doctor:doc
        });
    
        
        newappointment.save()
        .then(async() => {
            const Doctor_data = await DoctorModel.findById(doc);
    
            await Doctor_data.appointment.push(newappointment._id);
            await Doctor_data.save();
           }
        );
        return newappointment;
    } catch (error) {
        throw error;
    }
};

const Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = Appointment;