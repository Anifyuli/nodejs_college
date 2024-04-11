// Penggunaan core module system di NodeJS
// Filesystem module
import * as fs from "node:fs";
// Readline module
import * as readline from "node:readline";
import { stdin as input, stdout as output } from "node:process";

// Menuliskan string ke file secara sinkron
fs.writeFileSync("data/test.txt", "Hello world with synchronous method :)");

// Menuliskan string ke file secara asinkron
fs.writeFile(
  "data/text.txt",
  "Hello world with asynchronous method",
  (error) => {
    console.log(error);
  }
);

// Membaca isi file secara sinkron
const test = fs.readFileSync("data/test.txt");
console.log(test.toString());

// Membaca isi file secara asinkron
const text = fs.readFile("data/text.txt", "utf-8", (error, text) => {
  if (error) throw error;
  console.log(text);
});

// Penggunaan readline, core module untuk membaca input dari konsol
const rl = readline.createInterface({ input, output });
rl.question("Siapa penemu kernel Linux?", (nama) => {
  if (nama == "Linus Torvalds") {
    console.log("Jawaban benar");
  } else {
    console.log("Jawaban salah");
  }
  rl.close();
});
