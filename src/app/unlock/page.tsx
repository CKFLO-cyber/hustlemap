'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useUser } from '@/contexts/UserContext';
import { motion } from 'framer-motion';
import { CheckCircle, Star } from 'lucide-react';

export default function Unlock() {
  const searchParams = useSearchParams();
  const { setSubscriptionActive, user, navigateTo } = useUser();
  const [isProcessing, setIsProcessing] = useState(true);
  const [plan] = useState(searchParams.get('plan'));

  useEffect(() => {
    // Redirect to landing choice if no user mode selected
    if (!user?.mode) {
      navigateTo('/');
      return;
    }

    // Simulate processing
    const timer = setTimeout(() => {
      setIsProcessing(false);
      
      // Redirect back to results after a short delay
      setTimeout(() => {
        navigateTo('/results');
      }, 2000);
    }, 1500);

    return () => clearTimeout(timer);
  }, [user, navigateTo]);

  useEffect(() => {
    // Set subscription as active when component mounts
    if (plan && user) {
      setSubscriptionActive(true, plan);
    }
  }, [plan, user, setSubscriptionActive]);

  if (!user?.mode) return null;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      {/* Animated gradient band */}
      <div className="absolute top-0 left-0 right-0 h-1 animated-gradient-band opacity-30" />
      
      <div className="text-center max-w-md mx-auto">
        {isProcessing ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
            </div>
            <h1 className="text-2xl font-bold text-heading mb-4">
              Se procesează abonamentul...
            </h1>
            <p className="text-body">
              Te redirecționăm în câteva secunde
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            
            <h1 className="text-3xl font-bold text-heading mb-4">
              Abonament activat cu succes!
            </h1>
            
            <div className="bg-white rounded-card p-6 mb-6 shadow-soft">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Star className="w-6 h-6 text-yellow-500 fill-current" />
                <span className="font-semibold text-heading">Plan activat:</span>
              </div>
              <div className="text-lg font-medium text-primary capitalize">
                {plan === 'rent' ? 'Închiriere' : plan === 'buy' ? 'Cumpărare' : 'All-Access'}
              </div>
              <div className="text-sm text-body mt-2">
                {plan === 'all' ? '150 RON/lună' : '100 RON/lună'}
              </div>
            </div>
            
            <p className="text-body mb-6">
              Acum poți vedea toate detaliile locuințelor, inclusiv prețul, zona și numărul de telefon al proprietarilor.
            </p>
            
            <div className="text-sm text-body">
              Te redirecționăm automat...
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
