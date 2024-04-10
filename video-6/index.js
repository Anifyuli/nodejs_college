/* Urutan penulisan modules di NodeJS
  1. Core modules
  2. Local modules
  3. 3rd party modules
*/
const coba = require('./coba');
console.log(
  coba.cetakNama("Anif"), 
  coba.PI, 
  coba.mahasiswa.cetakMhs(), 
  new coba.Orang()
);