import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import router from "./routes/FoodRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use(router)

app.get("/",(req,res)=>{
    res.status(200).json("Working Fine");
})

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("DATABASE CONNECTED");
      console.log(`SERVER RUNNING AT: ${process.env.PORT}`);
    });
  })
  .catch((error) => console.log(error));
