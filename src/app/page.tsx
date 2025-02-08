"use client"

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
/* eslint-disable react-hooks/rules-of-hooks */


import {
  topchair,
  ourProducts,
  topProducts,
  ExploreNewAndPopularStyles,
} from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/fetch";
import Link from "next/link";
import Image from "next/image";
import { useContext, } from "react";
import { CartContext } from "@/cart/page";
import { useState, useEffect } from "react";


 type Product = {
  _id: string;
  title: string; // Changed from "name" to "title" to match the query
  description: string;
  price: number;
  priceWithoutDiscount?: number; // Optional, as it might not always be used
  badge?: string; // Optional
  inventory?: number; // Optional
  tags?: string[]; // Array of tags
  category?: {
    _id: string;
    title: string;
  }; // Nested category object
  imageUrl: string; // The URL for the image
};


  export default function Home() {
    const [HeadingChair, setHeadingChair] = useState<any>(null);
    const [NewandPopularStyles, setNewandPopularStyles] = useState<Product[]>([]);
    const [HomepageTopProducts, setHomepageTopProducts] = useState<Product[]>([]);
    const [ourProd, setOurProd] = useState<Product[]>([]);
  
    const cartContext = useContext(CartContext);
    const { addToCart } = cartContext || {};
  
    useEffect(() => {
      const fetchData = async () => {
        const headingChairData = await sanityFetch({ query: topchair });
        const newAndPopularStylesData = await sanityFetch({ query: ExploreNewAndPopularStyles });
        const homepageTopProductsData = await sanityFetch({ query: topProducts });
        const ourProductsData = await sanityFetch({ query: ourProducts });
  
        setHeadingChair(headingChairData);
        setNewandPopularStyles(newAndPopularStylesData);
        setHomepageTopProducts(homepageTopProductsData);
        setOurProd(ourProductsData);
      };
  
      fetchData();
    }, []);
  
    if (!cartContext) {
      return <div>Error: Cart context is not available.</div>;
    }
  
    const imageurl = HeadingChair?.imageUrl;
  return (
    <div className="max-w-[90vw] min-h-[100vh] mx-auto">
      {/* First Component */}
      <div className="w-[90vw] h-auto  flex justify-center  items-center mx-auto py-0  flex-col sm:flex-row">
        <div className=" w-auto sm:w-1/2 flex  items-start flex-col gap-5 font-bold ">
          <p>Welcome to chairy</p>
          <span className="text-5xl">Best Furniture.</span>
          <span className="text-5xl">Collection for your</span>
          <span className="text-5xl">interior.</span>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Shop Now
          </button>
        </div>
        <div className="w-1/2">
          {imageurl ? (
            <Image src={imageurl} alt="Logo" width={400} height={400} />
          ) : (
            <p>Loading...</p> // Optional fallback
          )}
        </div>
      </div>

      {/* Company Names */}
      <div className="w-[90vw] min-h-[30vh] flex justify-center items-center mx-auto flex-col sm:flex-row gap-10">
        <div className="w-1/3 sm:w-1/2">
          <Image src={"/Logo.png"} alt="Logo" width={70} height={70} />
        </div>
        <div className="w-1/3 sm:w-1/2">
          <Image src={"/Logo (1).png"} alt="Logo" width={70} height={70} />
        </div>

        <div className="w-1/3 sm:w-1/2">
          <Image src={"/Logo(2).png"} alt="Logo" width={70} height={70} />
        </div>
        <div className="w-1/3 sm:w-1/2">
          <Image src={"/Logo (3).png"} alt="Logo" width={70} height={70} />
        </div>

        <div className="w-1/3 sm:w-1/2">
          <Image src={"/Logo (4).png"} alt="Logo" width={70} height={70} />
        </div>
        <div className="w-1/3 sm:w-1/2">
          <Image src={"/Logo(5).png"} alt="Logo" width={70} height={70} />
        </div>

        <div className="w-1/3 sm:w-1/2">
          <Image src={"/Logo (6).png"} alt="Logo" width={70} height={70} />
        </div>
      </div>

      {/* Featured Products */}
      <div className="my-20 mx-auto flex flex-col items-center justify-center">
  <div className="text-start my-10">
    <h1 className="text-2xl sm:text-3xl font-semibold">Our Products</h1>
  </div>

  <div className="flex flex-wrap justify-center gap-10 mx-auto">
    {ourProd.slice(0, 5).map((product) => (
      <div
        key={product._id}
        className="relative group w-full sm:w-1/4 lg:w-1/4 xl:w-1/5 h-full bg-white shadow-lg rounded-lg overflow-hidden"
      >
        <Image
          src={product.imageUrl}
          alt={product.title || 'Product Image'}
          width={200}
          height={100}
          className="object-cover w-full h-48"
        />
        <div className="p-4 text-center">
          <h2 className="text-lg font-bold text-gray-800">{product.title}</h2>
          <p className="text-sm text-gray-600">Price: ${product.price}</p>
          <p className="text-sm text-gray-600">Stock: {product.inventory}</p>
        </div>

        {/* Hidden actions on hover */}
        <div
          className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <Link
            href={`Single-Product/${product._id}`}
            className="text-blue-500 hover:text-blue-700 font-semibold underline mb-2"
          >
            Link to full Page
          </Link>
          <button
            onClick={() =>
              addToCart &&
              addToCart({
                _id: product._id,
                title: product.title,
                price: product.price,
                inventory: 1, // Or any default quantity
                image: product.imageUrl, // Pass the product's image URL
                description: product.description,
              })
            }
            className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
          >
            Add to Cart
          </button>
        </div>
      </div>
    ))}
  </div>
</div>

  
  
        {/* Top Categories */}
        <div className="my-20 mx-10 gap-10 flex flex-col items-start justify-center">
  <div className="text-start">
    <h1 className="text-2xl sm:text-3xl font-bold mb-10">Top Categories</h1>
  </div>

  <div className="flex flex-col sm:flex-row gap-10 items-center">
    {HomepageTopProducts.map((product) => (
      <div
        className="w-3/4 sm:w-1/3 h-full relative group" // Added `relative` and `group` for hover effect
        key={product._id}
      >
        <div>
          <Image src={product.imageUrl} alt="Logo" width={400} height={400} />
        </div>
        <div className="mt-4 text-center">
          <h2 className="text-lg font-bold">{product.title}</h2>
          <p className="text-sm">Price: ${product.price}</p>
          <p className="text-sm">Stock: {product.inventory}</p>
        </div>

        <div
          className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <Link
            href={`Single-Product/${product._id}`}
            className="text-blue-500 hover:text-blue-700 font-semibold underline mb-2"
          >
            Link to full Page
          </Link>
          <button
            onClick={() =>
              addToCart &&
              addToCart({
                _id: product._id,
                title: product.title,
                price: product.price,
                inventory: 1, // Or any default quantity
                image: product.imageUrl, // Pass the product's image URL
                description: product.description,
              })
            }
            className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
          >
            Add to Cart
          </button>
        </div>
      </div>
    ))}
  </div>
</div>


    {/* Explore New and Popular Styles */}
{/* Explore New and Popular Styles */}
<div className="flex flex-col sm:flex-row gap-10 mx-10 my-20">
  {/* Left Div with one image */}
  <div className="w-full sm:w-1/2">
    <div>
      <p className="text-2xl sm:text-3xl font-bold mb-10 text-center text-gray-800">
        EXPLORE NEW AND POPULAR STYLES
      </p>
    </div>
    <div>
      {(() => {
        const product = NewandPopularStyles.find(
          (product) => product._id === "YTjpX7gIRs7VphrWQPXwtc"
        );

        return product ? (
          <div className="bg-white shadow-xl rounded-lg p-6 overflow-hidden">
            <div>
              <Image
                src={product.imageUrl}
                alt="Large Image"
                width={400}
                height={400}
                className="object-cover w-full h-72 rounded-lg"
              />
            </div>
            <div className="mt-6 text-center">
              <h2 className="text-2xl font-semibold text-gray-800">{product.title}</h2>
              <p className="text-sm text-gray-600">Price: ${product.price}</p>
              <p className="text-sm text-gray-600">Stock: {product.inventory}</p>
              <div className="mt-4 space-x-4">
                <Link
                  href={`Single-Product/${product._id}`}
                  className="text-blue-600 hover:text-blue-800 font-semibold underline"
                >
                  View Full Product Page
                </Link>
                <button
                  onClick={() =>
                    addToCart &&
                    addToCart({
                      _id: product._id,
                      title: product.title,
                      price: product.price,
                      inventory: 1,
                      image: product.imageUrl,
                      description: product.description,
                    })
                  }
                  className="px-4 py-2 bg-green-600 text-white text-xs font-bold uppercase rounded hover:bg-green-500 focus:outline-none focus:bg-green-500"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p>Product not found</p>
        );
      })()}
    </div>
  </div>

  {/* Right Div with 4 images */}
  <div className="w-full sm:w-1/2 grid grid-cols-2 sm:grid-cols-2 grid-rows-2 sm:grid-rows-2 gap-6">
    {NewandPopularStyles.map((product) => (
      <div
        key={product._id}
        className="relative group w-full h-72 bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
      >
        <div className="w-full h-full relative group">
          <Image
            src={product.imageUrl}
            alt="Product Image"
            width={200}
            height={200}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        {/* Hidden actions on hover */}
        <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <h2 className="text-white font-bold text-lg mb-2">{product.title}</h2>
          <p className="text-white text-sm mb-2">Price: ${product.price}</p>
          <Link
            href={`Single-Product/${product._id}`}
            className="text-white text-sm mb-2 px-4 py-2 bg-blue-600 rounded hover:bg-blue-500"
          >
            View Full Product Page
          </Link>
          <button
            onClick={() =>
              addToCart &&
              addToCart({
                _id: product._id,
                title: product.title,
                price: product.price,
                inventory: 1,
                image: product.imageUrl,
                description: product.description,
              })
            }
            className="px-4 py-2 bg-green-600 text-white text-sm font-bold uppercase rounded hover:bg-green-500"
          >
            Add to Cart
          </button>
        </div>
      </div>
    ))}
  </div>
</div>







      {/* Our Products */}
      <div className="my-20 mx-auto flex flex-col items-center justify-center">
  {/* Section Title */}
  <div className="text-start my-10">
    <h1 className="text-2xl sm:text-3xl font-semibold text-center">Our Products</h1>
  </div>

  {/* Product Grid */}
  <div className="flex flex-col sm:flex-row gap-10 mx-auto">
    {/* First Row */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {ourProd.slice(0, 4).map((product) => (
        <div
          key={product._id}
          className="w-full bg-white border rounded-lg shadow-md overflow-hidden relative group"
        >
          {/* Image */}
          <div>
            <Image
              src={product.imageUrl}
              alt={product.title || "Product Image"}
              width={300}
              height={300}
              className="object-cover w-full h-72"
            />
          </div>

          {/* Product Info */}
          <div className="p-4 text-center">
            <h2 className="text-lg font-semibold">{product.title}</h2>
            <p className="text-sm text-gray-700">Price: ${product.price}</p>
            <p className="text-sm text-gray-700">Stock: {product.inventory}</p>
            <div className="mt-4 space-x-4 block md:hidden">
              {/* Full Page Link */}
              <Link
                href={`Single-Product/${product._id}`}
                className="text-blue-600 font-semibold underline text-sm"
              >
                Full Page
              </Link>

              {/* Add to Cart Button */}
              <button
                onClick={() =>
                  addToCart &&
                  addToCart({
                    _id: product._id,
                    title: product.title,
                    price: product.price,
                    inventory: 1,
                    image: product.imageUrl,
                    description: product.description,
                  })
                }
                className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
              >
                Add to Cart
              </button>
            </div>
          </div>

          {/* Hover Effect for Large Screens */}
          <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out flex justify-center items-center">
          <div className="hidden md:block">
            <div className="mt-4 space-x-4">
                {/* Full Page Link */}
                <Link
                  href={`Single-Product/${product._id}`}
                  className="text-blue-600 font-semibold underline text-sm"
                >
                  Full Page
                </Link>
                {/* Add to Cart Button */}
                <button
                  onClick={() =>
                    addToCart &&
                    addToCart({
                      _id: product._id,
                      title: product.title,
                      price: product.price,
                      inventory: 1,
                      image: product.imageUrl,
                      description: product.description,
                    })
                  }
                  className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                >
                  Add to Cart
                </button>
              </div>
          </div>
          </div>
        </div>
      ))}
    </div>
  </div>

  {/* Second Row */}
  <div className="flex flex-col sm:flex-row gap-10 mx-auto mt-10">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {ourProd.slice(5, 10).map((product) => (
        <div
          key={product._id}
          className="w-full bg-white border rounded-lg shadow-md overflow-hidden relative group"
        >
          {/* Image */}
          <div>
            <Image
              src={product.imageUrl}
              alt={product.title || "Product Image"}
              width={300}
              height={300}
              className="object-cover w-full h-72"
            />
          </div>

          {/* Product Info */}
          <div className="p-4 text-center">
            <h2 className="text-lg font-semibold">{product.title}</h2>
            <p className="text-sm text-gray-700">Price: ${product.price}</p>
            <p className="text-sm text-gray-700">Stock: {product.inventory}</p>
            <div className="mt-4 space-x-4 block md:hidden">
              {/* Full Page Link */}
              <Link
                href={`Single-Product/${product._id}`}
                className="text-blue-600 font-semibold underline text-sm"
              >
                Full Page
              </Link>

              {/* Add to Cart Button */}
              <button
                onClick={() =>
                  addToCart &&
                  addToCart({
                    _id: product._id,
                    title: product.title,
                    price: product.price,
                    inventory: 1,
                    image: product.imageUrl,
                    description: product.description,
                  })
                }
                className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
              >
                Add to Cart
              </button>
            </div>
          </div>

          {/* Hover Effect for Large Screens */}
          <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out flex justify-center items-center">
          <div className="hidden md:block">
            <div className="mt-4 space-x-4">
                {/* Full Page Link */}
                <Link
                  href={`Single-Product/${product._id}`}
                  className="text-blue-600 font-semibold underline text-sm"
                >
                  Full Page
                </Link>
                {/* Add to Cart Button */}
                <button
                  onClick={() =>
                    addToCart &&
                    addToCart({
                      _id: product._id,
                      title: product.title,
                      price: product.price,
                      inventory: 1,
                      image: product.imageUrl,
                      description: product.description,
                    })
                  }
                  className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                >
                  Add to Cart
                </button>
              </div>
          </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>


    </div>
  );
}