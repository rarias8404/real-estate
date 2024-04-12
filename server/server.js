import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";
import "dotenv/config";

import authRoutes from "./routes/auth.js";

const PORT = process.env.PORT || 5000;

const app = express();

// db
// mongoose
//   .connect(process.env.MONGODB)
//   .then(() => console.log("DB connected"))
//   .catch((error) => console.log(error));

// middlewares
app.use(express.json());
app.use(morgan("dev")); // log requests to the console
app.use(cors()); // enable all CORS requests
app.use(helmet());

// routes middlewares
app.use("/api", authRoutes);

mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log("DB connected");
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
  })
  .catch((error) => console.log(error));
