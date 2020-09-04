class GuidedFlow {
  constructor(name) {
    this.name = name;

    this.stepCount = 0;
    this.steps = [];
    this.accessRule = null;
  }

  setAccessRule(accessRule) {
    this.accessRule = accessRule;
  }

  isAllowedToCustomer(customer) {
    return this.accessRule === customer;
  }

  addStep({ name, component, componentProps, handleStepData }) {
    const { stepCount } = this;

    if (!name) throw Error('provide: "name"');
    if (!component) throw Error('provide: "component"');
    if (!componentProps) throw Error('provide: "component"');
    if (!handleStepData) throw Error('provide: "handleStepData"');

    this.steps.push({
      name,
      component,
      handleStepData,
      componentProps,
      stepCount,
    });

    this.stepCount++;
  }
}

module.exports = GuidedFlow;
