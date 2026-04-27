import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { toast } from '../components/Toast';
import styles from './Cart.module.css';

export default function Cart() {
  const { cart, removeFromCart, updateQty, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
      toast.info('Please login to proceed to payment.');
      navigate('/login', { state: { from: '/payment' } });
      return;
    }
    navigate('/payment');
  };

  if (cart.length === 0) {
    return (
      <div className="page-wrapper">
        <div className="container">
          <div className={styles.empty}>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added anything yet.</p>
            <Link to="/catalogue" className="btn btn-primary btn-lg" style={{ marginTop: 24 }}>
              Start Shopping
            </Link>
          </div>
        </div>
        <footer style={{
        textAlign: 'center',
        padding: '20px',
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        fontSize: '15px',
        boxSizing: 'border-box'
      }}>
        © 2026 24071A05E2 All rights reserved.
      </footer>
      </div>
    );
  }

  const shipping = total >= 999 ? 0 : 99;
  const gst      = Math.round(total * 0.18);
  const grandTotal = total + shipping + gst;

  return (
    <div className="page-wrapper">
      <div className="container">
        <div className={styles.pageHead}>
          <div>
            <h1 className={styles.title}>Shopping Cart</h1>
            <p className={styles.sub}>{cart.reduce((s, i) => s + i.qty, 0)} items</p>
          </div>
          <button className="btn btn-secondary btn-sm" onClick={clearCart}>
            Clear Cart
          </button>
        </div>

        <div className={styles.layout}>
          {/* Items */}
          <div className={styles.items}>
            {cart.map(item => (
              <div key={item.id} className={styles.item}>
                <img src={item.image} alt={item.name} className={styles.itemImg} />
                <div className={styles.itemInfo}>
                  <span className={styles.itemCat}>{item.category}</span>
                  <h3 className={styles.itemName}>{item.name}</h3>
                  <span className={styles.itemPrice}>₹{item.price.toLocaleString()}</span>
                </div>
                <div className={styles.itemQty}>
                  <button className={styles.qtyBtn} onClick={() => updateQty(item.id, item.qty - 1)}>−</button>
                  <span className={styles.qtyVal}>{item.qty}</span>
                  <button className={styles.qtyBtn} onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                </div>
                <div className={styles.itemTotal}>₹{(item.price * item.qty).toLocaleString()}</div>
                <button className={styles.removeBtn} onClick={() => { removeFromCart(item.id); toast.info('Item removed'); }}>
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className={styles.summary}>
            <h2 className={styles.summaryTitle}>Order Summary</h2>

            <div className={styles.summaryRows}>
              <div className={styles.summaryRow}>
                <span>Subtotal</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Shipping</span>
                <span>{shipping === 0 ? <span style={{color:'var(--success)'}}>FREE</span> : `₹${shipping}`}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>GST (18%)</span>
                <span>₹{gst.toLocaleString()}</span>
              </div>
              {shipping > 0 && (
                <p className={styles.freeShipNote}>
                  Add ₹{(999 - total).toLocaleString()} more for FREE shipping!
                </p>
              )}
            </div>

            <div className={styles.summaryTotal}>
              <span>Total</span>
              <span>₹{grandTotal.toLocaleString()}</span>
            </div>

            <button className="btn btn-primary btn-full" style={{ marginTop: 20 }} onClick={handleCheckout}>
              {user ? 'Proceed to Payment' : 'Login to Checkout'}
            </button>

            {!user && (
              <p className={styles.loginHint}>
                <Link to="/login">Login</Link> or <Link to="/register">Register</Link> to complete your purchase.
              </p>
            )}

            <Link to="/catalogue" className="btn btn-secondary btn-full" style={{ marginTop: 10 }}>
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
      <footer style={{
        textAlign: 'center',
        padding: '20px',
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        fontSize: '15px',
        boxSizing: 'border-box'
      }}>
        © 2026 24071A05E2 All rights reserved.
      </footer>
    </div>
  );
}
