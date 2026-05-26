import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Mail, Lock, Eye, EyeOff, LogIn, Sparkles, 
  Fingerprint, Shield, ArrowRight 
} from 'lucide-react';

const Login = ({ setIsAuthenticated, setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (email && password) {
      const userData = { 
        name: email.split('@')[0], 
        email, 
        avatar: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=00f3ff&color=fff`,
        joinedDate: new Date().toISOString(),
        balance: 10000
      };
      localStorage.setItem('token', 'nexTrade-token');
      localStorage.setItem('user', JSON.stringify(userData));
      if (rememberMe) {
        localStorage.setItem('rememberMe', 'true');
      }
      setIsAuthenticated(true);
      setUser(userData);
      navigate('/dashboard');
    } else {
      setError('Invalid email or password');
    }
    
    setIsLoading(false);
  };

  const handleBiometricLogin = () => {
    alert('Biometric login would work here on supported devices');
  };

  return (
    <div className="min-h-screen pt-16 flex items-center justify-center relative overflow-hidden">
      {/* Animated Background Particles */}
      {[...Array(15)].map((_, i) => (
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
        {/* Logo and Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-neon animate-gradient flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
          <p className="text-gray-400">Sign in to continue your trading journey</p>
        </div>
        
        {/* Login Form */}
        <div className="glass-card p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-3 text-red-500 text-sm flex items-center gap-2">
                <Shield size={16} />
                {error}
              </div>
            )}
            
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-neon-cyan transition" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-neon-cyan transition"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>
            
            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-neon-cyan transition" size={18} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
            
            {/* Remember Me & Forgot Password */}
            <div className="flex justify-between items-center">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-white/20 bg-white/5 text-neon-cyan focus:ring-neon-cyan focus:ring-offset-0"
                />
                <span className="text-sm text-gray-400">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-sm text-neon-cyan hover:text-neon-pink transition">
                Forgot password?
              </Link>
            </div>
            
            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-neon py-3 rounded-xl font-semibold flex items-center justify-center gap-2 group"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn size={18} />
                  Sign In
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition" />
                </>
              )}
            </button>
            
            {/* Biometric Login */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-dark-bg text-gray-500">Or continue with</span>
              </div>
            </div>
            
            <button
              type="button"
              onClick={handleBiometricLogin}
              className="w-full py-3 rounded-xl glass border border-white/10 text-gray-300 hover:text-neon-cyan hover:border-neon-cyan/50 transition flex items-center justify-center gap-2"
            >
              <Fingerprint size={18} />
              Biometric Login
            </button>
          </form>
          
          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Don't have an account?{' '}
              <Link to="/signup" className="text-neon-cyan hover:text-neon-pink transition font-semibold">
                Create one
              </Link>
            </p>
          </div>
        </div>
        
        {/* Demo Credentials */}
        <div className="mt-6 text-center">
          <div className="glass rounded-xl p-3">
            <p className="text-xs text-gray-500">Demo Credentials</p>
            <p className="text-xs text-gray-400">demo@nextrade.com / demo123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;