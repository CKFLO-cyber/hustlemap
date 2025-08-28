'use client';

import { useUser } from '@/contexts/UserContext';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText } from 'lucide-react';

export default function Terms() {
  const { navigateTo } = useUser();

  return (
    <div className="min-h-screen bg-background">
      {/* Animated gradient band */}
      <div className="absolute top-0 left-0 right-0 h-1 animated-gradient-band opacity-30" />
      
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
              Termeni și condiții
            </h1>
            
            <div className="w-20" /> {/* Spacer for centering */}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          className="card p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center space-x-3 mb-8">
            <FileText className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-heading">
              Termeni și condiții de utilizare
            </h1>
          </div>

          <div className="prose prose-lg max-w-none text-body">
            <p className="text-lg mb-6">
              Ultima actualizare: {new Date().toLocaleDateString('ro-RO')}
            </p>

            <h2 className="text-2xl font-semibold text-heading mb-4">
              1. Acceptarea termenilor
            </h2>
            <p className="mb-6">
              Prin accesarea și utilizarea platformei CASAai, acceptați să respectați acești termeni și condiții de utilizare. Dacă nu sunteți de acord cu acești termeni, vă rugăm să nu utilizați serviciul.
            </p>

            <h2 className="text-2xl font-semibold text-heading mb-4">
              2. Descrierea serviciului
            </h2>
            <p className="mb-6">
              CASAai este o platformă online care facilitează găsirea locuințelor pentru închiriere sau cumpărare. Serviciul oferă utilizatorilor acces la liste de proprietăți, informații despre prețuri, zone și contacte ale proprietarilor.
            </p>

            <h2 className="text-2xl font-semibold text-heading mb-4">
              3. Abonamente și plăți
            </h2>
            <p className="mb-6">
              Platforma oferă diferite tipuri de abonamente cu prețuri variabile. Plățile se fac lunar și pot fi anulate oricând. Prețurile sunt exprimate în RON și pot fi modificate cu notificare prealabilă.
            </p>

            <h2 className="text-2xl font-semibold text-heading mb-4">
              4. Utilizarea serviciului
            </h2>
            <p className="mb-6">
              Utilizatorii se obligă să utilizeze serviciul în conformitate cu legislația în vigoare și să nu încalce drepturile altor utilizatori sau terțe părți. Este interzisă utilizarea serviciului în scopuri frauduloase sau ilegale.
            </p>

            <h2 className="text-2xl font-semibold text-heading mb-4">
              5. Confidențialitatea datelor
            </h2>
            <p className="mb-6">
              Protejarea confidențialității utilizatorilor este o prioritate pentru CASAai. Colectăm și procesăm datele personale conform Politicii de confidențialitate. Utilizatorii pot solicita ștergerea datelor lor oricând.
            </p>

            <h2 className="text-2xl font-semibold text-heading mb-4">
              6. Limitarea răspunderii
            </h2>
            <p className="mb-6">
              CASAai nu poate fi trasă la răspundere pentru acțiunile proprietarilor sau pentru informațiile furnizate de aceștia. Platforma acționează doar ca intermediar și nu garantează acuratețea informațiilor.
            </p>

            <h2 className="text-2xl font-semibold text-heading mb-4">
              7. Modificări ale termenilor
            </h2>
            <p className="mb-6">
              Ne rezervăm dreptul de a modifica acești termeni în orice moment. Utilizatorii vor fi notificați despre modificări prin email sau prin notificări în aplicație. Continuarea utilizării după modificări reprezintă acceptarea noilor termeni.
            </p>

            <h2 className="text-2xl font-semibold text-heading mb-4">
              8. Contact
            </h2>
            <p className="mb-6">
              Pentru orice întrebări legate de acești termeni, ne puteți contacta la adresa de email: legal@casaai.ro
            </p>

            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-body text-center">
                Prin utilizarea platformei CASAai, confirmați că ați citit, înțeles și acceptat acești termeni și condiții de utilizare.
              </p>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
