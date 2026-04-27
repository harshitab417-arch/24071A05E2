import { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from '../components/Toast';
import styles from './Auth.module.css';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/catalogue';
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.email.includes('@')) errs.email    = 'Valid email required';
    if (!form.password)            errs.password = 'Password is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));
    setErrors(p => ({ ...p, [e.target.name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      login(form.email, form.password);
      toast.success('Welcome back! 👋');
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.bg} />
      <div className={styles.card} style={{ maxWidth: 460 }}>
        <div className={styles.header}>
          <h1 className={styles.title}>Welcome Back</h1>
          <p className={styles.sub}>Sign in to access your account</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input name="email" type="email" value={form.email} onChange={handleChange}
              className={`form-input ${errors.email ? styles.inputErr : ''}`}
              placeholder="you@example.com" autoFocus />
            {errors.email && <span className={styles.err}>{errors.email}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input name="password" type="password" value={form.password} onChange={handleChange}
              className={`form-input ${errors.password ? styles.inputErr : ''}`}
              placeholder="Your password" />
            {errors.password && <span className={styles.err}>{errors.password}</span>}
          </div>

          <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
            {loading ? <span className={styles.spinner} /> : null}
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="divider">or</div>
        <p className={styles.switch}>
          Don't have an account? <Link to="/register">Register free</Link>
        </p>
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
