import ReactDOM from "react-dom/client";
import "./index.css";

import { ThemeProvider } from "@material-tailwind/react";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "@/store";
import { AuthProvider } from "react-auth-kit"
import React from "react";
import { Toaster } from "@/components/ui/sonner";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <AuthProvider
          authType={"cookie"}
          authName={"_auth"}
          cookieDomain={window.location.hostname}
          cookieSecure={false}
        >
          <App />
          <Toaster />
        </AuthProvider>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);

