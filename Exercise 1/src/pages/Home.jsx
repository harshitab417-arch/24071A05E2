import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { toast } from '../components/Toast';
import styles from './Home.module.css';

export default function Home() {
  const { user } = useAuth();
  const { addToCart } = useCart();

  if (user) {
    return <Navigate to="/catalogue" replace />;
  }

  const featured = PRODUCTS.slice(0, 4);

  const handleAdd = (product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Welcome To<br />
            <span className="gradient-text">NexMart</span>
          </h1>
          <p className={styles.heroSub}>
            Discover thousands of premium products at unbeatable prices.
            Fast shipping, easy returns, and exceptional quality guaranteed.
          </p>
          <div className={styles.heroActions}>
            <Link to="/catalogue" className="btn btn-primary btn-lg">
              Shop Now
            </Link>
            {!user && (
              <Link to="/register" className="btn btn-secondary btn-lg">
                Create Account
              </Link>
            )}
          </div>
        </div>
      </section>
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

function ProductCard({ product, onAdd }) {
  const discount = Math.round((1 - product.price / product.originalPrice) * 100);
  return (
    <div className={styles.productCard}>
      {product.badge && <span className={styles.productBadge}>{product.badge}</span>}
      <div className={styles.productImg}>
        <img src={product.image} alt={product.name} loading="lazy" />
        <div className={styles.productOverlay}>
          <button className={styles.quickAdd} onClick={() => onAdd(product)}>
            Add to Cart
          </button>
        </div>
      </div>
      <div className={styles.productInfo}>
        <span className={styles.productCat}>{product.category}</span>
        <h3 className={styles.productName}>{product.name}</h3>
        <div className={styles.productRating}>
          ★ {product.rating} <span>({product.reviews.toLocaleString()})</span>
        </div>
        <div className={styles.productPrice}>
          <span className={styles.price}>₹{product.price.toLocaleString()}</span>
          <span className={styles.originalPrice}>₹{product.originalPrice.toLocaleString()}</span>
          <span className={styles.discount}>{discount}% off</span>
        </div>
      </div>
    </div>
  );
}
