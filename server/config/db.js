import mongoose from 'mongoose';

import dns from 'dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);

const connectDB = async () => {
  if (!process.env.MONGODB_URI) {
    console.log('ℹ️  No MONGODB_URI provided in .env. Running with local mock database.');
    return false;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ DB Connected');
    return true;
  } catch (err) {
    console.warn('⚠️  DB Connection failed. Falling back to local mock database:', err.message);
    return false;
  }
};

export default connectDB;
