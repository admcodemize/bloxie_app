# 📋 Bloxie TODO Liste

## 🎯 Aktuell (Priorität: Hoch)

### 1. Dashboard-Komponenten auslagern
- [ ] Dashboard-Card-Komponente erstellen (`components/container/DashboardCard.tsx`)
- [ ] Statistic-Card-Komponente extrahieren
- [ ] Chart-Container-Komponente erstellen
- [ ] Quick-Actions-Komponente auslagern
- [ ] Styles in separate Module aufteilen
- [ ] Props-Interfaces definieren
- [ ] Dokumentation für Komponenten schreiben

**Ziel:** Wiederverwendbare, modulare Dashboard-Komponenten für bessere Wartbarkeit

---

### 2. TouchableHaptic für Dashboard-Cards
- [ ] TouchableHaptic-Component für Cards implementieren
- [ ] Haptic-Feedback-Type festlegen (z.B. `selection`, `light`)
- [ ] Alle Dashboard-Cards auf TouchableHaptic migrieren
- [ ] Loading-States mit Haptic-Feedback kombinieren
- [ ] iOS & Android Haptic-Feedback testen
- [ ] Accessibility-Support sicherstellen

**Ziel:** Bessere UX durch haptisches Feedback bei Interaktionen

**Betroffene Dateien:**
- `screens/private/tabs/Dashboard.tsx`
- `components/button/TouchableHaptic.tsx`
- Neue: `components/container/DashboardCard.tsx`

---

### 3. I18n für neue Texte
- [ ] Neue Dashboard-Texte in `i18n/locales/de/translation.json` hinzufügen
- [ ] Neue Dashboard-Texte in `i18n/locales/en/translation.json` hinzufügen
- [ ] Namespace für Dashboard erstellen (z.B. `dashboard.cards.stats`)
- [ ] Alle hardcoded Strings durch `t()` ersetzen
- [ ] Pluralisierung für dynamische Werte implementieren
- [ ] Datum/Zeit-Formatierung mit i18n
- [ ] Zahlenformatierung mit i18n (z.B. Währungen)

**Ziel:** Vollständige Mehrsprachigkeit der Dashboard-Ansicht

**Translation Keys Beispiel:**
```json
{
  "dashboard": {
    "cards": {
      "bookingsToday": "Buchungen heute",
      "upcomingAppointments": "Anstehende Termine",
      "revenue": "Umsatz"
    },
    "stats": {
      "total": "Gesamt",
      "pending": "Ausstehend",
      "confirmed": "Bestätigt"
    }
  }
}
```

---

### 4. Line-Chart-Komponente generisch aufbauen
- [ ] Generische Chart-Komponente erstellen (`components/charts/LineChart.tsx`)
- [ ] Props-Interface für flexible Datensätze
- [ ] Konfigurierbares Styling (Farben, Linienbreite, etc.)
- [ ] Multiple Datensätze unterstützen
- [ ] Achsen-Labels konfigurierbar machen
- [ ] Responsive Width/Height
- [ ] Loading-State implementieren
- [ ] Error-State implementieren
- [ ] Animations-Props hinzufügen
- [ ] TypeScript-Types für Chart-Daten
- [ ] Storybook/Doku für Komponente

**Ziel:** Wiederverwendbare Chart-Komponente für verschiedene Datenvisualisierungen

**Beispiel API:**
```typescript
<LineChart
  data={[
    { label: 'Jan', value: 100 },
    { label: 'Feb', value: 150 },
  ]}
  datasets={[
    { 
      name: 'Bookings',
      data: [...],
      color: '#667eea',
      lineWidth: 2
    }
  ]}
  height={200}
  showGrid={true}
  animate={true}
  onDataPointPress={(point) => {}}
/>
```

**Betroffene Libraries:**
- `react-native-gifted-charts` (bereits installiert)
- Ggf. `react-native-svg` für Custom Charts

---

## 🔄 In Progress

_Keine Tasks in Bearbeitung_

---

## ✅ Completed

_Keine abgeschlossenen Tasks_

---

## 📅 Zukünftig (Backlog)

### Dashboard & Analytics
- [ ] Bar-Chart-Komponente erstellen
- [ ] Pie-Chart-Komponente erstellen
- [ ] Dashboard-Filterung (Zeitraum wählen)
- [ ] Export-Funktion für Statistiken
- [ ] Real-time Updates mit Convex Subscriptions

### Booking System
- [ ] Email-Benachrichtigungen für Buchungen
- [ ] SMS-Benachrichtigungen (Twilio)
- [ ] Kalender-Synchronisation (Google Calendar, Outlook)
- [ ] iCal Export
- [ ] Recurring Appointments
- [ ] Payment Integration (Stripe)

### Mobile App Features
- [ ] Push-Benachrichtigungen
- [ ] Offline-Support
- [ ] Dark Mode für alle Screens
- [ ] Tablet-optimiertes Layout
- [ ] Biometrische Authentifizierung
- [ ] Onboarding-Flow

### Web-App Features
- [ ] Admin-Dashboard für Company Management
- [ ] Team-Member Management
- [ ] Custom Branding (Logo, Farben)
- [ ] Multi-Language Booking Pages
- [ ] Custom Domain Support

### Backend & Infrastruktur
- [ ] Better Auth Integration für Mobile App
- [ ] User Roles & Permissions
- [ ] Audit Log für Änderungen
- [ ] Backup & Recovery Strategy
- [ ] Performance Monitoring (Sentry)
- [ ] A/B Testing Setup

---

## 🐛 Bugs & Fixes

_Keine bekannten Bugs_

---

## 📝 Notizen

### Coding Standards
- TypeScript für alle neuen Komponenten
- Props-Interfaces am Anfang der Datei
- Dokumentations-Kommentare (@description, @param, etc.)
- CSS Modules für Styles (Web-App)
- StyleSheet.create für Styles (Mobile App)

### Testing
- Unit Tests für Business Logic
- Integration Tests für API Calls
- E2E Tests für kritische User Flows

### Performance
- React.memo für teure Komponenten
- useMemo/useCallback wo sinnvoll
- Lazy Loading für große Listen
- Image Optimization

---

## 🎯 Sprint Planning

### Sprint 1 (Diese Woche)
- [ ] Dashboard-Komponenten auslagern
- [ ] TouchableHaptic für Dashboard-Cards

### Sprint 2 (Nächste Woche)  
- [ ] I18n für neue Texte
- [ ] Line-Chart-Komponente generisch aufbauen

---

_Letzte Aktualisierung: {{date}}_

- [ ] BackdropStyles dropdown und tray nach colors auslagern 