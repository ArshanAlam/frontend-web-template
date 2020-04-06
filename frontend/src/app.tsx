import * as React from "react";
import * as ReactDOM from "react-dom";
import { H1 } from "@blueprintjs/core";
import * as api from "api";

import "../style/index.scss";

ReactDOM.render(
  <div className="appContainer">
    <H1>Hello World!!!</H1>
  </div>,
  document.body
);

console.log(api);
console.log("Hello World!");
