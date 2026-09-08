# GUIDA PASSO PASSO — dal computer al sito online

Questa guida è per te, non per Claude Code. Presuppone che tu non abbia mai usato GitHub.
Segui i passi in ordine. Se qualcosa non torna, fermati e chiedimi.

---

## PARTE 0 — Cosa ti serve (30 minuti, una volta sola)

| Cosa | Dove | Costo |
|---|---|---|
| **Node.js** (versione 18 o superiore) | nodejs.org — scarica la versione "LTS" | Gratis |
| **Git** | git-scm.com — su Mac potresti averlo già | Gratis |
| **Un account GitHub** | github.com | Gratis |
| **Un account Netlify** | netlify.com — accedi *con GitHub*, è più semplice | Gratis |
| **Claude Code** | vedi sotto | Incluso nell'abbonamento Claude |

Per installare Claude Code, apri il Terminale (su Windows: "PowerShell") e scrivi:

```
npm install -g @anthropic-ai/claude-code
```

Poi:

```
claude
```

Ti chiederà di accedere con il tuo account Claude. Fatto.

> Se `npm` ti dice "comando non trovato", vuol dire che Node.js non è installato o che devi chiudere e riaprire il Terminale.

---

## PARTE 1 — Prepara la cartella

1. Scompatta lo zip che ti ho dato. Dentro trovi `yotto-sushi-lovere/`.
2. Spostala dove vuoi, ma in un percorso **senza spazi e senza accenti**. Per esempio:
   - Windows: `C:\progetti\yotto-sushi-lovere`
   - Mac: `/Users/tuonome/progetti/yotto-sushi-lovere`
3. Apri il Terminale e spostati dentro quella cartella:

```
cd /percorso/della/cartella/yotto-sushi-lovere
```

> Trucco: scrivi `cd ` (con lo spazio) e poi **trascina la cartella dentro la finestra del Terminale**. Il percorso si scrive da solo.

---

## PARTE 2 — Fai costruire il sito a Claude Code

Sempre nella stessa cartella, avvia:

```
claude
```

Poi incolla **esattamente questo**:

```
Leggi il file BRIEF-CLAUDE-CODE.md in questa cartella e costruisci il sito
seguendolo alla lettera.

Prima di scrivere qualsiasi codice, mostrami il piano di design (palette,
tipografia, wireframe delle sezioni) e aspetta la mia approvazione.

Rispondimi in italiano.
```

Claude Code leggerà il brief, ti proporrà il piano, e dopo il tuo OK costruirà tutto.

**Cose da sapere mentre lavora:**

- Ti chiederà il permesso di creare o modificare file. Rispondi di sì.
- Ci metterà un po'. È normale. Non chiudere la finestra.
- Quando ha finito, chiedigli: `Avvia un server locale così posso vedere il sito`.
  Ti darà un indirizzo tipo `http://localhost:8000` da aprire nel browser.

**Come chiedere modifiche.** Parla in italiano, in modo normale:

- `Il logo nell'hero è troppo grande su mobile, riducilo del 30%`
- `Le foto dei piatti cambiano troppo in fretta, rallenta la transizione`
- `Aggiungi una sezione cocktail bar dopo "Il locale"`

---

## PARTE 3 — Metti tutto su GitHub

GitHub è il posto dove vive il codice. Serve perché è lui a parlare con Netlify.

### 3.1 — Crea il repository

1. Vai su **github.com**, in alto a destra clicca **+** → **New repository**
2. **Repository name:** `yotto-sushi-lovere`
3. Lascialo su **Private** (è lavoro di un cliente)
4. **Non** spuntare "Add a README" — la cartella ha già dei file
5. Clicca **Create repository**

### 3.2 — Collega la cartella

GitHub ti mostrerà dei comandi. Ignorali e chiedi invece a Claude Code:

```
Inizializza git in questa cartella, crea un .gitignore adatto,
fai il primo commit e collega il repository remoto
https://github.com/TUO-USERNAME/yotto-sushi-lovere.git

Spiegami cosa stai facendo passo per passo.
```

(Sostituisci `TUO-USERNAME` con il tuo nome utente GitHub.)

Al primo `push` ti verranno chiesti utente e password. **La password normale non funziona.**
Devi generare un token:

1. GitHub → clicca la tua foto in alto a destra → **Settings**
2. In fondo a sinistra: **Developer settings**
3. **Personal access tokens** → **Tokens (classic)** → **Generate new token (classic)**
4. Spunta la casella **repo**
5. Genera e **copia il token subito** (non te lo rimostra più)
6. Quando il Terminale chiede la password, **incolla il token**

> Su Windows non vedrai i caratteri mentre incolli. È normale, sta funzionando. Premi Invio.

---

## PARTE 4 — Pubblica su Netlify

1. Vai su **netlify.com** e accedi **con GitHub**
2. **Add new site** → **Import an existing project** → **GitHub**
3. Autorizza Netlify e scegli il repository `yotto-sushi-lovere`
4. Impostazioni di build:
   - **Build command:** lascia **vuoto** (il sito è statico, non serve)
   - **Publish directory:** scrivi `.` (un punto)
