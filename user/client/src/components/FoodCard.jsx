import React from "react";

const FoodCard = ({ image, name, price, description ,onOrder}) => {
  return (
    <div className="max-w-sm flex border flex-col bg-white rounded-lg shadow-lg overflow-hidden mx-3">
      <div className="h-[13rem] w-full">
        <img
          className="object-cover object-top  w-full h-full"
          src={image}
          alt={name}
        />
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{name}</div>
        <p className="h-32 text-gray-700 text-base line-clamp-4">{description}</p>
      </div>
      <div className="flex justify-between">
        <div className="px-6 py-4">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
            Rs. {price}
          </span>
        </div>
        <button onClick={()=>onOrder({image,name,price,description})} className="px-6 py-4">
          <span className="inline-block text-white bg-blue-600 rounded-full px-3 py-1 text-sm font-semibold mr-2">
            Order
          </span>
        </button>
      </div>
    </div>
  );
};

export default FoodCard;
