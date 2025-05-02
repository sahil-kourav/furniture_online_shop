import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  const fetchProductData = async () => {
    console.log("Fetched Products:", products); // LOG 1: Products data
    console.log("Product ID from URL:", productId); // LOG 2: ProductId from URL

    const foundProduct = products.find(
      (item) => item.id.toString() === productId.toString()
    );

    if (foundProduct) {
      console.log("Matched Product:", foundProduct);
      setProductData(foundProduct);
      setImage(foundProduct.image[0]);
    }
  };

  useEffect(() => {
    console.log("Calling fetchProductData on productId or products change...");
    fetchProductData();
  }, [productId, products]);

  console.log("productData  Checking", productData);
  console.log("productData.image Checking", productData?.image);

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData?.image?.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className="..."
                alt="Image not vailable"
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto" src={image} alt="" />
          </div>
        </div>

        {/* -------- Product Info ---------- */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <p className="mt-2 text-gray-600 text-lg md:w-4/5">
            {productData.description}
          </p>
          <p className="mt-2 text-lg">
            {currency}
            {productData.price}
          </p>
          
          <button
            onClick={() => addToCart(productData.id, size)}
            className="bg-black mt-5 text-white px-8 py-3 text-sm active:bg-gray-700"
          >
            ADD TO CART
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>✅ 100% authentic and original product</p>
            <p>💵 Cash on Delivery available for your convenience</p>
            <p>🔁 Enjoy hassle-free returns and exchanges within 7 days</p>
          </div>
        </div>
      </div>

      <RelatedProducts category={productData.category} />
    </div>
  ) : (
    <div className=" opacity-0"></div>
  );
};

export default Product;
