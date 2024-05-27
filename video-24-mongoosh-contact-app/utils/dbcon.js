import mongoose from "mongoose";

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/mahasiswa");
}

// let chindi = new Contact({
//   name: "Chindi Nia Riana",
//   email: "chindiria@yahoo.com",
//   phoneNumber: "082334567100",
// });

// chindi.save().then((contact) => {
//   console.log(contact);
// });
