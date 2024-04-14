import * as fs from "node:fs";
import * as readline from "node:readline";
import { stdin as input, stdout as output } from "node:process";

const rl = readline.createInterface({ input, output });

const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

const filePath = "./data/contacts.json";
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, "[]", "utf-8");
}

export const tanya = (pertanyaan) => {
  return new Promise((resolve, reject) => {
    rl.question(pertanyaan, (data) => {
      resolve(data);
    });
  });
};

export const simpanKontak = (nama, surel, noTelp) => {
  const contact = { nama, surel, noTelp };
  const file = fs.readFileSync("data/contacts.json", "utf-8");
  const contacts = JSON.parse(file);
  contacts.push(contact);
  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts), "utf-8");
  console.log("Data sudah dicatat, terima kasih!");
  rl.close();
}
