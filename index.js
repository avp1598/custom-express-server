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

const partical_client = "https://shared.partical.xyz/server1";

app.get("/", async (req, res) => {
  res.send("Hello World!");
});

app.post("/insertEncrypted", async (req, res) => {
  const client = new Client("https://shared.partical.xyz/server1");
  // encrypt all fields
  const encrypted = Object.keys(req.body.data).map((key) => {
    return {
      [key]: cryptr.encrypt(req.body.data[key]),
    };
  });
  const payload = {
    ...req.body,
    data: Object.assign({}, ...encrypted),
  };
  const data = await client.createDB(req, "page", payload);
  console.log(data.data);
  res.send(data.data);
});

app.get("/getEncrypted/:pageId", async (req, res) => {
  const client = new Client("https://shared.partical.xyz/server1");
  const result = await client.getDB(req, "page", req.params.pageId);
  const decrypted = Object.keys(result.data).map((key) => {
    try {
      return {
        [key]: cryptr.decrypt(result.data[key]),
      };
    } catch (e) {
      return {
        [key]: result.data[key],
      };
    }
  });
  const data = Object.assign({}, ...decrypted);
  res.send(data);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
