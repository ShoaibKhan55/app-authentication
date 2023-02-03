const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Heyyyy");
  console.log("Running");
});


app.listen(port);