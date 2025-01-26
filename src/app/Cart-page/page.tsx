"use client";

import { useContext } from "react";
import { CartContext } from "@/cart/page";
import Image from "next/image";


export default function Cart() {
  const cartContext = useContext(CartContext);
  if (!cartContext) {
    return <div>Error: Cart context is not available.</div>;
  }
  const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal } = cartContext;

  return (
    <div className="flex flex-col md:flex-row gap-10 mx-10 items-center justify-center my-20">
      {/* Left Section: Bag Items */}
      <div className="w-[80vw] h-auto mx-auto">
        <div>
          <p className="font-bold text-xl mb-5">Bag</p>
        </div>
        {cartItems.map((item) => (
          <div key={item._id} className="flex justify-between mb-6">
            <div className="flex">
              <div>
                <Image
                  src={item.image}
                  alt={item.title}
                  width={100}
                  height={100}
                  className="rounded-md"
                />
              </div>
              <div className="flex flex-col gap-2 ml-4">
                <div>
                  <p className="text-lg font-bold">{item.title}</p>
                </div>
                <div className="font-thin text-gray-600">
                  <p>Price: ${item.price}</p>
                  <div className="flex justify-between">
                    <span>Quantity: {item.quantity}</span>
                  </div>
                </div>
                <div className="flex gap-2 mt-2">
                  <button
                    className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none"
                    onClick={() => addToCart && addToCart(item)}
                  >
                    +
                  </button>
                  <button
                    className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none"
                    onClick={() => removeFromCart(item)}
                  >
                    -
                  </button>
                </div>
              </div>
            </div>
            <div>
              <p className="text-lg font-bold">${item.price * item.inventory}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Right Section: Summary */}
      <div className="w-full min-h-auto md:w-1/3 mx-auto my-auto gap-10 flex flex-col">
        <div className="gap-10 flex flex-col">
          <div className="text-3xl mb-5">Summary</div>
          <div>
            <div className="flex justify-between">
              <p>Sub Total</p>
              <p>${getCartTotal()}</p>
            </div>
            <div className="flex justify-between">
              <p>Estimated Delivery And Handling</p>
              <p>Free</p>
            </div>
          </div>
          <div className="flex justify-between">
            <p>Total</p>
            <p>${getCartTotal()}</p>
          </div>
        </div>
        {cartItems.length > 0 && (
          <div className="mt-5">
            <button
              className="px-4 py-2 bg-gray-800 text-white text-lg font-bold uppercase rounded hover:bg-gray-700 focus:outline-none"
              onClick={() => clearCart()}
            >
              Clear Cart
            </button>
          </div>
        )}
        {cartItems.length === 0 && (
          <h1 className="text-lg font-bold">Your cart is empty</h1>
        )}
      </div>
    </div>
  );
}
