import { defineQuery } from "next-sanity";


export const allProducts = defineQuery(`
    *[_type == "products"]{
      _id,
      title,
      description,
      price,
      priceWithoutDiscount,
      badge,
      inventory,
      tags,
      category->{_id, title},
      "imageUrl": image.asset->url
    }
  `);
  
export const ourProducts = defineQuery(`
    *[_type == "products"][0..11]{
      _id,
      title,
      description,
      price,
      priceWithoutDiscount,
      badge,
      inventory,
      tags,
      category->{_id, title},
      "imageUrl": image.asset->url
    }
  `);
  
export const featuredProducts = defineQuery(`
    *[_type == "products"][7..11]{
      _id,
      title,
      description,
      price,
      priceWithoutDiscount,
      badge,
      inventory,
      tags,
      category->{_id, title},
      "imageUrl": image.asset->url
    }
  `);
  
export const topProducts = defineQuery(`
    *[_type == "products"][5..8]{
      _id,
      title,
      description,
      price,
      priceWithoutDiscount,
      badge,
      inventory,
      tags,
      category->{_id, title},
      "imageUrl": image.asset->url
    }
  `);
export const topchair = defineQuery(`
    *[_type == "products"][4]{
      _id,
      title,
      description,
      price,
      priceWithoutDiscount,
      badge,
      inventory,
      tags,
      category->{_id, title},
      "imageUrl": image.asset->url
    }
  `);
  
export const    ExploreNewAndPopularStyles = defineQuery(`
    *[_type == "products"][1...5]{
      _id,
      title,
      description,
      price,
      priceWithoutDiscount,
      badge,
      inventory,
      tags,
      category->{_id, title},
      "imageUrl": image.asset->url
    }
`);
  