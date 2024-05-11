import express from "express";
import expressEjsLayouts from "express-ejs-layouts";
import { body, validationResult } from "express-validator";
import session from "express-session";
import cookieParser from "cookie-parser";
import flash from "connect-flash";

import {
  loadContacts,
  findContact,
  addContact,
  checkDuplicity,
} from "./utils/contacts.js";

const app = express();
const port = 3000;

// Gunakan EJS untuk view engine
app.set("view engine", "ejs");

// 3rd-party middleware, expressEjsLayout dan morgan
app.use(expressEjsLayouts);

// Built-in middleware untuk ekspos fail yang dimiliki
app.use(express.static("public"));

// Midleware untuk data parsing
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
  res.render("about", { title: "About", layout: "partials/main" });
});

app.get("/contact", (req, res) => {
  const contacts = loadContacts();
  res.render("contact", {
    title: "Contact",
    layout: "partials/main",
    contacts,
    msg: req.flash("msg"),
  });
});

app.get("/add-contact", (req, res) => {
  res.render("add-contact", {
    title: "Add new contact",
    layout: "partials/main",
  });
});

app.post(
  "/contact/add-contact",
  [
    body("name").custom((value) => {
      const duplicated = checkDuplicity(value);
      if (duplicated) {
        throw new Error("Name already saved!");
      }
      return true;
    }),
    body("email", "Email is invalid").isEmail(),
    body("phoneNumber", "Phone number is invalid").isMobilePhone("id-ID"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("add-contact", {
        title: "Add new contact",
        layout: "partials/main",
        errors: errors.array(),
      });
    } else {
      addContact(req.body);
      req.flash("msg", "Contact saved successfully!");
      res.redirect("/contact");
    }
  }
);

app.delete("/contact/delete/:id", (req, res) => {
  const contact = findContact(req.params.id);
  if (!contact) {
    res.status(404);
    res.send("<h1> Error 404 : Contact not found </h1>");
  } else {
    res.send("Ok");
  }
});

app.get("/contact/:id", (req, res) => {
  const contact = findContact(req.params.id);
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
  console.log(`Run app listening at http://localhost:${port}`);
});
