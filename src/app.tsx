import React from "react";
import ReactDOM from "react-dom";
import Menu from "./Menu";

const root = document.getElementById("root");

if (root) {
    ReactDOM.render(
        <React.StrictMode>
            <Menu />
        </React.StrictMode>,
        root
    );
}
