import React, { useState } from 'react';
import { useRef } from 'react';
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import toast from 'react-hot-toast';
import { useStateContext } from '../context/StateContext';
import { urlFor } from '../lib/client';
import Image from 'next/image';
import { client } from '../lib/client'; // تأكد من أنك تستورد عميل Sanity



const Payment = () => {










  
  const cartRef = useRef();
  const { totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuanitity, onRemove } = useStateContext();

  const [formData, setFormData] = useState({
    fullName: '',
    city: '',
    fullAddress: '',
    phone: '',
    email: '',
    paymentMethod: 'cash' // Default to cash on delivery
  });

  setShowCart(false);

  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setOrderConfirmed(true);
  // };






  

  console.log("Token exists:", !!process.env.NEXT_PUBLIC_SANITY_TOKEN);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const order = {
        _type: 'order',
        customerName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: formData.fullAddress,
        city: formData.city,
        paymentMethod: formData.paymentMethod,
        totalPrice: totalPrice,
        items: cartItems.map(item => ({
          productName: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        createdAt: new Date().toISOString(),
      };
  
      const result = await client.create(order); // ✅ حفظ النتيجة
      console.log('Order saved:', result);
  
      setOrderConfirmed(true);
      toast.success('تم تأكيد طلبك بنجاح!');
    } catch (error) {
      console.error('Error creating order:', error);
      toast.error('حدث خطأ أثناء تأكيد الطلب. يرجى المحاولة مرة أخرى.');
    }
  };
  







  return (
    <div className="checkout-page-container">
      <div className="checkout-grid">
        {/* Cart Section */}
        <div className="cart-section">
          <div className="cart-header">
            <h2 className="heading">سلة التسوق</h2>
            <span className="cart-num-items">({totalQuantities} عنصر)</span>
          </div>

          <div className="product-container">
            {cartItems.length >= 1 && cartItems.map((item) => (
              item && item.name && item.price && item.image ? (
                <div className="product" key={item._id}>
                  <Image 
                    alt={item.name} 
                    src={urlFor(item.image[0].asset).url()}
                    className="cart-product-image" 
                    width={70}
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
            <div className="subtotal-section">
              <h3>المجموع الفرعي:</h3>
              <h3>${totalPrice}</h3>
            </div>
          )}
        </div>

        {/* Checkout Form Section */}
        <div className="form-section">
          {!orderConfirmed ? (
            <form onSubmit={handleSubmit} className="checkout-form">
              <h2 className="form-title">تفاصيل الطلب</h2>

              <div className="form-group">
                <label className="form-label">
                  الاسم الكامل *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="أدخل اسمك الكامل"
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  المدينة *
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="أدخل مدينتك"
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  العنوان الكامل *
                </label>
                <textarea
                  name="fullAddress"
                  value={formData.fullAddress}
                  onChange={handleChange}
                  required
                  className="form-input address-input"
                  placeholder="أدخل عنوانك الكامل"
                  rows="3"
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  رقم الهاتف *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="أدخل رقم هاتفك"
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  البريد الإلكتروني *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="أدخل بريدك الإلكتروني"
                />
              </div>

              <div className="payment-methods">
                <h3 className="payment-title">طريقة الدفع</h3>
                
                <div className="payment-option disabled">
                  <input
                    type="radio"
                    id="electronic"
                    name="paymentMethod"
                    value="electronic"
                    checked={formData.paymentMethod === 'electronic'}
                    onChange={handleChange}
                    disabled
                  />
                  <label htmlFor="electronic">
                    الدفع الإلكتروني
                    <span className="unavailable-text"> (غير متاح حاليًا)</span>
                  </label>
                </div>
                
                <div className="payment-option">
                  <input
                    type="radio"
                    id="cash"
                    name="paymentMethod"
                    value="cash"
                    checked={formData.paymentMethod === 'cash'}
                    onChange={handleChange}
                  />
                  <label htmlFor="cash">الدفع عند الاستلام</label>
                </div>
              </div>

              <button type="submit" className="submit-button">
                تأكيد الطلب
              </button>
            </form>
          ) : (
            <div className="confirmation-message">
              <div className="success-icon">✓</div>
              <h2>تم تأكيد طلبك بنجاح!</h2>
              <p>شكرًا لك {formData.fullName}، سنقوم بتوصيل طلبك إلى العنوان التالي:</p>
              <div className="order-details">
                <p><strong>العنوان:</strong> {formData.fullAddress}</p>
                <p><strong>المدينة:</strong> {formData.city}</p>
                <p><strong>طريقة الدفع:</strong> {formData.paymentMethod === 'cash' ? 'الدفع عند الاستلام' : 'الدفع الإلكتروني'}</p>
              </div>
              <Link href="/">
                <button className="back-to-shop">
                  العودة إلى المتجر
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payment;