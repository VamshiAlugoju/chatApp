import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import ModalDialog from "@mui/joy/ModalDialog";

declare module "@mui/joy/ModalDialog" {
  interface ModalDialogPropsLayoutOverrides {
    top: true;
  }
}
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
