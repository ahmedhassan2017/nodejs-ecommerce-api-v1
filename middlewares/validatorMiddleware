const {validationResult} = require('express-validator');


const validatorMiddleware = (req,res,next)=>{
    // finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
   
    next();  // if there are no errors, move to the next middleware 
}

module.exports = validatorMiddleware;