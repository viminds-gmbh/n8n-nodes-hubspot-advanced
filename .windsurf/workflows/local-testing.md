---
description: Lokales Testen der HubSpot-Nodes in n8n
---

# Lokales Testen der HubSpot-Nodes in n8n

## Voraussetzungen

- n8n global installiert: `npm install -g n8n`
- Node.js 18.x oder höher
- HubSpot Private App Token oder OAuth2-Credentials

## Schritt 1: Package bauen

```bash
npm run build
```

Dies kompiliert TypeScript → JavaScript und kopiert Icons nach `dist/`.

## Schritt 2: Package global verlinken

```bash
npm link
```

Dies erstellt einen globalen Symlink zu deinem lokalen Package.

## Schritt 3: Package in n8n verlinken

```bash
# In einem separaten Terminal
cd ~/.n8n/nodes
npm link n8n-nodes-hubspot-advanced
```

**Alternative:** Wenn `~/.n8n/nodes` nicht existiert:

```bash
mkdir -p ~/.n8n/nodes
cd ~/.n8n/nodes
npm init -y
npm link n8n-nodes-hubspot-advanced
```

## Schritt 4: n8n starten

```bash
n8n start
```

n8n läuft dann auf `http://localhost:5678`

## Schritt 5: Nodes testen

1. **Credentials anlegen:**
   - Gehe zu Settings → Credentials
   - Erstelle neue Credential: "HubSpot App Token"
   - Füge dein Private App Token ein

2. **Workflow erstellen:**
   - Neuer Workflow
   - Suche nach "HubSpot" in der Node-Liste
   - Du solltest sehen:
     - HubSpot CRM
     - HubSpot Associations
     - HubSpot Forms
     - HubSpot Object Schema

3. **Node testen:**
   - Füge z.B. "HubSpot CRM" hinzu
   - Wähle Operation: "Get"
   - Object Type: "contacts"
   - Object ID: Eine echte Contact-ID aus deinem HubSpot
   - Execute Node

## Hot Reload bei Änderungen

**Problem:** n8n cached Nodes, Änderungen werden nicht sofort sichtbar.

**Lösung:**

```bash
# 1. Rebuild
npm run build

# 2. n8n neu starten
# Strg+C im n8n-Terminal, dann:
n8n start
```

**Schnellere Alternative (Development Mode):**

```bash
# Terminal 1: Watch-Mode für TypeScript
npm run build -- --watch

# Terminal 2: n8n mit Auto-Reload
N8N_CUSTOM_EXTENSIONS=~/.n8n/nodes n8n start
```

## Debugging

### Logs anschauen

```bash
# n8n mit Debug-Logs starten
export N8N_LOG_LEVEL=debug
n8n start
```

### Node erscheint nicht in n8n

**Checklist:**

1. ✅ `npm run build` erfolgreich?
2. ✅ `npm link` ausgeführt?
3. ✅ `~/.n8n/nodes/node_modules/n8n-nodes-hubspot-advanced` existiert?
4. ✅ n8n neu gestartet?

**Symlink prüfen:**

```bash
ls -la ~/.n8n/nodes/node_modules/ | grep hubspot
```

Sollte zeigen:
```
lrwxr-xr-x  1 user  staff  ... n8n-nodes-hubspot-advanced -> /Users/jan/Sites/localhost/n8n_hubspot
```

### Rate Limiter testen

**Szenario: 11 parallele Requests**

1. Erstelle einen Workflow mit:
   - Code Node: Generiert Array mit 11 IDs
   - Split In Batches (Batch Size: 1)
   - HubSpot CRM Node (Get Contact)
   - Merge Node

2. Execute Workflow

3. Erwartetes Verhalten:
   - Requests 1-10: ✅ Erfolg
   - Request 11: ⏸️ Pause → 🔄 Retry → ✅ Erfolg
   - Logs zeigen Backoff-Zeiten

## Cleanup

### Package unlinken

```bash
# In ~/.n8n/nodes
npm unlink n8n-nodes-hubspot-advanced

# In deinem Projekt
npm unlink
```

### n8n-Daten zurücksetzen

```bash
rm -rf ~/.n8n
```

## Tipps

- **Verwende echte HubSpot-Daten** für realistische Tests
- **Teste mit Free Tier** um Rate Limits zu triggern
- **Prüfe Browser DevTools** für API-Requests
- **Nutze n8n Execution Logs** für Debugging

## Troubleshooting

### "Cannot find module 'n8n-workflow'"

```bash
npm install
npm run build
```

### "Node not found in n8n"

```bash
# Package-Name in package.json prüfen
cat package.json | grep '"name"'

# Muss sein: "n8n-nodes-hubspot-advanced"
```

### Rate Limiter funktioniert nicht

```bash
# Singleton prüfen
# In src/transport/RateLimiter.ts:
console.log('RateLimiter instance:', HubSpotRateLimiter.getInstance());

# Rebuild + n8n restart
npm run build && n8n start
```
