const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Heyyyy");
  console.log("I'm runnning buddy Running");
});


app.listen(port);