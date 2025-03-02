const mongoose = require('mongoose');

const dbConnection = () => {
  // 6. Connect to the database
  mongoose.connect(process.env.DB_URI).then((conn) => {
    console.log(`Database connected ${conn.connection.host}`);
  }
  )
  // .catch((err) => {
  //   console.log(`DB Error: ${err}`);
  // process.exit(1);
  // }
  // );
}
module.exports = dbConnection;