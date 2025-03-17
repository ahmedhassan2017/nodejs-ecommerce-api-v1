// Code to start the server

// 1. Import the modules express,dotenv, etc
const express = require('express');
const dotenv = require('dotenv')
const morgan = require('morgan');
dotenv.config({ path: 'config.env' });
const dbConnection = require('./config/database');
const categoryRoute = require('./routes/categoryRoute');
const subCategoryRoute = require('./routes/subCategoryRoute.js');
const brandRoute = require('./routes/brandRoute');
const productRoute = require('./routes/productRoute');
const ApiError = require('./utils/apiError');
const globalError = require('./middlewares/errorMiddleware');

// 6. Connect to the database
dbConnection();

// 2. Create the app
const app = express();
const port = process.env.PORT || 3000;



// 5. Middleware 
if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'));
  console.log('Morgan enabled on mode development');
}

// Middleware to parse the body
app.use(express.json());





// mount the routes
app.use('/api/v1/categories', categoryRoute);
app.use('/api/v1/subcategories', subCategoryRoute);
app.use('/api/v1/brands', brandRoute);
app.use('/api/v1/products', productRoute);


// this for catching all other routes
app.all('*', (req, res, next) => {
  // create the error and pass it to the next function (which is the global error handling middleware)
  next(new ApiError(`Can't find ${req.originalUrl} on this server`, 404));
});

// global error handling middleware for express
app.use(globalError);
  


// 4. Start the server
 const server =  app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}
); 

// Event listener for unhandled promise rejections (outside of express)
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  // Close the server & exit the process -> why? because the server is still running even after the error
  server.close(() => {
    process.exit(1);
  });
}); 


