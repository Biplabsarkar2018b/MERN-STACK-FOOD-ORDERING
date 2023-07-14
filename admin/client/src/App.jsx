import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./commons/Layout";
import HomeScreen from "./screens/HomeScreen";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<HomeScreen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
