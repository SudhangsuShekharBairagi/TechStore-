import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useAllProduct, useImage, useProductById } from '../context/GetDataProvider';
import FormUl from './FormUl';

const UpdateProduct = () => {
     let initialProduct = {
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
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const {id} = useParams();
    const {data,fetchById, error} = useProductById();
    const {fetchAllProduct} = useAllProduct();
    const {imageUrl, fetchImage} = useImage();
    const navigate = useNavigate();
    useEffect(()=> {
        fetchById(id);  
        fetchImage(id);                     

    },[id]);

    useEffect(()=> {
      setImage(imageUrl)
      setProduct(data);
    },[data, imageUrl]);
   

    // const formatDate = (dataString) => {
    //     if(!dataString) return "";
    //     const date = new Date(dataString);

    //     const day = String(date.getDate()).padStart(2,'0');
    //     const month = String(date.getMonth() + 1).padStart(2, '0');
    //     const year = String(date.getFullYear());

    //     return `${day}-${month}-${year}`;
    // }


 const submitHandler = async (e) => {
    e.preventDefault();
  // if(!image){
  //   alert("Please select the image");

  // }

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

      const response = await fetch(`http://localhost:8080/api/product/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `HTTP Error: ${response.status}`);
      }

      const data = await response.text();
      console.log("Updated successfully:", data);

      // alert("Updated successfully!");
      
      setProduct(initialProduct);
      setImage(null);
      fetchAllProduct();
      navigate('/');
      document.getElementById("image").value = "";
    } catch (error) {
      console.error("Error updted product:", error);
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
     <FormUl

      productOparation="Update The Product"
      product={product}
      setProduct={setProduct}
      submitHandler={submitHandler}
      loading={loading}
      image={imageUrl}
      setImage={setImage}
      
    />
  )
}

export default UpdateProduct