import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  TrendingUp, LayoutDashboard, Trophy, BookOpen, 
  User, Zap, Award, Menu, X, Sparkles, LogIn, UserPlus
} from 'lucide-react';

const Navbar = ({ balance, xp, level, isAuthenticated, user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Sparkles },
    { path: '/trading', label: 'Trade', icon: TrendingUp },
    { path: '/dashboard', label: 'Stats', icon: LayoutDashboard },
    { path: '/leaderboard', label: 'Rankings', icon: Trophy },
    { path: '/academy', label: 'Learn', icon: BookOpen },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo - Left Side */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-neon animate-gradient flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-neon-cyan to-neon-pink bg-clip-text text-transparent">
                Injector
              </span>
            </Link>

            {/* Desktop Navigation - Center */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    location.pathname === item.path
                      ? 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30'
                      : 'text-gray-400 hover:text-neon-cyan hover:bg-white/5'
                  }`}
                >
                  <item.icon size={16} />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>

            {/* Desktop Right Section - User Info & Auth */}
            <div className="hidden md:flex items-center gap-4">
              {/* XP Bar */}
              <div className="relative">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                  <Award size={16} className="text-yellow-500" />
                  <span className="text-sm font-semibold text-white">Lvl {level}</span>
                  <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-neon-cyan to-neon-pink rounded-full transition-all duration-300"
                      style={{ width: `${(xp % 1000) / 10}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-400">{xp}/{level * 1000}</span>
                </div>
              </div>

              {/* Balance */}
              <div className="px-4 py-1.5 rounded-lg ">
                <span className="text-xs text-gray-400">Balance</span>
                <p className="text-neon-green font-bold">${balance.toLocaleString()}</p>
              </div>

              {/* Auth Links / Profile */}
              {isAuthenticated ? (
                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg glass hover:bg-white/10 transition group"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-neon-cyan to-neon-pink flex items-center justify-center">
                    <User size={12} className="text-white" />
                  </div>
                  <span className="text-sm text-gray-300 group-hover:text-neon-cyan transition">
                    {user?.name?.split(' ')[0] || 'Profile'}
                  </span>
                </Link>
              ) : (
                <div className="flex gap-2">
                  <Link
                    to="/login"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg glass text-gray-300 hover:text-neon-cyan hover:bg-white/5 transition"
                  >
                    <LogIn size={16} />
                    <span>Login</span>
                  </Link>
                  <Link
                    to="/signup"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-neon-cyan to-neon-pink text-white font-semibold hover:scale-105 transition"
                  >
                    <UserPlus size={16} />
                    <span>Sign Up</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button - Right Side */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg glass"
            >
              {isMenuOpen ? <X size={20} className="text-white" /> : <Menu size={20} className="text-white" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Menu - Slides from right */}
      <div
        className={`fixed inset-y-0 right-0 z-40 w-64 glass transform transition-transform duration-300 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex justify-between items-center p-4 border-b border-white/10">
            <span className="text-neon-cyan font-bold text-lg">Menu</span>
            <button onClick={() => setIsMenuOpen(false)} className="p-2 rounded-lg hover:bg-white/5">
              <X size={18} className="text-gray-400" />
            </button>
          </div>

          {/* Mobile Navigation Items */}
          <div className="flex-1 py-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition ${
                  location.pathname === item.path
                    ? 'bg-neon-cyan/20 text-neon-cyan border-l-2 border-neon-cyan'
                    : 'text-gray-400 hover:text-neon-cyan hover:bg-white/5'
                }`}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Mobile User Section */}
          <div className="border-t border-white/10 p-4 space-y-4">
            {/* Balance */}
            <div className="px-4 py-3 rounded-lg bg-white/5">
              <div className="text-xs text-gray-400">Balance</div>
              <div className="text-neon-green font-bold text-lg">${balance.toLocaleString()}</div>
            </div>
            
            {/* XP Progress */}
            <div className="px-4 py-3 rounded-lg bg-white/5">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-400">Level {level}</span>
                <span className="text-gray-400">{xp}/{level * 1000} XP</span>
              </div>
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-neon-cyan to-neon-pink rounded-full transition-all"
                  style={{ width: `${(xp % 1000) / 10}%` }}
                />
              </div>
            </div>

            {/* Auth Links for Mobile */}
            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full p-3 rounded-lg glass text-gray-300 hover:text-neon-cyan transition"
                >
                  <User size={16} />
                  <span>My Profile</span>
                </Link>
                <button
                  onClick={() => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    window.location.href = '/';
                  }}
                  className="flex items-center justify-center gap-2 w-full p-3 rounded-lg bg-red-500/20 text-red-500 hover:bg-red-500/30 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="space-y-2">
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full p-3 rounded-lg glass text-gray-300 hover:text-neon-cyan transition"
                >
                  <LogIn size={16} />
                  <span>Login</span>
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full p-3 rounded-lg bg-gradient-to-r from-neon-cyan to-neon-pink text-white font-semibold transition"
                >
                  <UserPlus size={16} />
                  <span>Sign Up</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Overlay when menu is open */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;