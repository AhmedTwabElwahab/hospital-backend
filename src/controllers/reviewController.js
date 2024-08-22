const Review = require('../models/Review');

/**
 * @route GET /review
 * @desc Get all review
 * @access Public
 */
async function index (req, res)
{
    try 
    {
        let review = await Review.find({});
        if(!review)
        {
            throw 'No review found';
        }
        res.json(review);
    } catch (err)
    {
        global.error(res,500,err,"internal error");
    }
} 

/**
 * @route GET /review/:id
 * @desc Get review by id
 * @access Public
 */

async function show (req, res)
{
    const reviewId = req.params.review;
    try 
    {
        const reviewData = await Review.findById(reviewId).populate(['doctor','patient']);
        if(!reviewData)
        {
            throw 'Not Found';
        }
        res.json(reviewData);
    } catch (error)
    {
        global.error(res,500,error,"internal error")
    }   
}

/**
 * @route POST /review/create
 * @desc Create a new review
 * @access Public
 */
async function create (req, res)
{
    try 
    {
        const review  = await Review.find({patient:req.body.patient,doctor: req.body.doctor});
        if (review.length > 0) {
            throw "Review already exists";
        }

        const newreview = await new Review({
            disc    :req.body.disc,
            rating  :req.body.rating,
            patient :req.body.patient,
            doctor  :req.body.doctor,
        });
        newreview.save()
            .then(async () => {
                res.json(newreview)
            })
            .catch((err) => {
            res.json({massage:  err.message});  
            });
    } catch (error)
    {
        global.error(res,500,error,"internal error")
    }
}

/**
 * @route PUT /reviews/:id
 * @desc Update review by id
 * @access Public
 */
async function update (req, res)
{
    const id = req.params.review;    
    try 
    {
        let updateReview = await Review.findById(id);
        if (!updateReview)
        {
            throw "Not Found";
        }
        //update review
        updateReview.disc       =  req.body.disc;
        updateReview.patient    =  req.body.patient;
        updateReview.doctor     =  req.body.doctor;
        updateReview.rating     =  req.body.rating;
               
        // save review to database
        await updateReview.save();
        res.json(updateReview);
        
    } catch (error) 
    {
        global.error(res,500,error,"internal error");
    }
}

/**
 * @route DELETE /reviews/:id
 * @desc Delete review by id
 * @access Public
 */
async function destroy (req, res)
{
    const reviewId = req.params.review;
    try 
    {
        // check if review exists
        const review = await Review.findByIdAndDelete(reviewId);
        if (!review)
        {
            throw "Not Found";
        }else
        {
            // delete review from database
            res.json({message: 'review deleted successfully'});
        }
    } catch (error)
    {
        global.error(res,500,error,"internal error");
    }
}



module.exports = {index, show, create, update, destroy};