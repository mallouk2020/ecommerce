import React from 'react';
import Link from 'next/link';
import { AiOutlineShopping, AiOutlineMail } from 'react-icons/ai';
import { FaWhatsapp } from 'react-icons/fa';
import Cart from './Cart';
import { useStateContext } from '../context/StateContext';

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();

  const styles = {
    navbar: {
      backgroundColor: '#ffffff',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      padding: '15px 0',
      borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
      width:'100%',
      margin:0,
    },
    container: {
      maxWidth: '1500px',
      margin: '0 auto',
      padding: '0 20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    logo: {
      textDecoration: 'none',
      color: '#1e293b',
      fontWeight: '800',
      fontSize: '24px',
      letterSpacing: '-0.5px',
      transition: 'all 0.3s ease',
      '&:hover': {
        color: '#2563eb',
      },
    },
    iconsContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
    },
    contactButton: {
      color: '#1e293b',
      background: 'none',
      border: 'none',
      fontSize: '22px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '8px',
      borderRadius: '50%',
      '&:hover': {
        color: '#2563eb',
        transform: 'translateY(-2px)',
        background: 'rgba(37, 99, 235, 0.1)',
      },
    },
    whatsappButton: {
      color: '#25D366',
      '&:hover': {
        color: '#128C7E',
        background: 'rgba(37, 211, 102, 0.1)',
      },
    },
    cartButton: {
      position: 'relative',
      background: 'none',
      border: 'none',
      color: '#1e293b',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      padding: '8px',
      borderRadius: '50%',
      '&:hover': {
        color: '#2563eb',
        transform: 'translateY(-2px)',
        background: 'rgba(37, 99, 235, 0.1)',
      },
    },
    cartBadge: {
      position: 'absolute',
      top: '-5px',
      right: '-5px',
      backgroundColor: '#dc2626',
      color: 'white',
      borderRadius: '50%',
      width: '20px',
      height: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '12px',
      fontWeight: 'bold',
    },
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        {/* Logo */}
        <Link href="/" style={styles.logo}>
          <span>MK ECOM</span>
        </Link>

        {/* Right Side Icons */}
        <div style={styles.iconsContainer}>
          <a 
            href="mailto:info@example.com" 
            style={styles.contactButton}
            aria-label="Email"
          >
            <AiOutlineMail size={22} />
          </a>
          
          <a 
            href="https://wa.me/966500000000" 
            style={{ ...styles.contactButton, ...styles.whatsappButton }}
            aria-label="WhatsApp"
          >
            <FaWhatsapp size={22} />
          </a>
          
          <button 
            type="button" 
            style={styles.cartButton}
            onClick={() => setShowCart(true)}
            aria-label="Cart"
          >
            <AiOutlineShopping size={22} />
            {totalQuantities > 0 && (
              <span style={styles.cartBadge}>{totalQuantities}</span>
            )}
          </button>
        </div>
      </div>

      {/* Cart Component */}
      {showCart && <Cart />}
    </nav>
  );
};

export default Navbar;