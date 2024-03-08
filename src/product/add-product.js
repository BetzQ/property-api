const express = require("express");
const router = express.Router();
const { upload, verifyToken } = require("../middlewares/middlewares");
const fs = require("fs");
const db = require("../db");

const uploadDir = "./uploads";

// Membuat folder uploads jika belum ada
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
  console.log("Folder 'uploads' telah dibuat.");
}

// Route untuk menambahkan produk
router.post("/add-product", verifyToken, upload.single("image"), (req, res) => {
  // Cek apakah file gambar telah diunggah
  if (!req.file) {
    return res.status(400).json({ error: "No image uploaded" });
  }

  // Dapatkan data dari body request
  const { product_name, price, description } = req.body;
  const image = req.file.filename;

  const parsedPrice = parseFloat(price); // Ubah string harga menjadi tipe data float
  if (isNaN(parsedPrice)) {
    return res.status(400).json({ error: "Invalid price format" });
  }

  // Query untuk menambahkan produk ke database
  const insertProductQuery =
    "INSERT INTO products (image, product_name, price, description) VALUES (?, ?, ?, ?)";
  db.query(
    insertProductQuery,
    [image, product_name, parsedPrice, description],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to add product" });
      }
      res.status(200).json({ message: "Product added successfully" });
    }
  );
});

module.exports = router;
