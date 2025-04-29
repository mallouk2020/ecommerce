import React, { useState } from 'react';
import Link from 'next/link';
import { urlFor } from '../lib/client';
import { useStateContext } from '../context/StateContext';




// التصميم الأول (كلاسيكي)
const ProductStyle1 = ({ product: { image, name, slug, price } }) => {
  return (
    <div style={styles.style1.productContainer}>
      <Link href={`/product/${slug.current}`} style={styles.style1.link}>
        <div style={styles.style1.productCard}>
          <div style={styles.style1.imageContainer}>
            <img
              src={urlFor(image[0])}
              style={styles.style1.productImage}
              alt={name}
            />
          </div>
          <div style={styles.style1.productInfo}>
            <p style={styles.style1.productName}>{name}</p>
            <p style={styles.style1.productPrice}>${price}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}


// التصميم الثاني (مبسط)
const ProductStyle2 = ({ product: { image, name, slug, price } }) => {
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



const Product = ({ product }) => {
  
    const { selectedStyle, setSelectedStyle,  } = useStateContext();
  
  
  return selectedStyle === 1 
    ? <ProductStyle2 product={product} />
    : <ProductStyle1 product={product} />;
}



// const Product = ({ product: { image, name, slug, price } }) => {
//   return (
//     <div className='product-card'>
//       <Link href={`/product/${slug.current}`}>
//         <div className="product-card">
          
//           {/* {console.log(imageUrl)} */}
//             <img
//               src={urlFor(image[0])}
//               width={250}
//               height={250}
//               className="product-image"
//               alt={name}  
//             />
        
//           {console.log("Image Object:", image)}

//           <p className="product-name">{name}</p>
//           <p className="product-price">${price}</p>
//         </div>
//       </Link>
//     </div>
//   );
// }



const styles = {
  style1: {
    productContainer: {
      margin: '15px',
      flex: '1 1 250px',
      maxWidth: '280px',
      minWidth: '220px',
      perspective: '1000px', // لإضافة عمق للتأثيرات
    },
    link: {
      textDecoration: 'none',
      color: 'inherit',
      display: 'block',
      height: '100%',
    },
    productCard: {
      background: '#fff',
      borderRadius: '14px',
      overflow: 'hidden',
      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.08)',
      transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      border: '1px solid rgba(0, 0, 0, 0.05)',
      ':hover': {
        transform: 'translateY(-8px) scale(1.02)',
        boxShadow: '0 12px 24px rgba(0, 0, 0, 0.12)',
        borderColor: '#2563eb',
      },
    },
    imageContainer: {
      width: '100%',
      paddingTop: '100%',
      position: 'relative',
      backgroundColor: '#f8fafc',
      overflow: 'hidden',
    },
    productImage: {
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      objectFit: 'contain',
      padding: '25px',
      transition: 'all 0.5s ease',
      transform: 'scale(0.95)',
      ':hover': {
        transform: 'scale(1)',
      },
    },
    productInfo: {
      padding: '20px',
      textAlign: 'center',
      flex: '1',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      background: 'linear-gradient(to bottom, #fff, #f9fafb)',
    },
    productName: {
      fontSize: '16px',
      fontWeight: '600',
      margin: '0 0 10px 0',
      color: '#1e293b',
      lineHeight: '1.4',
      transition: 'color 0.3s ease',
      ':hover': {
        color: '#2563eb',
      },
    },
    productPrice: {
      fontSize: '18px',
      fontWeight: '800',
      color: '#dc2626', // الأحمر
      margin: '0',
      padding: '5px 0',
      position: 'relative',
      display: 'inline-block',
      '::after': {
        content: '""',
        position: 'absolute',
        bottom: '0',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '30px',
        height: '2px',
        background: '#2563eb', // الأزرق
        transition: 'width 0.3s ease',
      },
      ':hover::after': {
        width: '50px',
      },
    },
  }
}

export default Product;

















