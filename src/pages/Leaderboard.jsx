import React from 'react';
import { Trophy, Crown, Medal, TrendingUp } from 'lucide-react';

const Leaderboard = () => {
  const topTraders = [
    { rank: 1, name: 'Alex Morgan', profit: 45230, winRate: 89, trades: 342, icon: Crown },
    { rank: 2, name: 'Sarah Chen', profit: 38920, winRate: 85, trades: 298, icon: Medal },
    { rank: 3, name: 'Mike Johnson', profit: 32150, winRate: 82, trades: 267, icon: Medal },
    { rank: 4, name: 'Emma Watson', profit: 28760, winRate: 79, trades: 234 },
    { rank: 5, name: 'David Kim', profit: 25430, winRate: 76, trades: 212 },
  ];

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Top Traders</h1>
          <p className="text-gray-400">Compete and earn rewards</p>
        </div>
        
        {/* Top 3 Podium */}
        <div className="grid grid-cols-3 gap-4 mb-12 items-end">
          {topTraders.slice(0, 3).map((trader, index) => (
            <div key={trader.rank} className={`text-center ${index === 0 ? 'order-2' : index === 1 ? 'order-1' : 'order-3'}`}>
              <div className={`glass rounded-2xl p-4 ${index === 0 ? 'h-48' : index === 1 ? 'h-40' : 'h-36'}`}>
                <div className="flex justify-center mb-3">
                  <trader.icon size={32} className={index === 0 ? 'text-yellow-500' : 'text-gray-400'} />
                </div>
                <div className="font-bold text-lg">{trader.name}</div>
                <div className="text-neon-green font-bold">${trader.profit.toLocaleString()}</div>
                <div className="text-sm text-gray-400">Win Rate: {trader.winRate}%</div>
              </div>
              <div className="mt-2 text-2xl font-bold text-neon-cyan">#{trader.rank}</div>
            </div>
          ))}
        </div>
        
        {/* Full List */}
        <div className="glass rounded-2xl overflow-hidden">
          <div className="grid grid-cols-4 gap-4 p-4 border-b border-white/10 font-semibold text-gray-400">
            <div>Rank</div>
            <div>Trader</div>
            <div className="text-right">Profit</div>
            <div className="text-right">Win Rate</div>
          </div>
          
          {topTraders.map(trader => (
            <div key={trader.rank} className="grid grid-cols-4 gap-4 p-4 hover:bg-white/5 transition">
              <div className="font-bold text-neon-cyan">#{trader.rank}</div>
              <div className="flex items-center gap-2">
                {trader.rank <= 3 && <TraderIcon rank={trader.rank} />}
                {trader.name}
              </div>
              <div className="text-right text-neon-green font-semibold">${trader.profit.toLocaleString()}</div>
              <div className="text-right">{trader.winRate}%</div>
            </div>
          ))}
        </div>
        
        {/* Your Rank */}
        <div className="mt-8 glass rounded-2xl p-6">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-gray-400 text-sm">Your Rank</div>
              <div className="text-3xl font-bold text-neon-cyan">#156</div>
            </div>
            <div>
              <div className="text-gray-400 text-sm">Total Profit</div>
              <div className="text-2xl font-bold text-neon-green">+$2,450</div>
            </div>
            <div>
              <div className="text-gray-400 text-sm">Next Reward</div>
              <div className="text-2xl font-bold">$500</div>
            </div>
            <button className="px-6 py-2 rounded-lg bg-gradient-to-r from-neon-cyan to-neon-pink font-semibold hover:scale-105 transition">
              Climb Leaderboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const TraderIcon = ({ rank }) => {
  const icons = { 1: '👑', 2: '🥈', 3: '🥉' };
  return <span>{icons[rank]}</span>;
};

export default Leaderboard;