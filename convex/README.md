# Convex Backend für Bloxie

Dieses Backend implementiert das komplette Booking-System mit Rate Limiting, Datenverwaltung und automatischen Cleanup-Tasks.

## 📁 Struktur

```
convex/
├── schema.ts           # Datenbank-Schema (Companies, Bookings, Availability, Rate Limits)
├── rateLimit.ts        # Rate Limiting Helper Functions
├── companies.ts        # Company Queries & Mutations
├── bookings.ts         # Booking Queries & Mutations (mit Rate Limiting)
├── availability.ts     # Availability Slot Management
├── maintenance.ts      # Cleanup & Maintenance Tasks
├── crons.ts           # Scheduled Functions (Cron Jobs)
└── README.md          # Diese Datei
```

## 🚀 Setup

### 1. Convex CLI installieren

```bash
npm install -g convex
```

### 2. Convex Projekt initialisieren

```bash
# Im Root-Verzeichnis
convex dev
```

Beim ersten Mal:
1. Login mit Convex Account
2. Neues Projekt erstellen oder bestehendes auswählen
3. Development Deployment wird automatisch erstellt

### 3. Environment Variables setzen

Die Convex URL wird automatisch in `.env.local` gespeichert:

```env
# .env.local (Root)
CONVEX_DEPLOYMENT=dev:your-deployment-id
NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud

# .env.local (app/web)
NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud
```

## 📊 Datenbank-Schema

### Tables:

#### **companies**
Firmen mit öffentlichen Booking-Seiten
- `name`, `slug`, `description`, `logo`
- `ownerId` (verknüpft mit Auth System)
- `isPublic` (Sichtbarkeit auf Booking-Seite)
- `timezone`, `bookingSettings`

#### **availability**
Verfügbare Zeitslots
- `companyId`, `date`, `startTime`, `endTime`, `duration`
- `isAvailable` (Status)

#### **bookings**
Gebuchte Termine
- `companyId`, `slotId`
- `customerName`, `customerEmail`, `customerPhone`, `notes`
- `status` (pending, confirmed, cancelled, completed, no_show)
- `confirmationToken` (für Bestätigung/Stornierung)

#### **rateLimits**
Rate Limiting Einträge
- `identifier` (IP oder Email)
- `type` (booking_create, slot_query, company_query)
- `timestamp`

#### **users** (Optional)
User-Verwaltung für Better Auth Integration
- `authId`, `email`, `name`, `role`

## 🛡️ Rate Limiting

### Konfiguration (in `rateLimit.ts`):

```typescript
BOOKING_CREATE: {
  maxAttempts: 3,        // Max 3 Versuche
  windowMs: 5 * 60 * 1000 // in 5 Minuten
}

SLOT_QUERY: {
  maxAttempts: 30,       // Max 30 Anfragen
  windowMs: 1 * 60 * 1000 // in 1 Minute
}

COMPANY_QUERY: {
  maxAttempts: 100,      // Max 100 Anfragen
  windowMs: 1 * 60 * 1000 // in 1 Minute
}
```

### Verwendung:

```typescript
// In Mutation
const rateLimitCheck = await checkRateLimit(ctx, identifier, "booking_create");

if (rateLimitCheck.limited) {
  throw new RateLimitError("Zu viele Versuche", rateLimitCheck.resetAt, 0);
}

// Rate Limit aufzeichnen
await recordRateLimit(ctx, identifier, "booking_create");
```

## 🔄 Scheduled Functions (Cron Jobs)

Automatische Maintenance-Tasks (definiert in `crons.ts`):

### 1. **cleanup-rate-limits** (alle 6 Stunden)
Löscht alte Rate Limit Einträge (älter als 24 Stunden)

### 2. **cleanup-old-bookings** (alle 24 Stunden)
Löscht stornierte Bookings (älter als 90 Tage)

### 3. **update-past-slots** (jede Stunde)
Markiert vergangene Slots als nicht verfügbar

## 📝 API Übersicht

### Public Queries (für Next.js Web-App):

