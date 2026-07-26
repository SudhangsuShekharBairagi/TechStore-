import React, { useEffect, useState } from 'react'
import { useAllProduct } from '../context/GetDataProvider'
// import image from '../assets/hero.png'
import { Link, useNavigate } from 'react-router';
const Home = () => {
  const navigate = useNavigate();
  const { data, loading, error } = useAllProduct();
  // const products = Array.isArray(data) ? data : [];
   const [products, setProducts] = useState([]);
   
   
useEffect(() => {
  if (!data || data.length === 0) return;

  let imageUrls = [];

  const fetchImagesAndUpdateProducts = async () => {
    try {
      const updatedProducts = await Promise.all(
        data.map(async (product) => {
          try {
            const response = await fetch(
              `http://localhost:8080/api/product/${product.id}/image`
            );

            if (!response.ok) {
              throw new Error(`Failed to fetch image for product ${product.id}`);
            }

            const blob = await response.blob();
            const imageUrl = URL.createObjectURL(blob);

            imageUrls.push(imageUrl);

            return {
              ...product,
              imageUrl,
            };
          } catch (error) {
            console.error(
              `Error fetching image for product ID: ${product.id}`,
              error
            );

            return {
              ...product,
              imageUrl: "/placeholder-image.png", // or any fallback image path
            };
          }
        })
      );

      setProducts(updatedProducts);
    } catch (error) {
      console.error("Error updating products:", error);
    }
  };

  fetchImagesAndUpdateProducts();

  return () => {
    imageUrls.forEach((url) => URL.revokeObjectURL(url));
  };
}, [data]);

  if (loading) {
    return <div className='w-full h-full bg-white'>
      <h1 className='text-center font-bold text-3xl text-black'>Loading.....</h1>
    </div>
  }

  if (error) {
    return <div className='w-full h-full bg-white flex align-middle justify-center '>
      <h1 className='text-center font-bold text-3xl text-black'>{error?.message}</h1>
    </div>
  }
  return (
    <div className='w-full h-full flex items-center justify-center p-5 m-3 flex-wrap'>
      
     {products.map((product) => (
  <div
    key={product.id}
    className="group m-10 w-80 overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-slate-200 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
  >
   
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 p-6">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-56 w-full object-contain transition-transform duration-500 group-hover:scale-110"
        />

        <span
          className={`absolute right-4 top-4 rounded-full px-4 py-1 text-xs font-semibold shadow-sm ${
            product.available
              ? 'bg-emerald-100 text-emerald-700'
              : 'bg-rose-100 text-rose-700'
          }`}
        >
          {product.available ? 'In Stock' : 'Out of Stock'}
        </span>
      </div>

      <div className="space-y-3 p-6">
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-indigo-600">
            {product.brand}
          </p>
          <h3 className="mt-1 line-clamp-1 text-2xl font-bold text-slate-900">
            {product.name}
          </h3>
        </div>

        <p className="line-clamp-2 text-sm leading-6 text-slate-500">
          {product.desc}
        </p>

        <div className="flex items-center justify-between pt-2">
          <div>
            <p className="text-xs text-slate-400">Starting from</p>
            <p className="text-3xl font-extrabold text-slate-900">
              ₹{product.price}
            </p>
          </div>

          <button
          onClick={() => navigate(`/product/${product.id}`)}
           className="rounded-2xl cursor-pointer bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-indigo-600">
            View Details
          </button>
        </div>
      </div>
    
  </div>
))}
    
    </div>
  )
}

export default Home