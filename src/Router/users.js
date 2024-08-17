const express = require('express');
const router = express.Router();
const User = require('../models/Users')



/**
 * Get all users
 */
router.get('/', async (req, res) =>{
    try 
    {
        const users = await User.find();
        if(!users)
        {
            throw 'No users found';
        }
        res.json(users);
    } catch (error)
    {
        res.status(500).json({massage: error});
    } 
})

/**
 * get info for user
 */
router.get('/:user', async(req, res) =>
{
    const userId = req.params.user;
    try 
    {
        const userData = await User.findById(userId).catch(error=>{
           throw error;
        });
        res.json(userData);
    } catch (error)
    {
        res.status(500).json({massage: error});
    }   
});

/**
 * create User
 */
router.post('/create', async(req, res) => 
{    
    try 
    {
        const newUser = await new User({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            brithdate:req.body.brithdate
        });
        
        newUser.save()
            .then(() => res.json(newUser))
            .catch((err) => {
              res.json({massage:  err.message});  
            });
    } catch (error)
    {
        res.status(500).json({massage: error});
    } 
});

/**
 * update User
 */
router.put('/:user',async (req, res) => {
    const id = req.params.user;    
    const { name, phone, email, birthdate } = req.body;
    try 
    {
        const user = await User.findById(id);
        if (!user){
            throw "Not Found";
        }else
        {
            //update user
            user.name = name;
            user.phone = phone;
            user.email = email;
            user.birthdate = birthdate;
            // save user to database
            await user.save();
            res.json(user);
        }
    } catch (error) {
        res.status(500).json({massage: error});
    }
});

/**
 * delete User
 */
router.delete('/:user',async(req, res) => {
    const userId = req.params.user;
    try 
    {
        // check if user exists
        const user = await User.findByIdAndDelete(userId);
        if (!user)
        {
            throw "Not Found";
        }else
        {
            // delete user from database
            res.json({message: 'User deleted successfully'});
        }
    } catch (error)
    {
        res.status(500).json({massage: error});
    }   
});

module.exports = router;