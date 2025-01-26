"use client"

import { allProducts } from '@/sanity/lib/queries'; 
import { createContext, useState, useEffect } from 'react'
import { sanityFetch } from "@/sanity/lib/fetch";

interface CartItem {
    _id: string;
    title: string;
    price: number;
    inventory: number;
    quantity?: number; // quantity is optional and can be defaulted to 1
    image: string;
    description?: string;
}

interface CartContextProps {
    cartItems: CartItem[];
    addToCart?: (item: CartItem) => void | undefined;
    removeFromCart: (item: CartItem) => void;
    clearCart: () => void;
    getCartTotal: () => number;
}

export const CartContext = createContext<CartContextProps | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const storedCartItems = localStorage.getItem('cartItems');
    const [cartItems, setCartItems] = useState<CartItem[]>(storedCartItems ? JSON.parse(storedCartItems) : []);
    const [product, setProduct] = useState<CartItem[]>();

    useEffect(() => {
        const fetchData = async () => {
            const products = await sanityFetch({ query: allProducts });

            setProduct(products)
        };

        fetchData();
    }, []);



    const addToCart = (item: CartItem) => {
      // Find the product in the products array to access its inventory
      const productData = product?.find((productItem: CartItem) => productItem._id === item._id);
  
      if (!productData) {
          console.error("Product not found in the products list");
          return; // Stop execution if the product isn't found
      }
  
      const isItemInCart = cartItems.find((cartItem: CartItem) => cartItem._id === item._id);
  
      if (isItemInCart) {
          // If the item is already in the cart, increase the quantity by 1
          if (isItemInCart.quantity && isItemInCart.quantity < productData.inventory) {
              setCartItems(
                  cartItems.map((cartItem: CartItem) =>
                      cartItem._id === item._id
                          ? { ...cartItem, quantity: (cartItem.quantity || 0) + 1 } // Increment quantity
                          : cartItem)
                        );
          } 
          else {
              console.log("Cannot add more items. Inventory limit reached.");
          }
      } else {
          // If the item is not in the cart, add it with quantity 1
          setCartItems([...cartItems, { ...item, quantity: 1 }]);
      }
  };
  

    const removeFromCart = (item: CartItem) => {
        const isItemInCart = cartItems.find((cartItem: CartItem) => cartItem._id === item._id);

        if (isItemInCart) {
            if (isItemInCart.quantity === 1) {
                setCartItems(cartItems.filter((cartItem: CartItem) => cartItem._id !== item._id));
            } else {
                setCartItems(
                    cartItems.map((cartItem: CartItem) =>
                        cartItem._id === item._id
                            ? { ...cartItem, quantity: (cartItem.quantity || 0) - 1 }
                            : cartItem
                    )
                );
            }
        }
    };

    const clearCart = () => setCartItems([]);

    const getCartTotal = () => {
        return cartItems.reduce((total: number, item: CartItem) => total + item.price * (item.quantity || 1), 0);
    };

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                clearCart,
                getCartTotal,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}
