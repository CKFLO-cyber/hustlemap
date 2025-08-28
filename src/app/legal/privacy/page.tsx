'use client';

import { useUser } from '@/contexts/UserContext';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield } from 'lucide-react';

export default function Privacy() {
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
              Politica de confidențialitate
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
            <Shield className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-heading">
              Politica de confidențialitate
            </h1>
          </div>

          <div className="prose prose-lg max-w-none text-body">
            <p className="text-lg mb-6">
              Ultima actualizare: {new Date().toLocaleDateString('ro-RO')}
            </p>

            <h2 className="text-2xl font-semibold text-heading mb-4">
              1. Informații generale
            </h2>
            <p className="mb-6">
              CASAai se angajează să protejeze confidențialitatea utilizatorilor săi. Această politică de confidențialitate explică cum colectăm, utilizăm și protejăm informațiile personale pe care ni le furnizați.
            </p>

            <h2 className="text-2xl font-semibold text-heading mb-4">
              2. Informațiile pe care le colectăm
            </h2>
            <p className="mb-6">
              Colectăm informații pe care ni le furnizați direct, cum ar fi numele, adresa de email, numărul de telefon și preferințele de căutare. De asemenea, colectăm automat informații despre utilizarea platformei.
            </p>

            <h2 className="text-2xl font-semibold text-heading mb-4">
              3. Cum utilizăm informațiile
            </h2>
            <p className="mb-6">
              Utilizăm informațiile colectate pentru a vă oferi serviciile solicitate, pentru a îmbunătăți experiența utilizatorilor, pentru a comunica cu dumneavoastră și pentru a respecta obligațiile legale.
            </p>

            <h2 className="text-2xl font-semibold text-heading mb-4">
              4. Partajarea informațiilor
            </h2>
            <p className="mb-6">
              Nu vindem, nu închiriem și nu partajăm informațiile personale cu terțe părți, cu excepția cazurilor în care este necesar pentru furnizarea serviciilor sau când legea ne impune acest lucru.
            </p>

            <h2 className="text-2xl font-semibold text-heading mb-4">
              5. Securitatea datelor
            </h2>
            <p className="mb-6">
              Implementăm măsuri de securitate tehnice și organizatorice pentru a proteja informațiile personale împotriva accesului neautorizat, modificării, dezvăluirii sau distrugerii accidentale.
            </p>

            <h2 className="text-2xl font-semibold text-heading mb-4">
              6. Cookie-urile și tehnologiile similare
            </h2>
            <p className="mb-6">
              Utilizăm cookie-uri și tehnologii similare pentru a îmbunătăți experiența utilizatorilor, pentru a analiza traficul site-ului și pentru a personaliza conținutul. Puteți controla utilizarea cookie-urilor prin setările browserului.
            </p>

            <h2 className="text-2xl font-semibold text-heading mb-4">
              7. Drepturile utilizatorilor
            </h2>
            <p className="mb-6">
              Aveți dreptul să accesați, să corectați, să ștergeți și să restricționați procesarea informațiilor personale. De asemenea, aveți dreptul la portabilitatea datelor și la opoziția față de procesare.
            </p>

            <h2 className="text-2xl font-semibold text-heading mb-4">
              8. Retenția datelor
            </h2>
            <p className="mb-6">
              Păstrăm informațiile personale doar atât timp cât este necesar pentru a îndeplini scopurile pentru care au fost colectate sau cât timp legea ne impune acest lucru.
            </p>

            <h2 className="text-2xl font-semibold text-heading mb-4">
              9. Transferuri internaționale
            </h2>
            <p className="mb-6">
              Informațiile pot fi transferate și procesate în țări din afara Uniunii Europene. În astfel de cazuri, ne asigurăm că transferurile respectă standardele de protecție a datelor.
            </p>

            <h2 className="text-2xl font-semibold text-heading mb-4">
              10. Modificări ale politicii
            </h2>
            <p className="mb-6">
              Ne rezervăm dreptul de a actualiza această politică de confidențialitate. Utilizatorii vor fi notificați despre modificări semnificative prin email sau prin notificări în aplicație.
            </p>

            <h2 className="text-2xl font-semibold text-heading mb-4">
              11. Contact
            </h2>
            <p className="mb-6">
              Pentru orice întrebări legate de această politică de confidențialitate, ne puteți contacta la adresa de email: privacy@casaai.ro
            </p>

            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-body text-center">
                Prin utilizarea platformei CASAai, confirmați că ați citit și înțeles această politică de confidențialitate.
              </p>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
