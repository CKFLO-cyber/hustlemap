'use client';

import { useUser } from '@/contexts/UserContext';
import { User } from 'lucide-react';

export default function Navigation() {
  const { user, navigateTo } = useUser();

  if (!user?.mode) return null;

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and mode */}
          <div className="flex items-center space-x-6">
            <button
              onClick={() => navigateTo('/home')}
              className="text-2xl font-bold text-primary cursor-pointer hover:text-primary/80 transition-colors"
            >
              CASAai
            </button>
            <div className="hidden md:flex items-center space-x-2 text-sm text-body">
              <span>Mod:</span>
              <span className="font-medium text-heading capitalize">
                {user.mode === 'rent' ? 'Închiriere' : 'Cumpărare'}
              </span>
            </div>
          </div>

          {/* Navigation links */}
          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => navigateTo('/home')}
              className="text-body hover:text-heading transition-colors cursor-pointer"
            >
              Acasă
            </button>
            <button
              onClick={() => navigateTo('/results')}
              className="text-body hover:text-heading transition-colors cursor-pointer"
            >
              Căutare
            </button>
          </div>

          {/* User menu */}
          <div className="flex items-center space-x-4">
            {user.subscription_active && (
              <div className="hidden md:flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-green-600 font-medium">Abonament activ</span>
              </div>
            )}
            
            <button
              onClick={() => navigateTo('/account')}
              className="flex items-center space-x-2 text-body hover:text-heading transition-colors cursor-pointer"
            >
              <User className="w-5 h-5" />
              <span className="hidden sm:inline">Cont</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
