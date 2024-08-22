const express = require('express');
const router = express.Router();
const reviewRequest = require('../Request/reviewRequest');
const {auth} = require('../middleware/authMiddleware');
const {index,create,show,update,destroy} = require('../controllers/reviewController');
const { Validate } = require('../middleware/validate');

/**
 * Get all reviews
 */
router.get('/',auth,index);

/**
 * get info for review
 */
router.get('/:review',auth, show);

/**
 * create review
 */
router.post('/create',reviewRequest,auth,Validate, create);

/**
 * update review
 */
router.put('/:review',reviewRequest,auth,Validate, update);

/**
 * delete review
 */
router.delete('/:review',auth,destroy);

module.exports = router;