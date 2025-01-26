import { ExploreNewAndPopularStyles, allProducts } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/fetch";
import Image from "next/image";
import Link from "next/link";
import React from "react";

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

// You can use the params directly here in the App Router
export default async function Test({ params }: { params: Promise<{ productId: string }> }) {
  const { productId } = await params;

  const products: Product[] = await sanityFetch({ query: allProducts });
  const style: Product[] = await sanityFetch({
    query: ExploreNewAndPopularStyles,
  });

  // Find the product based on productId
  const product = products.find((product) => product._id === productId);

  if (!product) return <div>Product not found</div>;

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-10">
        <div className="w-full sm:w-1/2 lg:w-1/3">
          <Image src={product.imageUrl} alt={product.title} width={400} height={400} />
        </div>
        <div className="w-auto sm:w-1/2 flex items-start flex-col gap-5 font-bold">
          <span className="text-5xl">{product.title}</span>
          <span className="text-5xl">{product.tags}</span>

          <div className="relative w-max">
            <Image
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAP8AAACUCAMAAABr5Q9hAAAAA1BMVEUBquUiMBV5AAAAO0lEQVR4nO3BAQ0AAADCoPdPbQ8HFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPwalAAAARCNrggAAAAASUVORK5CYII="
              alt="Shop Now"
              width={120}
              height={120}
            />
            <span className="absolute inset-0 flex items-center justify-center text-white font-bold">
              {product.price}$ USD
            </span>
          </div>
          <p>{product.description}</p>
          <div className="w-max">
            <Image src="https://wallpapers.com/images/hd/shop-now-button-black-background-27b6ebqxi85cmbud.jpg" alt="Shop Now" width={120} height={120} />
          </div>
        </div>
      </div>

      <div>
        <div className="my-24 mx-10 font-bold flex justify-between">
          <p className="text-3xl">Featured Products</p>
          <Link href={`/products`}>
            <button
              type="submit"
              className="w-[30vw] sm:w-[7vw] border-b-2 border-black focus:outline-none focus:ring-0 text-black"
            >
              View all
            </button>
          </Link>
        </div>
        <div>
          <div className="flex flex-col sm:flex-nowrap sm:flex-row justify-center gap-12 mx-auto my-5 overflow-x-auto">
            {style.map((item) => (
              <div className="w-full h-full sm:w-1/5 lg:w-1/5 xl:w-1/5" key={item._id}>
                <Image src={item.imageUrl} alt={item.title} width={300} height={300} className="object-cover w-full h-full" />
                <div className="mt-4 text-center">
                  <h2 className="text-lg font-bold">{item.title}</h2>
                  <p className="text-sm">Price: ${item.price}</p>
                  <p className="text-sm">Stock: {item.inventory}</p>
                  <Link href={`/Single-Product/${item._id}`} className="text-blue-500 hover:text-blue-700 font-semibold underline">
                    Link to full Page
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
