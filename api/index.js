const express = require("express");
const app = express();
const port = 3001;
const bodyParser = require("body-parser");

app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");

  next();
});

app.use(bodyParser.json());

/** Setup routes */
const getAvailableGuidedFlows = require("./controllers/get-available-guided-flows");
const getNextGuidedStep = require("./controllers/get-next-guided-step");

app.get("/get-available-flows", getAvailableGuidedFlows);
app.post("/get-next-guided-step", getNextGuidedStep);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
