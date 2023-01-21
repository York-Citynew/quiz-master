import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import store, { persistor } from "./utils/store/store";
import { PersistGate } from "redux-persist/integration/react";
ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode> temporary disabled strict mode because of useEffect malfunctioning
  <Provider store={store}>
    <PersistGate
      loading={null}
      persistor={persistor}
    >
      <App />
    </PersistGate>
  </Provider>
  // </React.StrictMode>
);
