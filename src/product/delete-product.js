const express = require("express");
const router = express.Router();
const db = require("../db");
const { verifyToken } = require("../middlewares/middlewares");
const fs = require("fs");

const uploadDir = "./uploads";

// Route untuk menghapus produk
router.delete("/delete-product/:id", verifyToken, (req, res) => {
  const productId = req.params.id;

  // Query untuk mengambil nama file gambar produk
  db.query(
    "SELECT image FROM products WHERE id = ?",
    [productId],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to delete product" });
      }

      if (result.length === 0) {
        return res.status(404).json({ error: "Product not found" });
      }

      const image = result[0].image;

      // Hapus file gambar dari sistem file
      if (image) {
        fs.unlinkSync(uploadDir + "/" + image);
      }

      // Query untuk menghapus produk dari database
      db.query(
        "DELETE FROM products WHERE id = ?",
        [productId],
        (err, result) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: "Failed to delete product" });
          }

          res.status(200).json({ message: "Product deleted successfully" });
        }
      );
    }
  );
});

module.exports = router;