```typescript
// Companies
api.companies.getPublicCompanies()
api.companies.getBySlug({ slug: "codemize" })

// Bookings
api.bookings.getAvailableSlots({ 
  companySlug: "codemize",
  startDate: "2025-01-01",
  endDate: "2025-01-31"
})
api.bookings.getBooking({ 
  bookingId, 
  confirmationToken 
})
```

### Public Mutations (für Next.js Web-App):

```typescript
// Buchung erstellen (MIT RATE LIMITING)
api.bookings.create({
  slotId: "...",
  customerName: "Max Mustermann",
  customerEmail: "max@example.com",
  customerPhone: "+41...",
  notes: "...",
  ipAddress: "..."
})

// Buchung stornieren
api.bookings.cancel({
  bookingId: "...",
  confirmationToken: "..."
})
```

### Private Queries/Mutations (für React Native App):

```typescript
// Companies
api.companies.create({ ... })
api.companies.update({ ... })
api.companies.remove({ ... })

// Availability
api.availability.getByCompany({ companyId })
api.availability.create({ ... })
api.availability.createBulk({ ... })
api.availability.update({ ... })
api.availability.remove({ ... })

// Bookings Management
api.bookings.getByCompany({ 
  companyId,
  status: "pending",
  startDate: "2025-01-01"
})
api.bookings.updateStatus({ 
  bookingId,
  status: "confirmed" 
})
```

## 🧪 Testen

### Demo-Daten erstellen:

Siehe `seed.ts` für Beispiel-Daten.

```bash
# In Convex Dashboard oder via Code
```

### Rate Limiting testen:

```bash
# 4x schnell hintereinander ausführen (4. Versuch sollte fehlschlagen)
curl -X POST https://your-url.vercel.app/api/bookings \
  -H "Content-Type: application/json" \
  -d '{"customerEmail": "test@test.com", ...}'
```

## 🔒 Security Features

✅ **Rate Limiting** auf allen öffentlichen Mutations
✅ **Input Validation** (Email, Daten-Format)
✅ **Doppelbuchung-Prävention**
✅ **Atomische Transaktionen** (Slot wird während Buchung gesperrt)
✅ **Confirmation Tokens** für sichere Stornierungen
✅ **IP-Tracking** für Missbrauchserkennung
✅ **Automatische Cleanup-Tasks**

## 📈 Monitoring

### Convex Dashboard:

1. **Logs**: Alle Queries/Mutations in Echtzeit
2. **Tables**: Datenbank-Inhalt ansehen
3. **Functions**: Performance-Metriken
4. **Scheduled Functions**: Cron Job Status

### Rate Limiting überwachen:

```sql
-- In Convex Dashboard Console
db.query("rateLimits")
  .withIndex("by_identifier_and_type")
  .filter(q => q.eq(q.field("type"), "booking_create"))
  .collect()
```

## 🚀 Production Deployment

### 1. Production Deployment erstellen:

```bash
convex deploy --prod
```

### 2. Environment Variables aktualisieren:

```env
# .env.local (app/web - Production)
NEXT_PUBLIC_CONVEX_URL=https://your-prod-deployment.convex.cloud
```

### 3. Auf Vercel deployen:

Environment Variable in Vercel Dashboard hinzufügen.

## 🔧 Troubleshooting

### Problem: "Module not found"

**Lösung**: Stelle sicher, dass `convex dev` läuft und Schema generiert wurde.

---

### Problem: Rate Limit zu streng

**Lösung**: Passe Werte in `rateLimit.ts` an:

```typescript
BOOKING_CREATE: {
  maxAttempts: 5,  // Erhöhen
  windowMs: 10 * 60 * 1000  // Vergrößern
}
```

---

### Problem: Cron Jobs laufen nicht

**Lösung**: 
1. Prüfe ob `crons.ts` exportiert wird
2. Überprüfe Convex Dashboard → Scheduled Functions

## 📚 Weitere Ressourcen

- [Convex Docs](https://docs.convex.dev)
- [Convex React/Next.js Integration](https://docs.convex.dev/client/react)
- [Scheduled Functions](https://docs.convex.dev/scheduling/scheduled-functions)

