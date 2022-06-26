var express = require("express");
var bodyParser = require("body-parser");
const multer = require("multer");
var cors = require("cors");
require("dotenv").config();

var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/public", express.static(process.cwd() + "/public"));

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads");
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now());
    },
});

var upload = multer({ storage: storage });

app.get("/", function (req, res) {
    res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
    const file = req.file;
    res.send({
        name: file.originalname,
        type: file.mimetype,
        size: file.size,
    });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Your app is listening on port " + port);
});
