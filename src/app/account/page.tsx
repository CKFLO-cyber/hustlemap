'use client';

import { useEffect } from 'react';
import { useUser } from '@/contexts/UserContext';
import { motion } from 'framer-motion';
import { ArrowLeft, User, CreditCard, Settings, LogOut } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function Account() {
  const { user, setSubscriptionActive, navigateTo } = useUser();

  useEffect(() => {
    // Redirect to landing choice if no user mode selected
    if (!user?.mode) {
      navigateTo('/');
      return;
    }
  }, [user, navigateTo]);

  const handleLogout = () => {
    localStorage.removeItem('casa-user');
    navigateTo('/');
  };

  const handleManageSubscription = () => {
    // In a real app, this would redirect to Stripe customer portal
    alert('Aici ar fi redirecționat către portalul Stripe pentru gestionarea abonamentului.');
  };

  const formatPlanName = (plan: string) => {
    switch (plan) {
      case 'rent':
        return 'Închiriere';
      case 'buy':
        return 'Cumpărare';
      case 'all':
        return 'All-Access';
      default:
        return 'Necunoscut';
    }
  };

  const formatPlanPrice = (plan: string) => {
    switch (plan) {
      case 'rent':
      case 'buy':
        return '100 RON/lună';
      case 'all':
        return '150 RON/lună';
      default:
        return 'N/A';
    }
  };

  if (!user?.mode) return null;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Animated gradient band */}
      <div className="absolute top-0 left-0 right-0 h-1 animated-gradient-band opacity-30" />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigateTo('/home')}
              className="flex items-center space-x-2 text-body hover:text-heading transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Înapoi</span>
            </button>
            
            <h1 className="text-xl font-semibold text-heading">
              Contul meu
            </h1>
            
            <div className="w-20" /> {/* Spacer for centering */}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-2xl mx-auto px-4 py-8 flex-1">
        {/* Profile Section */}
        <motion.div
          className="card p-6 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-heading">
                Utilizator CASAai
              </h2>
              <p className="text-body">
                ID: {user.id}
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-body mb-1">Mod selectat</div>
              <div className="font-medium text-heading capitalize">
                {user.mode === 'rent' ? 'Închiriere' : 'Cumpărare'}
              </div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-body mb-1">Status abonament</div>
              <div className={`font-medium ${user.subscription_active ? 'text-green-600' : 'text-red-600'}`}>
                {user.subscription_active ? 'Activ' : 'Inactiv'}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Subscription Section */}
        {user.subscription_active && (
          <motion.div
            className="card p-6 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center space-x-3 mb-4">
              <CreditCard className="w-6 h-6 text-primary" />
              <h3 className="text-lg font-semibold text-heading">
                Abonament activ
              </h3>
            </div>
            
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-heading">
                    {formatPlanName(user.subscription_plan || '')}
                  </div>
                  <div className="text-sm text-body">
                    {formatPlanPrice(user.subscription_plan || '')}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-body">Status</div>
                  <div className="text-sm font-medium text-green-600">Activ</div>
                </div>
              </div>
            </div>
            
            <button
              onClick={handleManageSubscription}
              className="w-full btn-secondary"
            >
              Gestionează abonamentul
            </button>
          </motion.div>
        )}

        {/* Actions Section */}
        <motion.div
          className="card p-6 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center space-x-3 mb-4">
            <Settings className="w-6 h-6 text-primary" />
            <h3 className="text-lg font-semibold text-heading">
              Acțiuni
            </h3>
          </div>
          
          <div className="space-y-3">
            <button
              onClick={() => navigateTo('/home')}
              className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-body">Schimbă modul (Închiriere/Cumpărare)</span>
                <span className="text-primary text-sm">Modifică</span>
              </div>
            </button>
            
            {!user.subscription_active && (
              <button
                onClick={() => navigateTo('/results')}
                className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-body">Activează abonamentul</span>
                  <span className="text-primary text-sm">Activează</span>
                </div>
              </button>
            )}
          </div>
        </motion.div>

        {/* Logout Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <button
            onClick={handleLogout}
            className="w-full btn-secondary text-red-600 border-red-200 hover:bg-red-50 flex items-center justify-center space-x-2"
          >
            <LogOut className="w-5 h-5" />
            <span>Deconectare</span>
          </button>
        </motion.div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
