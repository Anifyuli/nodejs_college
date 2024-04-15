// Impor filesystem dan http
import http from "node:http";
import * as fs from "node:fs";

// Definisikan nilai port dalam sebuah variabel
const port = 3000;

// Arrow function untuk menampilkan halaman HTML sesuai dengan URL yang ditentukan
const renderHTML = (path, res) => {
  fs.readFile(path, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.write("Error: File not found");
      res.end();
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    }
  });
};

// Menjalankan modul http
http
  .createServer((req, res) => {
    // Pengalihan URL dengan switch
    const url = req.url;
    switch (url) {
      case "/about":
        renderHTML("./pages/about.html", res);
        break;
      case "/contact":
        renderHTML("./pages/contact.html", res);
        break;
      default:
        renderHTML("./index.html", res);
        break;
    }
  })
  // Listen port
  .listen(port, () => {
    console.log(`Server listening on ${port} port ...`);
  });
