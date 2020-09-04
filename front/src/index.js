import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import MainPage from "./pages/main";

const App = () => {
  return (
    <div className="App">
      <MainPage></MainPage>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
