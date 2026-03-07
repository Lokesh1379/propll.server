// const mongoose = require("mongoose");

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI, {
//       autoIndex: false, // Disable in production for performance
//       maxPoolSize: 10, // Maintain up to 10 socket connections
//       serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
//       socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
//     });

//     console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.error("❌ Database connection failed:");
//     console.error(error.message);
//     process.exit(1); // Exit process if DB fails
//   }
// };

// /**
//  * Graceful shutdown
//  */
// const gracefulShutdown = () => {
//   mongoose.connection.close(() => {
//     console.log("🔌 MongoDB connection closed.");
//     process.exit(0);
//   });
// };

// // Handle app termination
// process.on("SIGINT", gracefulShutdown);
// process.on("SIGTERM", gracefulShutdown);

// module.exports = connectDB;

const mongoose = require("mongoose");

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(process.env.MONGO_URI, {
        bufferCommands: false,
      })
      .then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

module.exports = connectDB;
