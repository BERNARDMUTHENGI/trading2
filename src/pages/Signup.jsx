import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  User, Mail, Lock, Eye, EyeOff, UserPlus, Sparkles, 
  Phone, Shield, CheckCircle, ArrowRight
} from 'lucide-react';

const Signup = ({ setIsAuthenticated, setUser }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all required fields');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    if (!agreeTerms) {
      setError('Please agree to the Terms of Service');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const userData = { 
      name: formData.name, 
      email: formData.email,
      phone: formData.phone,
      avatar: `https://ui-avatars.com/api/?name=${formData.name}&background=00f3ff&color=fff`,
      joinedDate: new Date().toISOString(),
      balance: 10000
    };
    
    localStorage.setItem('token', 'nexTrade-token');
    localStorage.setItem('user', JSON.stringify(userData));
    setIsAuthenticated(true);
    setUser(userData);
    navigate('/dashboard');
    setIsLoading(false);
  };

  const handleSocialLogin = (provider) => {
    alert(`${provider} login would be implemented here`);
  };

  return (
    <div className="min-h-screen pt-16 flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
            width: `${2 + Math.random() * 4}px`,
            height: `${2 + Math.random() * 4}px`,
          }}
        />
      ))}
      
      <div className="max-w-md w-full mx-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-neon animate-gradient flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">Create Account</h1>
          <p className="text-gray-400">Start your trading journey today</p>
        </div>
        
        {/* Signup Form */}
        <div className="glass-card p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-3 text-red-500 text-sm flex items-center gap-2">
                <Shield size={16} />
                {error}
              </div>
            )}
            
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">
                Full Name *
              </label>
              <div className="relative group">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-neon-cyan transition" size={18} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-neon-cyan transition"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>
            
            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">
                Email Address *
              </label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-neon-cyan transition" size={18} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-neon-cyan transition"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>
            
            {/* Phone Number (Optional) */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">
                Phone Number (Optional)
              </label>
              <div className="relative group">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-neon-cyan transition" size={18} />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-neon-cyan transition"
                  placeholder="+1 234 567 8900"
                />
              </div>
            </div>
            
            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">
                Password *
              </label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-neon-cyan transition" size={18} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-12 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-neon-cyan transition"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-neon-cyan transition"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            
            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">
                Confirm Password *
              </label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-neon-cyan transition" size={18} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-neon-cyan transition"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>
            
            {/* Password Requirements */}
            <div className="text-xs text-gray-500 space-y-1">
              <p className="flex items-center gap-2">
                <CheckCircle size={12} className={formData.password.length >= 6 ? 'text-green-500' : 'text-gray-600'} />
                At least 6 characters
              </p>
            </div>
            
            {/* Terms Agreement */}
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded border-white/20 bg-white/5 text-neon-cyan focus:ring-neon-cyan focus:ring-offset-0"
              />
              <span className="text-sm text-gray-400">
                I agree to the{' '}
                <a href="#" className="text-neon-cyan hover:text-neon-pink transition">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="text-neon-cyan hover:text-neon-pink transition">Privacy Policy</a>
              </span>
            </label>
            
            {/* Signup Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-neon py-3 rounded-xl font-semibold flex items-center justify-center gap-2 group"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <UserPlus size={18} />
                  Create Account
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition" />
                </>
              )}
            </button>
            
            {/* Social Signup */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-dark-bg text-gray-500">Or sign up with</span>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => handleSocialLogin('Google')}
                className="flex-1 py-2 rounded-xl glass border border-white/10 text-gray-300 hover:text-neon-cyan hover:border-neon-cyan/50 transition flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Google
              </button>
              <button
                type="button"
                onClick={() => handleSocialLogin('Apple')}
                className="flex-1 py-2 rounded-xl glass border border-white/10 text-gray-300 hover:text-neon-cyan hover:border-neon-cyan/50 transition flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17.36 3 13.75 3 10.78c0-3.03 1.76-4.52 3.36-4.88 1.35-.31 2.52.2 3.3.2.78 0 2.04-.3 3.43-.3 1.54 0 2.39.3 3.27.3.89 0 2.05-.48 3.12-.48.58 0 2.25.06 3.33 1.69-.09.06-1.98 1.15-1.96 3.42.02 2.71 2.37 3.61 2.4 3.62-.02.06-.37 1.27-1.22 2.52-.84 1.24-1.48 1.68-2.45 1.68-1.32 0-1.81-.84-3.42-.84-1.58 0-2.04.85-3.33.85zM15.29 4.54c.76-.92 1.28-2.2 1.14-3.49-1.11.05-2.46.74-3.25 1.67-.72.83-1.15 2.08-1.01 3.32 1.17.09 2.38-.63 3.12-1.5z" />
                </svg>
                Apple
              </button>
            </div>
          </form>
          
          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="text-neon-cyan hover:text-neon-pink transition font-semibold">
                Sign in
              </Link>
            </p>
          </div>
        </div>
        
        {/* Bonus Info */}
        <div className="mt-6 glass rounded-xl p-3 text-center">
          <p className="text-xs text-gray-400">
            ✨ Get $10,000 bonus on first deposit! ✨
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;