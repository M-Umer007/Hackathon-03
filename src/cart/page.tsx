"use client"

import { allProducts } from '@/sanity/lib/queries'; 
import { createContext, useState, useEffect } from 'react'
import { sanityFetch } from "@/sanity/lib/fetch";

interface CartItem {
    _id: string;
    title: string;
    price: number;
    inventory: number;
    quantity?: number;
    image: string;
    description?: string;
}

interface CartContextProps {
    cartItems: CartItem[];
    addToCart?: (item: CartItem) => void;
    removeFromCart: (item: CartItem) => void;
    clearCart: () => void;
    getCartTotal: () => number;
}

export const CartContext = createContext<CartContextProps | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [product, setProduct] = useState<CartItem[]>([]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedCartItems = localStorage.getItem('cartItems');
            if (storedCartItems) setCartItems(JSON.parse(storedCartItems));
        }

        const fetchData = async () => {
            const products = await sanityFetch({ query: allProducts });
            setProduct(products);
        };

        fetchData();
    }, []);

    const addToCart = (item: CartItem) => {
        const productData = product.find((productItem) => productItem._id === item._id);
        if (!productData) return;

        const isItemInCart = cartItems.find((cartItem) => cartItem._id === item._id);

        if (isItemInCart) {
            if (isItemInCart.quantity && isItemInCart.quantity < productData.inventory) {
                setCartItems(cartItems.map((cartItem) =>
                    cartItem._id === item._id
                        ? { ...cartItem, quantity: (cartItem.quantity || 0) + 1 }
                        : cartItem
                ));
            }
        } else {
            setCartItems([...cartItems, { ...item, quantity: 1 }]);
        }
    };

    const removeFromCart = (item: CartItem) => {
        const isItemInCart = cartItems.find((cartItem) => cartItem._id === item._id);

        if (isItemInCart) {
            if (isItemInCart.quantity === 1) {
                setCartItems(cartItems.filter((cartItem) => cartItem._id !== item._id));
            } else {
                setCartItems(cartItems.map((cartItem) =>
                    cartItem._id === item._id
                        ? { ...cartItem, quantity: (cartItem.quantity || 0) - 1 }
                        : cartItem
                ));
            }
        }
    };

    const clearCart = () => setCartItems([]);
    const getCartTotal = () => cartItems.reduce((total, item) => total + item.price * (item.quantity || 1), 0);

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
        }
    }, [cartItems]);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, getCartTotal }}>
            {children}
        </CartContext.Provider>
    );
};
