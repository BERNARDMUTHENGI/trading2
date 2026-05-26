import React from 'react';
import { Trophy, TrendingUp, Zap, Calendar, Target, Award } from 'lucide-react';

const Dashboard = ({ balance, xp, level }) => {
  const achievements = [
    { name: 'First Trade', completed: true, reward: 100 },
    { name: '10 Trades', completed: false, reward: 500 },
    { name: '100% Win Streak', completed: false, reward: 1000 },
    { name: 'Level 10', completed: false, reward: 5000 },
  ];

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        
        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400">Balance</span>
              <TrendingUp size={20} className="text-neon-cyan" />
            </div>
            <div className="text-3xl font-bold text-neon-green">${balance.toLocaleString()}</div>
          </div>
          
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400">Level</span>
              <Award size={20} className="text-yellow-500" />
            </div>
            <div className="text-3xl font-bold text-white">{level}</div>
            <div className="text-sm text-gray-400">{xp}/{level * 1000} XP</div>
          </div>
          
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400">Win Rate</span>
              <Zap size={20} className="text-neon-pink" />
            </div>
            <div className="text-3xl font-bold text-neon-pink">68.5%</div>
          </div>
          
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400">Total Trades</span>
              <Target size={20} className="text-neon-purple" />
            </div>
            <div className="text-3xl font-bold text-neon-purple">247</div>
          </div>
        </div>
        
        {/* Achievements */}
        <div className="glass rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Trophy size={20} className="text-yellow-500" />
            Achievements
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {achievements.map((ach, i) => (
              <div key={i} className={`flex justify-between items-center p-4 rounded-xl ${ach.completed ? 'bg-neon-green/10 border border-neon-green/30' : 'bg-white/5'}`}>
                <div>
                  <div className="font-semibold">{ach.name}</div>
                  <div className="text-sm text-gray-400">+{ach.reward} XP</div>
                </div>
                {ach.completed ? (
                  <div className="w-6 h-6 rounded-full bg-neon-green flex items-center justify-center">✓</div>
                ) : (
                  <div className="w-6 h-6 rounded-full border-2 border-gray-500"></div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* XP Progress */}
        <div className="glass rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">Progress to Next Level</h2>
          <div className="relative h-4 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-neon-cyan to-neon-pink rounded-full transition-all duration-300"
              style={{ width: `${(xp % 1000) / 10}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-400">
            <span>Level {level}</span>
            <span>{xp % 1000}/{level * 1000} XP to Level {level + 1}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;