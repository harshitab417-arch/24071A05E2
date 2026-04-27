import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

// Guest cart key (pre-login)
const GUEST_CART_KEY = 'retailer_guest_cart';

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);

  // Load on mount / user change
  useEffect(() => {
    if (user) {
      const userCartKey = `retailer_cart_${user.id}`;
      const userCart  = JSON.parse(localStorage.getItem(userCartKey)   || '[]');
      const guestCart = JSON.parse(localStorage.getItem(GUEST_CART_KEY) || '[]');

      // Merge guest cart into user cart
      let merged = [...userCart];
      guestCart.forEach(guestItem => {
        const idx = merged.findIndex(i => i.id === guestItem.id);
        if (idx >= 0) merged[idx].qty += guestItem.qty;
        else merged.push(guestItem);
      });
      localStorage.removeItem(GUEST_CART_KEY);
      setCart(merged);
    } else {
      const guestCart = JSON.parse(localStorage.getItem(GUEST_CART_KEY) || '[]');
      setCart(guestCart);
    }
  }, [user]);

  // Persist whenever cart or user changes
  useEffect(() => {
    if (user) {
      const userCartKey = `retailer_cart_${user.id}`;
      localStorage.setItem(userCartKey, JSON.stringify(cart));
    } else {
      localStorage.setItem(GUEST_CART_KEY, JSON.stringify(cart));
    }
  }, [cart, user]);

  const addToCart = (product, qty = 1) => {
    setCart(prev => {
      const idx = prev.findIndex(i => i.id === product.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + qty };
        return next;
      }
      return [...prev, { ...product, qty }];
    });
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));

  const updateQty = (id, qty) => {
    if (qty <= 0) { removeFromCart(id); return; }
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
  };

  const clearCart = () => setCart([]);

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const count  = cart.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty, clearCart, total, count }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
