import React from "react";
import OrderCards from "../components/OrderCards";

const OrdersScreen = () => {
  const orderData = JSON.parse(localStorage.getItem("orderData")) || [];

  return (
    <div className="p-2">
      <h1 className="text-3xl font-bold text-black">Orders</h1>
      {orderData &&
        orderData.map((item) => (
          <OrderCards
            image={item.image}
            name={item.name}
            price={item.price}
            quantity={item.quantity}
            deliveryTime={45112557484}
          />
        ))}
    </div>
  );
};

export default OrdersScreen;
