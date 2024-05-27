// Import required libs
import express from "express";
import expressEjsLayouts from "express-ejs-layouts";
import session from "express-session";
import cookieParser from "cookie-parser";
import flash from "connect-flash";

import "./utils/dbcon.js";
import { Contact } from "./model/contact.js";

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(expressEjsLayouts);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser("secret"));
app.use(
  session({
    cookie: { maxAge: 6000 },
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

app.get("/", (req, res) => {
  res.render("index", {
    nama: "Anif",
    title: "Beranda",
    layout: "partials/main",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    layout: "partials/main",
  });
});

app.get("/contact", async (req, res) => {
  const contacts = await Contact.find();
  res.render("contact", {
    title: "Contact",
    layout: "partials/main",
    contacts,
  });
});

app.get("/contact/:id", async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  res.render("detail", {
    title: "Details",
    layout: "partials/main",
    contact,
  });
});

app.use("/", (req, res) => {
  res.status(404);
  res.send("Error 404 : Page not found");
});

app.listen(port, () => {
  console.log(
    `Contact App with MongoDB, listening at http://localhost:${port}`
  );
});
