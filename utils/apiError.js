// @desc: this class is resposible for handling errors in the API (erros that i can predict)
//
class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.operational = true;
  }
} 
module.exports = ApiError;