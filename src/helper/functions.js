/**
 * Send response success to client.
 * 
 * @param {response} res Response.
 * @param {integer} code Status code.
 * @param {any} data Successful data.
 * @param {String} message Display message for client.
 * @param {String} token Access token.
 */
global.success = function (res,code, data, message,token)
{
    res.status(code).json({
        status: "success",
        data: data,
        token: token ?? null,
        message: message,
    });
}

/**
 * Send response error to client.
 * 
 * @param {response} res Response.
 * @param {integer} code Status code.
 * @param {any} error error object.
 * @param {String} message Display error message for client.
 */
global.error = function(res,code, error, message)
{
    res.status(code).json({
        status: "error",
        data: error,
        message: message,
    });
}