const fs = require("fs");
const path = require("path");

const rs = fs.createReadStream(path.join(__dirname, "files", "lorem.txt"), {
  encoding: "utf8",
});

const ws = fs.createWriteStream(path.join(__dirname, "files", "new-lorem.txt"));

// rs.on("data", (dataChunk) => {
//   ws.write(dataChunk);
// });

//More efficient way
rs.pipe(ws)

process.on("uncaughtException", (err) => {
    console.log(`There was an uncaught error: ${err}`);
    process.exit(1);
  });