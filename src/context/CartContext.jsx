import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Charger le panier depuis localStorage au démarrage
  useEffect(() => {
    const loadCart = () => {
      try {
        const savedCart = localStorage.getItem('bookstore-cart');
        if (savedCart) {
          setCartItems(JSON.parse(savedCart));
        }
      } catch (error) {
        console.error('Error loading cart:', error);
      }
    };

    loadCart();
  }, []);

  // Sauvegarder le panier dans localStorage à chaque changement
  useEffect(() => {
    try {
      localStorage.setItem('bookstore-cart', JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  }, [cartItems]);

  const addToCart = (book, quantity = 1) => {
    console.log('Adding to cart:', book, 'quantity:', quantity);
    setCartItems(prev => {
      const existingItem = prev.find(item => item._id === book._id);
      
      if (existingItem) {
        // Si l'article existe déjà, augmenter la quantité
        const updatedItems = prev.map(item =>
          item._id === book._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        console.log('Updated existing item, new cart:', updatedItems);
        return updatedItems;
      } else {
        // Ajouter un nouvel article
        const newItems = [...prev, { ...book, quantity }];
        console.log('Added new item, new cart:', newItems);
        return newItems;
      }
    });
  };

  const removeFromCart = (bookId) => {
    setCartItems(prev => prev.filter(item => item._id !== bookId));
  };

  const updateQuantity = (bookId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(bookId);
      return;
    }

    setCartItems(prev =>
      prev.map(item =>
        item._id === bookId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.oldPrice && item.oldPrice > item.price ? item.price : item.price;
      return total + (price * item.quantity);
    }, 0);
  };

  const getCartItemsCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const originalPrice = item.oldPrice && item.oldPrice > item.price ? item.oldPrice : item.price;
      return total + (originalPrice * item.quantity);
    }, 0);
  };

  const getTotalSavings = () => {
    return getCartSubtotal() - getCartTotal();
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount,
    getCartSubtotal,
    getTotalSavings
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
