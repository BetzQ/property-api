const express = require("express");
const jwt = require("jsonwebtoken");
const db = require("../db"); // Import file koneksi database

const router = express.Router();
const secretKey = "$x3myproperty3x$"; // Ganti dengan kunci rahasia Anda

// Route untuk melakukan login
router.post("/login", (req, res) => {
  // Ambil data username dan password dari body request
  const { username, password } = req.body;

  // Query ke database untuk mencari user dengan username dan password yang sesuai
  const query = `SELECT * FROM users WHERE username = ? AND password = ?`;
  db.query(query, [username, password], (err, results) => {
    if (err) {
      res.status(500).json({ error: "Internal server error" });
    } else {
      if (results.length > 0) {
        const user = results[0];
        // Buat token JWT
        jwt.sign(
          { user: user.id },
          secretKey,
          { expiresIn: "24h" },
          (err, token) => {
            if (err) {
              res.status(500).json({ error: "Internal server error" });
            } else {
              res.status(200).json({ token });
            }
          }
        );
      } else {
        res.status(401).json({ error: "Invalid username or password" });
      }
    }
  });
});

module.exports = router;
