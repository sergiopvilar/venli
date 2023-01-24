import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

window.timelineUpdate = (status) => {
  console.log(status)
}

window.onload = () => {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("root")
  );
};

