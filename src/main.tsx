// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const urlParams = new URLSearchParams(window.location.search);
const ref = urlParams.get("ref");
if (ref) {
  localStorage.setItem("referral_code", ref);
}

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
