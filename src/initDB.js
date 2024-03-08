const mysql = require("mysql");

// Konfigurasi koneksi ke database MySQL
const connection = mysql.createConnection({
  host: "localhost",
  user: "root", // Sesuaikan dengan username MySQL Anda
  password: "", // Sesuaikan dengan password MySQL Anda
});

// Membuat koneksi ke database
connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL server!");

  // Membuat database my_property jika belum ada
  connection.query(
    "CREATE DATABASE IF NOT EXISTS my_property",
    (err, result) => {
      if (err) throw err;
      console.log("Database my_property has been created or already exists.");

      // Menggunakan database my_property
      connection.query("USE my_property", (err, result) => {
        if (err) throw err;
        console.log("Using database my_property.");

        // Membuat tabel 'user' jika belum ada
        const createUserTable = `CREATE TABLE IF NOT EXISTS users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          username VARCHAR(255) NOT NULL,
          password VARCHAR(255) NOT NULL
        )`;

        connection.query(createUserTable, (err, result) => {
          if (err) throw err;
          console.log("Table users has been created or already exists.");

          // Add admin user if not exists
          const insertAdmin = `INSERT INTO users (username, password) VALUES ('admin', 'admingo123')`;
          connection.query(insertAdmin, (err, result) => {
            if (err) throw err;
            console.log("Admin user has been added.");

            // Menutup koneksi setelah selesai
            connection.end();
          });
        });

        // Membuat tabel 'products' jika belum ada
        const createProductsTable = `CREATE TABLE IF NOT EXISTS products (
          id INT AUTO_INCREMENT PRIMARY KEY,
          image VARCHAR(255) NOT NULL,
          product_name VARCHAR(255) NOT NULL,
          price FLOAT NOT NULL,
          description TEXT
        )`;

        connection.query(createProductsTable, (err, result) => {
          if (err) throw err;
          console.log("Table products has been created or already exists.");
        });
      });
    }
  );
});
