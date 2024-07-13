import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/mailRoutes.js";
import dbConnect from "./db/dbConnection.js";
dotenv.config();

const app = express();

//midleware
app.use(cors());
app.use(express.json());

//database
dbConnect();

//rest api
app.get("/", (req, res) => {
  res.send("hello i am server");
});
app.use("/api/v1", router);

//create server
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
