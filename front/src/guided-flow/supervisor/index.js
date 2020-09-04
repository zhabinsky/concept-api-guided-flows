import React from "react";
import useAvailableFlows from "../../hooks/useAvailableFlows";
import ExecuteGuidedFlow from "./execute-guided-flow";

const GuidedFlowSupervisor = () => {
  const availableFlows = useAvailableFlows();
  const [selectedFlow, setSelectedFlow] = React.useState(null);

  const quitFlow = () => {
    setSelectedFlow(null);
  };

  return (
    <div style={{ border: "1px solid gray", padding: 40, marginBottom: 20 }}>
      <h2>
        {selectedFlow
          ? `Selected guided flow: ${selectedFlow}`
          : "Choose guided flow to execute."}
      </h2>

      {/* guided flow selector */}
      {availableFlows.map((guidedFlowName) => {
        return (
          <span
            key={guidedFlowName}
            style={{
              padding: 10,
              margin: "0 10px 10px 0",
              border: "1px solid lightgray",
              background: selectedFlow === guidedFlowName ? "orange" : null,
            }}
            onClick={() => {
              if (!selectedFlow) {
                setSelectedFlow(guidedFlowName);
              }
            }}
          >
            {guidedFlowName}
          </span>
        );
      })}

      <div
        style={{
          marginTop: 30,
        }}
      >
        {selectedFlow && (
          <ExecuteGuidedFlow name={selectedFlow} quitFlow={quitFlow} />
        )}
      </div>
    </div>
  );
};

export default GuidedFlowSupervisor;
