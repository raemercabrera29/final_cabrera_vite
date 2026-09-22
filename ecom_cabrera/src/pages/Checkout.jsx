import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import bannerImg from '../assets/BANNER.jpg'; // Import the banner image from assets

export default function Checkout({ cart, onClearCart, currentUser }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    paymentMethod: 'Cash on Delivery',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Auto-fill form state when user is logged in
  useEffect(() => {
    if (currentUser) {
      setFormData({
        fullName: currentUser.fullName || '',
        email: currentUser.email || '',
        phone: currentUser.phone || '',
        address: currentUser.address || '',
        paymentMethod: 'Cash on Delivery',
      });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full Name is required.';
    if (!formData.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Enter a valid email address.';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required.';
    } else if (!/^(09|\+639)\d{9}$/.test(formData.phone.trim())) {
      errs.phone = 'Enter a valid PH mobile number (e.g., 09123456789).';
    }
    if (!formData.address.trim()) errs.address = 'Delivery address is required.';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setSubmitted(true);
    onClearCart();
  };

  // 1. Guard against empty cart
  if (cart.length === 0 && !submitted) {
    return (
      <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-neutral-950">
        <div className="absolute inset-0 z-0">
          <img
            src={bannerImg}
            alt="Background"
            className="w-full h-full object-cover opacity-20 pointer-events-none"
          />
        </div>
        <div className="relative z-10 text-center py-20 text-xs tracking-widest text-neutral-400 uppercase bg-black/90 border border-neutral-800 p-8 max-w-md w-full backdrop-blur-sm">
          Bag is empty. Add items before checking out.
        </div>
      </div>
    );
  }

  // 2. Guard against unauthenticated users (Requires Login/Register)
  if (!currentUser && !submitted) {
    return (
      <div className="relative min-h-screen w-full flex items-center justify-center px-4 overflow-hidden bg-neutral-950">
        <div className="absolute inset-0 z-0">
          <img
            src={bannerImg}
            alt="Background"
            className="w-full h-full object-cover opacity-20 pointer-events-none"
          />
        </div>

        <div className="relative z-10 max-w-md w-full bg-black/90 border border-neutral-800 p-8 text-center space-y-6 shadow-2xl backdrop-blur-sm">
          <div className="space-y-2">
            <h2 className="text-xl font-bold tracking-widest uppercase text-white">
              Authentication Required
            </h2>
            <p className="text-xs text-neutral-400 leading-relaxed">
              You must log in to your account or register to complete your order dispatch request.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => navigate('/auth')}
              className="w-full bg-white text-black font-bold py-3 text-xs uppercase tracking-widest hover:bg-neutral-200 transition-colors"
            >
              Log In / Register
            </button>
            <Link
              to="/cart"
              className="text-[11px] text-neutral-400 hover:text-white uppercase tracking-widest transition-colors"
            >
              Return to Bag
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 3. Order completion view
  if (submitted) {
    return (
      <div className="relative min-h-screen w-full flex items-center justify-center px-4 overflow-hidden bg-neutral-950">
        <div className="absolute inset-0 z-0">
          <img
            src={bannerImg}
            alt="Background"
            className="w-full h-full object-cover opacity-20 pointer-events-none"
          />
        </div>

        <div className="relative z-10 max-w-md w-full bg-black/90 border border-neutral-800 p-8 text-center space-y-4 shadow-2xl backdrop-blur-sm">
          <h2 className="text-xl font-bold tracking-widest uppercase text-white">Order Confirmed</h2>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Order request registered in vault queue for <span className="text-white font-semibold">{currentUser?.fullName}</span>. Dispatch notification will follow.
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-white text-black px-6 py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-neutral-200 transition-colors"
          >
            Return to Catalog
          </button>
        </div>
      </div>
    );
  }

  // 4. Standard authenticated checkout form
  return (
    <div className="relative min-h-screen w-full py-12 px-4 overflow-hidden bg-neutral-950 flex items-center justify-center">
      {/* Low-opacity background image */}
      <div className="absolute inset-0 z-0">
        <img
          src={bannerImg}
          alt="Background"
          className="w-full h-full object-cover opacity-20 pointer-events-none"
        />
      </div>

      <div className="relative z-10 max-w-xl w-full mx-auto space-y-6">
        <div className="flex justify-between items-center border-b border-neutral-800 pb-4">
          <h1 className="text-xl font-extrabold uppercase tracking-widest text-white">Order Checkout</h1>
          <span className="text-xs text-neutral-400 uppercase tracking-wider">
            Logged in as: <strong className="text-white">{currentUser.fullName}</strong>
          </span>
        </div>

        <form onSubmit={handleSubmit} className="bg-black/90 border border-neutral-800 p-8 space-y-5 shadow-2xl backdrop-blur-sm text-white">
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-neutral-400 mb-2">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full bg-neutral-900 border border-neutral-800 p-3 text-xs tracking-wider text-white focus:border-neutral-500 outline-none"
            />
            {errors.fullName && <p className="text-red-400 text-[10px] mt-1">{errors.fullName}</p>}
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-widest text-neutral-400 mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-neutral-900 border border-neutral-800 p-3 text-xs tracking-wider text-white focus:border-neutral-500 outline-none"
            />
            {errors.email && <p className="text-red-400 text-[10px] mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-widest text-neutral-400 mb-2">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-neutral-900 border border-neutral-800 p-3 text-xs tracking-wider text-white focus:border-neutral-500 outline-none"
            />
            {errors.phone && <p className="text-red-400 text-[10px] mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-widest text-neutral-400 mb-2">Delivery Address</label>
            <textarea
              rows="3"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full bg-neutral-900 border border-neutral-800 p-3 text-xs tracking-wider text-white focus:border-neutral-500 outline-none resize-none"
            />
            {errors.address && <p className="text-red-400 text-[10px] mt-1">{errors.address}</p>}
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-widest text-neutral-400 mb-2">Payment Option</label>
            <input
              type="text"
              value={formData.paymentMethod}
              disabled
              className="w-full bg-neutral-900 border border-neutral-800 p-3 text-xs tracking-wider text-neutral-500 cursor-not-allowed"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-white text-black font-bold py-3 text-xs uppercase tracking-widest hover:bg-neutral-200 transition-colors mt-6"
          >
            Submit Order Request
          </button>
        </form>
      </div>
    </div>
  );
}