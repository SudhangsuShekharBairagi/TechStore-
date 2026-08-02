import React, { useCallback, useEffect } from "react";
import ProductInCart from "../Component/ProductInCart";
import { useSelector, useDispatch } from "react-redux";

function AddCard() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  // useEffect(() => {
  //   const syncCart = () => {
  //     try {
  //       setCartItems(JSON.parse(localStorage.getItem("cart")) || []);
  //     } catch {
  //       setCartItems([]);
  //     }
  //   };

  //   window.addEventListener("cartUpdated", syncCart);
  //   window.addEventListener("storage", syncCart);

  //   return () => {
  //     window.removeEventListener("cartUpdated", syncCart);
  //     window.removeEventListener("storage", syncCart);
  //   };
  // }, []);

  // const handleRemove = useCallback((productId) => {
  //   const updatedCart = cartItems.filter(
  //     (item) => item.productId !== productId,
  //   );
  //   localStorage.setItem("cart", JSON.stringify(updatedCart));
  //   setCartItems(updatedCart);
  //   window.dispatchEvent(new Event("cartUpdated"));
  // }, [cartItems]);
  // const increaseQuantity = useCallback((productId) => {
  //   setCartItems((prev) => {
  //     const updated = prev.map((item) =>
  //       item.productId === productId
  //         ? { ...item, quantity: item.quantity + 1 }
  //         : item,
  //     );

  //     localStorage.setItem("cart", JSON.stringify(updated));
  //     window.dispatchEvent(new Event("cartUpdated"));
  //     return updated;
  //   });
  // }, [cartItems]);

  // const decreaseQuantity = useCallback((productId) => {
  //   setCartItems((prev) => {
  //     const updated = prev
  //       .map((item) =>
  //         item.productId === productId
  //           ? { ...item, quantity: item.quantity - 1 }
  //           : item,
  //       )
  //       .filter((item) => item.quantity > 0);

  //     localStorage.setItem("cart", JSON.stringify(updated));
  //     window.dispatchEvent(new Event("cartUpdated"));
  //     return updated;
  //   });
  // }, [cartItems]);
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4 text-center">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartItems.map((item) => (
          <ProductInCart
            key={item.productId}
            productId={item.productId}
            quantity={item.quantity}          
          />
        ))
      )}
    </div>
  );
}

export default AddCard;
