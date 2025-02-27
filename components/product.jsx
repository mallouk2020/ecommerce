import React from 'react';
import Link from 'next/link';
import { urlFor } from '../lib/client';

const Product = ({ product: { image, name, slug, price } }) => {
  return (
    <div className='product-card'>
      <Link href={`/product/${slug.current}`}>
        <div className="product-card">
          
          {/* {console.log(imageUrl)} */}
            <img
              src={urlFor(image[0])}
              width={250}
              height={250}
              className="product-image"
              alt={name}  
            />
        
          {console.log("Image Object:", image)}

          <p className="product-name">{name}</p>
          <p className="product-price">${price}</p>
        </div>
      </Link>
    </div>
  );
}

export default Product;
