const express = require('express');
const router = express.Router();
const ReservationRequest = require('../Request/reservationRequest');
const {auth} = require('../middleware/authMiddleware');
const {index,create,show,update,destroy} = require('../controllers/reservationController');
const { Validate } = require('../middleware/validate');

/**
 * Get all Reservations
 */
router.get('/',auth,index);

/**
 * get info for Reservation
 */
router.get('/:Reservation',auth, show);

/**
 * create Reservation
 */
router.post('/create',ReservationRequest,auth,Validate, create);

/**
 * update Reservation
 */
router.put('/:Reservation',ReservationRequest,auth,Validate, update);

/**
 * delete Reservation
 */
router.delete('/:Reservation',auth,destroy);

module.exports = router;