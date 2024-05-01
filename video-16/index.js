import express from "express";
import expressEjsLayouts from "express-ejs-layouts";
import morgan from "morgan";
const app = express();
const port = 3000;

// Gunakan EJS untuk view engine
app.set("view engine", "ejs");

// 3rd-party middleware, expressEjsLayout dan morgan
app.use(expressEjsLayouts);
app.use(morgan('dev'));

// Built-in middleware untuk ekspos fail yang dimiliki
app.use(express.static('public'));

app.get("/", (req, res) => {
  res.render("index", { nama: "Anif", title: "Beranda", layout: "partials/main" });
});

app.get("/about", (req, res) => {
  res.render("about", {title: "About", layout: "partials/main" });
});

app.get("/contact", (req, res) => {
  const mahasiswa = [
    {
      nama: "Moh. Anif Yuliansyah",
      email: "anif@mail.com",
    },
    {
      nama: "Budi",
      email: "budibud@outlook.com",
    },
    {
      nama: "Cecilia Fitriana",
      email: "cecilimut@gmail.com",
    },
  ];
  res.render("contact", {
    title: "Contact",
    layout: "partials/main",
    mahasiswa,
  });
});

app.get("/product/:id", (req, res) => {
  res.send(
    `Product ID : ${req.params.id}, <br> Category ID : ${req.query.category}`
  );
});

app.use("/", (req, res) => {
  res.status(404);
  res.send("Error 404 : Page not found");
});

app.listen(port, () => {
  console.log(`Run app listening at http://localhost:${port}`);
});
