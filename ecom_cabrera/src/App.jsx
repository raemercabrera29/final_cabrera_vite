import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Details from './pages/Details';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Auth from './pages/Auth';

export default function App() {
  const [cart, setCart] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const handleAddToCart = (product, quantity) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
  };

  const handleUpdateQty = (id, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const handleRemove = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const handleClearCart = () => setCart([]);

  return (
    <Router>
      <div className="min-h-screen bg-white text-black flex flex-col font-sans w-full">
        <Navbar 
          cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)} 
          currentUser={currentUser}
          onLogout={() => setCurrentUser(null)}
        />
 
        <main className="flex-1 w-full">
          <Routes>
            <Route path="/" element={<Home onAddToCart={handleAddToCart} />} />
            <Route path="/details/:id" element={<Details onAddToCart={handleAddToCart} />} />
            <Route path="/cart" element={<Cart cart={cart} onUpdateQty={handleUpdateQty} onRemove={handleRemove} />} />
            <Route path="/checkout" element={<Checkout cart={cart} onClearCart={handleClearCart} currentUser={currentUser} />} />
            <Route path="/auth" element={<Auth onLogin={(user) => setCurrentUser(user)} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}