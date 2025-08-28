'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@/contexts/UserContext';
import { motion } from 'framer-motion';
import { Search, Star } from 'lucide-react';
import Navigation from '@/components/Navigation';

export default function Home() {
  const { user, navigateTo } = useUser();
  const [memberCount, setMemberCount] = useState(1005);

  useEffect(() => {
    // Redirect to landing choice if no user mode selected
    if (!user?.mode) {
      navigateTo('/');
      return;
    }

    // Animate counter every 3-4 seconds
    const interval = setInterval(() => {
      const increment = Math.floor(Math.random() * 3) + 1; // 1-3
      setMemberCount(prev => {
        const newCount = prev + increment;
        // Cap at +20 per session
        return Math.min(newCount, 1005 + 20);
      });
    }, Math.random() * 1000 + 3000); // 3-4 seconds

    return () => clearInterval(interval);
  }, [user, navigateTo]);

  const handleStartSearch = () => {
    navigateTo('/results');
  };

  if (!user?.mode) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Animated gradient band */}
      <div className="absolute top-0 left-0 right-0 h-1 animated-gradient-band opacity-30" />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Header with logo and badges */}
      <header className="pt-8 pb-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-primary">CASAai</h1>
              <div className="flex items-center space-x-4 text-sm text-body">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span>4.8 rating</span>
                </div>
                <span>·</span>
                <span>{memberCount.toLocaleString()}+ membri activi</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-4">
        <div className="text-center">
          <motion.h1 
            className="text-5xl md:text-6xl font-bold text-heading mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Găsește locuința potrivită, direct de la proprietar.
          </motion.h1>
          
          <motion.p 
            className="text-xl text-body mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Vezi preț, zonă și numărul de telefon după activarea abonamentului.
          </motion.p>
          
          <motion.button
            className="btn-primary text-lg px-8 py-4 flex items-center space-x-2 mx-auto"
            onClick={handleStartSearch}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Search className="w-5 h-5" />
            <span>Pornește căutarea</span>
          </motion.button>
        </div>

        {/* Mode indicator */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-soft">
            <span className="text-sm text-body">Mod selectat:</span>
            <span className="text-sm font-medium text-primary capitalize">
              {user.mode === 'rent' ? 'Închiriere' : 'Cumpărare'}
            </span>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
