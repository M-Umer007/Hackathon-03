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
      <div className="my-20 mx-auto flex flex-col items-center justify-center ">
        <div className="text-start my-10">
          <h1 className="text-2xl sm:text-3xl font-semibold">Our Products</h1>
        </div>

        <div className="flex flex-col sm:flex-row gap-10 mx-auto">


  
            {ourProd.slice(0, 5).map((product) => (
          
              <div className="w-full sm:w-1/4 lg:w-1/4 xl:w-1/5 h-full" key={product._id}>
                <Image
                  src={product.imageUrl}
                  alt={product.title || "Product Image"}
                  width={200}
                  height={100}
                  className="object-cover w-full h-full"
                />
                <div className="mt-4 text-center">
                  <h2 className="text-lg font-bold">{product.title}</h2>
                  <p className="text-sm">Price: ${product.price}</p>
                  <p className="text-sm">Stock: {product.inventory}</p>
                  <Link href={`Single-Product/${product._id}`} className="text-blue-500 hover:text-blue-700 font-semibold underline">
                  Link to full Page
                  </Link>
                  <button
                    onClick={() => addToCart && addToCart({
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
                </div>
              </div>
            

            ))}

  
          </div>
        </div>
  
  
        {/* Top Categories */}
        <div className="my-20 mx-10 gap-10 flex flex-col items-start justify-center">
          <div className="text-start">
            <h1 className="text-2xl sm:text-3xl font-bold mb-10">
              Top Categories
            </h1>
          </div>
  
          <div className="flex flex-col sm:flex-row gap-10 items-center">
            {HomepageTopProducts.map((product) => (
              <div className="w-3/4 sm:w-1/3 h-full" key={product._id}>
                <div className="">
                  <Image src={product.imageUrl} alt="Logo" width={400} height={400} />
                </div>
                <div className="mt-4 text-center">
                  <h2 className="text-lg font-bold">{product.title}</h2>
                  <p className="text-sm">Price: ${product.price}</p>
                  <p className="text-sm">Stock: {product.inventory}</p>
                  <Link href={`Single-Product/${product._id}`} className="text-blue-500 hover:text-blue-700 font-semibold underline">
                  Link to full Page
                  </Link>
                  <button
                    onClick={() => addToCart  && addToCart({
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
                </div>
            </div>
          ))}
        </div>
      </div>

      {/* Explore New and popular Styles */}
      <div className="flex flex-col sm:flex-row gap-10 mx-10 my-20">
        {/* Left Div with one image */}
        <div className="w-full sm:w-1/2">
          <div>
            <p className="text-2xl sm:text-3xl font-bold mb-10">
              EXPLORE NEW AND POPULAR STYLES
            </p>
          </div>
          <div>
            {(() => {
             const product = NewandPopularStyles.find((product) => 
              product._id === "YTjpX7gIRs7VphrWQPXwtc");

              return product ? (
                <div>
                  <div>
                    <Image
                      src={product.imageUrl} // Replace with your correct image field if necessary
                      alt="Large Image"
                      width={400}
                      height={400}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="mt-4 text-center">
                  <h2 className="text-lg font-bold">{product.title}</h2>
                  <p className="text-sm">Price: ${product.price}</p>
                  <p className="text-sm">Stock: {product.inventory}</p>
                  <Link href={`Single-Product/${product._id}`} className="text-blue-500 hover:text-blue-700 font-semibold underline">
                  Link to full Page
                  </Link>
                  <button
                    onClick={() => addToCart  && addToCart({
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
                </div>
                </div>
              ) : (
                <p>Product not found</p>
              );
            })()}
          </div>


        </div>

        {/* Right Div with 4 images */}
        <div className="w-full sm:w-1/2 grid grid-cols-2 sm:grid-cols-2 grid-rows-2 sm:grid-rows-2 gap-2">
          {NewandPopularStyles.map((product) => (
            <div key={product._id}>
              
              <div>
                <Image
                  src={product.imageUrl} // Replace with your image path
                  alt="Image 1"
                  width={200}
                  height={200}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="mt-4 text-center">
                  <h2 className="text-lg font-bold">{product.title}</h2>
                  <p className="text-sm">Price: ${product.price}</p>
                  <p className="text-sm">Stock: {product.inventory}</p>
                  <Link href={`Single-Product/${product._id}`} className="text-blue-500 hover:text-blue-700 font-semibold underline">
                  Link to full Page
                  </Link>
                  <button
                    onClick={() => addToCart  && addToCart({
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
                </div>
            </div>
          ))}
        </div>
      </div>


      {/* Our Products */}
      <div className="my-20 mx-auto flex flex-col items-center justify-center ">
        <div className="text-start my-10">
          <h1 className="text-2xl sm:text-3xl font-semibold">Our Products</h1>
        </div>

        <div className="flex flex-col sm:flex-row gap-10 mx-auto">
          {ourProd.slice(0, 4).map((product) => (
            <div className="w-full sm:w-1/4 lg:w-1/4 xl:w-1/5 " key={product._id}>
              <div>
                <Image
                  src={product.imageUrl}
                  alt={product.title || "Product Image"}
                  width={300}
                  height={300}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="mt-4 text-center">
                  <h2 className="text-lg font-bold">{product.title}</h2>
                  <p className="text-sm">Price: ${product.price}</p>
                  <p className="text-sm">Stock: {product.inventory}</p>
                  <Link href={`Single-Product/${product._id}`} className="text-blue-500 hover:text-blue-700 font-semibold underline">
                  Link to full Page
                  </Link>
                  <button
                    onClick={() => addToCart  && addToCart({
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
                </div>
                </div>
           
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-10 mx-auto mt-10">
          {ourProd.slice(5, 10).map((product) => (
            <div className="w-full sm:w-1/4 lg:w-1/4 xl:w-1/5 " key={product._id}>
              <div>
                <Image
                  src={product.imageUrl}
                  alt={product.title || "Product Image"}
                  width={300}
                  height={300}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="mt-4 text-center">
                  <h2 className="text-lg font-bold">{product.title}</h2>
                  <p className="text-sm">Price: ${product.price}</p>
                  <p className="text-sm">Stock: {product.inventory}</p>
                  <Link href={`Single-Product/${product._id}`} className="text-blue-500 hover:text-blue-700 font-semibold underline">
                  Link to full Page
                  </Link>
                  <button
                    onClick={() => addToCart  && addToCart({
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
                </div>
                </div>
        
          ))}
        </div>
      </div>


    </div>

  );
}
