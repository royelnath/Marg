const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Tries to connect using the secret URI from your .env file
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Shuts down the server if it fails to connect
  }
};

module.exports = connectDB;