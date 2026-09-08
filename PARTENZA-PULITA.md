# PARTENZA PULITA — archiviare il vecchio, avviare Yotto

Segui i passi in ordine. Non c'è niente di irreversibile se rispetti il Passo 1.

---

## PASSO 1 — Controlla il CLAUDE.md globale (fallo per primo)

Esiste un file di istruzioni **globale** che Claude Code legge in *ogni* progetto.
Se lì dentro ci sono le istruzioni del vecchio software, ti seguiranno anche su Yotto.

**Guarda cosa c'è dentro:**

Mac / Linux:
```bash
cat ~/.claude/CLAUDE.md
```

Windows (PowerShell):
```powershell
type "$env:USERPROFILE\.claude\CLAUDE.md"
```

- **Se dice "file non trovato"** → perfetto, non esiste. Passa al Passo 2.
- **Se contiene istruzioni generiche** (lingua, stile di risposta, preferenze tue) → lascialo com'è, va bene.
- **Se contiene roba del vecchio software** (stack, architettura, nomi di quel progetto) → svuotalo, ma prima fanne una copia:

Mac / Linux:
```bash
cp ~/.claude/CLAUDE.md ~/.claude/CLAUDE.md.backup
echo "" > ~/.claude/CLAUDE.md
```

Windows (PowerShell):
```powershell
Copy-Item "$env:USERPROFILE\.claude\CLAUDE.md" "$env:USERPROFILE\.claude\CLAUDE.md.backup"
Clear-Content "$env:USERPROFILE\.claude\CLAUDE.md"
```

La copia `.backup` resta lì. Se serve, la recuperi.

---

## PASSO 2 — Archivia il vecchio progetto (non cancellarlo)

Il vecchio progetto non dà fastidio a Yotto, perché sta in un'altra cartella con il suo
`CLAUDE.md` locale. Basta metterlo da parte.

**Su GitHub** — archivia il repository invece di eliminarlo:

1. Apri il repository del vecchio progetto
2. **Settings** → scorri fino in fondo, sezione **Danger Zone**
3. **Archive this repository** → conferma

Diventa in sola lettura, sparisce dalla lista dei progetti attivi, ma resta lì per sempre.
Reversibile in qualsiasi momento, e non costa niente.

> **Non usare "Delete this repository".** È irreversibile e non ti fa guadagnare nulla.

**Sul computer** — spostalo in una cartella di archivio:

Mac / Linux:
```bash
mkdir -p ~/progetti/_archivio
mv ~/percorso/del/vecchio-progetto ~/progetti/_archivio/
```

Windows (PowerShell):
```powershell
New-Item -ItemType Directory -Force -Path "$HOME\progetti\_archivio"
Move-Item "C:\percorso\del\vecchio-progetto" "$HOME\progetti\_archivio\"
```

**Se su Vercel** avevi collegato quel progetto: entra nel progetto → **Settings** → **Delete Project**.
Cancella solo il collegamento, il codice su GitHub resta. Così non ti restano deploy attivi a caso.

---

## PASSO 3 — Prepara la cartella di Yotto

1. Scompatta lo zip che ti ho dato.
2. Metti la cartella `yotto-sushi-lovere` in un percorso **senza spazi né accenti**:
   - Mac: `~/progetti/yotto-sushi-lovere`
   - Windows: `C:\progetti\yotto-sushi-lovere`
3. Verifica che dentro ci siano:
   - `CLAUDE.md`
   - `BRIEF-CLAUDE-CODE.md`
   - `GUIDA-PER-TE.md`
   - `assets/`

Il `CLAUDE.md` che trovi dentro dice esplicitamente a Claude Code di ignorare gli altri progetti.

---

## PASSO 4 — Nuovo repository su GitHub

1. github.com → **+** in alto a destra → **New repository**
2. Nome: `yotto-sushi-lovere`
3. **Private**
4. **Non** spuntare niente (né README, né .gitignore, né licenza)
5. **Create repository**

---

## PASSO 5 — Avvia Claude Code

Apri il Terminale nella cartella nuova:

```bash
cd ~/progetti/yotto-sushi-lovere
claude
```

Poi incolla questo, sostituendo `TUO-USERNAME`:

```
Questo è un progetto nuovo, senza nessun rapporto con altri progetti su questa macchina.

1. Leggi CLAUDE.md e BRIEF-CLAUDE-CODE.md in questa cartella.
2. Inizializza git, crea un .gitignore adatto a un sito statico,
   fai il primo commit e collega il remoto:
   https://github.com/TUO-USERNAME/yotto-sushi-lovere.git
3. Poi mostrami il piano di design (palette, tipografia, wireframe delle sezioni)
   e aspetta la mia approvazione prima di scrivere codice.

Spiegami ogni passaggio in italiano, come se non sapessi usare git.
```

Se al push chiede la password: serve un **token**, non la password dell'account.
Come generarlo è spiegato nella `GUIDA-PER-TE.md`, Parte 3.2.

---

## PASSO 6 — Netlify (o un altro hosting statico)

Il sito è statico: va bene qualsiasi hosting (Netlify, Vercel, GitHub Pages…).
Qui usiamo **Netlify** perché è semplice e collegato a GitHub; il `netlify.toml`
in cartella è già pronto. Non ci sono form né funzioni server: le prenotazioni
passano solo dal pulsante WhatsApp.

1. netlify.com → accedi **con GitHub**
2. **Add new site** → **Import an existing project** → **GitHub**
3. Scegli `yotto-sushi-lovere`
4. **Build command:** vuoto · **Publish directory:** `.`
5. **Deploy site**

Poi **Site configuration** → **Change site name** → `yotto-sushi-lovere`,
così hai un indirizzo presentabile da mandare al cliente.

---

## Da qui in poi

Un cliente, una cartella, un repository, un sito Netlify. Sempre.
È la cosa che ti farà lavorare bene quando i clienti saranno cinque invece di uno.
