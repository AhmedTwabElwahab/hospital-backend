const Reservation = require('../models/Reservation');


/**
 * @route GET /Reservation
 * @desc Get all Reservation
 * @access Public
 */
async function index (req, res)
{
    try 
    {
        let reservation = await Reservation.find({});
        if(!reservation)
        {
            throw 'No Reservation found';
        }
        res.json(reservation);
    } catch (err)
    {
        global.error(res,500,err,"internal error");
    }
} 

/**
 * @route GET /Reservation/:id
 * @desc Get Reservation by id
 * @access Public
 */

async function show (req, res)
{
    const ReservationId = req.params.Reservation;
    try 
    {
        const ReservationData = await Reservation
        .findById(ReservationId).catch(error=>{
           throw error;
        });
        res.json(ReservationData);
    } catch (error)
    {
        global.error(res,500,error,"internal error")
    }   
}

/**
 * @route POST /Reservation/create
 * @desc Create a new Reservation
 * @access Public
 */
async function create (req, res)
{
    try 
    {
        const newReservation = await new Reservation({
            code: req.body.code,
            time: req.body.time,
            reservationDate: new Date(req.body.reservationDate),
            status: req.body.status ?? 'unpaid',
            doctor: req.body.doctor,
            patient: req.body.patient
        });
        newReservation.save()
            .then(async () => {
               
                res.json(newReservation)
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
 * @route PUT /Reservations/:id
 * @desc Update Reservation by id
 * @access Public
 */
async function update (req, res)
{
    const id = req.params.Reservation;    
    try 
    {
        let updateReservation = await Reservation.findById(id);
        if (!updateReservation)
        {
            throw "Not Found";
        }
        //update Reservation
         updateReservation.code =  req.body.code,
         updateReservation.time =  req.body.time,
         updateReservation.reservationDate =  new Date(req.body.reservationDate),
         updateReservation.status =  req.body.status ?? 'unpaid',
         updateReservation.doctor =  req.body.doctor,
         updateReservation.patient =  req.body.patient
        // save Reservation to database
        await updateReservation.save();
        res.json(updateReservation);
        
    } catch (error) 
    {
        global.error(res,500,error,"internal error");
    }
}

/**
 * @route DELETE /Reservations/:id
 * @desc Delete Reservation by id
 * @access Public
 */
async function destroy (req, res)
{
    const ReservationId = req.params.Reservation;
    try 
    {
        // check if Reservation exists
        const reservation = await Reservation.findByIdAndDelete(ReservationId);
        if (!reservation)
        {
            throw "Not Found";
        }else
        {
            // delete Reservation from database
            res.json({message: 'Reservation deleted successfully'});
        }
    } catch (error)
    {
        global.error(res,500,error,"internal error");
    }
}



module.exports = {index, show, create, update, destroy};