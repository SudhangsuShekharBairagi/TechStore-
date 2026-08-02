import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { updateProduct } from '../api/productsApi';
import { useAllProduct, useImage, useProductById } from '../context/GetDataProvider';
import FormUl from '../pages/FormUl';

const UpdateProduct = () => {
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
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const { data, fetchById } = useProductById();
  const { fetchAllProduct } = useAllProduct();
  const { imageUrl, fetchImage } = useImage();
  const navigate = useNavigate();

  useEffect(() => {
    fetchById(id);
    fetchImage(id);
  }, [id, fetchById, fetchImage]);

  useEffect(() => {
    if (data) {
      setProduct(data);
    }
    if (imageUrl) {
      setImage(imageUrl);
    }
  }, [data, imageUrl]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();
      if (image) {
        formData.append('imageFile', image instanceof File ? image : new File([], 'image'));
      }
      formData.append(
        'product',
        new Blob([JSON.stringify(product)], {
          type: 'application/json',
        })
      );

      await updateProduct(id, formData);
      setProduct(initialProduct);
      setImage(null);
      await fetchAllProduct();
      navigate('/');
      document.getElementById('image').value = '';
    } catch (error) {
      console.error('Error updating product:', error);
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
  );
};

export default UpdateProduct;