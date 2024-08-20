const express = require('express');
const router = express.Router();
const {auth} = require('../middleware/authMiddleware');
const {index,create,show,update,destroy} = require('../controllers/patientController');


/**
 * Get all Patients
 */
router.get('/',auth,index);

/**
 * get info for Patient
 */
router.get('/:Patient',auth, show);

/**
 * create Patient
 */
router.post('/create',auth, create);

/**
 * update Patient
 */
router.put('/:Patient',auth, update);

/**
 * delete Patient
 */
router.delete('/:Patient',auth,destroy);

module.exports = router;