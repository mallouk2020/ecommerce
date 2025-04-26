import React from 'react';
import Link from 'next/link';
import { AiOutlineShopping, AiOutlineMail } from 'react-icons/ai';
import { FaWhatsapp } from 'react-icons/fa';
import Cart from './cart';
import { useStateContext } from '../context/StateContext';

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link href="/" className="logo">
          <span className="logo-text">MK ECOM</span>
        </Link>

        {/* Right Side Icons */}
        <div className="nav-icons">
          <a href="mailto:info@example.com" className="contact-btn" aria-label="Email">
            <AiOutlineMail size={22} />
          </a>
          
          <a href="https://wa.me/966500000000" className="contact-btn whatsapp" aria-label="WhatsApp">
            <FaWhatsapp size={22} />
          </a>
          
          <button 
            type="button" 
            className="cart-btn" 
            onClick={() => setShowCart(true)}
            aria-label="Cart"
          >
            <AiOutlineShopping size={22} />
            {totalQuantities > 0 && (
              <span className="cart-badge">{totalQuantities}</span>
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