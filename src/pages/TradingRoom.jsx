import React, { useState, useEffect, useRef } from 'react';
import { 
  TrendingUp, TrendingDown, Circle, Activity, Zap, 
  Target, DollarSign, AlertCircle, Clock, ChevronDown,
  ZoomIn, ZoomOut, Maximize2, Minimize2, Expand,
  Globe, X, Phone, CreditCard, Coins, ArrowUpCircle, ArrowDownCircle,
  Hand, Users, Copy, Star
} from 'lucide-react';

// Deposit Modal
const DepositModal = ({ isOpen, onClose, onDeposit }) => {
  const [amount, setAmount] = useState(100);
  const [method, setMethod] = useState('mpesa');

  const methods = [
    { id: 'mpesa', name: 'M-Pesa', icon: Phone, min: 10 },
    { id: 'usdc', name: 'USDC', icon: Coins, min: 50 },
    { id: 'card', name: 'Card', icon: CreditCard, min: 50 },
  ];

  const handleSubmit = () => {
    onDeposit(amount);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative glass rounded-2xl max-w-md w-full p-6 border border-white/10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Deposit Funds</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="text-gray-400 text-sm block mb-2">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full bg-white/5 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-neon-cyan"
            />
            <div className="flex gap-2 mt-2">
              {[50, 100, 200, 500].map(amt => (
                <button key={amt} onClick={() => setAmount(amt)} className="px-3 py-1 bg-white/5 rounded text-sm hover:bg-neon-cyan/20 transition">
                  ${amt}
                </button>
              ))}
            </div>
          </div>
          
          <button
            onClick={handleSubmit}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-neon-cyan to-neon-pink text-white font-semibold hover:scale-105 transition"
          >
            Deposit ${amount}
          </button>
        </div>
      </div>
    </div>
  );
};

