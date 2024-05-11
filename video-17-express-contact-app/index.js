import express from "express";
import expressEjsLayouts from "express-ejs-layouts";
import { loadContacts, findContact } from './utils/contacts.js';

const app = express();
const port = 3000;

// Gunakan EJS untuk view engine
app.set("view engine", "ejs");

// 3rd-party middleware, expressEjsLayout dan morgan
app.use(expressEjsLayouts);

// Built-in middleware untuk ekspos fail yang dimiliki
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index", { nama: "Anif", title: "Beranda", layout: "partials/main" });
});

app.get("/about", (req, res) => {
  res.render("about", {title: "About", layout: "partials/main" });
});

app.get("/contact", (req, res) => {
  const contacts = loadContacts();
  res.render("contact", {
    title: "Contact",
    layout: "partials/main",
    contacts,
  });
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
