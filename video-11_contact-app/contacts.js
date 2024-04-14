import * as fs from "node:fs";
// chalk untuk mewarnai teks pada konsol
import chalk from "chalk";
// validator untuk validasi format surel
import validator from "validator";

// Definisi dan fungsi untuk membuat direktori "data" jika belum ditemukan
const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

// Definisi nama file untuk menyimpan data bernama "contacts.json", membuat, dan mengisinya dengan indikator array JSON (tanda kurung siku) setelah file dibuat
const filePath = "./data/contacts.json";
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, "[]", "utf-8");
}

// Kumpulan fungsi untuk mengolah kontak
export const simpanKontak = (nama, surel, noTelp) => {
  // Mengubah data yang diterima menjadi objek
  const contact = { nama, surel, noTelp };

  // Fungsi untuk menulis data ke file contacts.json
  const file = fs.readFileSync("data/contacts.json", "utf-8");

  // Mengurai data dari contacts.json
  const contacts = JSON.parse(file);

  // Permisalan untuk memastikan duplikasi data yang akan dimasukkan
  const duplikat = contacts.find((contact) => contact.nama === nama);
  if (duplikat) {
    console.log(
      chalk.redBright.bold("Kontak sudah terdaftar, masukkan data lain")
    );
    return false;
  }

  // Pengecekan format surel yang dimasukkan valid atau sebaliknya
  if (surel) {
    if (!validator.isEmail(surel)) {
      console.log(chalk.redBright.bold.inverse("Alamat surel tidak valid"));
      return false;
    }
  }

    // Pengecekan nomor telepon yang dimasukkan valid atau sebaliknya
    if (noTelp) {
      if (!validator.isMobilePhone(noTelp, "id-ID")) {
        console.log(chalk.redBright.bold.inverse("Nomor telepon tidak valid"));
        return false;
      }
    }

  // Simpan data yang ditambahkan ke contacts.json
  contacts.push(contact);
  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts), "utf-8");

  // Output konsol konfirmasi data telah berhasil disimpan
  console.log(chalk.green.bold.inverse("Data sudah dicatat, terima kasih!"));
};
