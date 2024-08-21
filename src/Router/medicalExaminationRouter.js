const express = require('express');
const router = express.Router();
const medicalExaminationRequest = require('../Request/medicalExaminationRequest');
const {auth} = require('../middleware/authMiddleware');
const {index,create,show,update,destroy} = require('../controllers/medicalExaminationController');
const { Validate } = require('../middleware/validate');

/**
 * Get all MedicalExaminations
 */
router.get('/',auth,index);

/**
 * get info for MedicalExamination
 */
router.get('/:MedicalExamination',auth, show);

/**
 * create MedicalExamination
 */
router.post('/create',medicalExaminationRequest,auth,Validate, create);

/**
 * update MedicalExamination
 */
router.put('/:MedicalExamination',medicalExaminationRequest,auth,Validate, update);

/**
 * delete MedicalExamination
 */
router.delete('/:MedicalExamination',auth,destroy);

module.exports = router;