require('dotenv').config();
const mongoose = require('mongoose'),
  MONGODB_URI = (process.env.NODE_ENV === 'development' 
    ? process.env.MONGODB_URI : "mongodb://localhost/paint");

/**
 * -------------- DATABASE ----------------
 */

//Configure mongoose's promise to global promise
mongoose.promise = global.Promise;

const connection = mongoose.connection;

// Database Error/Disconnection
connection.on('error', err => console.log(err.message + ' is Mongod not running?'));
connection.on('disconnected', () => console.log('mongo disconnected'));

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  // useFindAndModify: false,
  // useCreateIndex: true,
  useUnifiedTopology: true,
})
.then((instance) =>
  console.log(`Connected to db: ${instance.connections[0].name}`)
)
.catch((error) => console.log("Connection failed!", error));

connection.once('open', () => {
  console.log('connected to mongoose...');
});

// Expose the connection
module.exports = connection;
