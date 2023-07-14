import React, { useState } from "react";

const OrderPopUp = ({ image, name, price,onConfirm,onCancel }) => {
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleOrderConfirm = () => {
    // console.log(image);
    onConfirm({image,price,quantity,name});
  };

  return (
    <div className=" rounded overflow-hidden bg-white shadow-lg p-3">
      <img className="w-full h-[20rem] object-cover" src={image} alt={name} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{name}</div>
        <p className="text-gray-700 text-base">Price: ${price.toFixed(2)}</p>
        <div className="flex items-center mt-4">
          <button
            onClick={decreaseQuantity}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-l"
          >
            -
          </button>
          <span className="px-4 py-2">{quantity}</span>
          <button
            onClick={increaseQuantity}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-r"
          >
            +
          </button>
        </div>
      </div>
      <div>
      <div className="px-6 pb-4">
        <button
          onClick={handleOrderConfirm}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          Order Confirm
        </button>
      </div>
      <div className="px-6 pb-4">
        <button
          onClick={onCancel}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          Cancel Order
        </button>
      </div>
      </div>
    </div>
  );
};

export default OrderPopUp;
