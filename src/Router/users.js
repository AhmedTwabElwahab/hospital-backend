const express = require('express');
const router = express.Router();
const {check} = require("express-validator");
const {index,create,show,update,destroy} = require('../controllers/users');



/**
 * Get all users
 */
router.get('/',index);

/**
 * get info for user
 */
router.get('/:user', show);

/**
 * create User
 */
router.post('/create', create);

/**
 * update User
 */
router.put('/:user', update);

/**
 * delete User
 */
router.delete('/:user',destroy);

module.exports = router;