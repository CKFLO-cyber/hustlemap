'use client';

import { useState } from 'react';
import { useUser } from '@/contexts/UserContext';
import { motion } from 'framer-motion';
import { Lock, MapPin, Bed, Square, Building } from 'lucide-react';
import { Listing } from '@/types';

interface ListingCardProps {
  listing: Listing;
  onUnlockClick: () => void;
}

export default function ListingCard({ listing, onUnlockClick }: ListingCardProps) {
  const { isSubscribed, navigateTo } = useUser();
  const [imageError, setImageError] = useState(false);

  const handleCardClick = () => {
    navigateTo(`/listing/${listing.id}`);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ro-RO', {
      style: 'currency',
      currency: 'RON',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'apartment':
        return <Building className="w-4 h-4" />;
      case 'house':
        return <Building className="w-4 h-4" />;
      case 'studio':
        return <Building className="w-4 h-4" />;
      default:
        return <Building className="w-4 h-4" />;
    }
  };

  return (
    <motion.div
      className="card overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
      whileHover={{ y: -2 }}
      onClick={handleCardClick}
    >
      {/* Image */}
      <div className="relative h-48 bg-gray-100">
        {listing.photos[0] && !imageError ? (
          <img
            src={listing.photos[0]}
            alt="Property"
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <Building className="w-12 h-12 text-gray-400" />
          </div>
        )}
        
        {/* Property type badge */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-heading flex items-center space-x-1">
          {getTypeIcon(listing.type)}
          <span className="capitalize">{listing.type}</span>
        </div>

        {/* Features badges */}
        <div className="absolute top-3 right-3 flex space-x-1">
          {listing.furnished && (
            <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-heading">
              Mobilat
            </div>
          )}
          {listing.parking && (
            <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-heading">
              Parcare
            </div>
          )}
          {listing.balcony && (
            <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-heading">
              Balcon
            </div>
          )}
        </div>

        {/* Locked overlay for non-subscribers */}
        {!isSubscribed && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="text-center text-white p-4">
              <Lock className="w-8 h-8 mx-auto mb-2" />
              <p className="text-sm font-medium">
                Activează abonamentul ca să vezi prețul, zona și contactul proprietarului.
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onUnlockClick();
                }}
                className="mt-3 btn-primary text-sm px-4 py-2"
              >
                Deblochează
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {isSubscribed ? (
          // Unlocked content
          <>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-heading">
                {listing.price ? formatPrice(listing.price) : 'Preț la cerere'}
              </h3>
              {listing.rooms && (
                <div className="flex items-center space-x-1 text-body">
                  <Bed className="w-4 h-4" />
                  <span className="text-sm">{listing.rooms} camere</span>
                </div>
              )}
            </div>
            
            {listing.district && (
              <div className="flex items-center space-x-1 text-body mb-2">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{listing.district}</span>
              </div>
            )}
            
            <div className="flex items-center justify-between text-sm text-body">
              {listing.size && (
                <div className="flex items-center space-x-1">
                  <Square className="w-4 h-4" />
                  <span>{listing.size} m²</span>
                </div>
              )}
              {listing.floor !== undefined && (
                <span>Etaj {listing.floor}</span>
              )}
            </div>
          </>
        ) : (
          // Locked content - only show basic info
          <div className="text-center py-4">
            <Lock className="w-6 h-6 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-body">
              Conținut blocat
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
