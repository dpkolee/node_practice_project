const fs = require("fs");
const path = require("path");

if (!fs.existsSync(path.join(__dirname, "new"))) {
  fs.mkdir(path.join(__dirname, "new"), (err) => {
    if (err) throw err;
    console.log("Directory Created");
  });
}

if (fs.existsSync(path.join(__dirname, "new"))) {
  fs.rmdir(path.join(__dirname, "new"), (err) => {
    if (err) throw err;
    console.log("Directory Removed");
  });
}

process.on("uncaughtException", (err) => {
  console.log(`There was an uncaught error: ${err}`);
  process.exit(1);
});
