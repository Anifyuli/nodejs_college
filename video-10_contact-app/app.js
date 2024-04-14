import {tanya, simpanKontak} from "./contacts.js";

const main = async () => {
  const nama = await tanya("Masukkan nama : ");
  const surel = await tanya("Masukkan surel : ");
  const noTelp = await tanya("Masukkan no. telepon : ");

  simpanKontak(nama, surel, noTelp);
};

main();
