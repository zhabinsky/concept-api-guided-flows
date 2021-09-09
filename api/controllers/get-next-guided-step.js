const guidedFlows = require("../guided-flows");

module.exports = async (req, res) => {
  const { guidedFlowName, stepsStates = {}, apiPayloads = {} } = req.body;

  const guidedFlow = guidedFlows.getFlowByName(guidedFlowName);

  const availableSteps = guidedFlow.steps
    .map((step) => {
      const { shouldSkip } = step;

      return {
        ...step,
        skip: shouldSkip ? shouldSkip({ stepsStates, apiPayloads }) : false,
        completed: !!stepsStates[step.name],
      };
    })
    .filter((step) => !step.skip);

  for (const availableStep of availableSteps) {
    const { name, completed } = availableStep;
    const stepApiPayload = apiPayloads[name];

    if (completed && !stepApiPayload) {
      // step has been completed, but API hasn't processed it yet
      const { handleStepData } = availableStep;

      if (handleStepData) {
        // handler was specified
        const apiPayload = await handleStepData({ stepsStates, apiPayloads });

        apiPayloads[name] = apiPayload || {};
      }
    }
  }

  const nextGuidedStep = availableSteps
    .sort((step1, step2) => step1.stepCount - step2.stepCount)
    .find((step) => !step.skip && !step.completed)
    

  const hasCompletedSteps = !nextGuidedStep;

  res.json({
    apiPayloads,
    hasCompletedSteps,
    nextGuidedStep,
    availableSteps: availableSteps.map((e) => {
      return { ...e, routeName: "/meow" }
    }),
  });
};
