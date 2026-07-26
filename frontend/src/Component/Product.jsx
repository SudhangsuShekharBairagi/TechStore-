import React, { useEffect, useState } from "react";
import { useAllProduct, useProductById } from "../context/GetDataProvider";
import { useNavigate, useParams } from "react-router";
import imageUrl from "../assets/hero.png"
const Product = () => {
  const { id } = useParams();
  const [product, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const {fetchAllProduct} = useAllProduct();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/product/${id}`);

        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }

        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    const fetchImage = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/product/${id}/image`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch image");
        }

        const blob = await response.blob();
        const imageObjectURL = URL.createObjectURL(blob);
        setImageUrl(imageObjectURL);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchProduct();
    fetchImage();



    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [id]);

  const deleteProduct = async () => {

    const res = await fetch(`http://localhost:8080/api/product/${id}`, {
      method: "DELETE"
    });
    if (!res.ok) {
      alert("Delete failed.");
    } else {
      fetchAllProduct();
      navigate("/");
      alert("Deleted");
    }
  }

  const handleEditClick = () => {
    navigate(`/update/${id}`);
  } 

  const fetchById = async (id) => {
    setLoading(true);
    setError(null);
    setData([]);

    try {
      const res = await fetch(`http://localhost:8080/api/products/${id}`);
      if (!res.ok) throw new Error("Not Found");
      const data = await res.json();
      if (!data || data.length === 0) {
        setError("Not Found");
      } else {
        setData(data);
      }
    } catch (error) {
      // setLoading(false);
      setError(error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchById(id);
  }, [id]);

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
    <>    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Product Image */}
        <div className="bg-gray-100 flex items-center justify-center p-6">
          <img
            src={imageUrl}
            alt={product?.name || 'Product image'}
            className="w-full max-w-md h-auto object-contain rounded-xl hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Product Details */}
        <div className="p-6 md:p-8 flex flex-col justify-between">
          <div>
            <span className="inline-block px-3 py-1 mb-4 text-sm font-medium text-blue-700 bg-blue-100 rounded-full">
              {product.category}
            </span>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {product.name}
            </h1>

            <h5 className="text-lg font-semibold text-gray-600 mb-4">
              by {product.brand}
            </h5>

            <p className="text-gray-700 leading-relaxed mb-6">
              {product.desc}
            </p>
          </div>

          <div className="border-t pt-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-4xl font-bold text-green-600">
                ${product.price}
              </span>

              <button
                disabled={!product.available}
                className={`px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 ${product.available
                    ? 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg'
                    : 'bg-gray-400 cursor-not-allowed'
                  }`}
              >
                {product.available ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <span className="font-medium text-gray-700">Stock Available:</span>
              <span className="font-bold text-green-600 text-base">
                {product.quantity}
              </span>
            </div>

            <div className="text-sm text-gray-600">
              <span className="font-medium text-gray-700">Product listed on: </span>
              <span className="italic">
                {new Date(product.releaseDate).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Admin Actions */}

          <div className="flex gap-4 mt-8">
            <button
              type="button"
              onClick={() => handleEditClick()}
              className="px-5 py-2.5 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 transition"
            >
              Update
            </button>

            <button
              type="button"
              onClick={() => deleteProduct()}
              className="px-5 py-2.5 bg-red-500 text-white rounded-xl hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>

        </div>
      </div>
    </div>
    </>
  );
};

export default Product;
