import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../commons/Data";
import FoodCard from "../components/FoodCard";

const HomeScreen = () => {
  const [foodData, setfoodData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    desc: "",
    price: 0,
    imageUrl: "",
    quantity: 0,
    region: "indian",
    isCooked: false,
    isVeg: false,
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    axios
      .get(`${BASE_URL}/allFoods`)
      .then((response) => {
        // console.log(response.data);
        setfoodData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onDelete = () => {
    alert("On Delete Pressed");
  };
  const onEdit = () => {
    alert("On Edit Pressed");
  };
  const toggleForm = () => {
    setShowForm(!showForm);
    setFormErrors({});
  };

  const handleFormChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "radio") {
      if (name === "region") {
        setFormData({
          ...formData,
          region: value,
        });
      } else {
        setFormData({
          ...formData,
          [name]: value === "true",
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Make API call to save the form data
    // Clear the form after submitting
    // Perform form validation
    const errors = {};
    if (formData.name.trim() === "") {
      errors.name = "Name is required";
    }
    if (formData.desc.trim() === "") {
      errors.desc = "Description is required";
    }
    if (formData.price <= 0) {
      errors.price = "Price must be greater than 0";
    }
    if (formData.quantity <= 0) {
      errors.quantity = "Quantity must be greater than 0";
    }
    // If there are errors, update the formErrors state and return
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // console.log(formData);

    

    axios
      .post(`${BASE_URL}/addFood`, formData)
      .then((i) => {
        // console.log(response.data);
        axios
          .get(`${BASE_URL}/allFoods`)
          .then((response) => {
            // console.log(response.data);
            setfoodData(response.data);
          })
          .catch((err) => {
            console.log(err);
          });
        setIsLoading(false);
        toggleForm();
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });

    setFormData({
      name: "",
      desc: "",
      price: 0,
      imageUrl: "",
      quantity: 0,
      region: "",
      isCooked: false,
      isVeg: false,
    });
    setFormErrors({});
  };

  return (
    <div className="relative p-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <button
        onClick={toggleForm}
        className="fixed bottom-5 right-5 p-3 bg-blue-600 rounded-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </button>
      {/* fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-75 */}
      {showForm && (
        <div className="fixed overflow-y-auto top-0 pt-20 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-75">
          <form className="max-w-sm mx-auto p-4 bg-white rounded-md shadow-md">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold mb-4">Add Food</h2>
              <button
                onClick={toggleForm}
                className="p-2 bg-blue-500 text-white rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="mb-4">
              <label className="block mb-1" htmlFor="name">
                Name:
              </label>
              <input
                className={`w-full px-2 py-1 border rounded ${
                  formErrors.name ? "border-red-500" : "border-gray-300"
                }`}
                type="text"
                placeholder="Food Name"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
              />
              {formErrors.name && (
                <p className="text-red-500 text-sm">{formErrors.name}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block mb-1" htmlFor="desc">
                Description:
              </label>
              <input
                placeholder="Food Description"
                className={`w-full px-2 py-1 border rounded ${
                  formErrors.desc ? "border-red-500" : "border-gray-300"
                }`}
                type="text"
                id="desc"
                name="desc"
                value={formData.desc}
                onChange={handleFormChange}
              />
              {formErrors.desc && (
                <p className="text-red-500 text-sm">{formErrors.desc}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block mb-1" htmlFor="imageUrl">
                Image URL:
              </label>
              <input
                placeholder="Food Image"
                className={`w-full px-2 py-1 border rounded ${
                  formErrors.imageUrl ? "border-red-500" : "border-gray-300"
                }`}
                type="text"
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleFormChange}
              />
              {formErrors.imageUrl && (
                <p className="text-red-500 text-sm">{formErrors.imageUrl}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block mb-1" htmlFor="price">
                Price:
              </label>
              <input
                className={`w-full px-2 py-1 border rounded ${
                  formErrors.price ? "border-red-500" : "border-gray-300"
                }`}
                type="number"
                placeholder="Food Price"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleFormChange}
              />
              {formErrors.price && (
                <p className="text-red-500 text-sm">{formErrors.price}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block mb-1" htmlFor="quantity">
                Quantity:
              </label>
              <input
                className={`w-full px-2 py-1 border rounded ${
                  formErrors.quantity ? "border-red-500" : "border-gray-300"
                }`}
                type="number"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleFormChange}
              />
              {formErrors.quantity && (
                <p className="text-red-500 text-sm">{formErrors.quantity}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block mb-1">Region:</label>
              <div className="flex">
                <label className="flex items-center mr-4">
                  <input
                    type="radio"
                    name="region"
                    value="italian"
                    checked={formData.region === "italian"}
                    onChange={handleFormChange}
                    className="mr-2"
                  />
                  Italian
                </label>
                <label className="flex items-center mr-4">
                  <input
                    type="radio"
                    name="region"
                    value="indian"
                    checked={formData.region === "indian"}
                    onChange={handleFormChange}
                    className="mr-2"
                  />
                  Indian
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="region"
                    value="french"
                    checked={formData.region === "french"}
                    onChange={handleFormChange}
                    className="mr-2"
                  />
                  French
                </label>
              </div>
            </div>
            <div className="mb-4">
              <label className="block mb-1">Is Cooked:</label>
              <div className="flex">
                <label className="flex items-center mr-4">
                  <input
                    type="radio"
                    name="isCooked"
                    value="true"
                    checked={formData.isCooked === true}
                    onChange={handleFormChange}
                    className="mr-2"
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="isCooked"
                    value="false"
                    checked={formData.isCooked === false}
                    onChange={handleFormChange}
                    className="mr-2"
                  />
                  No
                </label>
              </div>
            </div>
            <div className="mb-4">
              <label className="block mb-1">Is Veg:</label>
              <div className="flex">
                <label className="flex items-center mr-4">
                  <input
                    type="radio"
                    name="isVeg"
                    value="true"
                    checked={formData.isVeg === true}
                    onChange={handleFormChange}
                    className="mr-2"
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="isVeg"
                    value="false"
                    checked={formData.isVeg === false}
                    onChange={handleFormChange}
                    className="mr-2"
                  />
                  No
                </label>
              </div>
            </div>
            <button
              disabled={isLoading}
              className="w-full px-4 py-2 mt-4 bg-blue-600 text-white rounded"
              onClick={handleFormSubmit}
            >
              {isLoading ? (
                <svg
                  className="animate-spin mx-auto h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                "Submit"
              )}
            </button>
          </form>
        </div>
      )}

      {foodData &&
        foodData.map((item) => (
          <FoodCard
            key={item._id}
            image={item?.imageUrl}
            name={item?.name}
            price={item?.price}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
    </div>
  );
};

export default HomeScreen;
