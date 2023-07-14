import React from "react";

const OrderCards = ({ name, image, price, quantity, deliveryTime }) => {
  const calculateRemainingTime = (deliveryTime) => {
    const currentTime = Math.floor(Date.now() / 1000);
    const remainingTime = deliveryTime - currentTime;
    const remainingMinutes = Math.floor(remainingTime / 60);
    return remainingMinutes;
  };

  const remainingTime = calculateRemainingTime(deliveryTime);

  return (
    <div className="flex items-center justify-start bg-white rounded-lg p-4 shadow-md mb-4">
      <img
        src={image}
        alt=""
        className="w-24 h-24 object-cover rounded-full mr-4"
      />
      <div>
        <h1 className="text-xl font-semibold mb-2">{name}</h1>
        <p className="text-gray-600 text-sm mb-1">Price: ${price.toFixed(2)}</p>
        <p className="text-gray-600 text-sm mb-1">Quantity: {quantity}</p>
        <div className="flex items-center mt-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M2 10a8 8 0 1 0 16 0A8 8 0 0 0 2 10zm8-6a6 6 0 1 1 0 12A6 6 0 0 1 10 4z"
              clipRule="evenodd"
            />
            <path
              fillRule="evenodd"
              d="M10 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
              clipRule="evenodd"
            />
          </svg>
          <p className="text-gray-600 text-sm">
            Delivery in: {remainingTime} minutes
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderCards;
