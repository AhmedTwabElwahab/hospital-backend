global.success = function(res,code, data, message,token)
{
    res.status(code).json({
        status: "success",
        data: data,
        token: token ?? null,
        message: message,
    });
}

global.error = function(res,code, error, message)
{
    res.status(code).json({
        status: "error",
        data: error,
        message: message,
    });
}


//module.exports = {success,error};