const Product = require('../models/Product');

/**
 * @route GET /product
 * @desc Get all product
 * @access Public
 */
async function index (req, res)
{
    try 
    {
        let product = await Product.find({});
        if(!product)
        {
            throw 'No product found';
        }
        res.json(product);
    } catch (err)
    {
        global.error(res,500,err,"internal error");
    }
} 

/**
 * @route GET /product/:id
 * @desc Get product by id
 * @access Public
 */

async function show (req, res)
{
    const productId = req.params.product;
    try 
    {
        const productData = await Product.findById(productId);
        if(!productData)
        {
            throw 'Not Found';
        }
        res.json(productData);
    } catch (error)
    {
        global.error(res,500,error,"internal error")
    }   
}

/**
 * @route POST /product/create
 * @desc Create a new product
 * @access Public
 */
async function create (req, res)
{
    try 
    {
        const newProduct = await new Product({
            name    :req.body.name,
            name_ar :req.body.name_ar,
            price   :req.body.price,
            disc    :req.body.disc,
            disc_ar :req.body.disc_ar,
            image   :req.body.image,
            barcode :req.body.barcode,
            type    :req.body.type ?? 'product'
        });
        newProduct.save()
            .then(async () => {
                res.json(newProduct)
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
 * @route PUT /products/:id
 * @desc Update product by id
 * @access Public
 */
async function update (req, res)
{
    const id = req.params.product;    
    try 
    {
        let updateProduct = await Product.findById(id);
        if (!updateProduct)
        {
            throw "Not Found";
        }
        //update product
        updateProduct.name       =  req.body.name;
        updateProduct.name_ar    =  req.body.name_ar;
        updateProduct.price      =  req.body.price;
        updateProduct.disc       =  req.body.disc;
        updateProduct.disc_ar    =  req.body.disc_ar;
        updateProduct.image      =  req.body.image;
        updateProduct.barcode    =  req.body.barcode;
        updateProduct.type       =  req.body.type ?? 'product';
        
        // save product to database
        await updateProduct.save();
        res.json(updateProduct);
        
    } catch (error) 
    {
        global.error(res,500,error,"internal error");
    }
}

/**
 * @route DELETE /products/:id
 * @desc Delete product by id
 * @access Public
 */
async function destroy (req, res)
{
    const productId = req.params.product;
    try 
    {
        // check if product exists
        const product = await Product.findByIdAndDelete(productId);
        if (!product)
        {
            throw "Not Found";
        }else
        {
            // delete product from database
            res.json({message: 'product deleted successfully'});
        }
    } catch (error)
    {
        global.error(res,500,error,"internal error");
    }
}



module.exports = {index, show, create, update, destroy};