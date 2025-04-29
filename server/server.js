// Load environment variables first
const dotenv = require("dotenv");
dotenv.config(); 

const cors = require("cors")

// Then import other modules
const express = require("express");
const connectDb = require("./config/db.js");

const authRoute = require("./router/authRoutes.js")
const taskRoute = require("./router/taskRoutes.js")


const app = express();

app.use(cors())
app.use(express.json())

app.use("/api/auth",authRoute)
app.use("/api/task",taskRoute)


const PORT = 5000;

const startServer = async () => {
  try {
    await connectDb(); // This uses the already-loaded env vars
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect to database:", error.message);
    process.exit(1);
  }
};

startServer();
