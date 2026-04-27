import { useState } from 'react';
import { toast } from '../components/Toast';
import styles from './Contact.module.css';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill all fields');
      return;
    }
    
    toast.success('Message sent successfully! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Contact Us</h1>
        <p className={styles.subtitle}>Have a question or feedback? We would love to hear from you.</p>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              className={styles.input}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Your Full Name"
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className={styles.input}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Your Email Address"
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              className={styles.textarea}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="How can we help you?"
            ></textarea>
          </div>
          
          <button type="submit" className={styles.submitBtn}>
            Send Message
          </button>
        </form>
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
