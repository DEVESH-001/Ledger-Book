const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

//boilerPlate
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));
const methodOverride = require("method-override");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// app.get("/", (req, res) => {
//   fs.readdir(`./files`, function (err, files) {
//     if(err) return res.status(500).send(err);
//     res.render("index", { files:files });
//   });
// });
// app.listen(3000);

// this is a dummy data

let records = [
  { id: 1, date: "2024-12-04", description: "Sample content for the record" },
  // Add more records as needed
];

// Home route
app.get("/", (req, res) => {
  res.render("index");
});

// Route to show all records
app.get("/records", (req, res) => {
  res.render("records", { records });
});

// Route to create a new record
app.get("/records/new", (req, res) => {
  res.render("newRecord");
});

app.post("/records", (req, res) => {
  const newRecord = {
    id: records.length + 1,
    date: req.body.date,
    description: req.body.description,
  };
  records.push(newRecord);
  res.redirect("/records");
});

// Route to edit a record
app.get("/records/:id/edit", (req, res) => {
  const record = records.find((r) => r.id === parseInt(req.params.id));
  res.render("editRecord", { record });
});

app.put("/records/:id", (req, res) => {
  const record = records.find((r) => r.id === parseInt(req.params.id));
  record.date = req.body.date;
  record.description = req.body.description;
  res.redirect("/records");
});

// Route to delete a record
app.delete("/records/:id", (req, res) => {
  records = records.filter((r) => r.id !== parseInt(req.params.id));
  res.redirect("/records");
});
app.listen(3000);

// app.get("/", (req, res) => {
//   fs.readdir(`./files`, function (err, files) {
//     res.render("index", { files }); //passing files to index.ejs, files is array
//   });
// });
// app.get("/edit/:filename", (req, res) => {
//   fs.readFile(`./files/${req.params.filename}`, "utf8", function (err, data) {
//     if (err) return res.send(err);
//     res.render("edit", { data, filename: req.params.filename });
//   });
// });

// app.post("/update/:filename", (req, res) => {
//   fs.writeFile(
//     `./files/${req.params.filename}`,
//     req.body.filedata,
//     function (err) {
//       if (err) return res.send(err);
//       res.redirect("/");
//     }
//   );
// });

// app.get("/delete/:filename", (req, res) => {
//   fs.unlink(`./files/${req.params.filename}`, function (err) {
//     if (err) return res.send(err);
//     res.redirect("/");
//   });
// });
//js fn to get day/month/year
// app.get("/create", (req, res) => {
//   let currentDate = new Date();
//   // Extract day, month, and year
//   let day = currentDate.getDate();
//   let month = currentDate.getMonth() + 1; // Month is zero-indexed, so we add 1
//   let year = currentDate.getFullYear();

//   const fn = `${day}-${month}-${year}.txt`;
//   fs.writeFile(`./files/${fn}`, "MB PROTEIN", function (err) {
//     if (err) return res.send("Error in creating file");
//     else res.send("File Created");
//   });
// });
