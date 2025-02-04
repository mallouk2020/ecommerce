import React, { useState } from 'react';
// import './CheckoutPage.css';
import  { useRef } from 'react';
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import toast from 'react-hot-toast';

import { useStateContext } from '../context/StateContext';
import { urlFor } from '../lib/client';
import Image from 'next/image';


















const CheckoutPage = () => {

  const cartRef = useRef();
  const { totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuanitity, onRemove } = useStateContext();


  const [address, setAddress] = useState({
    fullName: '',
    street: '',
    city: '',
    postalCode: '',
    country: ''
  });

  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOrderConfirmed(true);
  };

  return (
    <div className="checkout-container">

<div>
      {!orderConfirmed ? (
        <form onSubmit={handleSubmit} className="checkout-form">
          <h2 className="checkout-title">تأكيد الطلب</h2>

          <label className="checkout-label">
            الاسم :
            <input
              type="text"
              name="fullName"
              value={address.fullName}
              onChange={handleChange}
              required
              className="checkout-input"
            />
          </label>

          <label className="checkout-label">
            الشارع:
            <input
              type="text"
              name="street"
              value={address.street}
              onChange={handleChange}
              required
              className="checkout-input"
            />
          </label>

          <label className="checkout-label">
            المدينة:
            <input
              type="text"
              name="city"
              value={address.city}
              onChange={handleChange}
              required
              className="checkout-input"
            />
          </label>

          <label className="checkout-label">
            الرمز البريدي:
            <input
              type="text"
              name="postalCode"
              value={address.postalCode}
              onChange={handleChange}
              required
              className="checkout-input"
            />
          </label>

          <label className="checkout-label">
            البلد:
            <input
              type="text"
              name="country"
              value={address.country}
              onChange={handleChange}
              required
              className="checkout-input"
            />
          </label>

          <button type="submit" className="checkout-button">
            تأكيد الطلب
          </button>
        </form>
      ) : (
        <div className="confirmation-message">
          <h2>تم تأكيد طلبك!</h2>
          <p>شكرًا لك، {address.fullName}، على طلبك.</p>
        </div>
      )}
</div>



       <div>
        <div>
       
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">({totalQuantities} items)</span>



        {/* {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty</h3>

            <Link href="/">
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="btn"
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )} */}



        <div className="product-container">
        {cartItems.length >= 1 && cartItems.map((item) => (
        item && item.name && item.price && item.image ? (  // التحقق هنا
        <div className="product" key={item._id}>

          {console.log(urlFor(item.image[0]))}

          <Image 
          alt={item.name} 
          src={urlFor(item.image[0].asset).url()} // استخدام urlFor بشكل صحيح
          className="cart-product-image" 
          width={70} // تحديد العرض والارتفاع بشكل صحيح
          height={70}
          unoptimized
        />
         <div className="item-desc">
            <div className="flex top">
             <h5>{item.name}</h5>
             <h4>${item.price}</h4>
           </div>

        <div className="flex bottom">
          <p className="quantity-desc">
            <span className="minus" onClick={() => toggleCartItemQuanitity(item._id, 'dec')}>
              <AiOutlineMinus />
            </span>
            <span className="num">{item.quantity}</span>
            <span className="plus" onClick={() => toggleCartItemQuanitity(item._id, 'inc')}>
              <AiOutlinePlus />
            </span>
          </p>



          <button
            type="button"
            className="remove-item"
            onClick={() => onRemove(item)}>
              
            <TiDeleteOutline />

          </button>

          
        </div>
        </div>
        </div>
          ) : null

          ))}
        </div>
        {cartItems.length >= 1 && (
          <div>
            <div >
              <h3>Subtotal:</h3>
              <h3>${totalPrice}</h3>
            </div>
          </div>
        )}
        </div>
    </div>
  

      
    </div>
  );
};

export default CheckoutPage;








// const Cart = () => {
//   const cartRef = useRef();
//   const { totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuanitity, onRemove } = useStateContext();

//   const handleCheckout = async () => {
//     const stripe = await getStripe();

//     const response = await fetch('/api/stripe', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(cartItems),
//     });

//     if(response.statusCode === 500) return;
    
//     const data = await response.json();

//     toast.loading('Redirecting...');

//     stripe.redirectToCheckout({ sessionId: data.id });
//   }

//   return (
//     <div className="cart-wrapper" ref={cartRef}>
//       <div className="cart-container">
//         <button
//         type="button"
//         className="cart-heading"
//         onClick={() => setShowCart(false)}>
//           <AiOutlineLeft />
//           <span className="heading">Your Cart</span>
//           <span className="cart-num-items">({totalQuantities} items)</span>
//         </button>

//         {cartItems.length < 1 && (
//           <div className="empty-cart">
//             <AiOutlineShopping size={150} />
//             <h3>Your shopping bag is empty</h3>
//             <Link href="/">
//               <button
//                 type="button"
//                 onClick={() => setShowCart(false)}
//                 className="btn"
//               >
//                 Continue Shopping
//               </button>
//             </Link>
//           </div>
//         )}

//         <div className="product-container">
//         {cartItems.length >= 1 && cartItems.map((item) => (
//   item && item.name && item.price && item.image ? (  // التحقق هنا
//     <div className="product" key={item._id}>
//       <img src={urlFor(item.image[0])} className="cart-product-image" />

//       <div className="item-desc">
//         <div className="flex top">
//           <h5>{item.name}</h5>
//           <h4>${item.price}</h4>
//         </div>

//         <div className="flex bottom">
//           <p className="quantity-desc">
//             <span className="minus" onClick={() => toggleCartItemQuanitity(item._id, 'dec')}>
//               <AiOutlineMinus />
//             </span>
//             <span className="num">{item.quantity}</span>
//             <span className="plus" onClick={() => toggleCartItemQuanitity(item._id, 'inc')}>
//               <AiOutlinePlus />
//             </span>
//           </p>

//           <button
//             type="button"
//             className="remove-item"
//             onClick={() => onRemove(item)}
//           >
//             <TiDeleteOutline />
//           </button>
//         </div>
//       </div>
//     </div>
//   ) : null

//           ))}
//         </div>
//         {cartItems.length >= 1 && (
//           <div className="cart-bottom">
//             <div className="total">
//               <h3>Subtotal:</h3>
//               <h3>${totalPrice}</h3>
//             </div>
//             <div className="btn-container">
//               <button type="button" className="btn" onClick={handleCheckout}>
//                 Pay with Stripe
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default Cart