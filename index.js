import express from "express";
import { Client } from "@partical/particaljs";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const port = 3000;
app.use(bodyParser.json({ limit: "8mb" }));
app.use(bodyParser.urlencoded({ limit: "8mb", extended: false }));
app.use(cors({ credentials: true, origin: "https://localhost:3000" }));
app.use(cookieParser());

app.post("/", async (req, res) => {
  const client = new Client("https://shared.partical.xyz/server1");
  const user = await client.isAuthenticated(req);
  console.log({ user });
  // const data = await client.createDB(req, "Page", req.body);
  // console.log(data.data);
  // res.send(data.data);
  res.json({ user });
});

app.post("/create", async (req, res) => {
  const client = new Client("https://shared.partical.xyz/server1");
  const data = await client.createDB(req, "page", req.body);
  console.log(data.data);
  res.send(data.data);
});

app.get("/", async (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
