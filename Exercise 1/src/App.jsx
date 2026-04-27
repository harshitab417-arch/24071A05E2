import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ToastContainer } from './components/Toast';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import Catalogue from './pages/Catalogue';
import Cart from './pages/Cart';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <ToastContainer />
      <AuthProvider>
        <CartProvider>
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <main style={{ flex: 1, marginTop: '60px' }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/catalogue" element={<Catalogue />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </main>
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
