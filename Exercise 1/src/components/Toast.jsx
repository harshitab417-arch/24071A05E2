import { useState, useEffect } from 'react';
import styles from './Toast.module.css';

const toasts = [];
let listeners = [];

export const toast = {
  success: (msg) => addToast(msg, 'success'),
  error:   (msg) => addToast(msg, 'error'),
  info:    (msg) => addToast(msg, 'info'),
};

function addToast(message, type) {
  const id = Date.now();
  toasts.push({ id, message, type });
  listeners.forEach(l => l([...toasts]));
  setTimeout(() => {
    const idx = toasts.findIndex(t => t.id === id);
    if (idx >= 0) toasts.splice(idx, 1);
    listeners.forEach(l => l([...toasts]));
  }, 3000);
}

export function ToastContainer() {
  const [list, setList] = useState([]);
  useEffect(() => {
    listeners.push(setList);
    return () => { listeners = listeners.filter(l => l !== setList); };
  }, []);

  return (
    <div className={styles.container}>
      {list.map(t => (
        <div key={t.id} className={`${styles.toast} ${styles[t.type]}`}>
          <span className={styles.icon}>
            {t.type === 'success' ? '✓' : t.type === 'error' ? '✕' : 'ℹ'}
          </span>
          {t.message}
        </div>
      ))}
    </div>
  );
}
