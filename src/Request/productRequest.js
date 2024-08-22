const { body } = require("express-validator");

const Request = 
[
    [
      body("name").isString().notEmpty(),
      body("name_ar").isString(),
      body("disc").isString(),
      body("disc_ar").isString(),
      body("image").isString(),
      body("price").isNumeric().notEmpty(),
      body("barcode").isNumeric(),
      body("type").isString(),
    ],
];


module.exports = Request;