'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useUser } from '@/contexts/UserContext';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Bed, Square, Building, Phone, Copy, Star } from 'lucide-react';
import { Listing } from '@/types';
import Paywall from '@/components/Paywall';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

// Mock data - in a real app this would come from an API
const mockListing: Listing = {
  id: '1',
  photos: [
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
    'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
  ],
  price: 2500,
  rooms: 3,
  floor: 2,
  size: 85,
  district: 'Centru',
  description: 'Apartament modern în centrul orașului, perfect pentru o familie tânără. Locuința este complet mobilată și echipată cu toate facilitățile moderne. Zona este foarte bine conectată cu transportul în comun și oferă acces ușor la magazine, restaurante și parcuri.',
  owner_phone: '+40 123 456 789',
  coordinates: { lat: 44.4268, lng: 26.1025 },
  type: 'apartment',
  furnished: true,
  parking: false,
  balcony: true,
};

export default function ListingDetail() {
  const params = useParams();
  const { user, isSubscribed, navigateTo } = useUser();
  const [listing, setListing] = useState<Listing | null>(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isPaywallOpen, setIsPaywallOpen] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  useEffect(() => {
    // Redirect to landing choice if no user mode selected
    if (!user?.mode) {
      navigateTo('/');
      return;
    }

    // Load listing (in a real app, this would be an API call)
    setListing(mockListing);
  }, [user, navigateTo]);

  const handlePhotoChange = (index: number) => {
    setCurrentPhotoIndex(index);
  };

  const handleCopyPhone = async () => {
    if (listing?.owner_phone) {
      try {
        await navigator.clipboard.writeText(listing.owner_phone);
        setCopiedPhone(true);
        setTimeout(() => setCopiedPhone(false), 2000);
      } catch (error) {
        console.error('Failed to copy phone:', error);
      }
    }
  };

  const handleCall = () => {
    if (listing?.owner_phone) {
      window.location.href = `tel:${listing.owner_phone}`;
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ro-RO', {
      style: 'currency',
      currency: 'RON',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (!listing) return null;

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
              onClick={() => navigateTo('/results')}
              className="flex items-center space-x-2 text-body hover:text-heading transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Înapoi</span>
            </button>
            
            <h1 className="text-lg font-semibold text-heading">
              Detalii locuință
            </h1>
            
            <div className="w-20" /> {/* Spacer for centering */}
          </div>
        </div>
      </header>

      {/* Gallery */}
      <div className="relative bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="relative h-96 md:h-[500px]">
            <img
              src={listing.photos[currentPhotoIndex]}
              alt={`Photo ${currentPhotoIndex + 1}`}
              className="w-full h-full object-cover"
            />
            
            {/* Photo navigation */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {listing.photos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePhotoChange(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentPhotoIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>

            {/* Locked overlay for non-subscribers */}
            {!isSubscribed && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="text-center text-white p-6 max-w-md">
                  <Star className="w-12 h-12 mx-auto mb-4 text-yellow-400" />
                  <h2 className="text-2xl font-bold mb-4">
                    Deblochează datele proprietarilor
                  </h2>
                  <p className="text-lg mb-6">
                    Vezi preț, zonă, număr de telefon, alerte rapide
                  </p>
                  <button
                    onClick={() => setIsPaywallOpen(true)}
                    className="btn-primary text-lg px-8 py-3"
                  >
                    Activează acum
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 py-8 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Price and basic info */}
            {isSubscribed ? (
              <div className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-3xl font-bold text-heading">
                    {listing.price ? formatPrice(listing.price) : 'Preț la cerere'}
                  </h1>
                  <div className="text-right">
                    <div className="text-sm text-body">Tip</div>
                    <div className="font-medium text-heading capitalize">{listing.type}</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 py-4 border-t border-gray-100">
                  <div className="text-center">
                    <Bed className="w-6 h-6 text-primary mx-auto mb-2" />
                    <div className="text-sm text-body">Camere</div>
                    <div className="font-medium text-heading">{listing.rooms}</div>
                  </div>
                  <div className="text-center">
                    <Square className="w-6 h-6 text-primary mx-auto mb-2" />
                    <div className="text-sm text-body">Suprafață</div>
                    <div className="font-medium text-heading">{listing.size} m²</div>
                  </div>
                  <div className="text-center">
                    <Building className="w-6 h-6 text-primary mx-auto mb-2" />
                    <div className="text-sm text-body">Etaj</div>
                    <div className="font-medium text-heading">{listing.floor}</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="card p-6 text-center">
                <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-heading mb-2">
                  Conținut blocat
                </h2>
                <p className="text-body mb-4">
                  Activează abonamentul pentru a vedea toate detaliile
                </p>
                <button
                  onClick={() => setIsPaywallOpen(true)}
                  className="btn-primary"
                >
                  Deblochează
                </button>
              </div>
            )}

            {/* Description */}
            {isSubscribed && listing.description && (
              <div className="card p-6">
                <h2 className="text-xl font-semibold text-heading mb-4">Descriere</h2>
                <p className="text-body leading-relaxed">{listing.description}</p>
              </div>
            )}

            {/* Features */}
            {isSubscribed && (
              <div className="card p-6">
                <h2 className="text-xl font-semibold text-heading mb-4">Caracteristici</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${listing.furnished ? 'bg-green-500' : 'bg-gray-300'}`} />
                    <span className="text-body">Mobilat</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${listing.parking ? 'bg-green-500' : 'bg-gray-300'}`} />
                    <span className="text-body">Parcare</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${listing.balcony ? 'bg-green-500' : 'bg-gray-300'}`} />
                    <span className="text-body">Balcon</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Location */}
            {isSubscribed && listing.district && (
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-heading mb-4">Locație</h3>
                <div className="flex items-center space-x-2 text-body">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>{listing.district}</span>
                </div>
              </div>
            )}

            {/* Owner contact */}
            {isSubscribed && listing.owner_phone && (
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-heading mb-4">Contact proprietar</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-heading">{listing.owner_phone}</span>
                    <button
                      onClick={handleCopyPhone}
                      className="text-primary hover:text-primary/80 transition-colors"
                      title="Copiază numărul"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  {copiedPhone && (
                    <div className="text-sm text-green-600 text-center">
                      Numărul a fost copiat!
                    </div>
                  )}
                  <button
                    onClick={handleCall}
                    className="w-full btn-primary flex items-center justify-center space-x-2"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Sună acum</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Sticky paywall for non-subscribers */}
      {!isSubscribed && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-20">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-heading">Deblochează datele proprietarilor</h3>
                <p className="text-sm text-body">Preț, zonă, număr de telefon, alerte rapide</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-sm text-body">Plan recomandat:</div>
                  <div className="font-medium text-heading">
                    {user?.mode === 'rent' ? 'Închiriere: 100 RON/lună' : 'Cumpărare: 100 RON/lună'}
                  </div>
                </div>
                <button
                  onClick={() => setIsPaywallOpen(true)}
                  className="btn-primary"
                >
                  Activează acum
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Paywall Modal */}
      <Paywall
        isOpen={isPaywallOpen}
        onClose={() => setIsPaywallOpen(false)}
        source="detail"
      />
    </div>
  );
}
