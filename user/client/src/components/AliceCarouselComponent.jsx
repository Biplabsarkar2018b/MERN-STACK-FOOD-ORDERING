import React, { useRef, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { homeCarousalData } from "../commons/HomeCarouselData";
import FoodCard from "./FoodCard";

const AliceCarouselComponent = ({ data, section, onOrder }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);

  const slidePrev = () => {
    if (carouselRef.current) {
      carouselRef.current.slidePrev();
      setActiveIndex((prevIndex) =>
        prevIndex === 0 ? homeCarousalData.length - 1 : prevIndex - 1
      );
    }
  };
  const slideNext = () => {
    if (carouselRef.current) {
      carouselRef.current.slideNext();
      setActiveIndex((prevIndex) =>
        prevIndex === homeCarousalData.length - 1 ? 0 : prevIndex + 1
      );
    }
  };
  const syncActiveIndex = ({ item }) => {
    setActiveIndex(item);
  };
  const responsive = {
    0: { items: 1 },
    450: { items: 2 },
    600: { items: 3 },
    720: { items: 4 },
    1024: { items: 6 },
  };
  const items = data.map((item) => (
    <FoodCard
    key={item._id}
      onOrder={onOrder}
      image={item?.imageUrl}
      description={item?.desc}
      name={item?.name}
      price={item?.price}
    />
  ));
  return (
    <div className="flex flex-col px-10 my-5">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-3xl font-bold">{section}</h1>
        {/* Left Arrow */}
        <div className="flex gap-3">
          <button
            disabled={activeIndex === 0}
            onClick={slidePrev}
            className={`rounded-full border p-2 border-black ${
              activeIndex === 0
                ? "bg-gray-300 border-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-white"
            }`}
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
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>

          {/* Right Arrow */}

          <button
            onClick={slideNext}
            disabled={activeIndex === items.length - 1}
            className={`rounded-full border p-2 border-black ${
              activeIndex === items.length - 1
                ? "bg-gray-300 border-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-white"
            }`}
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
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
      </div>
      <AliceCarousel
        items={items}
        responsive={responsive}
        disableButtonsControls
        disableDotsControls
        ref={carouselRef}
        onSlideChanged={syncActiveIndex}
        activeIndex={activeIndex}
      />
    </div>
  );
};

export default AliceCarouselComponent;
