const { logEvents } = require("./logEvents");

const errorHandler = (err, _req, res, _next) => {
  logEvents(`${err.name}: ${err.message}`, "errLog.txt");
  res.status(500).send(err.message);
};

module.exports = errorHandler;
