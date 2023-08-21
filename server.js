const os = require("os");
const path = require("path");
const math = require("./math");

console.log(os.type());
console.log(os.version());
console.log(os.homedir());
console.log(os.hostname());
console.log("path.dirname(__filename)", path.dirname(__filename));
console.log('path.basename("__filename")', path.basename(__filename));
console.log('path.extname("__filename")', path.extname(__filename));
console.log("path.parse(__filename)", path.parse(__filename));
console.log("__dirname", __dirname);
console.log("__filename", __filename);
console.log("math.Add(2,3)", math.Add(2, 3));
