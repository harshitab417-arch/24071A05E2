import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from '../components/Toast';
import styles from './Auth.module.css';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.name.trim())      errs.name    = 'Full name is required';
    if (!form.email.includes('@')) errs.email = 'Valid email is required';
    if (!/^\d{10}$/.test(form.phone)) errs.phone = '10-digit phone number required';
    if (form.password.length < 6)   errs.password = 'Password must be at least 6 characters';
    if (form.password !== form.confirm) errs.confirm = 'Passwords do not match';
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
      register({ name: form.name, email: form.email, phone: form.phone, password: form.password });
      toast.success('Account created! Please login.');
      navigate('/login');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.bg} />
      <div className={styles.card}>
        <div className={styles.header}>
          <Link to="/" className={styles.logoLink}><span>NexMart</span></Link>
          <h1 className={styles.title}>Create Account</h1>
          <p className={styles.sub}>Join thousands of happy shoppers today</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.row}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input name="name" value={form.name} onChange={handleChange}
                className={`form-input ${errors.name ? styles.inputErr : ''}`}
                placeholder="John Doe" />
              {errors.name && <span className={styles.err}>{errors.name}</span>}
            </div>
            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input name="phone" value={form.phone} onChange={handleChange}
                className={`form-input ${errors.phone ? styles.inputErr : ''}`}
                placeholder="9876543210" maxLength={10} />
              {errors.phone && <span className={styles.err}>{errors.phone}</span>}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input name="email" type="email" value={form.email} onChange={handleChange}
              className={`form-input ${errors.email ? styles.inputErr : ''}`}
              placeholder="you@example.com" />
            {errors.email && <span className={styles.err}>{errors.email}</span>}
          </div>

          <div className={styles.row}>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input name="password" type="password" value={form.password} onChange={handleChange}
                className={`form-input ${errors.password ? styles.inputErr : ''}`}
                placeholder="Min. 6 characters" />
              {errors.password && <span className={styles.err}>{errors.password}</span>}
            </div>
            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <input name="confirm" type="password" value={form.confirm} onChange={handleChange}
                className={`form-input ${errors.confirm ? styles.inputErr : ''}`}
                placeholder="Repeat password" />
              {errors.confirm && <span className={styles.err}>{errors.confirm}</span>}
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
            {loading ? <span className={styles.spinner} /> : null}
            {loading ? 'Creating Account...' : 'Create My Account'}
          </button>
        </form>

        <div className="divider">or</div>
        <p className={styles.switch}>
          Already have an account? <Link to="/login">Sign in</Link>
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
