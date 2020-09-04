const guidedFlows = require("../guided-flows");

module.exports = async (req, res) => {
  res.json(guidedFlows.getFlowsByCustomer("customer_X"));
};
