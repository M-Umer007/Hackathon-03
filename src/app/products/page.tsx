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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.length ? (
          products.map((product) => (
            <div
              key={product._id}
              className="p-6 border-2 border-black rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <h1 className="text-2xl font-semibold">{product.title}</h1>
              <div className="flex justify-center sm:justify-start mt-4">
                <div className="w-full sm:w-1/3 mx-auto">
                  <Image
                    src={product.imageUrl}
                    alt={product.title}
                    width={800}
                    height={800}
                    className="rounded-lg shadow-md"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-between items-center">
                <button
                  onClick={() => addToCart&&addToCart({
                    _id:product._id,
                    title: product.title,
                    price: product.price,
                    inventory: 1, // Or any default quantity
                    image: product.imageUrl, // Pass the product's image URL
                    description: product.description,
                  })}
                  className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                >
                  Add to Cart
                </button>
                <Link href={`Single-Product/${product._id}`} className="text-blue-500 hover:text-blue-700 font-semibold underline">
                  Link to full Page
                  </Link>
              </div>
              <p className="text-gray-700 mt-4">{product.description}</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                <p className="text-lg font-bold">${product.price}</p>
                {product.priceWithoutDiscount && (
                  <p className="text-sm line-through text-gray-500">
                    Was ${product.priceWithoutDiscount}
                  </p>
                )}
                <p className="text-sm text-gray-600">{product.inventory} in stock</p>
              </div>
              {product.tags && (
                <div className="flex gap-2 mt-4">
                  {product.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-200 text-sm py-1 px-2 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              {product.category && (
                <p className="text-sm text-gray-600 mt-4">
                  Category: {product.category.title}
                </p>
              )}
            </div>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </div>
  );
}
