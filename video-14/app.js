import express from "express";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.sendFile("./index.html", {root:__dirname});
});

app.get("/about", (req, res) => {
  res.sendFile("./pages/about.html", {root:__dirname});
});

app.get("/contact", (req, res) => {
  res.sendFile("./pages/contact.html", {root:__dirname});
});

app.get("/product/:id", (req, res) => {
  res.send(`Product ID : ${req.params.id}, <br> Category ID : ${req.query.category}`);
});

app.use("/", (req, res) => {
  res.status(404);
  res.send("Error 404 : Page not found");
});

app.listen(port, () => {
  console.log(`Run app listening at http://localhost:${port}`);
});
