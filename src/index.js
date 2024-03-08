const express = require("express");
const bodyParser = require("body-parser");
const loginRouter = require("./login/login");
const addProductRouter = require("./product/add-product");
const updateProductRouter = require("./product/update-product");
const deleteProductRouter = require("./product/delete-product");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());

app.use(loginRouter);
app.use(addProductRouter);
app.use(updateProductRouter);
app.use(deleteProductRouter);

app.use((req, res, next) => {
  res.status(404).json({ error: "Not found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
