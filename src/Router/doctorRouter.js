const express = require('express');
const router = express.Router();
const doctorRequest = require('../Request/doctorRequest');
const {auth} = require('../middleware/authMiddleware');
const {index,create,show,update,destroy} = require('../controllers/doctorController');
const { Validate } = require('../middleware/validate');

/**
 * Get all doctors
 */
router.get('/',auth,index);

/**
 * get info for doctor
 */
router.get('/:doctor',auth, show);

/**
 * create doctor
 */
router.post('/create',doctorRequest,auth,Validate, create);

/**
 * update doctor
 */
router.put('/:doctor',doctorRequest,auth,Validate, update);

/**
 * delete doctor
 */
router.delete('/:doctor',auth,destroy);

module.exports = router;