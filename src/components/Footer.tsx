'use client';

import { useUser } from '@/contexts/UserContext';
import { Home, Search, User, Building } from 'lucide-react';

export default function Footer() {
  const { user, navigateTo } = useUser();

  if (!user?.mode) return null;

  return (
    <footer className="bg-white border-t border-gray-100 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold text-primary mb-4">CASAai</h3>
            <p className="text-body mb-4">
              Găsește locuința potrivită, direct de la proprietar. Platforma ta de încredere pentru închiriere și cumpărare de locuințe.
            </p>
            <div className="flex items-center space-x-4 text-sm text-body">
              <span>⭐ 4.8 rating</span>
              <span>·</span>
              <span>1.000+ membri activi</span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-semibold text-heading mb-4">Link-uri rapide</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => navigateTo('/home')}
                  className="text-body hover:text-primary transition-colors cursor-pointer text-left"
                >
                  Acasă
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('/results')}
                  className="text-body hover:text-primary transition-colors cursor-pointer text-left"
                >
                  Căutare
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('/account')}
                  className="text-body hover:text-primary transition-colors cursor-pointer text-left"
                >
                  Contul meu
                </button>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-heading mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => navigateTo('/legal/terms')}
                  className="text-body hover:text-primary transition-colors cursor-pointer text-left"
                >
                  Termeni și condiții
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('/legal/privacy')}
                  className="text-body hover:text-primary transition-colors cursor-pointer text-left"
                >
                  Politica de confidențialitate
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-gray-100">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-sm text-body">
              © {new Date().getFullYear()} CASAai. Toate drepturile rezervate.
            </p>
            <div className="flex items-center space-x-6 text-sm text-body">
              <span>Mod: {user.mode === 'rent' ? 'Închiriere' : 'Cumpărare'}</span>
              {user.subscription_active && (
                <>
                  <span>·</span>
                  <span className="text-green-600">Abonament activ</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
