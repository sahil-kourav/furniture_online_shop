import React from "react";
import { assets } from "../assets/assets";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { ArrowBigLeftDash, ArrowBigRightDash } from "lucide-react";
import "../index.css";

const Hero = () => {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Swiper Carousel */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3500 }}
        loop
        className="w-full"
      >
        {[assets.main_img, assets.main_img, assets.main_img].map((img, idx) => (
          <SwiperSlide key={idx}>
            <div className="w-full aspect-[16/9] sm:aspect-[21/9] md:aspect-[18/9] lg:aspect-[21/9] max-h-[calc(100vh-5rem)]">
              <img
                src={img}
                alt={`Slide ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Swiper Navigation Buttons */}
      <div className="absolute top-1/2 -translate-y-1/2 left-2 sm:left-4 z-10">
        <button
          className="swiper-button-prev p-2 sm:p-3 rounded-full bg-black/70 text-white hover:bg-white hover:text-black transition-all shadow-lg"
          aria-label="Previous Slide"
        >
          <ArrowBigLeftDash className="w-6 h-6 sm:w-8 sm:h-8" />
        </button>
      </div>

      <div className="absolute top-1/2 -translate-y-1/2 right-2 sm:right-4 z-10">
        <button
          className="swiper-button-next p-2 sm:p-3 rounded-full bg-black/70 text-white hover:bg-white hover:text-black transition-all shadow-lg"
          aria-label="Next Slide"
        >
          <ArrowBigRightDash className="w-6 h-6 sm:w-8 sm:h-8" />
        </button>
      </div>
    </div>
  );
};

export default Hero;
