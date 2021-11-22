// Require Mongoose:
const mongoose = require("mongoose"),
  MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/paint";

//Configure mongoose's promise to global promise
mongoose.promise = global.Promise;

const db = mongoose.connection;

// Database Error/Disconnection
db.on('error', err => console.log(err.message + ' is Mongod not running?'));
db.on('disconnected', () => console.log('mongo disconnected'));

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

db.once('open', () => {
  console.log('connected to mongoose...');
});

// Export mongoose so we can use it elsewhere
module.exports = mongoose;