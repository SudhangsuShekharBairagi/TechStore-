import React, { useState } from 'react';
import { createProduct } from '../api/productsApi';
import FormUl from '../pages/FormUl';

const AddProduct = () => {
  const initialProduct = {
    name: '',
    brand: '',
    description: '',
    price: '',
    category: '',
    quantity: '',
    releaseDate: '',
    available: false,
  };

  const [product, setProduct] = useState(initialProduct);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!image) {
      alert('Please select a product image.');
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('imageFile', image);
      formData.append(
        'product',
        new Blob([JSON.stringify(product)], {
          type: 'application/json',
        })
      );

      await createProduct(formData);

      alert('Product added successfully!');
      setProduct(initialProduct);
      setImage(null);
      document.getElementById('image').value = '';
    } catch (error) {
      console.error('Error adding product:', error);
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
