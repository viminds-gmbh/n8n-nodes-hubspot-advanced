---
description: Test HubSpot nodes with workflow t3Awq9e0UAZbVzPb
---

# Test HubSpot Nodes

Dieser Workflow buildet das Projekt, linkt es in n8n und führt den Test-Workflow `t3Awq9e0UAZbVzPb` aus.

## Schritt 1: Test-Script ausführen

// turbo
```bash
bash test
```

Dies führt automatisch folgende Schritte aus:
1. **Build**: Kompiliert TypeScript → JavaScript
2. **Link**: Verlinkt Package in `~/.n8n/nodes`
3. **Stop n8n**: Stoppt laufende n8n-Instanz (für CLI-Zugriff)
4. **Execute**: Führt Workflow via `n8n execute --id` aus
5. **Log**: Speichert Output in `/tmp/n8n_test.log`

## Schritt 2: Bei Fehler - Log analysieren

Falls der Workflow fehlschlägt:

```bash
cat /tmp/n8n_test.log
```

## Schritt 3: Fehleranalyse

Häufige Fehlerquellen:

### Node nicht gefunden
```
Error: Unknown node type: HubSpot...
```
**Lösung**: Prüfe ob Symlink korrekt ist:
```bash
ls -la ~/.n8n/nodes/node_modules/ | grep hubspot
```

### Rate Limit Error
```
Error: Rate limit exceeded
```
**Lösung**: Prüfe `RateLimiter.ts` Implementierung

### Type Error
```
TypeError: Cannot read property...
```
**Lösung**: Prüfe Node-Implementierung auf `undefined` Zugriffe

### Credential Error
```
Error: Credentials not found
```
**Lösung**: Stelle sicher, dass HubSpot Credentials in n8n angelegt sind

## Schritt 4: Code-Anpassungen

Wenn ein Fehler auf einen Bug in den Nodes hinweist:

1. Identifiziere betroffenen Node (z.B. `HubSpotCrm.node.ts`)
2. Analysiere Stack Trace in `/tmp/n8n_test.log`
3. Fixe den Code
4. Führe Test erneut aus: `bash test`

## Tipps

- **Schneller Iterieren**: Nach Code-Änderungen nur `bash test` ausführen
- **Debug-Modus**: Füge `console.log()` in Nodes ein, Output erscheint in Log
- **Einzelne Nodes testen**: Deaktiviere andere Nodes im Workflow temporär
- **Credentials prüfen**: Teste mit gültigen HubSpot API-Credentials

## Cleanup

Falls du n8n wieder normal starten willst:

```bash
n8n start
```
