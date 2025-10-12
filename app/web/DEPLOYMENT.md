# 🚀 Vercel Deployment Guide

## Voraussetzungen
- ✅ GitHub Account mit bloxie Repository
- ✅ Vercel Account (mit GitHub verbunden)
- ✅ Convex Deployment URL

## 📦 Deployment Schritte

### 1. Neues Projekt auf Vercel erstellen

1. Gehen Sie zu: https://vercel.com/new
2. Wählen Sie Ihr GitHub Repository: **`bloxie`**
3. Klicken Sie auf **"Import"**

### 2. Projekt konfigurieren

Im "Configure Project" Screen:

#### **Root Directory:**
```
app/web
```
⚠️ **WICHTIG**: Klicken Sie auf "Edit" neben "Root Directory" und setzen Sie `app/web`

#### **Framework Preset:**
- Sollte automatisch **Next.js** erkennen
- Falls nicht: Manuell "Next.js" auswählen

#### **Build & Development Settings:**
Lassen Sie diese auf Standard:
- **Build Command:** `npm run build`
- **Output Directory:** `.next`
- **Install Command:** `npm install`

#### **Node.js Version:**
- Version: `20.x` (oder höher)

### 3. Environment Variables hinzufügen

Klicken Sie auf **"Environment Variables"** und fügen Sie hinzu:

| Name | Value | Environment |
|------|-------|-------------|
| `NEXT_PUBLIC_CONVEX_URL` | Ihre Convex URL | Production, Preview, Development |

Beispiel:
```
NEXT_PUBLIC_CONVEX_URL=https://xxx.convex.cloud
```

### 4. Deploy!

Klicken Sie auf **"Deploy"** und warten Sie ~2-3 Minuten.

---

## ✅ Nach dem Deployment

### Ihre URLs:
- **Production:** `https://bloxie-web-xxx.vercel.app`
- **Custom Domain:** Können Sie später hinzufügen (bloxie.ch)

### Testen:
```bash
# Homepage
curl https://ihre-url.vercel.app

# Booking Page (Demo)
curl https://ihre-url.vercel.app/test-company
```

---

## 🔄 Automatische Deployments

Ab jetzt wird **jeder Push** zu GitHub automatisch deployed:

- **main Branch** → Production Deployment
- **Andere Branches** → Preview Deployment

---

## 🌐 Custom Domain hinzufügen (bloxie.ch)

### In Vercel:
1. Gehen Sie zu Projekt → Settings → Domains
2. Fügen Sie `bloxie.ch` hinzu
3. Folgen Sie den DNS-Anweisungen

### DNS Einstellungen (bei Ihrem Domain-Provider):
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

---

## 🐛 Troubleshooting

### Build schlägt fehl?

**Problem:** "Cannot find module '@/components/...'"

**Lösung:** Stellen Sie sicher, dass "Root Directory" auf `app/web` gesetzt ist.

---

**Problem:** "Missing environment variable"

**Lösung:** Environment Variables in Vercel hinzufügen und neu deployen.

---

**Problem:** "Module not found: date-fns/locale"

**Lösung:** 
```bash
cd app/web
npm install date-fns
git commit -am "Add date-fns dependency"
git push
```

---

## 📊 Monitoring

### Vercel Dashboard:
- **Analytics:** Besucher, Ladezeiten
- **Logs:** Fehler und Requests
- **Deployments:** Build-Historie

### Convex Dashboard:
- **Queries:** Anzahl API Calls
- **Latency:** Performance

---

## 🔧 Lokale Vercel CLI (Optional)

Für lokales Testen mit Production-Settings:

```bash
# Vercel CLI installieren
npm i -g vercel

# Login
vercel login

# Lokaler Build mit Production Environment
cd app/web
vercel build --prod

# Lokaler Test
vercel dev
```

---

## 💰 Kosten im Blick behalten

### Free Tier Limits:
- ✅ 100GB Bandbreite
- ✅ 100 Deployments/Tag
- ✅ Unlimited Preview Deployments

### Pro Plan ($20/mo) empfohlen für:
- Mehr als 1TB Bandbreite
- Custom Domains mit SSL
- Advanced Analytics
- Team Collaboration

---

## 🔒 Security Checklist

- [x] HTTPS automatisch aktiviert
- [x] Security Headers konfiguriert (vercel.json)
- [x] Environment Variables nicht im Code
- [ ] Rate Limiting in Convex implementieren
- [ ] CORS für API Routes konfigurieren (falls nötig)

---

## 📞 Support

Bei Problemen:
1. **Vercel Docs:** https://vercel.com/docs
2. **Next.js Docs:** https://nextjs.org/docs
3. **Logs prüfen:** Vercel Dashboard → Deployments → Logs

