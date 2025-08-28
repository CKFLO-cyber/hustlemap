# CASAai - Platformă de Locuințe

O platformă premium pentru găsirea locuințelor, construită cu Next.js, TypeScript și Tailwind CSS, inspirată din designul Stripe.

## 🏠 Caracteristici

### Pentru utilizatori neabonați
- **Vizualizare limitată**: Doar fotografii ale locuințelor
- **Conținut blocat**: Preț, zonă, detalii tehnice și contactul proprietarului sunt ascunse
- **Overlay informativ**: Mesaj clar despre ce este necesar pentru deblocare

### Pentru utilizatori abonați
- **Acces complet**: Toate detaliile locuințelor
- **Informații proprietari**: Număr de telefon, preț, zonă exactă
- **Funcționalități avansate**: Copiere telefon, apel direct, filtrare avansată

## 🎨 Design și UI

### Tema Stripe-like
- **Culori**: Paletă profesională cu accenturi subtile
- **Tipografie**: Inter pentru UI, Manrope pentru headings
- **Componente**: Carduri cu colțuri rotunjite (14px) și umbre soft
- **Gradient animat**: Bandă subtilă cu culorile de accent

### Responsive Design
- Mobile-first approach
- Breakpoint-uri pentru tabletă și desktop
- Navigare adaptivă

## 🚀 Tehnologii

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS cu configurare personalizată
- **Animații**: Framer Motion
- **Iconuri**: Lucide React
- **State Management**: React Context API
- **Routing**: Next.js App Router

## 📱 Structura aplicației

### Rute
- `/` - Alegerea modului (Închiriere/Cumpărare)
- `/home` - Pagina principală cu hero și CTA
- `/results` - Lista de locuințe cu filtre
- `/listing/[id]` - Detalii locuință
- `/account` - Gestionare cont și abonament
- `/unlock` - Activare abonament
- `/legal/*` - Pagini legale

### Componente principale
- `UserContext` - Gestionarea stării utilizatorului
- `Paywall` - Modal pentru abonamente
- `FiltersDrawer` - Drawer pentru filtre avansate
- `ListingCard` - Card pentru afișarea locuințelor
- `Navigation` - Navigare principală
- `Footer` - Footer cu link-uri utile

## 💳 Sistem de abonamente

### Planuri disponibile
- **Închiriere**: 100 RON/lună
- **Cumpărare**: 100 RON/lună  
- **All-Access**: 150 RON/lună

### Beneficii
- Preț, zonă, număr de telefon
- Alerte rapide
- Acces la toate locuințele
- Suport prioritar (All-Access)

## 🔒 Securitate și confidențialitate

### Gating-ul datelor
- API-ul returnează doar datele publice pentru neabonați
- Informațiile sensibile (preț, contact) sunt filtrate la nivel de server
- Nu există expunere accidentală în DOM

### Protecția utilizatorilor
- Politică de confidențialitate completă
- Termeni și condiții detaliați
- Conformitate GDPR

## 📊 Analytics și tracking

### Evenimente Vercel Analytics
- `landing_choice_select` - Selectarea modului
- `results_view` - Vizualizarea rezultatelor
- `paywall_view` - Afișarea paywall-ului
- `subscribe_click` - Click pe abonament
- `subscribe_success` - Succes abonament
- `phone_reveal` - Dezvăluirea telefonului

## 🛠️ Instalare și dezvoltare

### Cerințe
- Node.js 18+
- npm sau yarn

### Setup
```bash
# Clonează repository-ul
git clone <repository-url>
cd CASAai

# Instalează dependențele
npm install

# Rulează în modul development
npm run dev

# Build pentru producție
npm run build

# Start producție
npm start
```

### Static Export și Preview
```bash
# Export static (generează out/ directory)
npm run export

# Preview static cu server local
npm run preview:static

# Generează index.html offline la root
npm run offline:index

# Testează configurarea static export
npm run test:export
```

### Workflow complet
```bash
# Development live
npm run dev

# Static preview
npm run export && npm run preview:static

# Offline file
npm run export && npm run offline:index

# Test setup
npm run test:export
```

### Variabile de mediu
Creează un fișier `.env.local`:
```env
# Stripe (pentru producție)
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

## 🎯 Funcționalități cheie

### Sistem de filtrare
- **Preț**: Range slider cu min/max
- **Camere**: Selector 1/2/3/4+
- **Zonă**: Autocomplete cu zonele populare
- **Etaj**: Input numeric
- **Suprafață**: Range slider m²

### Căutare inteligentă
- Căutare după zonă
- Căutare după descriere
- Filtre combinate
- Rezultate în timp real

### Experiența utilizatorului
- **Prima vizită**: Alegerea obligatorie a modului
- **Persistența**: Salvare în localStorage
- **Navigare intuitivă**: Breadcrumbs și butoane de navigare
- **Feedback vizual**: Stări de loading, succes, eroare

## 🌐 Localizare

### Limba română
- Toate textele sunt în română
- Formatare pentru RON (Lei)
- Date în format românesc
- Terminologie specifică pieței imobiliare

## 📱 Responsive și accesibilitate

### Breakpoint-uri
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

### Accesibilitate
- Contrast optimizat
- Focus states vizibile
- Alt text pentru imagini
- Navigare cu tastatura

## 🚀 Deployment

### Vercel (Recomandat)
```bash
npm install -g vercel
vercel
```

### Static Export
```bash
# Generează site-ul static
npm run export

# Servește local pentru testare
npm run preview:static

# Creează versiune offline
npm run offline:index

# Testează configurarea
npm run test:export
```

### Alte platforme
- Netlify
- AWS Amplify
- Docker container

## 🔧 Configurare avansată

### Tailwind CSS
- Culori personalizate
- Fonturi Google Fonts
- Componente reutilizabile
- Variabile CSS custom

### Framer Motion
- Animații de intrare
- Transiții între pagini
- Hover effects
- Loading states

## 📈 Performanță

### Optimizări
- Lazy loading pentru imagini
- Code splitting automat
- Bundle optimization
- Image optimization Next.js

### Core Web Vitals
- LCP optimizat
- FID minim
- CLS redus

## 🤝 Contribuții

### Guidelines
- TypeScript strict
- ESLint config
- Prettier formatting
- Conventional commits

### Structura codului
- Componente funcționale
- Hooks personalizate
- Context pentru state
- Props tipizate

## 📄 Licență

Acest proiect este licențiat sub [MIT License](LICENSE).

## 📞 Contact

Pentru întrebări și suport:
- Email: support@casaai.ro
- Website: https://casaai.ro

---

**CASAai** - Găsește locuința potrivită, direct de la proprietar. 🏠✨
