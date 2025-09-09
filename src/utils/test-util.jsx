import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { ThemeProvider } from "@material-tailwind/react";
import { Provider } from "react-redux";
import { store } from "../store";
const AllTheProviders = ({ children }) => {
  return (
    <ThemeProvider theme="light">
      <Provider store={store}>{children}</Provider>
    </ThemeProvider>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
