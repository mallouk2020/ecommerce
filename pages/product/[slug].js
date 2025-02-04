import React, { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import Image from 'next/image';
import { client, urlFor } from '../../lib/client';
import { Product } from '../../components';
import { useStateContext } from '../../context/StateContext';
import Link from 'next/link';


const ProductDetails = ({ product, products }) => {



 
  const [index, setIndex] = useState(0);
  const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();

  if (!product) {
    return <p>جاري تحميل المنتج...</p>
  }
 const { image, name, details, price } = product;


  const handleBuyNow = () => {
    onAdd(product, qty);

    setShowCart(true);
  }
  const handleRedirectToPayment = () => {
    window.location.href = "/payment";
  };
  
  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
          <Image
                            alt={name || 'Product Image'}
                            src={image?.[index]?.asset ? urlFor(image[index].asset).url() : '/default-image.jpg'}
                            className="product-detail-image"
                            width={500}
                            height={500}
                            unoptimized // تجاوز القيود من Next
                        />          </div>
          <div className="small-images-container">
          {image?.map((item, i) => (
              <Image 
              alt=''
                key={i}
                src={urlFor(item.asset).url()}
                className={i === index ? 'small-image selected-image' : 'small-image'}
                onMouseEnter={() => setIndex(i)}
                width={100}
                height={100}
                unoptimized
              />
            ))}

          </div>
        </div>

        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>
              (20)
            </p>
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
          <p className="price">${price}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}><AiOutlineMinus /></span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={incQty}><AiOutlinePlus /></span>
            </p>
          </div>
          <div className="buttons">
            <button type="button" className="add-to-cart" onClick={() => onAdd(product, qty)}>Add to Cart</button>
            <button type="button" className="buy-now" onClick={handleBuyNow}>Buy Now</button>



 
{/* <button type="button" onClick={handleRedirectToPayment}>Buy </button> */}




          </div>
        </div>
      </div>

      <div className="maylike-products-wrapper">
          <h2>You may also like</h2>
          <div className="marquee">
            <div className="maylike-products-container track">
              {products.map((item) => (
                <Product key={item._id} product={item} />
              ))}
            </div>
          </div>
      </div>
    </div>
  )
}

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }
  `;

  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: { 
      slug: product.slug.current
    }
  }));

  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps = async ({ params: { slug }}) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]'
  
  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  console.log(product);

  return {
    props: { products, product }
  }
}

export default ProductDetails