const GuidedFlowChangeBilling = require("./guided-flow-change-billing");
const GuidedFlowOrderDevices = require("./guided-flow-order-devices");

class GuidedFlows {
  constructor() {
    this.guidedFlows = [
      new GuidedFlowChangeBilling(),
      new GuidedFlowOrderDevices(),
    ];
  }

  getFlowsByCustomer(customer) {
    const allowedGuidedFlows = this.guidedFlows.filter((GuidedFlow) => {
      return GuidedFlow.isAllowedToCustomer(customer);
    });

    return allowedGuidedFlows.map((GuidedFlow) => GuidedFlow.name);
  }

  getFlowByName(name) {
    return this.guidedFlows.find((GuidedFlow) => GuidedFlow.name === name);
  }
}

module.exports = new GuidedFlows();
