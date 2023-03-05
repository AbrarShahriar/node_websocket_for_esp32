const express = require("express");
const cors = require("cors");

const PORT = process.env.PORT || 4001;

const app = express();
app.use(cors());
app.use(express.json());

let ledState = false;

app.get("/", (req, res) => {
  res.status(200).json({ ledState });
});

app.get("/toggle", (req, res) => {
  console.log(req.body);
  ledState = req.body.ledState;

  res.status(200).json({ ledState: req.body.ledState });
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
