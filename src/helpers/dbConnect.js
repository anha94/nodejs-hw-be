const mongoose = require('mongoose');
const configs = require('../constants/configs');

const connectDB = async () => {
  const mongooseDbOptions = {
    autoIndex: true,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4
  };

  mongoose.set('strictQuery', false);

  await mongoose.connect(configs.MONGODB_URI, mongooseDbOptions);
  console.log('Connected to MongoDB');
};

const disconnectDB = async () => {
  await mongoose.disconnect();
  console.log('Disconnected from MongoDB');
};

module.exports = { connectDB, disconnectDB };
