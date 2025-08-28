'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, SlidersHorizontal } from 'lucide-react';
import { Filters } from '@/types';

interface FiltersDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  onApply: () => void;
  onReset: () => void;
}

export default function FiltersDrawer({
  isOpen,
  onClose,
  filters,
  onFiltersChange,
  onApply,
  onReset
}: FiltersDrawerProps) {
  const [localFilters, setLocalFilters] = useState<Filters>(filters);

  const handleFilterChange = (key: keyof Filters, value: any) => {
    setLocalFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleApply = () => {
    onFiltersChange(localFilters);
    onApply();
    onClose();
  };

  const handleReset = () => {
    const resetFilters: Filters = {};
    setLocalFilters(resetFilters);
    onFiltersChange(resetFilters);
    onReset();
  };

  const districts = [
    'Centru', 'Dorobanți', 'Băneasa', 'Primăverii', 'Aviatorilor',
    'Tei', 'Colentina', 'Pantelimon', 'Dristor', 'Titan'
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex items-center space-x-2">
                <SlidersHorizontal className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold text-heading">Filtre</h2>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Filters Content */}
            <div className="p-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
              {/* Preț */}
              <div>
                <h3 className="text-sm font-medium text-heading mb-3">Preț</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-body mb-1">Min (RON)</label>
                    <input
                      type="number"
                      value={localFilters.price_min || ''}
                      onChange={(e) => handleFilterChange('price_min', e.target.value ? Number(e.target.value) : undefined)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-body mb-1">Max (RON)</label>
                    <input
                      type="number"
                      value={localFilters.price_max || ''}
                      onChange={(e) => handleFilterChange('price_max', e.target.value ? Number(e.target.value) : undefined)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      placeholder="10000"
                    />
                  </div>
                </div>
              </div>

              {/* Camere */}
              <div>
                <h3 className="text-sm font-medium text-heading mb-3">Camere</h3>
                <div className="grid grid-cols-2 gap-2">
                  {[1, 2, 3, '4+'].map((room) => (
                    <button
                      key={room}
                      onClick={() => handleFilterChange('rooms', localFilters.rooms === room ? undefined : room)}
                      className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                        localFilters.rooms === room
                          ? 'border-primary bg-primary text-white'
                          : 'border-gray-200 text-body hover:border-gray-300'
                      }`}
                    >
                      {room}
                    </button>
                  ))}
                </div>
              </div>

              {/* Zonă */}
              <div>
                <h3 className="text-sm font-medium text-heading mb-3">Zonă</h3>
                <select
                  value={localFilters.district || ''}
                  onChange={(e) => handleFilterChange('district', e.target.value || undefined)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="">Toate zonele</option>
                  {districts.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
              </div>

              {/* Etaj */}
              <div>
                <h3 className="text-sm font-medium text-heading mb-3">Etaj</h3>
                <input
                  type="number"
                  value={localFilters.floor || ''}
                  onChange={(e) => handleFilterChange('floor', e.target.value ? Number(e.target.value) : undefined)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="Etajul dorit"
                  min="0"
                  max="20"
                />
              </div>

              {/* Suprafață */}
              <div>
                <h3 className="text-sm font-medium text-heading mb-3">Suprafață</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-body mb-1">Min (m²)</label>
                    <input
                      type="number"
                      value={localFilters.size_min || ''}
                      onChange={(e) => handleFilterChange('size_min', e.target.value ? Number(e.target.value) : undefined)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-body mb-1">Max (m²)</label>
                    <input
                      type="number"
                      value={localFilters.size_max || ''}
                      onChange={(e) => handleFilterChange('size_max', e.target.value ? Number(e.target.value) : undefined)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      placeholder="200"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-100 bg-white">
              <div className="flex space-x-3">
                <button
                  onClick={handleReset}
                  className="flex-1 btn-secondary"
                >
                  Resetează
                </button>
                <button
                  onClick={handleApply}
                  className="flex-1 btn-primary"
                >
                  Aplică filtre
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
