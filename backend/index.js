const express = require("express");
const IncomingForm = require('formidable').IncomingForm
const cors = require("cors");
const fs = require('fs');

const app = express();

app.use(cors({
  origin: '*',
  optionsSuccessStatus: 200,
}));

app.post("/upload", (req, res) => {
  var form = new IncomingForm();

  form.on('file', (field, file) => {
    const directoryItems = fs.readdirSync(`${__dirname}/upload`);
    const name = validateFileName(file.name, directoryItems);
    fs.renameSync(file.path, `${__dirname}/upload/${name}`);
  });
  form.on('end', () => {
    res.json()
  });
  form.parse(req);
});

app.listen(3001, () => {
  console.info("Server up and running");
});

function validateFileName(name, directoryItems) {
  if (directoryItems.indexOf(name) >= 0) {
    const nameComponents = name.split(".");
    name = nameComponents.slice(0, nameComponents.length - 1).join(".");
    name += "(1).";
    name += nameComponents[nameComponents.length - 1];
    return validateFileName(name, directoryItems);
  }
  return name;
}