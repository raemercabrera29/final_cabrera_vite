import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, CheckCircle2, AlertCircle } from 'lucide-react';
import bannerImg from '../assets/BANNER.jpg';

export default function Auth({ onLogin }) {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: ''
  });

  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState('');

  useEffect(() => {
    if (!isRegister) {
      setErrors({});
      return;
    }

    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required.';
    } else if (formData.username.trim().length < 3) {
      newErrors.username = 'Username must be at least 3 characters.';
    }

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (!/^(09|\+639)\d{9}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Enter a valid PH mobile number (e.g. 09123456789).';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Default address is required.';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password.';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(newErrors);
  }, [formData, isRegister]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleBlur = (e) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setGeneralError('');

    const savedAccounts = JSON.parse(sessionStorage.getItem('vault_accounts') || '[]');

    if (isRegister) {
      const allTouched = Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {});
      setTouched(allTouched);

      if (Object.keys(errors).length > 0) {
        setGeneralError('Please fix the highlighted errors before registering.');
        return;
      }

      const existingEmail = savedAccounts.find(
        (acc) => acc.email.toLowerCase() === formData.email.trim().toLowerCase()
      );
      const existingUsername = savedAccounts.find(
        (acc) => acc.username?.toLowerCase() === formData.username.trim().toLowerCase()
      );

      if (existingEmail || existingUsername) {
        setGeneralError('The account is already made.');
        return;
      }

      const newAccount = {
        username: formData.username.trim(),
        fullName: formData.fullName,
        email: formData.email.trim(),
        phone: formData.phone,
        address: formData.address,
        password: formData.password
      };

      sessionStorage.setItem('vault_accounts', JSON.stringify([...savedAccounts, newAccount]));
      onLogin(newAccount);
      navigate('/checkout');
    } else {
      if (!formData.email || !formData.password) {
        setGeneralError('Please enter both your account identifier and password.');
        return;
      }

      const userAccount = savedAccounts.find(
        (acc) =>
          acc.email.toLowerCase() === formData.email.trim().toLowerCase() ||
          acc.username?.toLowerCase() === formData.email.trim().toLowerCase()
      );

      if (!userAccount) {
        setGeneralError('No account found with these credentials. Please register first.');
        return;
      }

      if (userAccount.password !== formData.password) {
        setGeneralError('Invalid password credential.');
        return;
      }

      onLogin(userAccount);
      navigate('/checkout');
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-center items-center px-4 py-12 overflow-hidden bg-neutral-950">
      <div className="absolute inset-0 z-0">
        <img
          src={bannerImg}
          alt="Background"
          className="w-full h-full object-cover opacity-20 pointer-events-none"
        />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-6 space-y-1">
          <h1 className="text-2xl font-black tracking-widest uppercase text-white drop-shadow-md">
            {isRegister ? 'CREATE VAULT ACCOUNT' : 'VAULT ACCESS LOG IN'}
          </h1>
          <p className="text-xs text-neutral-400 tracking-wider">
            {isRegister
              ? 'Register to auto-fill checkout details.'
              : 'Sign in to access your saved delivery credentials.'}
          </p>
        </div>

        <div className="bg-black/90 border border-neutral-800 p-8 w-full shadow-2xl text-white backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            {generalError && (
              <p className="text-red-400 text-xs tracking-wider uppercase text-center font-bold bg-red-950/50 border border-red-800 py-2 px-3">
                {generalError}
              </p>
            )}

            {isRegister && (
              <>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1">
                    USERNAME
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full bg-neutral-900 text-white px-3 py-2 text-xs focus:outline-none border ${
                      touched.username && errors.username ? 'border-red-500' : 'border-neutral-800 focus:border-neutral-500'
                    }`}
                  />
                  {touched.username && errors.username && (
                    <p className="text-red-400 text-[10px] font-bold mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.username}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1">
                    FULL NAME
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full bg-neutral-900 text-white px-3 py-2 text-xs focus:outline-none border ${
                      touched.fullName && errors.fullName ? 'border-red-500' : 'border-neutral-800 focus:border-neutral-500'
                    }`}
                  />
                  {touched.fullName && errors.fullName && (
                    <p className="text-red-400 text-[10px] font-bold mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.fullName}
                    </p>
                  )}
                </div>
              </>
            )}

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1">
                {isRegister ? 'EMAIL ADDRESS' : 'EMAIL ADDRESS OR USERNAME'}
              </label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full bg-neutral-900 text-white px-3 py-2 text-xs focus:outline-none border ${
                  isRegister && touched.email && errors.email ? 'border-red-500' : 'border-neutral-800 focus:border-neutral-500'
                }`}
              />
              {isRegister && touched.email && errors.email && (
                <p className="text-red-400 text-[10px] font-bold mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.email}
                </p>
              )}
            </div>

            {isRegister && (
              <>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1">
                    PHONE NUMBER
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="09123456789"
                    className={`w-full bg-neutral-900 text-white px-3 py-2 text-xs focus:outline-none border ${
                      touched.phone && errors.phone ? 'border-red-500' : 'border-neutral-800 focus:border-neutral-500'
                    }`}
                  />
                  {touched.phone && errors.phone && (
                    <p className="text-red-400 text-[10px] font-bold mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1">
                    DEFAULT ADDRESS
                  </label>
                  <textarea
                    rows="2"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full bg-neutral-900 text-white px-3 py-2 text-xs focus:outline-none resize-none border ${
                      touched.address && errors.address ? 'border-red-500' : 'border-neutral-800 focus:border-neutral-500'
                    }`}
                  />
                  {touched.address && errors.address && (
                    <p className="text-red-400 text-[10px] font-bold mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.address}
                    </p>
                  )}
                </div>
              </>
            )}

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1">
                PASSWORD
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full bg-neutral-900 text-white px-3 py-2 text-xs pr-8 focus:outline-none border ${
                    isRegister && touched.password && errors.password ? 'border-red-500' : 'border-neutral-800 focus:border-neutral-500'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white transition"
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
              {isRegister && touched.password && errors.password && (
                <p className="text-red-400 text-[10px] font-bold mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.password}
                </p>
              )}
            </div>

            {isRegister && (
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1">
                  CONFIRM PASSWORD
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full bg-neutral-900 text-white px-3 py-2 text-xs pr-8 focus:outline-none border ${
                      touched.confirmPassword && errors.confirmPassword ? 'border-red-500' : 'border-neutral-800 focus:border-neutral-500'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white transition"
                  >
                    {showConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
                {touched.confirmPassword && errors.confirmPassword ? (
                  <p className="text-red-400 text-[10px] font-bold mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.confirmPassword}
                  </p>
                ) : (
                  touched.confirmPassword && !errors.confirmPassword && formData.confirmPassword && (
                    <p className="text-emerald-400 text-[10px] font-bold mt-1 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Passwords match.
                    </p>
                  )
                )}
              </div>
            )}

            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-white text-black font-bold text-xs py-3 tracking-widest uppercase hover:bg-neutral-200 transition-colors"
              >
                {isRegister ? 'REGISTER ACCOUNT' : 'AUTHENTICATE'}
              </button>
            </div>

            <div className="text-center mt-6">
              <button
                type="button"
                onClick={() => {
                  setIsRegister(!isRegister);
                  setGeneralError('');
                  setTouched({});
                }}
                className="text-[10px] font-bold tracking-widest text-neutral-400 hover:text-white uppercase underline"
              >
                {isRegister ? 'ALREADY REGISTERED? LOG IN' : 'NEW CUSTOMER? CREATE ACCOUNT'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}