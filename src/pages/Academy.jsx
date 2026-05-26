import React, { useState } from 'react';
import { BookOpen, Video, FileText, ChevronRight, Play, Clock, Award } from 'lucide-react';

const Academy = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const lessons = [
    { id: 1, title: 'Binary Options Basics', category: 'beginner', duration: '5 min', level: 'Beginner', video: true },
    { id: 2, title: 'Understanding Volatility', category: 'beginner', duration: '8 min', level: 'Beginner', video: true },
    { id: 3, title: 'Technical Analysis', category: 'intermediate', duration: '12 min', level: 'Intermediate', video: true },
    { id: 4, title: 'Risk Management', category: 'intermediate', duration: '10 min', level: 'Intermediate', video: false },
    { id: 5, title: 'Advanced Strategies', category: 'advanced', duration: '15 min', level: 'Advanced', video: true },
    { id: 6, title: 'Market Psychology', category: 'advanced', duration: '8 min', level: 'Advanced', video: false },
  ];
  
  const categories = ['all', 'beginner', 'intermediate', 'advanced'];
  
  const filteredLessons = selectedCategory === 'all' ? lessons : lessons.filter(l => l.category === selectedCategory);
  
  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Trading Academy</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Learn from experts and master the art of binary options trading
          </p>
        </div>
        
        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="glass rounded-2xl p-6 text-center">
            <BookOpen size={32} className="mx-auto mb-3 text-neon-cyan" />
            <div className="text-2xl font-bold">12+</div>
            <div className="text-gray-400">Video Lessons</div>
          </div>
          <div className="glass rounded-2xl p-6 text-center">
            <Award size={32} className="mx-auto mb-3 text-neon-pink" />
            <div className="text-2xl font-bold">500+</div>
            <div className="text-gray-400">Students Enrolled</div>
          </div>
          <div className="glass rounded-2xl p-6 text-center">
            <Clock size={32} className="mx-auto mb-3 text-neon-purple" />
            <div className="text-2xl font-bold">2 Hours</div>
            <div className="text-gray-400">Total Content</div>
          </div>
        </div>
        
        {/* Categories */}
        <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 rounded-lg capitalize transition ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-neon-cyan to-neon-pink text-white'
                  : 'glass text-gray-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        
        {/* Lessons Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredLessons.map(lesson => (
            <div key={lesson.id} className="glass rounded-2xl p-6 hover:scale-105 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-neon-cyan/20 flex items-center justify-center flex-shrink-0">
                  {lesson.video ? <Video size={24} className="text-neon-cyan" /> : <FileText size={24} className="text-neon-pink" />}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1">{lesson.title}</h3>
                  <div className="flex gap-3 text-sm text-gray-400 mb-3">
                    <span>{lesson.duration}</span>
                    <span>{lesson.level}</span>
                  </div>
                  <button className="flex items-center gap-2 text-neon-cyan text-sm hover:gap-3 transition-all">
                    Start Learning
                    <ChevronRight size={16} />
                  </button>
                </div>
                {lesson.video && (
                  <div className="w-10 h-10 rounded-full bg-neon-cyan/20 flex items-center justify-center">
                    <Play size={16} className="text-neon-cyan" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {/* Certificate CTA */}
        <div className="mt-12 glass rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-2">Get Certified</h2>
          <p className="text-gray-400 mb-6">Complete all lessons and earn your trading certificate</p>
          <button className="px-8 py-3 rounded-lg bg-gradient-to-r from-neon-cyan to-neon-pink font-semibold hover:scale-105 transition">
            Start Free Course
          </button>
        </div>
      </div>
    </div>
  );
};

export default Academy;