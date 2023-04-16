import express from "express";
import bodyParser from "body-parser";
import multer from "multer";

const upload = multer(); // for parsing multipart/form-data
const app = express();
const port = process.env.APP_PORT || 8080;

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.set("json tabs", 2);
app.get("/", function mainRoute(req, res) {
  const mainResponse = {
    hello: "Indonesia Belajar!",
  };
  res.json(mainResponse);
});

app.get("/helloworld", (req, res) => {
  res.send("Hello World!");
  console.log("Hello World!");
});

// app.post("/data", (req, res) => {
app.post("/data", upload.array(), (req, res, next) => {
  console.log(req.body);
  res.json(req.body);
  // console.dir(req.cookies.name);
});

app.listen(port, function () {
  console.log(`API server running on port ${port}`);
  console.log(`listening at http://localhost:${port}`);
});
