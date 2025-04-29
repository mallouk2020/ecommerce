import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { client } from '../lib/client';





const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);
  const [selectedStyle, setSelectedStyle] = useState(2); // يمكن تغييرها حسب الحاجة
  

  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchStyle = async () => {
      try {
        const query = `*[_type == "styleSettings"][0]`;
        const styleSettings = await client.fetch(query);
        if (styleSettings?.selectedStyle) {
          setSelectedStyle(styleSettings.selectedStyle);
        }
      } catch (error) {
        console.error('Failed to fetch style settings:', error);
      } finally {
        setLoading(false);
      }
    };   
     fetchStyle();
  }, []);

  const updateStyleSetting = async (newStyle) => {
    try {
      const doc = {
        _type: 'styleSettings',
        _id: 'styleSettings', // استخدام نفس الـ ID دائمًا
        selectedStyle: newStyle
      };

      await client.createOrReplace(doc);
      setSelectedStyle(newStyle);
    } catch (error) {
      console.error('Failed to update style:', error);
    }
  };
  


  // ✅ استرجاع الحالة من localStorage عند بدء التطبيق
  useEffect(() => {
    const storedState = localStorage.getItem('cartState');
    if (storedState) {
      const parsedState = JSON.parse(storedState);
      setCartItems(parsedState.cartItems || []);
      setTotalPrice(parsedState.totalPrice || 0);
      setTotalQuantities(parsedState.totalQuantities || 0);
      setShowCart(parsedState.showCart || false);
      setQty(parsedState.qty || 1);
    }
  }, []);

  // ✅ حفظ الحالة في localStorage عند أي تغيير
  useEffect(() => {
    const state = {
      cartItems,
      totalPrice,
      totalQuantities,
      showCart,
      qty,
    };
    localStorage.setItem('cartState', JSON.stringify(state));
  }, [cartItems, totalPrice, totalQuantities, showCart, qty]);

let foundProduct;
  let index;

  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find((item) => item._id === product._id);

    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
    // cartItems.map(item =>item._id === id ? { ...item, quantity: item.quantity + 1 } : item)

    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct && cartProduct._id && cartProduct._id === product._id) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
        }
        return cartProduct;
      });


      setCartItems(updatedCartItems);

    } else {
      product.quantity = quantity;

      setCartItems([...cartItems, { ...product }]);
    }

    toast.success(`${qty} ${product.name} added to the cart.`);
    setQty(1)
  }

  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity);
    setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
    setCartItems(newCartItems);
  }

  const toggleCartItemQuanitity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id)
    index = cartItems.findIndex((product) => product._id === id);
    // const newCartItems = cartItems.filter((item) => item._id !== id)

    if (value === 'inc') {

      setCartItems(cartItems.map(item =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item
      ));

      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
      setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1)
    } else if (value === 'dec') {


      if (foundProduct.quantity > 1) {

        setCartItems(cartItems.map(item =>
          item._id === id ? { ...item, quantity: item.quantity - 1 } : item));

        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1)
      }
    }
  }

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  }

  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;

      return prevQty - 1;
    });
  }

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        selectedStyle,
        setSelectedStyle,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuanitity,
        onRemove,
        setCartItems,
        setTotalPrice,
        setTotalQuantities,
        selectedStyle,
        setSelectedStyle: updateStyleSetting, // استخدام الدالة المعدلة
        loading
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context);