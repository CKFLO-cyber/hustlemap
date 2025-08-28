'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@/contexts/UserContext';
import { motion } from 'framer-motion';
import { SlidersHorizontal, Search, ArrowLeft } from 'lucide-react';
import { Listing, Filters } from '@/types';
import ListingCard from '@/components/ListingCard';
import FiltersDrawer from '@/components/FiltersDrawer';
import Paywall from '@/components/Paywall';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

// Mock data - in a real app this would come from an API
const mockListings: Listing[] = [
  {
    id: '1',
    photos: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500'],
    price: 2500,
    rooms: 3,
    floor: 2,
    size: 85,
    district: 'Centru',
    description: 'Apartament modern în centrul orașului',
    owner_phone: '+40 123 456 789',
    type: 'apartment',
    furnished: true,
    parking: false,
    balcony: true,
  },
  {
    id: '2',
    photos: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500'],
    price: 1800,
    rooms: 2,
    floor: 1,
    size: 65,
    district: 'Dorobanți',
    description: 'Apartament mobilat cu parcare',
    owner_phone: '+40 987 654 321',
    type: 'apartment',
    furnished: true,
    parking: true,
    balcony: false,
  },
  {
    id: '3',
    photos: ['https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=500'],
    price: 450000,
    rooms: 4,
    floor: 0,
    size: 120,
    district: 'Băneasa',
    description: 'Casă cu grădină mare',
    owner_phone: '+40 555 123 456',
    type: 'house',
    furnished: false,
    parking: true,
    balcony: false,
  },
];

export default function Results() {
  const { user, isSubscribed, navigateTo } = useUser();
  const [listings, setListings] = useState<Listing[]>([]);
  const [filteredListings, setFilteredListings] = useState<Listing[]>([]);
  const [filters, setFilters] = useState<Filters>({});
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isPaywallOpen, setIsPaywallOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Redirect to landing choice if no user mode selected
    if (!user?.mode) {
      navigateTo('/');
      return;
    }

    // Load listings (in a real app, this would be an API call)
    setListings(mockListings);
    setFilteredListings(mockListings);
  }, [user, navigateTo]);

  useEffect(() => {
    // Apply filters
    let filtered = listings;

    if (filters.price_min !== undefined) {
      filtered = filtered.filter(listing => listing.price && listing.price >= filters.price_min!);
    }
    if (filters.price_max !== undefined) {
      filtered = filtered.filter(listing => listing.price && listing.price <= filters.price_max!);
    }
    if (filters.rooms !== undefined) {
      filtered = filtered.filter(listing => listing.rooms === filters.rooms);
    }
    if (filters.district) {
      filtered = filtered.filter(listing => listing.district === filters.district);
    }
    if (filters.floor !== undefined) {
      filtered = filtered.filter(listing => listing.floor === filters.floor);
    }
    if (filters.size_min !== undefined) {
      filtered = filtered.filter(listing => listing.size && listing.size >= filters.size_min!);
    }
    if (filters.size_max !== undefined) {
      filtered = filtered.filter(listing => listing.size && listing.size <= filters.size_max!);
    }

    // Apply search query
    if (searchQuery) {
      filtered = filtered.filter(listing => 
        listing.district?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredListings(filtered);
  }, [listings, filters, searchQuery]);

  const handleFiltersChange = (newFilters: Filters) => {
    setFilters(newFilters);
  };

  const handleFiltersApply = () => {
    // Filters are applied automatically via useEffect
  };

  const handleFiltersReset = () => {
    setFilters({});
  };

  const handleUnlockClick = () => {
    setIsPaywallOpen(true);
  };

  const hasActiveFilters = Object.keys(filters).length > 0 || searchQuery;

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
              {user?.mode === 'rent' ? 'Închiriere' : 'Cumpărare'}
            </h1>
            
            <button
              onClick={() => setIsFiltersOpen(true)}
              className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors"
            >
              <SlidersHorizontal className="w-5 h-5" />
              <span>Filtre</span>
            </button>
          </div>
        </div>
      </header>

      {/* Search and filters summary */}
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center space-x-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Caută după zonă sau descriere..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
        </div>

        {/* Active filters display */}
        {hasActiveFilters && (
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-sm text-body">Filtre active:</span>
            {Object.entries(filters).map(([key, value]) => (
              <span
                key={key}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary"
              >
                {key}: {value}
              </span>
            ))}
            {searchQuery && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                Căutare: {searchQuery}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Results */}
      <main className="max-w-6xl mx-auto px-4 pb-8 flex-1">
        {filteredListings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map((listing) => (
              <ListingCard
                key={listing.id}
                listing={listing}
                onUnlockClick={handleUnlockClick}
              />
            ))}
          </div>
        ) : (
          // Empty state
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-heading mb-2">
              Nicio listare găsită cu aceste filtre.
            </h3>
            <p className="text-body mb-6">
              Ajustează criteriile și încearcă din nou.
            </p>
            <button
              onClick={() => {
                setFilters({});
                setSearchQuery('');
              }}
              className="btn-secondary"
            >
              Resetează filtrele
            </button>
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Filters Drawer */}
      <FiltersDrawer
        isOpen={isFiltersOpen}
        onClose={() => setIsFiltersOpen(false)}
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onApply={handleFiltersApply}
        onReset={handleFiltersReset}
      />

      {/* Paywall Modal */}
      <Paywall
        isOpen={isPaywallOpen}
        onClose={() => setIsPaywallOpen(false)}
        source="list"
      />
    </div>
  );
}
