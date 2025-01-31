import * as path from "path";
import fs from "fs";
import express from "express";
import https from "https";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import fetch from "node-fetch";

const rootDir = process.cwd();
const port = 3000;
const app = express();

const opt = {
  key: fs.readFileSync('certs/server.key'),
  cert: fs.readFileSync('certs/server.cert')};

https.createServer(opt, app)
    .listen(port, function () {})

app.use(express.static('spa/build'))


app.post("/api/:username", (req, res) => {
  //if (req.cookies.user !== undefined)
    client.push(req.params.username);
    res.send(req.params.username);
});

app.get("/api/:username", (req, res) => {
  res.send(client[client.length-1]);
});


app.get("/client.mjs", (_, res) => {
  res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
  res.sendFile(path.join(rootDir, "client.mjs"), {
    maxAge: -1,
    cacheControl: false,
  });
});


app.get("/*", (_, res) => {
  res.sendFile(path.join(rootDir, "spa/build/index.html"));
})

app.get("/", (_, res) => {
  res.send(":)");
});

/*
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});*/

let client = {};