import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, Rocket, Shield, Zap, Trophy, Users, 
  Star, ArrowRight, TrendingUp, Clock, Award,
  ChevronRight, Play, Pause
} from 'lucide-react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const LandingPage = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [stats, setStats] = useState({ traders: 0, volume: 0, winRate: 0 });

  useEffect(() => {
    const animate = setInterval(() => {
      setStats(prev => ({
        traders: Math.min(prev.traders + 100, 25000),
        volume: Math.min(prev.volume + 50, 250000),
        winRate: Math.min(prev.winRate + 0.5, 89.5)
      }));
    }, 30);
    return () => clearInterval(animate);
  }, []);

  const features = [
    { icon: Zap, title: 'Lightning Fast', desc: 'Millisecond execution with zero slippage', color: 'from-neon-cyan' },
    { icon: Shield, title: 'Bank Grade Security', desc: 'Your funds are always protected', color: 'from-neon-purple' },
    { icon: TrendingUp, title: 'AI Predictions', desc: 'Machine learning powered insights', color: 'from-neon-pink' },
    { icon: Trophy, title: 'Leaderboard Rewards', desc: 'Compete and earn bonuses', color: 'from-yellow-500' },
    { icon: Users, title: 'Social Trading', desc: 'Copy top traders strategies', color: 'from-blue-500' },
    { icon: Rocket, title: 'Instant Withdrawals', desc: 'Get your funds in seconds', color: 'from-green-500' },
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Animated Particles */}
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

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass mb-6">
                <Sparkles size={14} className="text-neon-cyan" />
                <span className="text-xs text-neon-cyan">Powered by AI</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                Trade Binary
                <span className="bg-gradient-to-r from-neon-cyan via-neon-pink to-neon-purple bg-clip-text text-transparent">
                  {' '}Smarter
                </span>
              </h1>
              
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                Join the next generation trading platform with AI predictions, 
                social trading, and up to 95% payouts. Start your journey today.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/trading"
                  className="group relative px-8 py-3 rounded-lg bg-gradient-to-r from-neon-cyan to-neon-pink text-white font-semibold overflow-hidden transition-all hover:scale-105"
                >
                  <span className="relative z-10">Start Trading Now</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-neon-pink to-neon-cyan opacity-0 group-hover:opacity-100 transition"></div>
                </Link>
                
                <button className="px-8 py-3 rounded-lg glass text-white font-semibold hover:border-neon-cyan/50 transition-all">
                  Watch Demo
                </button>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/10">
                <div>
                  <div className="text-2xl font-bold text-neon-cyan">{stats.traders.toLocaleString()}+</div>
                  <div className="text-xs text-gray-400">Active Traders</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-neon-cyan">${stats.volume.toLocaleString()}M</div>
                  <div className="text-xs text-gray-400">Daily Volume</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-neon-cyan">{stats.winRate.toFixed(1)}%</div>
                  <div className="text-xs text-gray-400">Win Rate</div>
                </div>
              </div>
            </motion.div>

            {/* Right Content - 3D Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-neon-cyan to-neon-pink rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition"></div>
                <div className="relative glass rounded-2xl p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <div className="text-xs text-gray-400">Volatility 100 Index</div>
                      <div className="text-2xl font-bold text-white">$42,850.23</div>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition"
                      >
                        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                      </button>
                    </div>
                  </div>
                  
                  {/* Animated Chart Placeholder */}
                  <div className="h-48 bg-gradient-to-b from-neon-cyan/10 to-transparent rounded-lg mb-4 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-end">
                      {[...Array(30)].map((_, i) => (
                        <div
                          key={i}
                          className="flex-1 bg-neon-cyan/30 mx-px rounded-t"
                          style={{
                            height: `${30 + Math.sin(Date.now() / 1000 + i) * 20}%`,
                            transition: 'height 0.3s ease'
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-gray-400 text-xs">24h Change</div>
                      <div className="text-green-500 font-semibold">+2.34%</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs">Payout</div>
                      <div className="text-neon-cyan font-semibold">95.22%</div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 mt-4">
                    <button className="flex-1 py-2 bg-gradient-to-r from-green-500 to-green-600 rounded-lg font-semibold hover:scale-105 transition">
                      RISE
                    </button>
                    <button className="flex-1 py-2 bg-gradient-to-r from-red-500 to-red-600 rounded-lg font-semibold hover:scale-105 transition">
                      FALL
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose{' '}
              <span className="bg-gradient-to-r from-neon-cyan to-neon-pink bg-clip-text text-transparent">
                NexTrade
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Experience the future of trading with cutting-edge features
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-neon-cyan to-neon-pink rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500"></div>
                <div className="relative glass rounded-2xl p-6">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} to-transparent flex items-center justify-center mb-4`}>
                    <feature.icon className="text-white" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Start in 3 Easy Steps</h2>
            <p className="text-gray-400">Get started with NexTrade in minutes</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Create Account', desc: 'Sign up for free in seconds', icon: Users },
              { step: '02', title: 'Deposit Funds', desc: 'Add funds via any method', icon: Rocket },
              { step: '03', title: 'Start Trading', desc: 'Trade and earn profits', icon: TrendingUp },
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div className="relative w-24 h-24 mx-auto mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan to-neon-pink rounded-full blur-xl opacity-50 group-hover:opacity-75 transition"></div>
                  <div className="relative w-24 h-24 rounded-full glass flex items-center justify-center">
                    <item.icon size={32} className="text-neon-cyan" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-r from-neon-cyan to-neon-pink flex items-center justify-center text-xs font-bold">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan to-neon-pink rounded-3xl blur-3xl opacity-30"></div>
            <div className="relative glass rounded-3xl p-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Start Your Journey?
              </h2>
              <p className="text-gray-400 mb-8">
                Join 25,000+ traders already making profits on NexTrade
              </p>
              <Link
                to="/trading"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-gradient-to-r from-neon-cyan to-neon-pink text-white font-semibold hover:scale-105 transition-all"
              >
                Get Started Now
                <ChevronRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;