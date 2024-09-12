import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { ThemeProvider } from "@material-tailwind/react";
import App from "./apps/App";
import { Provider } from "react-redux";
import { store } from "./apps/store";
import { AuthProvider } from "react-auth-kit"

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <AuthProvider
          authType = {"cookie"}
          authName = {"_auth"}
          cookieDomain = {window.location.hostname}
          cookieSecure ={false}
        >
          <App />
        </AuthProvider>
      </Provider>
    </ThemeProvider>
  // </React.StrictMode>
);

