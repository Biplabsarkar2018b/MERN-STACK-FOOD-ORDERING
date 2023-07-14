import React from "react";

const FoodCard = ({ image, name, price, onEdit, onDelete }) => {
  return (
    <div className="max-w-sm rounded-md bg-white border border-gray-400 shadow-lg p-4">
    <img className="object-cover w-full h-[13rem] mb-4" src={image} alt={name} />
    <h1 className="text-xl text-black font-semibold mb-2">{name}</h1>
    <h1 className="text-black text-2xl font-bold mb-4">${price}</h1>
    <div className="flex justify-end">
      <button
        onClick={onEdit}
        className="px-4 py-2 rounded-lg bg-blue-500 text-white mr-2"
      >
        Edit
      </button>
      <button
        onClick={onDelete}
        className="px-4 py-2 rounded-lg bg-red-500 text-white"
      >
        Delete
      </button>
    </div>
  </div>
  );
};

export default FoodCard;
