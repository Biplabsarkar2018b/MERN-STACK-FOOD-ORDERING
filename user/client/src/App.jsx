import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import Layout from "./commons/Layout";
import OrdersScreen from "./screens/OrdersScreen";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/orders" element={<OrdersScreen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
