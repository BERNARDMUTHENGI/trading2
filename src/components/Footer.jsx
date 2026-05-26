import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Zap, Mail, Phone, MapPin, Globe, Shield, Award, 
  Clock, TrendingUp, LayoutDashboard, Trophy, BookOpen,
  Sparkles, CreditCard, DollarSign, Headphones, ChevronRight,
  Users, Github, Linkedin, MessageCircle, Send
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Trading', path: '/trading' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Leaderboard', path: '/leaderboard' },
    { name: 'Academy', path: '/academy' },
  ];

  const resources = [
    { name: 'Help Center', icon: Headphones },
    { name: 'Tutorials', icon: BookOpen },
    { name: 'Blog', icon: TrendingUp },
    { name: 'Community', icon: Users },
    { name: 'API Documentation', icon: Shield },
  ];

  const legal = [
    { name: 'Terms of Service', path: '/terms' },
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Cookie Policy', path: '/cookies' },
    { name: 'Risk Disclosure', path: '/risk' },
    { name: 'AML Policy', path: '/aml' },
  ];

  const paymentMethods = [
    { name: 'Visa', icon: CreditCard },
    { name: 'Mastercard', icon: CreditCard },
    { name: 'M-Pesa', icon: DollarSign },
    { name: 'USDC', icon: DollarSign },
    { name: 'Bitcoin', icon: DollarSign },
  ];

  const socialLinks = [
    { name: 'Twitter', icon: MessageCircle, url: '#' },
    { name: 'GitHub', icon: Github, url: '#' },
    { name: 'LinkedIn', icon: Linkedin, url: '#' },
    { name: 'Telegram', icon: Send, url: '#' },
  ];

  return (
    <footer className="relative mt-20">
      {/* Gradient Border Top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-cyan to-transparent"></div>
      
      {/* Main Footer */}
      <div className="glass pt-12 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
            
            {/* Brand Column */}
            <div className="lg:col-span-1">
              <Link to="/" className="flex items-center gap-2 mb-4 group">
                <div className="w-10 h-10 rounded-lg bg-gradient-neon animate-gradient flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-neon-cyan to-neon-pink bg-clip-text text-transparent">
                  NexTrade
                </span>
              </Link>
              <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                Next generation binary options trading platform with AI predictions, 
                social trading, and up to 95% payouts.
              </p>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a 
                    key={index}
                    href={social.url} 
                    className="p-2 rounded-lg glass hover:text-neon-cyan hover:border-neon-cyan/50 transition group"
                  >
                    <social.icon size={18} className="group-hover:scale-110 transition" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Sparkles size={16} className="text-neon-cyan" />
                Quick Links
              </h3>
              <ul className="space-y-2">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link 
                      to={link.path} 
                      className="text-gray-400 hover:text-neon-cyan transition flex items-center gap-2 text-sm group"
                    >
                      <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Award size={16} className="text-neon-pink" />
                Resources
              </h3>
              <ul className="space-y-2">
                {resources.map((resource, index) => (
                  <li key={index}>
                    <a 
                      href="#" 
                      className="text-gray-400 hover:text-neon-pink transition flex items-center gap-2 text-sm group"
                    >
                      <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition" />
                      {resource.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Shield size={16} className="text-neon-green" />
                Legal
              </h3>
              <ul className="space-y-2">
                {legal.map((item, index) => (
                  <li key={index}>
                    <Link 
                      to={item.path} 
                      className="text-gray-400 hover:text-neon-green transition flex items-center gap-2 text-sm group"
                    >
                      <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition" />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact & Payment */}
            <div>
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Globe size={16} className="text-neon-purple" />
                Contact
              </h3>
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <Mail size={16} className="text-neon-cyan flex-shrink-0" />
                  <span>support@nextrade.com</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <Phone size={16} className="text-neon-cyan flex-shrink-0" />
                  <span>+1 (888) 123-4567</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <Clock size={16} className="text-neon-cyan flex-shrink-0" />
                  <span>24/7 Customer Support</span>
                </div>
              </div>
              
              <h3 className="text-white font-semibold mb-3 flex items-center gap-2 text-sm">
                <CreditCard size={14} className="text-neon-cyan" />
                Payment Methods
              </h3>
              <div className="flex flex-wrap gap-2">
                {paymentMethods.map((method, index) => (
                  <div key={index} className="px-3 py-1 rounded-lg glass text-xs text-gray-400 flex items-center gap-1">
                    <method.icon size={12} className="text-neon-cyan" />
                    {method.name}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-t border-white/10 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-neon-cyan">25K+</div>
              <div className="text-xs text-gray-400">Active Traders</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-neon-pink">$250M+</div>
              <div className="text-xs text-gray-400">Trading Volume</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-neon-green">95%</div>
              <div className="text-xs text-gray-400">Payout Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-neon-purple">24/7</div>
              <div className="text-xs text-gray-400">Support</div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-xs text-gray-500 text-center md:text-left">
              © {currentYear} NexTrade. All rights reserved. Binary options trading involves substantial risk of loss.
            </div>
            <div className="flex gap-4 text-xs">
              <a href="#" className="text-gray-500 hover:text-neon-cyan transition">Sitemap</a>
              <span className="text-gray-600">|</span>
              <a href="#" className="text-gray-500 hover:text-neon-cyan transition">Accessibility</a>
              <span className="text-gray-600">|</span>
              <a href="#" className="text-gray-500 hover:text-neon-cyan transition">Cookies</a>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Support Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button className="group relative">
          <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan to-neon-pink rounded-full blur-lg opacity-50 group-hover:opacity-75 transition"></div>
          <div className="relative w-12 h-12 rounded-full glass flex items-center justify-center hover:scale-110 transition">
            <Headphones size={20} className="text-neon-cyan" />
          </div>
        </button>
      </div>
    </footer>
  );
};

export default Footer;