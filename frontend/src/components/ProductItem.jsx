import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link
      onClick={() => scrollTo(0, 0)}
      to={`/product/${id}`}
      className="group w-full max-w-xs mx-auto rounded-xl overflow-hidden"
    >
      <div className="overflow-hidden">
        <img
          src={image[0]}
          alt={name}
          className="w-full h-64 object-cover hover:scale-110 transition ease-in-out"
        />
      </div>

      <div className="pt-2 pb-4">
        <p className="text-lg font-semibold text-gray-800 truncate">{name}</p>
        <p className="text-md text-gray-600 mt-1">
          {currency}
          {price}
        </p>
      </div>
    </Link>
  );
};

export default ProductItem;
