import React from "react";

const Footer = () => {
  return (
    <footer className="mt-40 px-5 sm:px-10 md:px-20 text-sm bg-gray-50">
      <div className="flex flex-col md:flex-row justify-between gap-10 mb-10 text-gray-600">

        {/* About Section */}
        <div className="md:w-1/2">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center md:text-left">
            About NestCraft
          </h2>
          <p className="leading-relaxed text-center md:text-left">
            NestCraft brings you beautifully crafted furniture designed to make
            your home stylish, cozy, and unique. Discover premium quality,
            modern designs, and effortless online shopping — all in one place.
          </p>
        </div>

        {/* Links & Contact */}
        <div className="flex flex-col sm:flex-row gap-10 md:gap-20 justify-center md:justify-end w-full md:w-1/2">
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center sm:text-left">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2 items-center sm:items-start">
              <li className="hover:text-black cursor-pointer">Home</li>
              <li className="hover:text-black cursor-pointer">About Us</li>
              <li className="hover:text-black cursor-pointer">Delivery</li>
              <li className="hover:text-black cursor-pointer">Privacy Policy</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center sm:text-left">
              Contact Us
            </h3>
            <ul className="flex flex-col gap-2 items-center sm:items-start">
              <li className="hover:text-black cursor-pointer">+91-212-456-7890</li>
              <li className="hover:text-black cursor-pointer">contact@nestCraft.com</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div>
        <hr className="border-gray-300" />
        <p className="py-5 text-center text-gray-500">
          © 2025 NestCraft.com — All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
