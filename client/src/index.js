import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Cafe from "./components/Cafe/Cafe";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<Cafe />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
