import express, { Express } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors, { CorsOptions } from "cors";
import todoRoute from "./src/routes/todo.route";
import userRoute from "./src/routes/user.route";
import cookieParser from "cookie-parser";

dotenv.config();

const app: Express = express();
const PORT: number = Number(process.env.PORT) || 4002;
const DB_URI: string = process.env.MONGODB_URI || "";

// Middlewares
app.use(express.json());
app.use(cookieParser());

const corsOptions: CorsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

// Async function to connect to the database
const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log(" Connected to MongoDB");
  } catch (error) {
    console.error(" MongoDB Connection Error:", error);
    process.exit(1); 
  }
};

// Start server after DB connection
connectDB().then(() => {
  app.use("/todo", todoRoute);
  app.use("/user", userRoute);

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});
