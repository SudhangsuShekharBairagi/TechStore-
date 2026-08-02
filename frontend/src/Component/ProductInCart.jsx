import React, { useEffect, useState } from "react";
import { getProductById, getProductImageUrl } from "../api/productsApi";
import { useSelector, useDispatch } from "react-redux";
import { increaseQuantity, decreaseQuantity, removeFromCart } from "../feature/cartItems/cartSlice";

function ProductInCart({ productId, quantity }) {
  const [product, setProduct] = useState(null);
  const [productImage, setProductImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const load = async () => {
      const data = await getProductById(productId);
      const imageUrl = await getProductImageUrl(productId);
        setProductImage(imageUrl);
      setProduct(data);
      setLoading(false);
    };    
    

    load();
  }, [productId]);
//   console.log(product);

//   console.log(productImage);



  if (loading) return <p>Loading...</p>;

  return (
    <>
      <div className="flex items-center space-x-4 p-4 border-b">
        <img
          src={productImage}
          alt={product.name}
          className="w-16 h-16 object-cover rounded"
        />
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-sm text-gray-600">{product.brand}</p>
          <div>
            <button className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer" onClick={() => dispatch(decreaseQuantity({ productId }))}>
              -
            </button>
            <span className="mx-2">{quantity}</span>
            <button className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer" onClick={() => dispatch(increaseQuantity({ productId }))}>
              +
            </button>          
          </div>
          <p className="text-sm text-gray-600">Price: ${product.price}</p>
        </div>
        <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer" onClick={() => dispatch(removeFromCart({ productId }))}>
          Remove
        </button>
      </div>
    </>
  );
}

export default ProductInCart;