5. **Deploy site**

Dopo un minuto avrai un indirizzo tipo `random-name-123.netlify.app`. **Il sito è online.**

Per dargli un nome decente: **Site configuration** → **Change site name** → `yotto-sushi-lovere`.
Diventa `yotto-sushi-lovere.netlify.app`, perfetto da mandare al cliente per l'approvazione.

### Il form di prenotazione

Non c'è niente da attivare. Il form nella sezione Contatti non manda email e non
invia niente a Netlify: compilandolo e premendo **Prenota su WhatsApp** si apre
la chat di WhatsApp con il messaggio già scritto. La prenotazione si gestisce lì.

---

## PARTE 5 — Il dominio del cliente

Quando il cliente approva:

1. Compra il dominio (es. `yottosushi.it`) — su Namecheap, Aruba o Cloudflare. Circa 10–15 € l'anno.
2. Netlify: **Domain management** → **Add a domain**
3. Netlify ti dà dei "nameserver". Vanno inseriti dove hai comprato il dominio.
4. Aspetta qualche ora. **L'HTTPS (il lucchetto) si attiva da solo, gratis.**

> Consiglio commerciale: **compra tu il dominio e rivendilo dentro al pacchetto.** Se lo compra il cliente per conto suo, quando dovrai modificare qualcosa dovrai rincorrerlo per le credenziali. Fidati.

---

## PARTE 6 — Come aggiornare un menù (la parte che ti interessa di più)

Questa è la risposta alla tua domanda su Google Drive. **Non serve Drive, e non serve il Terminale.**

Quando la titolare ti manda un menù nuovo:

1. Vai sul tuo repository su **github.com**
2. Entra in `assets/` → `menu/`
3. Clicca **Add file** → **Upload files**
4. Trascina il PDF nuovo, **rinominato esattamente come il vecchio** (`menu-pranzo.pdf`, `menu-festivo.pdf` o `menu-cena.pdf`)
5. In basso clicca **Commit changes**

**Fatto.** Netlify se ne accorge da solo e in 30 secondi il sito è aggiornato.

Funziona anche dal telefono, dal browser. Zero codice.

> Ripeto il consiglio: questa cosa ti costa 2 minuti. **Vendila come "manutenzione e aggiornamento menù, 20 € al mese".** È il servizio che trasforma un lavoro una tantum in entrata ricorrente. E il cliente è felice perché non deve pensarci.

Stessa procedura per cambiare una foto o correggere un prezzo: modifichi il file su GitHub e il sito si aggiorna. Per modifiche più grosse, riapri Claude Code nella cartella, chiedi la modifica, e poi:

```
Fai il commit e il push delle modifiche
```

---

## PARTE 7 — Prima di consegnare al cliente

Controlla queste cose. Sono quelle che fanno la differenza tra un lavoro amatoriale e uno professionale.

- [ ] Aperto il sito **dal telefono**, non solo dal computer
- [ ] Il pulsante WhatsApp apre davvero WhatsApp col messaggio precompilato
- [ ] Il numero di telefono, cliccato dal telefono, avvia la chiamata
- [ ] I 4 pulsanti dei menù aprono i PDF giusti
- [ ] La mappa si carica dopo aver accettato i cookie
- [ ] Il badge "Aperto ora" mostra la cosa giusta all'ora giusta
- [ ] Le icone social portano ai profili veri (non ai `#TODO`)
- [ ] Compilato il form di prenotazione e premuto "Prenota su WhatsApp": si apre la chat col messaggio già scritto e i dati inseriti
- [ ] Prezzi e orari corrispondono al listino del cliente
- [ ] Non ci sono recensioni inventate
- [ ] Nel footer non ci sono testi segnaposto dimenticati

Su quest'ultimo punto: il sito di Yang ha ancora nel footer il testo demo del tema, con un indirizzo a Città del Capo e un'email finta. **È lì da anni.** Non fare lo stesso errore: è il genere di dettaglio che un cliente nota e ricorda.

---

## SE QUALCOSA VA STORTO

Prima cosa da provare, sempre: torna nella cartella, apri `claude`, e **descrivi il problema in italiano**. Claude Code legge gli errori e li sistema.

| Problema | Cosa fare |
|---|---|
| `npm: command not found` | Node.js non installato, o riapri il Terminale |
| `Permission denied (publickey)` | Usa il token al posto della password (Parte 3.2) |
| Netlify mostra "Page not found" | Publish directory sbagliata: deve essere `.` |
| Il sito è online ma senza stili | Percorsi CSS sbagliati: chiedi a Claude Code di controllare i link relativi |
| Le foto non si vedono | Maiuscole/minuscole nei nomi file: online contano, sul tuo computer no |

Quest'ultimo è l'errore più frequente in assoluto: `Foto.JPG` e `foto.jpg` sul tuo computer sono lo stesso file, sul server no.
