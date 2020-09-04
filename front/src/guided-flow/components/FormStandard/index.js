import React from "react";

const FormStandard = ({ header, fields, onSubmit }) => {
  const [state, setState] = React.useState({});
  return (
    <div>
      <h3>{header}</h3>
      {fields.map(({ name, type }) => {
        return (
          <div key={name}>
            {name}:
            <input
              style={{
                display: "block",
                fontSize: 30,
              }}
              type={type}
              name={name}
              value={state[name] || ""}
              placeholder={"type " + name}
              onChange={({ target }) => {
                setState({
                  ...state,
                  [name]: target.value,
                });
              }}
            ></input>
          </div>
        );
      })}

      <button
        style={{
          marginTop: 20,
          fontSize: 30,
        }}
        onClick={() => {
          onSubmit(state);
        }}
      >
        Submit
      </button>
    </div>
  );
};

export default FormStandard;
