const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      autoIndex: false, // Disable in production for performance
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ Database connection failed:");
    console.error(error.message);
    process.exit(1); // Exit process if DB fails
  }
};

/**
 * Graceful shutdown
 */
const gracefulShutdown = () => {
  mongoose.connection.close(() => {
    console.log("🔌 MongoDB connection closed.");
    process.exit(0);
  });
};

// Handle app termination
process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);

module.exports = connectDB;
