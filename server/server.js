import 'dotenv/config';
import app from './app.js';
import connectDB from './config/db.js';

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    const isConnected = await connectDB();
    if (!isConnected) {
      app.locals.isMockMode = true;
      console.log('🚀 Running server in local mock mode (DB optional)');
    }

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
