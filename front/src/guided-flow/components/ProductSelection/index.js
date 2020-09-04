import React from "react";

const ProductSelection = ({ header, products, onSubmit }) => {
  const [state, setState] = React.useState([]);

  return (
    <div>
      <h3>{header}</h3>

      {products.map(({ name, id }) => {
        const isSelected = state.indexOf(id) !== -1;
        return (
          <div
            key={id}
            style={{
              margin: 20,
              padding: 20,
              border: "1px solid green",
              background: isSelected ? "lightgreen" : null,
              cursor: "pointer",
            }}
            onClick={() => {
              if (isSelected) {
                setState(state.filter((e) => e !== id));
              } else {
                setState([...state, id]);
              }
            }}
          >
            <div>Product name: {name}</div>
            <div>Product id: {id}</div>
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

export default ProductSelection;
