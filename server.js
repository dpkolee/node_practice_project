const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const path = require("path");
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

// custom middleware logger
app.use(logger);

// Cors Origin Resourse Sharing
const whitelist = ["https://www.google.com", "http://localhost:3000"];

const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// built-in middleware to handle uelencoaded data
// in other words, formdata:
// content-type: application/x-www.form-urlencoaded
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

// serve static files
app.use(express.static(path.join(__dirname, "/public")));

const one = (req, res, next) => {
  console.log("one");
  next();
};
const two = (req, res, next) => {
  console.log("two");
  next();
};
const three = (req, res) => {
  console.log("three");
  res.send("Finished");
};

app.get("^/$|index(.html)?", (req, res) =>
  res.sendFile(path.join(__dirname, "views", "index.html"))
);

app.get("/new-page(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "new-page.html"));
});

app.get("/old-page(.html)?", (req, res) => {
  res.redirect(301, "/new-page");
});

app.get("/chain(.html)?", [one, two, three]);

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
