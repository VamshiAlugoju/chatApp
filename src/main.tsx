import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import store from "./Store/store.ts";
import { Provider } from "react-redux";
import { ModalDialog } from "@mui/joy";
declare module "@mui/joy/ModalDialog" {
  interface ModalDialogPropsLayoutOverrides {
    top: true;
  }
}
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
