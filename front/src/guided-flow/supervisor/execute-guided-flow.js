import React from "react";
import useRequest from "../../hooks/useRequest";
import * as Components from "../components";

const ExecuteGuidedFlow = ({ name, quitFlow }) => {
  const [apiPayloads, setApiPayloads] = React.useState({});
  const [stepsStates, setStepsState] = React.useState({});

  const { data } = useRequest(
    "http://localhost:3001/get-next-guided-step",
    {},
    {
      method: "POST",
      body: JSON.stringify({
        stepsStates,
        guidedFlowName: name,
        apiPayloads,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    },
    [Object.keys(stepsStates).join("")] // we ask for new guided step when stepsStates change
  );

  const guidedFlowData = data || {};

  const { availableSteps, hasCompletedSteps, nextGuidedStep } = guidedFlowData;

  React.useEffect(() => {
    setApiPayloads(guidedFlowData.apiPayloads);
  }, [Object.keys(guidedFlowData.apiPayloads || {}).join("")]);

  if (!availableSteps) return "loading";

  if (hasCompletedSteps) {
    return (
      <Wrapper>
        CONGRATS, THE FLOW HAS BEEN COMPLETED.
        <div>
          <button style={{ fontSize: 30 }} onClick={quitFlow}>
            Quit this flow
          </button>
        </div>
      </Wrapper>
    );
  }

  const stepName = nextGuidedStep.name;

  const { component, componentProps } = nextGuidedStep;
  const StepComponent = Components[component];

  const onSubmitStep = async (stepState) => {
    const updatedStepsState = {
      ...stepsStates,
      [stepName]: stepState,
    };

    setStepsState(updatedStepsState);
  };

  return (
    <div>
      <Wrapper>
        <h4>
          Step {nextGuidedStep.stepCount + 1} / {availableSteps.length}, Step
          Name: "{stepName}", Component: "{component}"
        </h4>

        {StepComponent && (
          <StepComponent
            key={stepName}
            {...componentProps}
            onSubmit={onSubmitStep}
          />
        )}
      </Wrapper>

      <div style={{ marginTop: 30 }}>
        stepsStates:
        <pre style={{ width: 500 }}>{JSON.stringify(stepsStates, null, 2)}</pre>
      </div>
      <div style={{ marginTop: 30 }}>
        GuidedFlowData:
        <pre style={{ width: 500 }}>
          {JSON.stringify(guidedFlowData, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default ExecuteGuidedFlow;

const Wrapper = ({ children }) => {
  return (
    <div style={{ margin: "30 0 30 0", border: "1px solid blue", padding: 30 }}>
      {children}
    </div>
  );
};