const TradingRoom = ({ balance, setBalance, setXp }) => {
  const [currentPrice, setCurrentPrice] = useState(42850.23);
  const [chartData, setChartData] = useState([]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isTrading, setIsTrading] = useState(false);
  const [activeTrade, setActiveTrade] = useState(null);
  const [tradeHistory, setTradeHistory] = useState([]);
  const [stake, setStake] = useState(100);
  const [selectedMarket, setSelectedMarket] = useState('Volatility 100');
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [selectedTradeType, setSelectedTradeType] = useState(null);
  
  const intervalRef = useRef(null);

  const markets = ['Volatility 100', 'Volatility 75', 'Volatility 50', 'Volatility 25', 'Volatility 10'];
  
  const tradeOptions = [
    { id: 'rise', name: 'RISE', icon: TrendingUp, color: 'green', payout: '95%' },
    { id: 'fall', name: 'FALL', icon: TrendingDown, color: 'red', payout: '95%' },
    { id: 'even', name: 'EVEN', icon: Circle, color: 'purple', payout: '92%' },
    { id: 'odd', name: 'ODD', icon: Activity, color: 'pink', payout: '92%' },
  ];

  // Generate chart data
  useEffect(() => {
    const data = [];
    let value = 42850;
    for (let i = 0; i < 100; i++) {
      value = value * (1 + (Math.random() * 0.002 - 0.001));
      data.push(value);
    }
    setChartData(data);
  }, []);

  // Trading simulation
  useEffect(() => {
    if (isTrading) {
      intervalRef.current = setInterval(() => {
        const change = (Math.random() - 0.5) * 4;
        setCurrentPrice(prev => {
          const newPrice = Math.max(40000, Math.min(46000, prev + change));
          setChartData(prevData => [...prevData.slice(-99), newPrice]);
          return newPrice;
        });
        
        setTimeLeft(prev => {
          if (prev <= 1) {
            if (activeTrade) settleTrade();
            return 60;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isTrading, activeTrade]);

  const placeTrade = (type) => {
    if (!isTrading) {
      alert('Start trading first!');
      return;
    }
    if (activeTrade) {
      alert('Active trade exists!');
      return;
    }
    if (stake > balance) {
      alert('Insufficient balance!');
      return;
    }
    
    setActiveTrade({
      id: Date.now(),
      type,
      stake,
      entryPrice: currentPrice,
      timestamp: new Date()
    });
    setSelectedTradeType(type);
    setTimeLeft(60);
  };

  const settleTrade = () => {
    if (!activeTrade) return;
    
    let isWin = false;
    let payoutMultiplier = 0.95;
    
    if (activeTrade.type === 'rise') {
      isWin = currentPrice > activeTrade.entryPrice;
    } else if (activeTrade.type === 'fall') {
      isWin = currentPrice < activeTrade.entryPrice;
    } else if (activeTrade.type === 'even') {
      isWin = Math.floor(currentPrice) % 2 === 0;
    } else if (activeTrade.type === 'odd') {
      isWin = Math.floor(currentPrice) % 2 !== 0;
    }
    
    if (activeTrade.type === 'even' || activeTrade.type === 'odd') {
      payoutMultiplier = 0.92;
    }
    
    const profit = isWin ? activeTrade.stake * payoutMultiplier : -activeTrade.stake;
    
    if (isWin) {
      setBalance(prev => prev + profit);
      setXp(prev => prev + Math.floor(profit / 10));
    } else {
      setBalance(prev => prev + profit);
      setXp(prev => prev + 5);
    }
    
    setTradeHistory(prev => [{
      ...activeTrade,
      exitPrice: currentPrice,
      profit,
      isWin
    }, ...prev]);
    setActiveTrade(null);
    setSelectedTradeType(null);
  };

  const startTrading = () => setIsTrading(true);
  const stopTrading = () => setIsTrading(false);
  const handleDeposit = (amount) => setBalance(prev => prev + amount);

  // Simple chart component
  const Chart = () => {
    const canvasRef = useRef(null);
    
    useEffect(() => {
      if (canvasRef.current && chartData.length) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        
        ctx.clearRect(0, 0, width, height);
        
        // Draw grid
        ctx.strokeStyle = 'rgba(255,255,255,0.1)';
        ctx.lineWidth = 1;
        for (let i = 0; i <= 4; i++) {
          const y = (i / 4) * height;
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }
        
        // Draw line
        const min = Math.min(...chartData);
        const max = Math.max(...chartData);
        const range = max - min;
        
        ctx.beginPath();
        ctx.strokeStyle = '#00f3ff';
        ctx.lineWidth = 2;
        
        chartData.forEach((price, i) => {
          const x = (i / (chartData.length - 1)) * width;
          const y = height - ((price - min) / range) * height;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        });
        ctx.stroke();
        
        // Fill
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.fillStyle = 'rgba(0, 243, 255, 0.05)';
        ctx.fill();
      }
    }, [chartData]);
    
    return <canvas ref={canvasRef} width={800} height={400} className="w-full h-full" />;
  };

  return (
    <div className="pt-16 min-h-screen">
      <DepositModal isOpen={showDepositModal} onClose={() => setShowDepositModal(false)} onDeposit={handleDeposit} />
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="glass rounded-xl p-4">
            <div className="text-gray-400 text-sm">Current Price</div>
            <div className="text-2xl font-bold text-neon-cyan">${currentPrice.toFixed(2)}</div>
          </div>
          <div className="glass rounded-xl p-4">
            <div className="text-gray-400 text-sm">Balance</div>
            <div className="text-2xl font-bold text-neon-green">${balance.toLocaleString()}</div>
          </div>
          <div className="glass rounded-xl p-4">
            <div className="text-gray-400 text-sm">Time Left</div>
            <div className="text-2xl font-bold text-white">{timeLeft}s</div>
          </div>
          <div className="glass rounded-xl p-4">
            <div className="text-gray-400 text-sm">Status</div>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isTrading ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
              <span className="text-white">{isTrading ? 'Trading Active' : 'Trading Stopped'}</span>
            </div>
          </div>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Chart Section */}
          <div className="lg:col-span-2 space-y-4">
            <div className="glass rounded-2xl p-4">
              <div className="flex justify-between items-center mb-4">
                <div className="flex gap-2">
                  <select 
                    value={selectedMarket}
                    onChange={(e) => setSelectedMarket(e.target.value)}
                    className="bg-white/5 rounded-lg px-3 py-1.5 text-sm border border-white/10"
                  >
                    {markets.map(m => <option key={m}>{m}</option>)}
                  </select>
                </div>
                <div className="flex gap-2">
                  <button className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition">
                    <ZoomIn size={16} />
                  </button>
                  <button className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition">
                    <ZoomOut size={16} />
                  </button>
                </div>
              </div>
              <div className="h-80">
                <Chart />
              </div>
            </div>
            
            {/* Trade Options Grid */}
            <div className="glass rounded-2xl p-4">
              <h3 className="font-semibold mb-4">Quick Trade</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {tradeOptions.map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => placeTrade(opt.id)}
                    disabled={!isTrading || activeTrade}
                    className={`p-4 rounded-xl bg-gradient-to-r from-${opt.color}-500 to-${opt.color}-600 font-semibold transition-all hover:scale-105 disabled:opacity-50`}
                  >
                    <opt.icon className="w-6 h-6 mx-auto mb-2" />
                    <div>{opt.name}</div>
                    <div className="text-xs opacity-90">{opt.payout}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Trading Panel */}
          <div className="space-y-4">
            {/* Active Trade */}
            {activeTrade && (
              <div className="glass rounded-2xl p-4 border border-neon-cyan/30">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Zap size={16} className="text-neon-cyan" />
                  Active Position
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Type:</span>
                    <span className="font-bold uppercase text-neon-cyan">{activeTrade.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Entry:</span>
                    <span>${activeTrade.entryPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Stake:</span>
                    <span>${activeTrade.stake}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Potential Win:</span>
                    <span className="text-neon-green">${(activeTrade.stake * 0.95).toFixed(2)}</span>
                  </div>
                  <div className="pt-2 border-t border-white/10">
                    <div className="flex justify-between">
                      <span>Time Left:</span>
                      <span className="text-neon-cyan font-bold">{timeLeft}s</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Trade Controls */}
            <div className="glass rounded-2xl p-4">
              <h3 className="font-semibold mb-4">Trade Controls</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-gray-400 text-sm block mb-2">Amount (USD)</label>
                  <input
                    type="number"
                    value={stake}
                    onChange={(e) => setStake(Number(e.target.value))}
                    className="w-full bg-white/5 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-neon-cyan"
                  />
                  <div className="flex gap-2 mt-2">
                    {[50, 100, 200, 500].map(amt => (
                      <button key={amt} onClick={() => setStake(amt)} className="flex-1 py-1 bg-white/5 rounded text-sm hover:bg-neon-cyan/20 transition">
                        ${amt}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={startTrading}
                    disabled={isTrading}
                    className="flex-1 py-2 rounded-lg bg-gradient-to-r from-neon-green to-green-600 font-semibold hover:scale-105 transition disabled:opacity-50"
                  >
                    Start
                  </button>
                  <button
                    onClick={stopTrading}
                    disabled={!isTrading}
                    className="flex-1 py-2 rounded-lg bg-gradient-to-r from-red-500 to-red-600 font-semibold hover:scale-105 transition disabled:opacity-50"
                  >
                    Stop
                  </button>
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowDepositModal(true)}
                    className="flex-1 py-2 rounded-lg glass text-neon-green font-semibold hover:bg-white/10 transition"
                  >
                    Deposit
                  </button>
                  <button className="flex-1 py-2 rounded-lg glass text-gray-400 font-semibold hover:bg-white/10 transition">
                    Withdraw
                  </button>
                </div>
              </div>
            </div>
            
            {/* Recent Trades */}
            {tradeHistory.length > 0 && (
              <div className="glass rounded-2xl p-4">
                <h3 className="font-semibold mb-3">Recent Trades</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {tradeHistory.slice(0, 5).map(trade => (
                    <div key={trade.id} className="flex justify-between items-center p-2 rounded-lg bg-white/5">
                      <div>
                        <div className={`font-bold text-sm uppercase ${trade.isWin ? 'text-neon-green' : 'text-red-500'}`}>
                          {trade.type}
                        </div>
                        <div className="text-xs text-gray-400">${trade.stake}</div>
                      </div>
                      <div className={`font-bold ${trade.isWin ? 'text-neon-green' : 'text-red-500'}`}>
                        {trade.isWin ? '+' : ''}{trade.profit.toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradingRoom;