const GuidedFlow = require("../utils/GuidedFlow");
const onCollectCreditCardData = require("./handlers/on-collect-credit-card-data");
const onCollectUserData = require("./handlers/on-collect-user-data");

class GuidedFlowOrderDevices extends GuidedFlow {
  constructor() {
    super("guided-flow-order-devices");

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

    /** Step 2, Collect use name and surname */
    this.addStep({
      name: "collect-products-choice",
      component: "ProductSelection",
      componentProps: {
        header: "Please select products that you like:",
        products: [
          {
            name: "Product 1",
            id: "1",
          },
          {
            name: "Product 2",
            id: "2",
          },
        ],
      },
      handleStepData: onCollectUserData,
    });

    /** Step 3, Collect use name and surname */
    this.addStep({
      name: "collect-accessories-choice",
      component: "ProductSelection",
      componentProps: {
        header: "Please select products that you like:",
        products: [
          {
            name: "Accessory 1",
            id: "1_1",
          },
          {
            name: "Accesory 2",
            id: "2_2",
          },
        ],
      },
      handleStepData: onCollectUserData,
    });

    /** Step 4, Collect credit card data */
    this.addStep({
      name: "collect-credit-card-data",
      component: "FormStandard",
      componentProps: {
        header: "Provide credit card details please",
        fields: [
          {
            name: "name",
            type: "text",
          },
          {
            name: "date",
            type: "text",
          },
          {
            name: "cvv",
            type: "number",
          },
        ],
      },
      handleStepData: onCollectCreditCardData,
    });
  }
}

module.exports = GuidedFlowOrderDevices;
