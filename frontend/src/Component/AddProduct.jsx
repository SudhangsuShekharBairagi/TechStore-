import React, { useState } from "react";
import FormUl from "./FormUl";

const AddProduct = () => {
  const initialProduct = {
    name: "",
    brand: "",
    description: "",
    price: "",
    category: "",
    quantity: "",
    releaseDate: "",
    available: false,
  };

  const [product, setProduct] = useState(initialProduct);
const [loading, setLoading] = useState(false); 
const [image, setImage] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select a product image.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("imageFile", image);
      formData.append(
        "product",
        new Blob([JSON.stringify(product)], {
          type: "application/json",
        }),
      );

      const response = await fetch("http://localhost:8080/api/product", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `HTTP Error: ${response.status}`);
      }

      const data = await response.json();
      console.log("Product added successfully:", data);

      alert("Product added successfully!");
      setProduct(initialProduct);
      setImage(null);
      document.getElementById("image").value = "";
    } catch (error) {
      console.error("Error adding product:", error);
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormUl
    productOparation="Add New Product"
      product={product}
      setProduct={setProduct}
      submitHandler={submitHandler}
      loading={loading}
      image={image}
      setImage={setImage}
      
    />
  );
};

export default AddProduct;
