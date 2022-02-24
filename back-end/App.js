import express from "express";
import cors from "cors";
import expressvalidator from "express-validator";
require("dotenv").config();
import connectDB from "./src/config/db"
import { Router } from "./src/api/routes";

const host = process.env.host;
const port = process.env.port;

const app = express();

//mide
app.use(express.json());
app.use(cors())
app.use(expressvalidator());
app.use(express.urlencoded({ extended: true }));


app.use("/api/admin", Router);

app.listen(port, () => {
  console.log(`Running on http://${host}:${port}`);
});
connectDB()
