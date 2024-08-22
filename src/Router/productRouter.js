const express = require('express');
const router = express.Router();
const productRequest = require('../Request/productRequest');
const {auth} = require('../middleware/authMiddleware');
const {index,create,show,update,destroy} = require('../controllers/productController');
const { Validate } = require('../middleware/validate');

/**
 * Get all products
 */
router.get('/',auth,index);

/**
 * get info for product
 */
router.get('/:product',auth, show);

/**
 * create product
 */
router.post('/create',productRequest,auth,Validate, create);

/**
 * update product
 */
router.put('/:product',productRequest,auth,Validate, update);

/**
 * delete product
 */
router.delete('/:product',auth,destroy);

module.exports = router;