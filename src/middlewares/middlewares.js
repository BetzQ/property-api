const jwt = require("jsonwebtoken");
const multer = require("multer");

const secretKey = "$x3myproperty3x$";
const uploadDir = "./uploads";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

function verifyToken(req, res, next) {
  const token = req.headers["authorization"];

  if (typeof token !== "undefined") {
    jwt.verify(token, secretKey, (err, authData) => {
      if (err) {
        res.status(403).json({ error: "Forbidden" });
      } else {
        req.authData = authData;
        next();
      }
    });
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
}

module.exports = { upload, verifyToken };
