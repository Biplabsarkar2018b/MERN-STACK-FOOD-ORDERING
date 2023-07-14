import React, { useEffect, useState } from "react";
import AliceCarouselComponent from "../components/AliceCarouselComponent";
import axios from "axios";
import { BASE_URL } from "../commons/HomeCarouselData";
import OrderPopUp from "../components/OrderPopUp";

const HomeScreen = () => {
  const [foodData, setFoodData] = useState([]);
  const [desi, setDesi] = useState([]);
  const [veg, setVeg] = useState([]);
  const [nonveg, setNonVeg] = useState([]);
  const [nonCooked, setNonCooked] = useState([]);
  const [italian, setItalian] = useState([]);
  const [french, setFrench] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/allFoods`)
      .then((response) => {
        setFoodData(response.data);
        const { data } = response;
        const vegItems = data.filter((item) => item?.isVeg == true);
        setVeg(vegItems);

        const desi = data.filter((item) => item.region == "indian");
        setDesi(desi);

        const nonVegItems = data.filter((item) => item?.isVeg == false);
        setNonVeg(nonVegItems);

        const nonCookedItems = data.filter((item) => item?.isCooked == false);
        setNonCooked(nonCookedItems);

        const italian = data.filter((item) => item.region == "italian");
        setItalian(italian);

        const french = data.filter((item) => item.region == "french");
        setFrench(french);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [isShowOrder, setisShowOrder] = useState(false);
  const [orderData, setorderData] = useState({
    image: "",
    name: "",
    price: "",
    description: "",
  });

  const [isOrderConfirmed, setisOrderConfirmed] = useState(false);

  const onOrder = ({ image, name, price, description }) => {
    setorderData({
      image: image,
      name: name,
      price: price,
      description: description,
    });

    setisShowOrder(true);
  };
  const onConfirm = ({ image, price, quantity, name }) => {
    // console.log(image);
    const dataToSave = {
      image: image,
      price: price,
      quantity: quantity,
      name: name,
    };
    console.log(dataToSave);
    const existingData = JSON.parse(localStorage.getItem("orderData")) || [];
    const updatedData = [...existingData, dataToSave];
    localStorage.setItem("orderData", JSON.stringify(updatedData));
    setisShowOrder(false);
    setisOrderConfirmed(true);
  };

  const onCancel = () => {
    setisShowOrder(false);
  };
  return (
    <div className="relative">
      {isShowOrder && (
        <div className="flex items-center justify-center fixed z-50 top-0 bottom-0 right-0 left-0 bg-gray-500 bg-opacity-75">
          <OrderPopUp
            image={orderData.image}
            name={orderData.name}
            price={orderData.price}
            onCancel={onCancel}
            onConfirm={onConfirm}
          />
        </div>
      )}
      {isOrderConfirmed && (
        <div className="flex items-center justify-center fixed z-50 top-0 bottom-0 right-0 left-0 bg-gray-500 bg-opacity-75">
          <div className="bg-white p-4 flex flex-col gap-5">
            <h1 className="text-green-600 text-3xl">Order Confirmed</h1>
            <button
              onClick={() => setisOrderConfirmed(false)}
              className="px-3 py-1 bg-blue-500 text-white"
            >
              OK
            </button>
          </div>
        </div>
      )}
      {/* Desi Dishes */}
      <AliceCarouselComponent
        onOrder={onOrder}
        section={"Desi Dishes "}
        data={desi}
      />
      {/* Veg */}
      <AliceCarouselComponent onOrder={onOrder} section={"Veg"} data={veg} />
      {/*Non Veg */}
      <AliceCarouselComponent
        onOrder={onOrder}
        section={"Non Veg"}
        data={nonveg}
      />
      {/* Non Cooked */}
      <AliceCarouselComponent
        onOrder={onOrder}
        section={"Non Cooked"}
        data={nonCooked}
      />
      {/* Italian */}
      <AliceCarouselComponent
        onOrder={onOrder}
        section={"Italian"}
        data={italian}
      />
      {/* French */}
      <AliceCarouselComponent
        onOrder={onOrder}
        section={"French"}
        data={french}
      />
    </div>
  );
};

export default HomeScreen;
