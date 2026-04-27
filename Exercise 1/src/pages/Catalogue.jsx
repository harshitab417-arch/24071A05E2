import { useState, useMemo } from 'react';
import { useCart } from '../context/CartContext';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { toast } from '../components/Toast';
import styles from './Catalogue.module.css';

const SORT_OPTIONS = [
  { value: 'default',    label: 'Featured' },
  { value: 'price-asc',  label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating',     label: 'Top Rated' },
];

export default function Catalogue() {
  const { addToCart } = useCart();
  const [category, setCategory] = useState('All');
  const [search, setSearch]     = useState('');
  const [sort, setSort]         = useState('default');
  const [maxPrice, setMaxPrice] = useState(10000);

  const filtered = useMemo(() => {
    let list = [...PRODUCTS];
    if (category !== 'All') list = list.filter(p => p.category === category);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    }
    list = list.filter(p => p.price <= maxPrice);
    if (sort === 'price-asc')  list.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
    if (sort === 'rating')     list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [category, search, sort, maxPrice]);

  const handleAdd = (product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="page-wrapper">
      <div className="container">
        {/* Header */}
        <div className={styles.pageHead}>
          <div>
            <h1 className={styles.pageTitle}>Product Catalogue</h1>
            <p className={styles.pageSub}>{filtered.length} products found</p>
          </div>
          <div className={styles.searchBar}>
            <input
              className={styles.searchInput}
              placeholder="Search products..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.layout}>
          {/* Sidebar filters */}
          <aside className={styles.sidebar}>
            <div className={styles.filterBlock}>
              <h3>Categories</h3>
              <ul className={styles.catList}>
                {CATEGORIES.map(cat => (
                  <li key={cat}>
                    <button
                      className={`${styles.catBtn} ${category === cat ? styles.catActive : ''}`}
                      onClick={() => setCategory(cat)}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.filterBlock}>
              <h3>Price Range</h3>
              <div className={styles.priceRange}>
                <input type="range" min={0} max={10000} step={100}
                  value={maxPrice} onChange={e => setMaxPrice(+e.target.value)}
                  className={styles.rangeInput} />
                <div className={styles.priceDisplay}>
                  <span>₹0</span>
                  <span className={styles.priceMax}>₹{maxPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className={styles.filterBlock}>
              <h3>Sort By</h3>
              <div className={styles.sortBtns}>
                {SORT_OPTIONS.map(o => (
                  <button key={o.value}
                    className={`${styles.sortBtn} ${sort === o.value ? styles.sortActive : ''}`}
                    onClick={() => setSort(o.value)}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className={styles.grid}>
            {filtered.length === 0 ? (
              <div className={styles.empty}>
                <h3>No products found</h3>
                <p>Try adjusting your filters or search term.</p>
              </div>
            ) : (
              filtered.map(product => (
                <ProductCard key={product.id} product={product} onAdd={handleAdd} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product, onAdd }) {
  const discount = Math.round((1 - product.price / product.originalPrice) * 100);
  return (
    <div className={styles.card}>
      {product.badge && <span className={styles.badge}>{product.badge}</span>}
      <div className={styles.imgWrap}>
        <img src={product.image} alt={product.name} loading="lazy" />
        <div className={styles.overlay}>
          <button className={styles.addBtn} onClick={() => onAdd(product)}>
            Add to Cart
          </button>
        </div>
      </div>
      <div className={styles.info}>
        <span className={styles.cat}>{product.category}</span>
        <h2 className={styles.name}>{product.name}</h2>
        <p className={styles.desc}>{product.description}</p>
        <div className={styles.rating}>★ {product.rating} <span>({product.reviews.toLocaleString()} reviews)</span></div>
        <div className={styles.priceRow}>
          <span className={styles.price}>₹{product.price.toLocaleString()}</span>
          <span className={styles.original}>₹{product.originalPrice.toLocaleString()}</span>
          <span className={styles.disc}>{discount}% off</span>
        </div>
        <button className={styles.addBtnFull} onClick={() => onAdd(product)}>
          Add to Cart
        </button>
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
