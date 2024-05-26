import { MongoClient, ObjectId } from "mongodb";

const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);
const dbname = "ujicoba";

const db = client.db(dbname);
const mahasiswa = db.collection("mahasiswa");

// Fungsi tes koneksi ke MongoDB
async function run() {
  try {
    await client.connect();
    console.log("Connected successfully to MongoDB server");
  } catch (err) {
    console.error("Error connecting to MongoDB server:", err);
  }
}

// Fungsi menambah data tunggal
async function addSingleData() {
  const mahasiswa = db.collection("mahasiswa");
  try {
    const query = { nama: "Ida Kartika Sari", surel: "idakartika@gmail.com" };
    const result = await mahasiswa.insertOne(query);
    console.log("Add data successfully.", result);
  } catch (err) {
    console.log("Data unsaved.", err);
  }
}

// Fungsi menambah banyak data
async function addMultiData() {
  try {
    const query = [
      { nama: "Lindayani", surel: "lindayani@yahoo.com" },
      { nama: "Maman Supratman", surel: "mamansupratman@outlook.com" },
    ];
    const result = await mahasiswa.insertMany(query);
    console.log("Add multiple data successfully.", result);
  } catch (err) {
    console.log("Data unsaved.", err);
  }
}

// Fungsi menampilkan data
function showData() {
  db.collection("mahasiswa")
    .find()
    .toArray()
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.error(err);
    });
}

// Fungsi menampilkan data spesifik
function showSpesificData() {
  db.collection("mahasiswa")
    .find({ nama: "Juanda Singh" })
    .toArray()
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.error(err);
    });
}

// Fungsi ubah data
async function changeData() {
  try {
    const query = { _id: new ObjectId("6646d158d6cda887975f9e82") };
    const options = { upsert: true };
    const updateDoc = {
      $set: { surel: "gugungunasih@gmail.com" },
    };
    const result = await mahasiswa.updateOne(query, updateDoc, options);
    console.log(
      `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`
    );
  } catch (error) {
    console.log(error);
  }
}

// Fungsi menghapus banyak data
async function changeMultiData() {
  try {
    const query = {
      nama: "Maman Supratman",
    };

    const options = { upsert: true };
    const updateDoc = {
      $set: {
        nama: "Maman Supriatna",
      },
    };

    const result = await mahasiswa.updateMany(query, updateDoc, options);
    console.log(
      `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`
    );
  } catch (error) {
    console.log(error);
  }
}

// Menghapus data tunggal
async function deleteData() {
  try {
    const query = { nama: "Moh. Anif Yuliansyah" };
    const result = await db.collection("mahasiswa").deleteOne(query);

    if (result.deletedCount === 1) {
      console.log("Successfully deleted 1 document.");
    } else {
      console.log("No documents matched the query. Deleted 0 documents.");
    }
  } catch (error) {
    console.log(error);
  }
}

// Menghapus banyak data
async function deleteMultiData() {
  try {
    const query = { nama: "Maman Supriatna" };
    const result = await db.collection("mahasiswa").deleteMany(query);

    if (result) {
      console.log(`${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`);
    } else {
      console.log("No documents matched the query. Deleted 0 documents.");
    }
  } catch (error) {
    console.log(error);
  }
}

// Pemanggilan fungsi
// Fungsi tes koneksi
run().catch(console.dir);

// Menambah data tunggal
// addSingleData();

// Menambah banyak data
// addMultiData();

// Menampilkan semua data
//showData();

// Menampilkan data spesifik
//showSpesificData();

// Ubah data
// changeData();

// Ubah banyak data
// changeMultiData();

// Hapus data tunggal
// deleteData();

// Hapus banyak data
deleteMultiData();