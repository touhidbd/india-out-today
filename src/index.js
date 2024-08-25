import React from "react";
import { createRoot } from 'react-dom/client';
import App from "./App";

import "./style.scss"

document.addEventListener("DOMContentLoaded", function () {
    const rootElement = document.getElementById("india_out_today");
    if (rootElement) {
        const root = createRoot(rootElement);
        root.render(
            <React.StrictMode>
                <App />
            </React.StrictMode>
        );
    }
});