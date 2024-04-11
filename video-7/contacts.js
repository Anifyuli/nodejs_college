/*
  Praktek penggunaan core modules readline dan filesystem
*/
import * as fs from "node:fs";
import * as readline from "node:readline";
import { stdin as input, stdout as output } from "node:process";

const rl = readline.createInterface({ input, output });
rl.question("Masukkan nama lengkap : ", (nama) => {
  rl.question("Masukkan alamat surel : ",
    (surel) => {
      const contact = { nama, surel };
      const file = fs.readFileSync("data/contacts.json", "utf-8");
      const contacts = JSON.parse(file);
      contacts.push(contact);
      fs.writeFileSync("data/contacts.json", JSON.stringify(contacts), "utf-8");
      console.log("Data Anda sudah dicatat, terima kasih!");
      rl.close();
    });
});
