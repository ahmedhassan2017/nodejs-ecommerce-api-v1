const globalError = (err, req, res, next) => {
  // set the status code
  err.statusCode = err.statusCode || 500;
  // set the status
  err.status = err.status || 'error';
  // send the response
  if (process.env.NODE_ENV === 'development') {
    sendErrorForDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    sendErrorForProd(err, res);
  }


}

const sendErrorForDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack

  });
}

const sendErrorForProd = (err, res) => {

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  });

}

module.exports = globalError;