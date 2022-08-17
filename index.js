import express from "express";
import { Client } from "@partical/particaljs";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";

import Cryptr from "cryptr";
const cryptr = new Cryptr("myTotallySecretKey");

const app = express();
const port = 3000;
app.use(bodyParser.json({ limit: "8mb" }));
app.use(bodyParser.urlencoded({ limit: "8mb", extended: false }));
app.use(cors({ credentials: true, origin: "https://localhost:3000" }));
app.use(cookieParser());

const partical_client = "_";

app.get("/", async (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
