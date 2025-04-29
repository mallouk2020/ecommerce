import { useRef } from 'react';
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import toast from 'react-hot-toast';
import { useStateContext } from '../context/StateContext';
import { urlFor } from '../lib/client';
import { useState } from 'react';
import { useEffect } from 'react';








const Cart = () => {

  const cartRef = useRef();
  const { totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuanitity, onRemove } = useStateContext();
  const { selectedStyle } = useStateContext();
  const [isMobile, setIsMobile] = useState(false);


  const Cartstyle1 = () => {

    const handleRedirectToPayment = () => {
      window.location.href = "/payment";
    };

    return (
      <div className="cart-wrapper" ref={cartRef}>
        <div className="cart-container">
          <button
            type="button"
            className="cart-heading"
            onClick={() => setShowCart(false)}>
            <AiOutlineLeft />
            <span className="heading">Your Cart</span>
            <span className="cart-num-items">({totalQuantities} items)</span>
          </button>

          {cartItems.length < 1 && (
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
          )}

          <div className="product-container">
            {cartItems.length >= 1 && cartItems.map((item) => (
              item && item.name && item.price && item.image ? (  // التحقق هنا
                <div className="product" key={item._id}>
                  <img src={urlFor(item.image[0])} className="cart-product-image" />

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
                        onClick={() => onRemove(item)}
                      >
                        <TiDeleteOutline />
                      </button>
                    </div>
                  </div>
                </div>
              ) : null

            ))}
          </div>
          {cartItems.length >= 1 && (
            <div className="cart-bottom">
              <div className="total">
                <h3>Subtotal:</h3>
                <h3>${totalPrice}</h3>
              </div>
              <div className="btn-container">
                <button type="button" className="btn" onClick={handleRedirectToPayment}>
                  Place Order    </button>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  const Cartstyle2 = () => {

    const handleRedirectToPayment = () => {
      window.location.href = "/payment";
    };

    const styles = {
      wrapper: {
        position: 'fixed',
        top: 0,
        right: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 999,
        display: 'flex',
        justifyContent: 'flex-end',
        transition: 'all 0.3s ease',
      },
      container: {
        width: '100%',
        maxWidth: '500px',
        backgroundColor: '#fff',
        padding: '30px',
        height: '100vh',
        overflowY: 'auto',
        boxShadow: '-5px 0 15px rgba(0, 0, 0, 0.1)',
        transform: 'translateX(0)',
        transition: 'transform 0.3s ease',
      },
      heading: {
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        marginBottom: '30px',
        cursor: 'pointer',
        '&:hover': {
          color: '#2563eb',
        },
      },
      headingText: {
        fontSize: '24px',
        fontWeight: '700',
        flex: 1,
      },
      cartCount: {
        color: '#64748b',
        fontSize: '16px',
      },
      emptyCart: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '70vh',
        textAlign: 'center',
      },
      emptyIcon: {
        color: '#cbd5e1',
        marginBottom: '20px',
      },
      emptyText: {
        fontSize: '20px',
        marginBottom: '30px',
        color: '#334155',
      },
      continueBtn: {
        background: '#2563eb',
        color: 'white',
        border: 'none',
        padding: '12px 30px',
        borderRadius: '8px',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        '&:hover': {
          background: '#1d4ed8',
          transform: 'translateY(-2px)',
        },
      },
      productContainer: {
        margin: '20px 0',
        borderBottom: '1px solid #e2e8f0',
      },
      productItem: {
        display: 'flex',
        gap: '20px',
        padding: '20px 0',
        borderBottom: '1px solid #f1f5f9',
      },
      productImage: {
        width: '100px',
        height: '100px',
        objectFit: 'contain',
        borderRadius: '8px',
        backgroundColor: '#f8fafc',
        padding: '10px',
      },
      itemDesc: {
        flex: 1,
      },
      flexTop: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '10px',
      },
      productName: {
        fontSize: '16px',
        fontWeight: '600',
        color: '#1e293b',
      },
      productPrice: {
        fontSize: '16px',
        fontWeight: '700',
        color: '#dc2626',
      },
      flexBottom: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      quantityDesc: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
      },
      quantityBtn: {
        background: '#2563eb',
        color: 'white',
        border: 'none',
        borderRadius: '50%',
        width: '25px',
        height: '25px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        '&:hover': {
          background: '#1d4ed8',
          transform: 'scale(1.1)',
        },
      },
      quantityNum: {
        fontSize: '16px',
        fontWeight: '600',
      },
      removeBtn: {
        color: '#dc2626',
        fontSize: '24px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'scale(1.2)',
        },
      },
      cartBottom: {
        marginTop: '30px',
        paddingTop: '20px',
        borderTop: '1px solid #e2e8f0',
      },
      total: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '30px',
      },
      totalText: {
        fontSize: '18px',
        fontWeight: '600',
      },
      totalPrice: {
        fontSize: '20px',
        fontWeight: '700',
        color: '#2563eb',
      },
      placeOrderBtn: {
        background: '#dc2626',
        color: 'white',
        width: '100%',
        border: 'none',
        padding: '15px',
        borderRadius: '8px',
        fontSize: '18px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        '&:hover': {
          background: '#b91c1c',
          transform: 'translateY(-2px)',
        },
      },
    };

    return (
      <div style={styles.wrapper} ref={cartRef}>
        <div style={styles.container}>
          <button
            type="button"
            style={styles.heading}
            onClick={() => setShowCart(false)}
          >
            <AiOutlineLeft size={24} />
            <span style={styles.headingText}>Your Cart</span>
            <span style={styles.cartCount}>({totalQuantities} items)</span>
          </button>

          {cartItems.length < 1 && (
            <div style={styles.emptyCart}>
              <AiOutlineShopping size={150} style={styles.emptyIcon} />
              <h3 style={styles.emptyText}>Your shopping bag is empty</h3>
              <Link href="/">
                <button
                  type="button"
                  onClick={() => setShowCart(false)}
                  style={styles.continueBtn}
                >
                  Continue Shopping
                </button>
              </Link>
            </div>
          )}

          <div style={styles.productContainer}>
            {cartItems.length >= 1 && cartItems.map((item) => (
              item && item.name && item.price && item.image ? (
                <div style={styles.productItem} key={item._id}>
                  <img
                    src={urlFor(item.image[0])}
                    style={styles.productImage}
                    alt={item.name}
                  />
                  <div style={styles.itemDesc}>
                    <div style={styles.flexTop}>
                      <h5 style={styles.productName}>{item.name}</h5>
                      <h4 style={styles.productPrice}>${item.price}</h4>
                    </div>
                    <div style={styles.flexBottom}>
                      <div style={styles.quantityDesc}>
                        <span
                          style={styles.quantityBtn}
                          onClick={() => toggleCartItemQuanitity(item._id, 'dec')}
                        >
                          <AiOutlineMinus />
                        </span>
                        <span style={styles.quantityNum}>{item.quantity}</span>
                        <span
                          style={styles.quantityBtn}
                          onClick={() => toggleCartItemQuanitity(item._id, 'inc')}
                        >
                          <AiOutlinePlus />
                        </span>
                      </div>
                      <button
                        type="button"
                        style={styles.removeBtn}
                        onClick={() => onRemove(item)}
                      >
                        <TiDeleteOutline />
                      </button>
                    </div>
                  </div>
                </div>
              ) : null
            ))}
          </div>

          {cartItems.length >= 1 && (
            <div style={styles.cartBottom}>
              <div style={styles.total}>
                <h3 style={styles.totalText}>Subtotal:</h3>
                <h3 style={styles.totalPrice}>${totalPrice}</h3>
              </div>
              <div style={{ marginTop: '20px' }}>
                <button
                  type="button"
                  style={styles.placeOrderBtn}
                  onClick={handleRedirectToPayment}
                >
                  Place Order
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }



  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768); // 768px هو حد الهاتف
    };

    checkIsMobile(); // فحص عند التحميل
    window.addEventListener('resize', checkIsMobile); // فحص عند تغيير الحجم

    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // اختيار الكمبوننت المناسب حسب الحجم + الـ selectedStyle
  if (selectedStyle === 1) {
    return isMobile ? <Cartstyle2 /> : <Cartstyle2 />;
  } else {
    return isMobile ? <Cartstyle1 /> : <Cartstyle2 />;
  }}


  export default Cart;