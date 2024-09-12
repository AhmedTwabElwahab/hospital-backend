const express = require('express');
const router = express.Router();
const {auth} = require('../middleware/authMiddleware');
const {index,create,show,update,destroy} = require('../controllers/patientController');
const [patientRequest,patientUpdateRequest] = require("../Request/pationtRequest")
const { Validate } = require('../middleware/validate');

/**
 * Get all Patients
 */
router.get('/',auth,index);

/**
 * create Patient
 */
router.post('/create', patientRequest, auth, Validate, create);

/**
 * get info for Patient
 */
router.get('/:Patient',auth, show);


/**
 * update Patient
 */
router.put('/:Patient', patientUpdateRequest, auth, Validate, update);

/**
 * delete Patient
 */
router.delete('/:Patient',auth,destroy);

module.exports = router;