import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, Mail, Phone, LogOut, Edit2, Save, X, 
  Award, TrendingUp, Clock, Shield, Settings, 
  Bell, Lock, Globe, CreditCard, Upload, Camera,
  CheckCircle, AlertCircle, Star, Calendar, MapPin
} from 'lucide-react';

const Profile = ({ user, setUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user || { 
    name: '', 
    email: '', 
    phone: '',
    bio: '',
    location: '',
    avatar: ''
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  // Mock user stats
  const userStats = {
    totalTrades: 247,
    winRate: 68.5,
    totalProfit: 12500,
    bestTrade: 2450,
    streak: 5,
    level: 7,
    xp: 3450,
    nextLevelXp: 4000,
    rank: 156,
    joinedDate: 'January 15, 2024'
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('rememberMe');
    setUser(null);
    navigate('/');
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    localStorage.setItem('user', JSON.stringify(formData));
    setUser(formData);
    setIsEditing(false);
    setIsSaving(false);
  };

  const handleCancel = () => {
    setFormData(user);
    setIsEditing(false);
  };

  const handleAvatarUpload = () => {
    // Simulate avatar upload
    alert('Avatar upload feature would open file picker');
  };

  if (!user) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-r from-neon-cyan to-neon-pink flex items-center justify-center">
            <User size={48} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Not Logged In</h2>
          <p className="text-gray-400 mb-6">Please log in to view your profile</p>
          <button 
            onClick={() => navigate('/login')} 
            className="btn-neon px-6 py-2 rounded-lg"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 pb-12">
      <div className="max-w-5xl mx-auto px-4">
        {/* Profile Header */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/20 to-neon-pink/20 rounded-3xl blur-2xl"></div>
          <div className="relative glass-card p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Avatar */}
              <div className="relative group">
                <div className="w-28 h-28 rounded-full bg-gradient-to-r from-neon-cyan to-neon-pink p-0.5">
                  <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center overflow-hidden">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                      <User size={48} className="text-white" />
                    )}
                  </div>
                </div>
                <button 
                  onClick={handleAvatarUpload}
                  className="absolute bottom-0 right-0 p-2 rounded-full bg-neon-cyan text-dark-bg hover:scale-110 transition"
                >
                  <Camera size={14} />
                </button>
              </div>
              
              {/* User Info */}
              <div className="flex-1 text-center md:text-left">
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="text-2xl font-bold bg-white/5 border border-white/10 rounded-lg px-3 py-1 mb-2 focus:outline-none focus:border-neon-cyan"
                  />
                ) : (
                  <h1 className="text-2xl font-bold mb-1">{user.name}</h1>
                )}
                <div className="flex flex-wrap gap-3 justify-center md:justify-start text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    Joined {userStats.joinedDate}
                  </span>
                  <span className="flex items-center gap-1">
                    <Award size={14} className="text-yellow-500" />
                    Level {userStats.level}
                  </span>
                  <span className="flex items-center gap-1">
                    <TrendingUp size={14} className="text-neon-green" />
                    Rank #{userStats.rank}
                  </span>
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex gap-3">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSave}
                      disabled={isSaving}
                      className="px-4 py-2 rounded-lg bg-neon-green text-dark-bg font-semibold flex items-center gap-2 hover:scale-105 transition"
                    >
                      {isSaving ? <div className="w-4 h-4 border-2 border-dark-bg border-t-transparent rounded-full animate-spin" /> : <Save size={16} />}
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 rounded-lg glass text-gray-300 hover:text-white flex items-center gap-2 transition"
                    >
                      <X size={16} />
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-4 py-2 rounded-lg glass text-gray-300 hover:text-neon-cyan flex items-center gap-2 transition"
                    >
                      <Edit2 size={16} />
                      Edit
                    </button>
                    <button
                      onClick={handleLogout}
                      className="px-4 py-2 rounded-lg bg-red-500/20 text-red-500 hover:bg-red-500/30 flex items-center gap-2 transition"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Stats Cards */}
          <div className="space-y-6">
            {/* Stats Overview */}
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <TrendingUp size={18} className="text-neon-cyan" />
                Trading Stats
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Total Trades</span>
                  <span className="font-semibold text-neon-cyan">{userStats.totalTrades}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Win Rate</span>
                  <span className="font-semibold text-neon-green">{userStats.winRate}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Total Profit</span>
                  <span className="font-semibold text-neon-green">${userStats.totalProfit.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Best Trade</span>
                  <span className="font-semibold text-yellow-500">${userStats.bestTrade.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Current Streak</span>
                  <span className="font-semibold text-neon-pink">{userStats.streak} 🔥</span>
                </div>
              </div>
            </div>
            
            {/* Level Progress */}
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Award size={18} className="text-yellow-500" />
                Level Progress
              </h3>
              <div className="mb-2 flex justify-between text-sm">
                <span>Level {userStats.level}</span>
                <span>{userStats.xp} / {userStats.nextLevelXp} XP</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-4">
                <div 
                  className="h-full bg-gradient-to-r from-neon-cyan to-neon-pink rounded-full transition-all"
                  style={{ width: `${(userStats.xp / userStats.nextLevelXp) * 100}%` }}
                />
              </div>
              <div className="text-xs text-gray-400">
                {userStats.nextLevelXp - userStats.xp} XP to next level
              </div>
            </div>
            
            {/* Achievements */}
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Star size={18} className="text-yellow-500" />
                Recent Achievements
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-2 rounded-lg bg-white/5">
                  <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center">
                    <Trophy size={14} className="text-yellow-500" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold">First Trade</div>
                    <div className="text-xs text-gray-500">Completed first trade</div>
                  </div>
                  <CheckCircle size={16} className="text-neon-green" />
                </div>
                <div className="flex items-center gap-3 p-2 rounded-lg bg-white/5">
                  <div className="w-8 h-8 rounded-full bg-neon-cyan/20 flex items-center justify-center">
                    <TrendingUp size={14} className="text-neon-cyan" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold">5 Win Streak</div>
                    <div className="text-xs text-gray-500">5 consecutive wins</div>
                  </div>
                  <CheckCircle size={16} className="text-neon-green" />
                </div>
                <div className="flex items-center gap-3 p-2 rounded-lg bg-white/5 opacity-50">
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <Award size={14} className="text-purple-500" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold">100 Trades</div>
                    <div className="text-xs text-gray-500">Complete 100 trades</div>
                  </div>
                  <div className="text-xs text-gray-500">72/100</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <User size={18} className="text-neon-cyan" />
                Personal Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 rounded-xl bg-white/5">
                  <User size={18} className="text-neon-cyan" />
                  <div className="flex-1">
                    <div className="text-xs text-gray-500">Full Name</div>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="bg-white/5 border border-white/10 rounded px-3 py-1 w-full mt-1 focus:outline-none focus:border-neon-cyan"
                      />
                    ) : (
                      <div className="font-medium">{user.name}</div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-3 rounded-xl bg-white/5">
                  <Mail size={18} className="text-neon-cyan" />
                  <div className="flex-1">
                    <div className="text-xs text-gray-500">Email Address</div>
                    {isEditing ? (
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="bg-white/5 border border-white/10 rounded px-3 py-1 w-full mt-1 focus:outline-none focus:border-neon-cyan"
                      />
                    ) : (
                      <div className="font-medium">{user.email}</div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-3 rounded-xl bg-white/5">
                  <Phone size={18} className="text-neon-cyan" />
                  <div className="flex-1">
                    <div className="text-xs text-gray-500">Phone Number</div>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={formData.phone || ''}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="bg-white/5 border border-white/10 rounded px-3 py-1 w-full mt-1 focus:outline-none focus:border-neon-cyan"
                        placeholder="Not provided"
                      />
                    ) : (
                      <div className="font-medium">{user.phone || 'Not provided'}</div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-3 rounded-xl bg-white/5">
                  <MapPin size={18} className="text-neon-cyan" />
                  <div className="flex-1">
                    <div className="text-xs text-gray-500">Location</div>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.location || ''}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="bg-white/5 border border-white/10 rounded px-3 py-1 w-full mt-1 focus:outline-none focus:border-neon-cyan"
                        placeholder="Not provided"
                      />
                    ) : (
                      <div className="font-medium">{formData.location || 'Not provided'}</div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-3 rounded-xl bg-white/5">
                  <Globe size={18} className="text-neon-cyan" />
                  <div className="flex-1">
                    <div className="text-xs text-gray-500">Bio</div>
                    {isEditing ? (
                      <textarea
                        value={formData.bio || ''}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        rows={3}
                        className="bg-white/5 border border-white/10 rounded px-3 py-1 w-full mt-1 focus:outline-none focus:border-neon-cyan"
                        placeholder="Tell us about yourself..."
                      />
                    ) : (
                      <div className="font-medium">{formData.bio || 'No bio yet'}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Account Settings */}
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Settings size={18} className="text-neon-cyan" />
                Account Settings
              </h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-3 rounded-xl glass hover:bg-white/5 transition">
                  <div className="flex items-center gap-3">
                    <Lock size={18} className="text-neon-cyan" />
                    <span>Change Password</span>
                  </div>
                  <ChevronRight size={16} className="text-gray-500" />
                </button>
                
                <button className="w-full flex items-center justify-between p-3 rounded-xl glass hover:bg-white/5 transition">
                  <div className="flex items-center gap-3">
                    <Bell size={18} className="text-neon-cyan" />
                    <span>Notification Settings</span>
                  </div>
                  <ChevronRight size={16} className="text-gray-500" />
                </button>
                
                <button className="w-full flex items-center justify-between p-3 rounded-xl glass hover:bg-white/5 transition">
                  <div className="flex items-center gap-3">
                    <CreditCard size={18} className="text-neon-cyan" />
                    <span>Payment Methods</span>
                  </div>
                  <ChevronRight size={16} className="text-gray-500" />
                </button>
                
                <button 
                  onClick={() => setShowDeleteConfirm(true)}
                  className="w-full flex items-center justify-between p-3 rounded-xl glass hover:bg-red-500/10 transition text-red-500"
                >
                  <div className="flex items-center gap-3">
                    <AlertCircle size={18} />
                    <span>Delete Account</span>
                  </div>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
            
            {/* Security Status */}
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Shield size={18} className="text-neon-green" />
                Security Status
              </h3>
              <div className="flex items-center justify-between p-3 rounded-xl bg-neon-green/10 border border-neon-green/30">
                <div className="flex items-center gap-3">
                  <Shield size={18} className="text-neon-green" />
                  <div>
                    <div className="font-medium">Account Protected</div>
                    <div className="text-xs text-gray-400">2FA is enabled</div>
                  </div>
                </div>
                <CheckCircle size={20} className="text-neon-green" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Delete Account Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={() => setShowDeleteConfirm(false)}></div>
          <div className="relative glass-card max-w-md w-full p-6">
            <h3 className="text-xl font-bold mb-2 text-red-500">Delete Account</h3>
            <p className="text-gray-400 mb-6">
              Are you sure? This action cannot be undone. All your data will be permanently deleted.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 py-2 rounded-lg glass text-gray-300 hover:text-white transition"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;