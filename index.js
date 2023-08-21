// const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const fileOps = async () => {
  try {
    const data = await fsPromises.readFile(
      path.join(__dirname, "files", "starter.txt"),
      "utf8"
    );
    console.log("data", data);
    await fsPromises.writeFile(
      path.join(__dirname, "files", "reply.txt"),
      data
    );
    await fsPromises.rename(
      path.join(__dirname, "files", "reply.txt"),
      path.join(__dirname, "files", "replyRenamed.txt")
    );
    const readData = await fsPromises.readFile(
      path.join(__dirname, "files", "replyRenamed.txt"),
      "utf8"
    );
    console.log("readData", readData);
  } catch (error) {
    console.log("error", error);
  }
};

fileOps();

// fs.readFile(
//   path.join(__dirname, "files", "starter.txt"),
//   "utf8",
//   (err, data) => {
//     if (err) throw err;
//     console.log("data.toString()", data);
//   }
// );

// fs.writeFile(
//   path.join(__dirname, "files", "reply.txt"),
//   "Nice to meet you",
//   (err) => {
//     if (err) throw err;
//     console.log("Write complete");
//     fs.appendFile(
//       path.join(__dirname, "files", "reply.txt"),
//       "\n\nTesting file append, hello",
//       (err) => {
//         if (err) throw err;
//         console.log("append complete");
//         fs.rename(
//             path.join(__dirname, "files", "reply.txt"),
//             path.join(__dirname, "files", "replyRenamed.txt"),
//             (err) => {
//               if (err) throw err;
//               console.log("rename complete");
//             }
//           );
//       }
//     );
//   }
// );

process.on("uncaughtException", (err) => {
  console.log(`There was an uncaught error: ${err}`);
  process.exit(1);
});
