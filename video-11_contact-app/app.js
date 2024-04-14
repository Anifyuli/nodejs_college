// yargs untuk manajemen argumen
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
// Impor contacts.js
import * as contact from "./contacts.js"

yargs(hideBin(process.argv))
  .command(
    "add",
    "Menambahkan kontak baru",
    () => {},
    (argv) => {
      contact.simpanKontak(argv.nama, argv.surel, argv.noTelp);
    }
  )
  .options({
    "nama": {
      describe: "Nama lengkap",
      demandOption: true,
      type: "string",
    },
    "surel": {
      describe: "Surel/email aktif",
      demandOption: false,
      type: "string",
    },
    "noTelp": {
      describe: "Nomor telepon",
      demandOption: true,
      type: "string" 
    }
  })
  .parse()
