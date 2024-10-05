const express = require('express');
const router = express.Router();
const {auth} = require('../middleware/authMiddleware');
const {index,create,show,update,destroy} = require('../controllers/appointmentController');
const [appointmentRequest] = require("../Request/appointmentRequest")
const { Validate } = require('../middleware/validate');

/**
 * Get all appointments
 */
router.get('/',auth,index);

/**
 * create appointment
 */
router.post('/create', appointmentRequest, auth, Validate, create);

/**
 * get info for appointment
 */
router.get('/:appointment',auth, show);


/**
 * update appointment
 */
router.put('/:appointment', appointmentRequest, auth, Validate, update);

/**
 * delete appointment
 */
router.delete('/:appointment',auth,destroy);

module.exports = router;