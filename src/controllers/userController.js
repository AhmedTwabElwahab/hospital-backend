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
            password:req.body.password
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

    try 
    {
        const {name,phone,email,user_password,patient,doctor} = req.body;
        const user = await User.findById(id);
        if (!user){
            throw "Not Found";
        }

        user.name = name || user.name;
        user.phone = phone || user.phone;
        user.email = email || user.email;
        user.password = user_password || user.password;
        user.patient = patient || user.patient;
        user.doctor = doctor || user.doctor;
        // save user to database
        const userUpdate = await user.save();
        const { password,...userDoc} = userUpdate._doc;
        success(res,200,userDoc,"successful update user");
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

/**
 * @route checkLogin /users/login
 * @desc check user is login or not. 
 * @access Public
 */
async function checkLogin (req, res)
{    
    try 
    {
        const ID = req.user.id;
        const user = await User.findById(ID);
        if(!user)
        {
            throw 'No users found';
        }
        const {password, ...user_data} = user._doc;
        res.json(user_data);
    } catch (error)
    {
        res.status(500).json({massage: error});
    }
}

module.exports = {index, show, create, update, destroy, checkLogin};