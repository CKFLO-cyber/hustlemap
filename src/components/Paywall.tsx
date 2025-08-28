'use client';

import { useState } from 'react';
import { useUser } from '@/contexts/UserContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Lock } from 'lucide-react';

interface PaywallProps {
  isOpen: boolean;
  onClose: () => void;
  source?: 'list' | 'detail';
}

const subscriptionPlans = [
  {
    id: 'rent',
    name: 'Închiriere',
    price: 100,
    currency: 'RON',
    interval: 'lună',
    features: ['Preț', 'Zonă', 'Număr de telefon', 'Alerte rapide']
  },
  {
    id: 'buy',
    name: 'Cumpărare',
    price: 100,
    currency: 'RON',
    interval: 'lună',
    features: ['Preț', 'Zonă', 'Număr de telefon', 'Alerte rapide']
  },
  {
    id: 'all',
    name: 'All-Access',
    price: 150,
    currency: 'RON',
    interval: 'lună',
    features: ['Toate beneficiile', 'Acces complet', 'Suport prioritar']
  }
];

export default function Paywall({ isOpen, onClose, source = 'list' }: PaywallProps) {
  const { user, setSubscriptionActive } = useUser();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubscribe = async (planId: string) => {
    setIsProcessing(true);
    
    // Simulate Stripe payment
    try {
      // In a real app, this would redirect to Stripe
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubscriptionActive(true, planId);
      onClose();
      
      // Redirect to unlock page
      window.location.href = `/unlock?plan=${planId}`;
    } catch (error) {
      console.error('Payment failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const suggestedPlan = user?.mode === 'rent' ? 'rent' : 'buy';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-card shadow-soft max-w-md w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-heading">
                  Deblochează datele proprietarilor
                </h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Benefits */}
            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-sm font-medium text-body mb-3">Beneficii:</h3>
                <ul className="space-y-2">
                  {['Preț', 'Zonă', 'Număr de telefon', 'Alerte rapide'].map((benefit) => (
                    <li key={benefit} className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-body">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Plans */}
              <div className="space-y-3 mb-6">
                {subscriptionPlans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedPlan === plan.id
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-200 hover:border-gray-300'
                    } ${plan.id === suggestedPlan ? 'ring-2 ring-primary/20' : ''}`}
                    onClick={() => setSelectedPlan(plan.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-heading">{plan.name}</h4>
                        <p className="text-sm text-body">
                          {plan.price} {plan.currency}/{plan.interval}
                        </p>
                      </div>
                      {plan.id === suggestedPlan && (
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                          Recomandat
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Microcopy */}
              <p className="text-xs text-gray-500 text-center mb-4">
                Anulezi oricând. Deblocare instantă.
              </p>

              {/* Subscribe button */}
              <button
                className={`w-full btn-primary ${
                  !selectedPlan || isProcessing ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={() => selectedPlan && handleSubscribe(selectedPlan)}
                disabled={!selectedPlan || isProcessing}
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Se procesează...</span>
                  </div>
                ) : (
                  'Activează acum'
                )}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
