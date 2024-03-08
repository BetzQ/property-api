### 1. Login

- **URL**: `POST /login`
- **Request Body**:
  - `username`: Username pengguna
  - `password`: Password pengguna
- **Response**:
  - `200 OK`: Berhasil login dengan token JWT.
    ```json
    {
      "token": "<Token JWT>"
    }
    ```

### 2. Tambah Produk

- **URL**: `POST /add-product`
- **Header**:
  - `Authorization`: Token JWT untuk otentikasi
- **Request Body**:
  - `product_name`: Nama produk
  - `price`: Harga produk
  - `description`: Deskripsi produk
  - `image`: File gambar produk (form-data)
- **Response**:
  - `200 OK`: Produk berhasil ditambahkan.
    ```json
    {
      "message": "Product added successfully"
    }
    ```

### 3. Update Produk

- **URL**: `PUT /update-product/:id`
- **Header**:
  - `Authorization`: Token JWT untuk otentikasi
- **Request Body**:
  - `product_name`: Nama produk (opsional)
  - `price`: Harga produk (opsional)
  - `description`: Deskripsi produk (opsional)
  - `image`: File gambar produk (opsional, form-data)
- **Response**:
  - `200 OK`: Produk berhasil diperbarui.
    ```json
    {
      "message": "Product updated successfully"
    }
    ```

### 4. Hapus Produk

- **URL**: `DELETE /delete-product/:id`
- **Header**:
  - `Authorization`: Token JWT untuk otentikasi
- **Response**:
  - `200 OK`: Produk berhasil dihapus.
    ```json
    {
      "message": "Product deleted successfully"
    }
    ```
