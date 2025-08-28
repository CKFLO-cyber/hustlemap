'use client';

import { useUser } from '@/contexts/UserContext';
import { motion } from 'framer-motion';

export default function LandingChoice() {
  const { setUserMode, navigateTo } = useUser();

  const handleModeSelect = (mode: 'rent' | 'buy') => {
    setUserMode(mode);
    navigateTo('/home');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      {/* Animated gradient band */}
      <div className="absolute top-0 left-0 right-0 h-1 animated-gradient-band opacity-30" />
      
      <div className="text-center max-w-2xl mx-auto">
        <motion.h1 
          className="text-5xl md:text-6xl font-bold text-heading mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Ce cauți acum?
        </motion.h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <motion.div
            className="card p-8 cursor-pointer hover:shadow-lg transition-shadow"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleModeSelect('rent')}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="text-4xl mb-4">🏠</div>
            <h2 className="text-2xl font-semibold text-heading mb-2">Închiriere</h2>
            <p className="text-body">Găsește locuința perfectă pentru închiriat</p>
          </motion.div>
          
          <motion.div
            className="card p-8 cursor-pointer hover:shadow-lg transition-shadow"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleModeSelect('buy')}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="text-4xl mb-4">🏡</div>
            <h2 className="text-2xl font-semibold text-heading mb-2">Cumpărare</h2>
            <p className="text-body">Descoperă locuința de vis pentru a cumpăra</p>
          </motion.div>
        </div>
        
        <motion.p 
          className="text-body text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Poți schimba oricând din setări.
        </motion.p>
      </div>
    </div>
  );
}
