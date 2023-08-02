import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import branchRoutes from "./routes/branchRoute.js";
import productRoutes from "./routes/productRoute.js";
import cors from "cors";

dotenv.config();

//database
connectDB();

const app = express();
//middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
//router
app.use("/api/e-commerce/auth", authRoutes);
app.use("/api/e-commerce/branch", branchRoutes);
app.use("/api/e-commerce/product", productRoutes);

//restful api
app.get("/", (req, res) => {
  res.status(200).send({
    message: "Welcome",
  });
});

// const PORT = 8080;
const PORT = process.env.PORT || 8080;

app.listen(PORT, (req, res) => {
  console.log(`Server is running on mode ${process.env.DEV_MODE} at ${PORT}`);
});
