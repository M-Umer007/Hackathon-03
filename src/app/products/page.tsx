"use client";

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
/* eslint-disable react-hooks/rules-of-hooks */

import { ourProducts, featuredProducts } from "../../sanity/lib/queries";
import { sanityFetch } from "../../sanity/lib/fetch";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/cart/page";

type Product = {
  _id: string;
  title: string;
  description: string;
  price: number;
  priceWithoutDiscount?: number;
  badge?: string;
  inventory?: number;
  tags?: string[];
  category?: {
    _id: string;
    title: string;
  };
  imageUrl: string;
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [discountProducts, setDiscountProducts] = useState<Product[]>([]);

  const cartContext = useContext(CartContext);
  if (!cartContext) {
    return <div>Error: Cart context is not available.</div>;
  }
  const { addToCart } = cartContext;

  useEffect(() => {
    const fetchData = async () => {
      const fetchedProducts = await sanityFetch({ query: ourProducts });
      const fetchedDiscountProducts = await sanityFetch({
        query: featuredProducts,
      });

      setProducts(fetchedProducts);
      setDiscountProducts(fetchedDiscountProducts);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-center m-10">All Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  {products.length ? (
    products.map((product) => (
      <div
        key={product._id}
        className="relative p-6 border border-gray-300 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:scale-105 group"
      >
        {/* Image Section */}
        <div className="flex justify-center mb-4">
          <div className="w-48 h-48 overflow-hidden rounded-lg shadow-md group-hover:scale-110 transition-transform duration-300">
            <Image
              src={product.imageUrl}
              alt={product.title}
              width={800}
              height={800}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Title and Description */}
        <h2 className="text-xl font-semibold text-gray-800">{product.title}</h2>
        <p className="text-sm text-gray-600 mt-2 line-clamp-3">{product.description}</p>

        {/* Price and Stock */}
        <div className="flex justify-between items-center mt-4">
          <p className="text-lg font-bold text-gray-900">${product.price}</p>
          {product.priceWithoutDiscount && (
            <p className="text-sm line-through text-gray-500">
              Was ${product.priceWithoutDiscount}
            </p>
          )}
        </div>

        <div className="flex justify-between items-center mt-2">
          <p className="text-sm text-gray-600">{product.inventory} in stock</p>
          {product.tags && (
            <div className="flex gap-2">
              {product.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-200 text-xs py-1 px-2 rounded-full text-gray-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={() => addToCart && addToCart({
              _id: product._id,
              title: product.title,
              price: product.price,
              inventory: 1,
              image: product.imageUrl,
              description: product.description,
            })}
            className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
          >
            Add to Cart
          </button>
          <Link
            href={`Single-Product/${product._id}`}
            className="text-blue-500 hover:text-blue-700 font-semibold text-xs underline"
          >
            Full Page
          </Link>
        </div>
      </div>
    ))
  ) : (
    <p>No products available.</p>
  )}
</div>

    </div>
  );
}
