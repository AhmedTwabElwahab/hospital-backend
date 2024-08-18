const User = require('../models/Users');


/**
 * @route GET /users
 * @desc Get all users
 * @access Public
 */
async function index (req, res)
{
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
} 

/**
 * @route GET /user/:id
 * @desc Get user by id
 * @access Public
 */

async function show (req, res)
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
}

/**
 * @route POST /users/create
 * @desc Create a new user
 * @access Public
 */
async function create (req, res)
{
    try 
    {
        const newUser = await new User({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            birthdate: new Date(req.body.birthdate)
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
}

/**
 * @route PUT /users/:id
 * @desc Update user by id
 * @access Public
 */
async function update (req, res)
{
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
}

/**
 * @route DELETE /users/:id
 * @desc Delete user by id
 * @access Public
 */
async function destroy (req, res)
{
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
}

module.exports = {index, show, create, update, destroy};