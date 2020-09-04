const GuidedFlow = require("../utils/GuidedFlow");
const onCollectCreditCardData = require("./handlers/on-collect-credit-card-data");
const onCollectUserData = require("./handlers/on-collect-user-data");

class GuidedFlowChangeBilling extends GuidedFlow {
  constructor() {
    super("guided-flow-change-billing");

    /** This flow is only accesible by customer_X */
    this.setAccessRule("customer_X");

    /** Step 1, Collect use name and surname */
    this.addStep({
      name: "collect-user-data",
      component: "FormStandard",
      componentProps: {
        header: "Tell us your name",
        fields: [
          {
            name: "name",
            type: "text",
          },
          {
            name: "surname",
            type: "text",
          },
        ],
      },
      handleStepData: onCollectUserData,
    });

    /** Step 2, Collect credit card data */
    this.addStep({
      name: "collect-credit-card-data",
      component: "FormStandard",
      componentProps: {
        header: "Tell us your name",
        fields: [
          {
            name: "name",
            type: "text",
          },
          {
            name: "date",
            type: "text",
          },
        ],
      },
      handleStepData: onCollectCreditCardData,
    });
  }
}

module.exports = GuidedFlowChangeBilling;
