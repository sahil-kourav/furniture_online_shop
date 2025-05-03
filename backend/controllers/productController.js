import { v2 as cloudinary } from "cloudinary";
import Product from "../models/product.js"; // Sequelize Product model

// Add Product
const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, sizes, bestseller } = req.body;

    if (!name || !description || !price || !category || !sizes) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Handling images
    const images = ['image1', 'image2', 'image3', 'image4']
      .map((key) => req.files[key]?.[0])
      .filter(Boolean); // Removes undefined

    const imagesUrl = await Promise.all(
      images.map(async (item) => {
        const result = await cloudinary.uploader.upload(item.path, { resource_type: "image" });
        return result.secure_url;
      })
    );

    // Prepare product data
    const productData = {
      name, 
      description,
      category,
      price: Number(price),
      bestseller: bestseller === "true",
      sizes: JSON.parse(sizes),
      image: imagesUrl, // Must store as string in MySQL
    };

    const product = await Product.create(productData);

    res.json({ success: true, message: "Product Added", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// List Products
const listProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json({ success: true, products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Remove Product
const removeProduct = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ success: false, message: "Product ID is required" });
    }

    const deleted = await Product.destroy({ where: { id: productId } });

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.json({ success: true, message: "Product Removed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Single Product Info
const singleProduct = async (req, res) => {
    try {
      const { productId } = req.params; // Use params for GET requests
  
      if (!productId) {
        return res.status(400).json({ success: false, message: "Product ID is required" });
      }
  
      const product = await Product.findByPk(productId);
  
      if (!product) {
        return res.status(404).json({ success: false, message: "Product not found" });
      }
  
      res.json({ success: true, product });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: error.message });
    }
  };
  
export { listProducts, addProduct, removeProduct, singleProduct };
