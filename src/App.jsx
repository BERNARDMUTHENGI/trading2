import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import TradingRoom from './pages/TradingRoom';
import Dashboard from './pages/Dashboard';
import Leaderboard from './pages/Leaderboard';
import Academy from './pages/Academy';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Component to conditionally show footer
const AppContent = () => {
  const location = useLocation();
  const hideFooterPaths = ['/trading']; // Hide footer on trading page for more space
  const showFooter = !hideFooterPaths.includes(location.pathname);

  return (
    <>
      <Navbar balance={balance} xp={xp} level={level} isAuthenticated={isAuthenticated} user={user} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/trading" element={<TradingRoom balance={balance} setBalance={setBalance} setXp={setXp} />} />
        <Route path="/dashboard" element={<Dashboard balance={balance} xp={xp} level={level} />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/academy" element={<Academy />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} setUser={setUser} />} />
        <Route path="/signup" element={<Signup setIsAuthenticated={setIsAuthenticated} setUser={setUser} />} />
        <Route path="/profile" element={<Profile user={user} setUser={setUser} />} />
      </Routes>
      {showFooter && <Footer />}
    </>
  );
};

function App() {
  const [balance, setBalance] = useState(10000);
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (token && savedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  useEffect(() => {
    if (xp >= level * 1000) {
      setLevel(prev => prev + 1);
    }
  }, [xp]);

  // Pass state to AppContent via context or props
  // For simplicity, we'll create a wrapper
  return (
    <Router>
      <div className="min-h-screen bg-gradient-main relative overflow-x-hidden flex flex-col">
        <div className="grid-pattern fixed inset-0 opacity-30 pointer-events-none"></div>
        <Navbar balance={balance} xp={xp} level={level} isAuthenticated={isAuthenticated} user={user} />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/trading" element={<TradingRoom balance={balance} setBalance={setBalance} setXp={setXp} />} />
            <Route path="/dashboard" element={<Dashboard balance={balance} xp={xp} level={level} />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/academy" element={<Academy />} />
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} setUser={setUser} />} />
            <Route path="/signup" element={<Signup setIsAuthenticated={setIsAuthenticated} setUser={setUser} />} />
            <Route path="/profile" element={<Profile user={user} setUser={setUser} />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;