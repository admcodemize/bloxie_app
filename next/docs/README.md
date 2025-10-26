# Bloxie Web - Public Booking Pages

Dies ist die Next.js Web-App für die öffentlichen Terminbuchungs-Seiten von Bloxie.

## 🚀 Entwicklung starten

### Aus dem Root-Verzeichnis:
```bash
npm run web:dev
```

### Direkt aus dem Web-Verzeichnis:
```bash
cd app/web
npm run dev
```

Die App ist dann unter [http://localhost:3000](http://localhost:3000) erreichbar.

## 📁 Struktur

```
app/web/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── [companySlug]/     # Dynamische Booking-Seiten
│   │   │   └── page.tsx       # Company-spezifische Booking Page
│   │   ├── layout.tsx         # Root Layout
│   │   ├── page.tsx           # Homepage
│   │   └── globals.css        # Globale Styles
│   ├── components/
│   │   └── booking/           # Booking-spezifische Komponenten
│   │       ├── BookingCalendar.tsx    # Kalender mit Slot-Auswahl
│   │       ├── BookingForm.tsx        # Buchungsformular
│   │       └── CompanyHeader.tsx      # Company Header
│   └── lib/
│       └── convex.ts          # Convex Client Setup
├── public/                     # Statische Assets
├── package.json
├── tsconfig.json
└── next.config.ts
```

## 🔗 URL-Struktur

- **Homepage**: `https://bloxie.ch/`
- **Booking-Seiten**: `https://bloxie.ch/[companySlug]`
  - Beispiel: `https://bloxie.ch/codemize`
  - Beispiel: `https://bloxie.ch/company-name`

## 🔧 Convex Integration

### Environment Variables

Erstellen Sie eine `.env.local` Datei:

```env
NEXT_PUBLIC_CONVEX_URL=https://your-convex-deployment.convex.cloud
```

### Noch zu implementieren:

Die folgenden Convex Queries und Mutations müssen noch implementiert werden:

1. **`api.companies.getBySlug`** - Company Daten laden
2. **`api.companies.getPublicCompanies`** - Alle öffentlichen Companies für Static Generation
3. **`api.bookings.getAvailableSlots`** - Verfügbare Zeitslots laden
4. **`api.bookings.create`** - Neue Buchung erstellen

Aktuell werden Demo-Daten verwendet.

## 🎨 Styling

Das Projekt verwendet **CSS Modules** (kein Tailwind):

- Komponentenspezifische Styles in `.module.css` Dateien
- Globale Styles in `globals.css`
- Dark Mode Support über `prefers-color-scheme`
- Mobile-responsive Design

## 📦 Features

### ✅ Implementiert:
- [x] Next.js 15 mit App Router
- [x] TypeScript
- [x] Server-Side Rendering (SSR)
- [x] Incremental Static Regeneration (ISR)
- [x] Dynamic Routes für Companies
- [x] Booking Calendar mit Datum- und Zeit-Auswahl
- [x] Booking Formular mit Validation
- [x] Dark Mode Support
- [x] Mobile Responsive Design

### 🚧 Noch zu implementieren:
- [ ] Convex Backend Queries/Mutations
- [ ] Email-Bestätigungen
- [ ] Kalender-Synchronisation (Google Calendar, etc.)
- [ ] Payment Integration (optional)
- [ ] Multi-Language Support (i18n)
- [ ] SEO Optimierungen (Metadata, Sitemaps)

## 🚀 Deployment

### Option 1: Vercel (empfohlen für Next.js)

**Vorteile:**
- Native Next.js Integration (ISR, Edge Functions)
- Zero-Config Deployment
- Beste Performance für Server Components

**Deployment:**
```bash
# Installation der Vercel CLI
npm i -g vercel

# Deployment
cd app/web
vercel
```

**Environment Variables auf Vercel:**
- `NEXT_PUBLIC_CONVEX_URL`: Ihre Production Convex URL

**Kosten:** Ab $20/Monat (Pro Plan empfohlen für Production)

---

### Option 2: Netlify (günstiger)

**Vorteile:**
- Günstiger für kleinere Projekte
- Generöse Free Tier
- Einfache CI/CD Integration

**Deployment:**
```bash
# Installation der Netlify CLI
npm i -g netlify-cli

# Netlify Plugin installieren
npm install -D @netlify/plugin-nextjs

# Deployment
cd app/web
netlify deploy --prod
```

**Oder per Git:**
1. Repository mit Netlify verbinden
2. Build Command: `npm run build`
3. Publish Directory: `.next`

**Environment Variables auf Netlify:**
- `NEXT_PUBLIC_CONVEX_URL`: Ihre Production Convex URL

**Kosten:** Free bis 100GB Traffic, dann ab $19/Monat

**⚠️ Hinweis:** ISR funktioniert auf Netlify mit zusätzlicher Konfiguration (`netlify.toml` ist bereits vorhanden)

## 📝 Nächste Schritte

1. **Convex Backend implementieren** (siehe convex/ Ordner im Root)
2. **Environment Variables konfigurieren**
3. **Testen mit echten Daten**
4. **Production Deployment auf Vercel**
5. **Domain konfigurieren** (bloxie.ch)

## 🔒 Security

- Öffentliche Queries haben nur Lesezugriff auf zugelassene Daten
- Rate Limiting für Buchungen (zu implementieren in Convex)
- Input Validation im Formular
- HTTPS-only in Production

