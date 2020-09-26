import React from "react";
import ReactDOM from "react-dom";
import InputNumber from "./components/input-number/input-number.jsx";


ReactDOM.render(
    <InputNumber
      defaultValue = {2}
      minValue = {0}
      maxValue = {100}
      onChangeValue = {(value) => {
        // eslint-disable-next-line
        console.log(value);
      }}
    />,
    document.querySelector(`#root`)
);
