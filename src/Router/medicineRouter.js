const express = require('express');
const router = express.Router();
const medicineRequest = require('../Request/medicineRequest');
const {auth} = require('../middleware/authMiddleware');
const {index,create,show,update,destroy} = require('../controllers/medicineController');
const { Validate } = require('../middleware/validate');

/**
 * Get all medicines
 */
router.get('/',auth,index);

/**
 * get info for medicine
 */
router.get('/:medicine',auth, show);

/**
 * create medicine
 */
router.post('/create',medicineRequest,auth,Validate, create);

/**
 * update medicine
 */
router.put('/:medicine',medicineRequest,auth,Validate, update);

/**
 * delete medicine
 */
router.delete('/:medicine',auth,destroy);

module.exports = router;