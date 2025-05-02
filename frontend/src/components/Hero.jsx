import React from "react";
import { assets } from "../assets/assets";

const Hero = () => {
  return (
    <div className="flex flex-col sm:flex-row border border-gray-400">
      {/* Hero Left Side */}
      <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
        <div className="text-[#414141]">
          <div className="flex items-center gap-2">
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <p className="text-sm text-gray-500 tracking-wide uppercase">
                Top Picks Just for You
              </p>
              <h1 className="prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed">
                Discover the Newest Trends
              </h1>
              <div className="flex items-center gap-2">
                <p className="font-semibold text-sm md:text-base text-gray-800">
                  Explore Collection
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Hero Right Side */}
      <img className="w-full sm:w-[650px]" src={assets.main_img} alt="" />
    </div>
  );
};

export default Hero;
