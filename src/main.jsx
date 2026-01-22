import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import { StoryProvider } from "./context/StoryContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <StoryProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </StoryProvider>
  </StrictMode>,
);
