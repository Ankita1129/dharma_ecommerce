import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Define __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure environment variables
dotenv.config();

// Database configuration
connectDB();

// Initialize the Express app
const app = express();

// Middlewares
// app.use(cors());
app.use(cors({
  origin: 'https://dharma-1.onrender.com',
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
}));

app.use(express.json()); // Parse JSON payloads
app.use(morgan("dev")); // Log HTTP requests
app.use(express.static(path.join(__dirname, "./client/build")));

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

// Catch-all route to serve the React app
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Define the server port
const PORT = process.env.PORT || 8080;

// Start the server
app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`.bgCyan.white);
});
