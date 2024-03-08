const express = require("express");
const router = express.Router();
const { upload, verifyToken } = require("../middlewares/middlewares");
const fs = require("fs");
const db = require("../db");

const uploadDir = "./uploads";

// Route untuk update produk
router.put(
  "/update-product/:id",
  verifyToken,
  upload.single("image"),
  (req, res) => {
    const productId = req.params.id;
    const { product_name, price, description } = req.body;
    let image = req.file ? req.file.filename : null; // Menggunakan foto baru jika diunggah, jika tidak, gunakan null

    // Perbarui hanya atribut yang dikirim oleh pengguna
    let updateFields = [];
    let updateValues = [];

    if (product_name) {
      updateFields.push("product_name = ?");
      updateValues.push(product_name);
    }

    if (price) {
      updateFields.push("price = ?");
      updateValues.push(parseFloat(price));
    }

    if (description) {
      updateFields.push("description = ?");
      updateValues.push(description);
    }

    if (image) {
      // Hapus foto lama jika ada
      db.query(
        "SELECT image FROM products WHERE id = ?",
        [productId],
        (err, result) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: "Failed to update product" });
          }
          const oldImage = result[0].image;
          console.log(oldImage);
          if (oldImage) {
            fs.unlinkSync(uploadDir + "/" + oldImage);
          }
        }
      );

      updateFields.push("image = ?");
      updateValues.push(image);
    }

    // Persiapkan query untuk update
    const updateQuery = `UPDATE products SET ${updateFields.join(
      ", "
    )} WHERE id = ?`;

    updateValues.push(productId);

    // Eksekusi query untuk update
    db.query(updateQuery, updateValues, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to update product" });
      }
      res.status(200).json({ message: "Product updated successfully" });
    });
  }
);

module.exports = router;
