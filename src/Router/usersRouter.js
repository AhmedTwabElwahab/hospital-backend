const express = require('express');
const router = express.Router();
const {auth} = require('../middleware/authMiddleware');
const {index,create,show,update,destroy,checkLogin} = require('../controllers/userController');


/**
 * Get all users
 */
router.get('/',auth,index);

/**
 * check User is Login
 */
router.get('/login',auth,checkLogin);

/**
 * get info for user
 */
router.get('/:user',auth, show);

/**
 * create User
 */
router.post('/create',auth, create);

/**
 * update User
 */
router.put('/:user',auth, update);

/**
 * delete User
 */
router.delete('/:user',auth,destroy);


module.exports = router;