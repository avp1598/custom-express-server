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

const partical_client = "YOUR_PARTICAL_CLIENT_URL";

app.get("/profile", async (req, res) => {
  const client = new Client(partical_client);
  const user = await client.isAuthenticated(req);
  console.log({ user });
  res.json({ user });
});

app.get("/", async (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
