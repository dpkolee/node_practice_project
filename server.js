const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const path = require("path");
const express = require("express");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const app = express();
const port = process.env.PORT || 3000;

// custom middleware logger
app.use(logger);

// Cors Origin Resourse Sharing
app.use(cors(corsOptions));

// built-in middleware to handle uelencoaded data
// in other words, formdata:
// content-type: application/x-www.form-urlencoaded
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

// serve static files
app.use("/", express.static(path.join(__dirname, "/public")));

app.use("/", require("./routes/root"));
app.use("/employees", require("./routes/api/employees"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
