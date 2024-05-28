import React from "react";
import "./App.css";
import { ThemeProvider } from "./components/provider/theme-provider";
import Layout from "./components/layout";
import { RouterProvider } from "react-router-dom";
import { router } from "./components/router";
import { CountryProvider } from "./components/provider/country-context";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <CountryProvider>
        <Layout>
          <RouterProvider router={router} />
        </Layout>
      </CountryProvider>
    </ThemeProvider>
  );
};

export default App;
