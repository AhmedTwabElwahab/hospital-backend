const Review = require('../models/Review');
const DoctorModel = require('../models/Doctor');

/**
 * @route GET /review
 * @desc Get all review
 * @access Public
 */
async function index (req, res)
{
    try 
    {
        let query = {};
        if(req.query)
        {
            if(req.query.patient)
            {
                query.patient = req.query.patient;
            }
            if(req.query.doctor)
            {
                query.doctor = req.query.doctor;
            }          
        }
        
        let review = await Review.find(query).populate(['doctor','patient']);
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
        if (review.length > 0)
        {
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
                let sum = 0;
                let avg = 0;
                const reviewsCount = await Review.find({doctor: req.body.doctor});
                let count = reviewsCount.length + 1;
    
                const reviews = await Review.aggregate( [
                    {
                        $addFields: {
                            objectIdAsString: { $toString: "$doctor" }
                        }
                    },
                    {
                        $match: { objectIdAsString: req.body.doctor }
                    },
                    {
                       $group: { _id: "$doctor", total: { $sum: "$rating" } }
                    }
                ]);
                
                sum += Number(req.body.rating) + Number(reviews[0]?.total);
                avg = sum / count;
                
                const Doctor_data = await DoctorModel.findById(req.body.doctor);
                await Doctor_data.reviews.push(newreview._id);
                Doctor_data.rate = avg.toFixed(1);
                await Doctor_data.save();
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