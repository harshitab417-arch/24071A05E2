import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { count } = useCart();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setDropOpen(false);
    navigate('/');
  };

  const navLinks = [
    ...(!user ? [{ to: '/', label: 'Home' }] : []),
    { to: '/catalogue', label: 'Catalogue' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        {/* Logo */}
        <Link to="/" className={styles.logo}>
          <span className={styles.logoText}>Nex<span>Mart</span></span>
        </Link>

        {/* Desktop links */}
        <ul className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
          {navLinks.map(l => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </NavLink>
            </li>
          ))}
          {user && (
            <>
              <li>
                <NavLink to="/payment" className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link} onClick={() => setMenuOpen(false)}>
                  Payment
                </NavLink>
              </li>
              <li>
                <NavLink to="/invoices" className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link} onClick={() => setMenuOpen(false)}>
                  Invoices
                </NavLink>
              </li>
            </>
          )}
        </ul>

        {/* Right actions */}
        <div className={styles.actions}>
          {/* Cart */}
          <Link to={user ? '/cart' : '/cart'} className={styles.cartBtn}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            {count > 0 && <span className={styles.badge}>{count}</span>}
          </Link>

          {/* User */}
          {user ? (
            <div className={styles.userMenu} onMouseLeave={() => setDropOpen(false)}>
              <button
                className={styles.avatar}
                onClick={() => setDropOpen(d => !d)}
              >
                {user.name?.[0]?.toUpperCase() ?? 'U'}
              </button>
              {dropOpen && (
                <div className={styles.dropdown}>
                  <div className={styles.dropUser}>
                    <strong>{user.name}</strong>
                    <small>{user.email}</small>
                  </div>
                  <Link to="/invoices" className={styles.dropItem} onClick={() => setDropOpen(false)}>My Invoices</Link>
                  <Link to="/payment"  className={styles.dropItem} onClick={() => setDropOpen(false)}>Payment</Link>
                  <button className={`${styles.dropItem} ${styles.dropLogout}`} onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <div className={styles.authBtns}>
              <Link to="/login" className={styles.loginBtn}>Login</Link>
              <Link to="/register" className={styles.registerBtn}>Register</Link>
            </div>
          )}

          {/* Hamburger */}
          <button className={styles.hamburger} onClick={() => setMenuOpen(o => !o)}>
            <span className={menuOpen ? styles.barOpen : styles.bar} />
            <span className={menuOpen ? styles.barHide : styles.bar} />
            <span className={menuOpen ? styles.barOpen2 : styles.bar} />
          </button>
        </div>
      </div>
    </nav>
  );
}
