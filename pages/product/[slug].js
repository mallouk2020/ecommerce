import React, { useEffect, useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import Image from 'next/image';
import { client, urlFor } from '../../lib/client';
import { Product } from '../../components';
import { useStateContext } from '../../context/StateContext';
import Link from 'next/link';



const ProductDetails1 = ({ product, products }) => {




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


  const ProductDetails2 = ({ product, products }) => {
  const [index, setIndex] = useState(0);
  const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  if (!product) {
    return <p>جاري تحميل المنتج...</p>
  }

  const { image, name, details, price } = product;

  const handleBuyNow = () => {
    onAdd(product, qty);
    setShowCart(true);
  }

  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '40px 20px',
    },
    productContainer: {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      gap: '40px',
    },
    imageSection: {
      flex: 1,
    },
    mainImage: {
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.3s ease',
    },
    thumbnails: {
      display: 'flex',
      gap: '10px',
      marginTop: '20px',
      flexWrap: 'wrap',
    },
    thumbnail: {
      borderRadius: '8px',
      overflow: 'hidden',
      cursor: 'pointer',
      border: '2px solid transparent',
      transition: 'all 0.3s ease',
    },
    detailsSection: {
      flex: 1,
    },
    title: {
      fontSize: '32px',
      fontWeight: '700',
      color: '#1e293b',
      marginBottom: '15px',
    },
    price: {
      fontSize: '28px',
      fontWeight: '800',
      color: '#dc2626',
      margin: '20px 0',
    },
    quantityControls: {
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      margin: '25px 0',
    },
    quantityButton: {
      background: '#2563eb',
      color: 'white',
      border: 'none',
      borderRadius: '50%',
      width: '30px',
      height: '30px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    addToCart: {
      background: '#2563eb',
      color: 'white',
      border: 'none',
      padding: '12px 30px',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    buyNow: {
      background: '#dc2626',
      color: 'white',
      border: 'none',
      padding: '12px 30px',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    relatedProducts: {
      marginTop: '60px',
    },
  };
  

  return (
    <div style={styles.container}>
      <div style={styles.productContainer}>
        {/* Image Section */}
        <div style={styles.imageSection}>
          <div style={styles.mainImage}>
            <Image
              alt={name || 'Product Image'}
              src={image?.[index]?.asset ? urlFor(image[index].asset).url() : '/default-image.jpg'}
              layout="responsive"
              width={500}
              height={500}
              unoptimized
            />
          </div>
          <div style={styles.thumbnails}>
            {image?.map((item, i) => (
              <div
                key={i}
                style={{
                  ...styles.thumbnail,
                  ...(i === index ? { borderColor: '#2563eb' } : {})
                }}
                onMouseEnter={() => setIndex(i)}
              >
                <Image
                  alt=""
                  src={urlFor(item.asset).url()}
                  width={80}
                  height={80}
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>

        {/* Details Section */}
        <div style={styles.detailsSection}>
          <h1 style={styles.title}>{name}</h1>
          <div className="reviews" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ display: 'flex' }}>
              <AiFillStar color="#f59e0b" />
              <AiFillStar color="#f59e0b" />
              <AiFillStar color="#f59e0b" />
              <AiFillStar color="#f59e0b" />
              <AiOutlineStar color="#f59e0b" />
            </div>
            <p>(20)</p>
          </div>

          <h4>Details:</h4>
          <p>{details}</p>

          <p style={styles.price}>${price}</p>

          <div style={styles.quantityControls}>
            <h3>Quantity:</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button style={styles.quantityButton} onClick={decQty}>
                <AiOutlineMinus />
              </button>
              <span style={{ fontSize: '18px', fontWeight: '600' }}>{qty}</span>
              <button style={styles.quantityButton} onClick={incQty}>
                <AiOutlinePlus />
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '15px', marginTop: '30px', flexWrap: 'wrap' }}>
            <button style={styles.addToCart} onClick={() => onAdd(product, qty)}>
              Add to Cart
            </button>
            <button style={styles.buyNow} onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div style={styles.relatedProducts}>
        <h2 style={{ fontSize: '24px', marginBottom: '30px' }}>You may also like</h2>
        <div style={{ display: 'flex', overflowX: 'auto', gap: '20px', padding: '10px 0' }}>
          {products.map((item) => (
            <Product key={item._id} product={item} />
          ))}
        </div>
      </div>
    </div>
  )
};


const ProductDetails = ({ product, products }) => {

  const { selectedStyle, setSelectedStyle, } = useStateContext();


  return selectedStyle === 1
    ? <ProductDetails1 product={product} products={products} />
    : <ProductDetails2 product={product} products={products} />;
}



// باقي الكود (getStaticPaths و getStaticProps) يبقى كما هو

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

export const getStaticProps = async ({ params: { slug } }) => {
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