# BRIEF DI PROGETTO — Sito web YOTTO SUSHI, Lovere (BG)

> **Come si usa questo file:** aprilo con Claude Code nella cartella di progetto e digli
> *"Leggi BRIEF-CLAUDE-CODE.md e costruisci il sito seguendolo alla lettera."*
> Tutto quello che serve è qui dentro. Le foto sono già nella cartella `assets/`.

---

## 1. IL PROGETTO IN UNA RIGA

Sito vetrina one-page per **Yotto Sushi Asian Cuisine**, ristorante giapponese/asiatico all-you-can-eat sul lungolago di Lovere, sul **Lago d'Iseo**. L'obiettivo del sito è **far prenotare un tavolo**, principalmente da telefono.

## 2. OBIETTIVI, IN ORDINE DI IMPORTANZA

1. **Prenotazione via WhatsApp** — è il canale che in Italia converte di più per i ristoranti. Deve essere raggiungibile da qualsiasi punto della pagina.
2. **Far vedere il locale e i piatti** — questo ristorante è visivamente straordinario (vetrate sul porto, installazione di pesci in vetro blu al soffitto, marmo verde, ottone, terrazza). È la sua arma principale.
3. **Rispondere subito a: quanto costa, quando è aperto, dov'è** — sono le tre domande per cui la gente apre il sito di un ristorante.
4. **Farsi trovare su Google** per ricerche tipo "sushi Lovere", "sushi lago d'Iseo", "all you can eat Lovere".

## 3. PUBBLICO

Famiglie e coppie della zona (Lovere, Costa Volpino, Valle Camonica, Bassa Valle Seriana) più turisti del Lago d'Iseo in stagione. **Oltre il 75% arriverà da telefono.** Il sito si progetta mobile-first, punto.

---

## 4. DATI REALI DEL RISTORANTE

Questi dati sono verificati. Usali esattamente così.

| Campo | Valore |
|---|---|
| Nome | Yotto Sushi Asian Cuisine |
| Indirizzo | Via del Cantiere, 10 — 24065 Lovere (BG), Italia |
| Telefono fisso | `035 029 7470` → link `tel:+390350297470` |
| WhatsApp | `+39 352 000 6700` → link `https://wa.me/393520006700` |
| Valutazione Google | 4,6 / 5 |
| Cucina | Giapponese e cinese: sushi, sashimi, piatti caldi, cucina asiatica |

**Orari — identici tutti i giorni, lunedì compreso:**
- Pranzo: 12:00 – 15:00
- Cena: 19:00 – 23:30

**Prezzi (dal listino ufficiale del cliente):**

Pranzo, dal lunedì al venerdì
- Adulti — 16,90 €
- Bambini fino a 130 cm — 10,90 €
- Sotto i 4 anni — gratis

Pranzo, sabato / domenica / festivi
- Adulti — 23,90 €
- Bambini fino a 130 cm — 14,90 €
- Sotto i 4 anni — gratis

Cena, tutti i giorni
- Adulti — 30,90 € + 2 € coperto
- Bambini fino a 130 cm — 17,90 € + 2 € coperto
- Sotto i 4 anni — gratis

> Il coperto va scritto in chiaro, non nascosto in una nota a piè di pagina. La trasparenza sul prezzo evita recensioni negative e discussioni al tavolo.

### DA COMPLETARE — segnaposto

Questi dati non ci sono ancora. Mettili come costanti in cima al file JS, ognuna con un commento `// TODO: sostituire`, così si cambiano in un secondo:

```js
const SOCIAL = {
  instagram: "#TODO-INSTAGRAM",
  facebook:  "#TODO-FACEBOOK",
  tiktok:    "#TODO-TIKTOK",   // se non esiste, non renderizzare l'icona
};
const AZIENDA = {
  ragioneSociale: "TODO",
  partitaIva:     "TODO",
};
```

Se un valore social è ancora `#TODO-...`, l'icona corrispondente **non deve comparire**. Meglio niente che un link rotto.

---

## 5. CONTESTO COMPETITIVO (leggilo, cambia le scelte di design)

Il sito di riferimento scelto dal cliente è **https://yangsushi.it/**. Il cliente vuole quello stile: dobbiamo restare in quella famiglia visiva.

Ma va saputo che **Yang ha un locale a Costa Volpino, a 5 minuti da Lovere**: è un concorrente diretto, e costa un po' meno (pranzo feriale 15,90 €, cena 29,90 € coperto incluso).

**Conseguenza per il design:** il sito non compete sul prezzo, compete sull'esperienza. Il messaggio è *sushi con vista sul Lago d'Iseo, in un locale che sembra un ristorante di città*. Le foto devono essere grandi, scure, cinematografiche. Niente scritte tipo "conveniente", "economico", "offerta".

**Cosa prendere da Yang:** la struttura a sezioni con navigazione ad ancore, le tabelle prezzi chiare, gli orari giorno per giorno, la mappa, il blocco recensioni Google, la gallery finale, il footer ricco.

**Cosa NON prendere da Yang:** i loro testi (li riscriviamo), le loro recensioni, il menù disponibile *solo* come PDF, e la loro pesantezza (sono su WordPress + Elementor, noi facciamo statico e dobbiamo essere molto più veloci).

---

## 6. STACK TECNICO

**HTML + CSS + JavaScript puro. Nessun framework, nessun build step, nessun `npm install`.**

Il cliente finale deve poter far modificare il sito a chiunque tra dieci anni, e il proprietario del progetto non è uno sviluppatore. Un file `index.html` che si apre con doppio clic vale più di qualunque toolchain.

Regole tecniche:
- **Font self-hosted.** Scarica i `.woff2` in `assets/fonts/` e servili con `@font-face` + `font-display: swap`. Niente chiamate a `fonts.googleapis.com`: sono più lente e fanno scattare obblighi GDPR aggiuntivi.
- **Nessuna libreria esterna, nessun CDN.** Lo slider, l'accordion FAQ e il banner cookie si scrivono a mano: sono poche decine di righe ciascuno.
- **Immagini in WebP** con fallback `<img>` JPEG via `<picture>`. Genera tu le versioni WebP dai JPEG in `assets/images/` (es. con `cwebp` o Pillow) e le varianti responsive a 480 / 960 / 1920 px, usando `srcset` + `sizes`.
- `loading="lazy"` e `decoding="async"` su tutte le immagini **tranne** la prima dello slider hero, che va in `fetchpriority="high"`.
- **Sempre `width` e `height`** sugli `<img>` per evitare il layout shift.
- Il CSS in un solo `styles.css`, il JS in un solo `script.js`. Niente inline se non il critical CSS dell'hero.

Struttura file finale:

```
/
├── index.html
├── privacy-policy.html
├── cookie-policy.html
├── styles.css
├── script.js
├── robots.txt
├── sitemap.xml
├── site.webmanifest
├── favicon.ico / favicon.svg / apple-touch-icon.png
└── assets/
    ├── fonts/
    ├── images/   (già popolata, vedi sezione 12)
    └── menu/     (i PDF, vedi sezione 9)
```

**Obiettivo di performance, non negoziabile:** Lighthouse mobile ≥ 90 su Performance, Accessibility, Best Practices e SEO. Verificalo e sistemalo prima di considerare finito il lavoro.

---

## 7. DIREZIONE VISIVA

L'identità nasce dalle foto del locale, non da un template. Il locale è **scuro, lucido e riflettente**: marmo verde con venature rosa, ottone spazzolato, velluti verde bottiglia e blu polvere, e un banco di pesci in vetro azzurro sospeso al soffitto. Il logo è un serif bianco ad alto contrasto con uno yacht e due onde, su cerchio nero.

### Palette

```css
--laguna-notte:  #0A1413;  /* fondo principale — nero-verde, dal marmo scuro, NON un grigio neutro */
--verde-vetro:   #1E4F4A;  /* verde dei velluti e delle vetrate */
--marmo-chiaro:  #8FAFA4;  /* verde chiaro del marmo, per testi secondari su fondo scuro */
--ottone:        #C2963F;  /* accento principale: bordi tavoli, gambe sedie, cornici */
--ottone-luce:   #E3C77E;  /* stato hover e dettagli luminosi */
--crema:         #F4EFE6;  /* testo principale su fondo scuro */
--blu-pesce:     #2E6FD9;  /* accento raro, dai pesci di vetro — usalo pochissimo */
```

Il fondo è **scuro per quasi tutta la pagina**. Una o due sezioni (prezzi e FAQ) possono invertirsi su `--crema` per dare respiro e far riposare l'occhio. L'ottone è l'unico accento sui pulsanti: non colorare a caso.

### Tipografia

- **Titoli: Fraunces** (Google Fonts, self-hosted) — serif ad alto contrasto, si sposa con il logo. Pesi 500–700, `opsz` alto sui titoli grandi.
- **Testo: Karla** (Google Fonts, self-hosted) — grottesco leggibile e con carattere.

Regole:
- Scala tipografica fluida con `clamp()`, ma non gigantesca su mobile.
- Righe di testo sotto gli 80 caratteri.
- **Niente maiuscoletto forzato sulle etichette**, niente occhiello in ALL CAPS sopra ogni titolo, niente parola singola evidenziata in colore diverso dentro un titolo. Sono i tic dei siti generati in serie.

### Il gesto distintivo

Una sola idea forte, ripetuta: **la linea d'ottone dell'orizzonte.** Un filo sottile (1 px, `--ottone`) che riprende le onde del logo e il profilo del lago. Compare come cornice interna dell'hero, come separatore tra le sezioni, e come bordo che si illumina al passaggio del mouse sulle card dei piatti. Nient'altro deve competere con questo dettaglio.

### Movimento

- **Un solo momento orchestrato**, al caricamento: la cornice d'ottone si disegna e il logo entra in dissolvenza. Basta.
- Lo slider hero fa crossfade + zoom lentissimo (Ken Burns).
- **Vietato** il fade-up a ogni sezione durante lo scroll: è la firma dei siti fatti dall'AI.
- Rispetta sempre `prefers-reduced-motion: reduce` — con quello attivo, lo slider si ferma sulla prima immagine e le transizioni spariscono.

---

## 8. STRUTTURA DELLA PAGINA, SEZIONE PER SEZIONE

**Ordine delle sezioni nella pagina:** Hero → I nostri piatti → Il locale → Menù →
Prezzi → Orari → Dove siamo → Contatti → Recensioni → FAQ → Footer.
(La sezione "Chi siamo" è stata rimossa. I numeri 8.x qui sotto sono solo
etichette di paragrafo, non l'ordine di visualizzazione.)

### 8.1 — Hero (slideshow)

**Questa è una richiesta esplicita del cliente**, ispirata a Yang.

- Slideshow a **schermo intero** con le 4 immagini di `assets/images/hero/`, nell'ordine numerato del nome file.
- **Crossfade lento** (~1,2 s) ogni **6 secondi**, con zoom impercettibile (scale 1.0 → 1.06 nell'arco della slide).
- **ATTENZIONE — differenza chiave rispetto a Yang:** su Yang cambia anche il testo, perché ogni slide è un ristorante diverso. Qui il ristorante è uno solo, quindi **il contenuto sopra le immagini è FISSO**. Cambia solo la foto dietro. Se fai cambiare anche il testo, il visitatore pensa che ci siano più locali.
- Sopra ogni immagine, un velo scuro sfumato dal basso (`linear-gradient` da `--laguna-notte` opaco in basso a trasparente in alto), altrimenti il testo diventa illeggibile su alcune slide.
- Contenuto fisso, centrato:
  - Logo YOTTO
  - Titolo: **Sushi & Asian Cuisine sul Lago d'Iseo**
  - Riga sotto il titolo: *Menù All You Can Eat & Menù alla Carta*
  - Sottotitolo: *Lovere — Via del Cantiere 10*
  - Due pulsanti: **Prenota su WhatsApp** (pieno, ottone) e **Guarda i menù** (contorno ottone, ancora a `#menu`)
- Indicatori a puntini in basso, cliccabili, con `aria-label` sensati.
- Controlli: pausa allo `:hover` e al focus da tastiera. Gli indicatori devono essere `<button>` veri, raggiungibili con Tab.
- Su mobile: carica le varianti a 960 px, non le full-size.

### 8.2 — Barra di navigazione

- **Sticky in alto**, trasparente sull'hero, che diventa `--laguna-notte` con un filo d'ottone sotto appena si scrolla.
- Logo a sinistra, ancore al centro/destra: **Il locale · Menù · Prezzi · Orari · Dove siamo · Contatti** (stesso ordine delle sezioni nella pagina)
- A destra le icone social (vedi 8.10) e un pulsante WhatsApp compatto.
- Su mobile: menu hamburger a tutto schermo. Deve chiudersi con `Esc`, intrappolare il focus mentre è aperto, e bloccare lo scroll del body.
- Scroll fluido alle ancore con `scroll-behavior: smooth` e `scroll-margin-top` sulle sezioni pari all'altezza della barra (altrimenti i titoli finiscono sotto la nav — errore classico).

### 8.3 — Chi siamo — RIMOSSA

Sezione eliminata su richiesta del cliente. Non reintrodurla.

### 8.4 — I nostri piatti

- **Striscia a scorrimento automatico continuo (marquee)**, non una griglia statica. Le foto di `assets/images/piatti/` scorrono in orizzontale, sempre, verso **sinistra**. Il ciclo è senza stacchi (gli elementi vengono duplicati: la traccia contiene due copie identiche).
- Direzione **opposta** a quella della striscia "Il locale" (8.7): una va a sinistra, l'altra a destra.
- Nessuna didascalia: le foto parlano da sole. Al passaggio del mouse, un filo d'ottone appare sul bordo e l'immagine si scurisce leggerissimamente.
- Cliccando una foto si apre un **lightbox** semplice, scritto a mano: sfondo scuro, frecce, chiusura con `Esc` o clic fuori, navigabile da tastiera, con `aria-modal` e focus trap. Le foto sono `<button>` veri, ma i duplicati del ciclo sono `aria-hidden` e fuori dal Tab.
- **Pausa dello scorrimento** quando è vera anche solo una tra: mouse sopra la striscia, focus da tastiera dentro la striscia, lightbox aperto. Riparte solo quando nessuna delle tre è vera. All'apertura del lightbox si ferma anche la striscia dietro, così alla chiusura le foto sono ferme dov'erano.
- `prefers-reduced-motion: reduce`: lo scorrimento si ferma e le foto tornano una **griglia statica e completa**, senza scroll orizzontale.
- Alt text descrittivi e in italiano (li trovi in sezione 12).

### 8.5 — Menù *(id: `menu`)*

Quattro pulsanti-card, ognuno con nome, riga di contesto, icona download, e apertura del PDF in nuova scheda (`target="_blank" rel="noopener"`).

Genera i pulsanti da un array in `script.js`, così aggiungerne uno domani costa una riga:

```js
const MENU = [
  { file: "menu-pranzo.pdf",  nome: "Menù Pranzo",   nota: "Dal lunedì al venerdì, 12:00–15:00" },
  { file: "menu-festivo.pdf", nome: "Menù Pranzo Festivo", nota: "Sabato, domenica e festivi" },
  { file: "menu-cena.pdf",    nome: "Menù Cena",     nota: "Tutti i giorni, 19:00–23:30" },
  { file: "menu-cena.pdf",    nome: "Menù Asporto",  nota: "Stessa selezione del menù cena" },
];
```

Note importanti:
- **"Menù Cena" e "Menù Asporto" puntano di proposito allo stesso file.** Non è un errore: chi cerca l'asporto non clicca su "cena", quindi gli serve il suo pulsante. La riga di nota lo dice in modo onesto.
- I PDF veri non sono ancora arrivati. Metti dei **PDF segnaposto** in `assets/menu/` con i tre nomi esatti, così il sito funziona da subito e per aggiornarlo basterà sostituire il file mantenendo il nome.
- Sotto ai pulsanti, una riga: *"I menù possono variare. Per allergie e intolleranze chiedici pure: siamo attrezzati."*
- **Da aggiungere in futuro:** quando arriverà la lista piatti, qui va anche il menù in HTML (meglio per Google e per il mobile). Lascia un commento `<!-- TODO: menù HTML -->` nel punto giusto.

### 8.6 — Prezzi *(id: `prezzi`)*

- Sezione **su fondo chiaro** (`--crema`, testo `--laguna-notte`): è l'informazione più consultata, deve essere la più leggibile della pagina.
- Tre blocchi: **Pranzo feriale**, **Pranzo weekend e festivi**, **Cena**. Dentro ognuno: adulto, bambino fino a 130 cm, sotto i 4 anni gratis.
- Su desktop possono essere tabelle; su mobile **devono diventare card impilate**, mai tabelle che scrollano in orizzontale.
- Il **+ 2 € di coperto sulla cena** va scritto nel blocco, alla stessa dimensione degli altri numeri.
- Chiudi con il pulsante WhatsApp.

### 8.7 — Il locale

Titolo: **Dentro Yotto**. Una riga sotto: *Sala panoramica sul porto, terrazza estiva e cocktail bar.*

Le 5 foto di `assets/images/locale/` in una **striscia a scorrimento automatico continuo (marquee)**, come i piatti (8.4), ma in **direzione opposta**: questa scorre verso **destra**. Stesso ciclo senza stacchi, stesso comportamento con `prefers-reduced-motion` (si ferma e diventa una griglia statica). Qui non c'è lightbox: si mette in pausa al passaggio del mouse.

### 8.8 — Orari *(id: `orari`)*

- Lista dei sette giorni, tutti con `12:00 – 15:00 / 19:00 – 23:30`.
- **Badge dinamico "Aperto ora" / "Chiuso"** calcolato in JS sull'ora locale italiana (`Europe/Rome`). Se è chiuso, mostra quando riapre: *"Chiuso — riapre alle 19:00"*.
  - Usa `Intl.DateTimeFormat` con `timeZone: "Europe/Rome"` per non sbagliare con chi visita da un altro fuso.
  - Evidenzia il giorno corrente nella lista.
  - È un dettaglio piccolo ma è la cosa che fa dire al cliente "però, è fatto bene".

### 8.9 — Dove siamo *(id: `dove-siamo`)*

- Indirizzo completo + pulsante **Apri in Google Maps** (link `https://maps.google.com/?q=Via+del+Cantiere+10,+24065+Lovere+BG`) — questo funziona sempre, anche senza consenso cookie.
- Sotto, la mappa incorporata **caricata solo dopo consenso**: finché il consenso manca, mostra un riquadro con un'immagine statica sfocata o un fondo `--verde-vetro`, la scritta *"Carica la mappa di Google"* e una riga che spiega che il caricamento comporta una connessione ai server Google. Al clic, si inserisce l'`<iframe>` via JS.
- Badge/riquadro in risalto con icona di parcheggio e testo *"Parcheggio gratuito sotto il campo sportivo"*, vicino a indirizzo e mappa (l'informazione è utile e nella sola FAQ resterebbe nascosta in un accordion chiuso).

### 8.10 — Contatti *(id: `contatti`)*

- **WhatsApp** — pulsante grande, principale. Link `https://wa.me/393520006700?text=Ciao%20Yotto%2C%20vorrei%20prenotare%20un%20tavolo` (il messaggio precompilato aumenta parecchio le conversioni).
- **Telefono** — si mostrano **entrambi** i numeri, testo visibile esattamente `3520006700 / 0350297470`, con "/" come separatore visivo non cliccabile. Due link `tel:` separati in formato internazionale: `tel:+393520006700` e `tel:+390350297470`. Stessa cosa nel footer.
- **Indirizzo** — con link alla mappa.
- **Niente form di prenotazione.** Il cliente non vuole raccogliere richieste (né via email né altro). La prenotazione avviene solo tramite il **pulsante "Prenota su WhatsApp"** (link `wa.me` con messaggio precompilato) e il telefono. Nessun campo da compilare, nessun consenso privacy, niente Netlify Forms.
- **Icone social** — questa è una richiesta esplicita del cliente: **solo icone cliccabili, il link non si deve vedere.**
  - Icone SVG inline (Instagram, Facebook, TikTok, WhatsApp), disegnate a mano o prese da un set libero. Niente librerie di icone.
  - Ognuna dentro un `<a target="_blank" rel="noopener noreferrer">` con un `aria-label` (es. `aria-label="Yotto Sushi su Instagram"`) — l'etichetta serve ai lettori di schermo, resta invisibile a schermo.
  - Aspetto: cerchio con bordo `--ottone` sottile; all'hover si riempie di ottone e l'icona diventa `--laguna-notte`.
  - Le stesse icone vanno anche nella navbar e nel footer.

### 8.11 — Recensioni

- Riquadro con **4,6 ★** e il logo Google.
- 3–4 recensioni **reali** di Yotto, prese da Google Maps, con nome e data.
- **Finché non hai le recensioni vere, lascia un commento `<!-- TODO: recensioni reali da Google Maps -->` e la struttura vuota. Non inventare recensioni e non copiare quelle di Yang: è scorretto e, per un'attività commerciale, è anche un rischio legale.**
- Pulsante *"Leggi tutte le recensioni su Google"*.

### 8.12 — FAQ

Accordion accessibile (`<details>`/`<summary>` va benissimo, è nativo e accessibile di suo). Domande da includere:

1. **Serve prenotare?** — Consigliato, soprattutto nel weekend e in estate. Puoi scriverci su WhatsApp o chiamarci.
2. **È all you can eat?** — Sì, sia a pranzo che a cena, con ordinazioni illimitate e porzioni piccole per assaggiare di più.
3. **Quanto costa?** — Pranzo da 16,90 €, cena 30,90 € più 2 € di coperto. Tutti i prezzi nella sezione Prezzi.
4. **I bambini pagano?** — Fino a 130 cm c'è il prezzo ridotto, sotto i 4 anni non pagano.
5. **C'è la terrazza?** — Sì, aperta nella bella stagione, con vista sul lago.
6. **Si può parcheggiare?** — Sì, un parcheggio enorme gratuito sotto il campo sportivo.
7. **Fate asporto?** — *(da confermare col cliente — se sì, rimandare al menù asporto)*
8. **Ci sono piatti vegetariani?** — Sì, diverse proposte. Per allergie e intolleranze avvisa al momento dell'ordine.
9. **Accettate gruppi ed eventi?** — Sì, contattaci su WhatsApp per gruppi numerosi.

Aggiungi il markup **`FAQPage`** in JSON-LD: le domande possono comparire direttamente nei risultati di Google.

### 8.13 — Footer

Sfondo `--laguna-notte`, filo d'ottone in alto. Contiene: logo, indirizzo, telefono, WhatsApp, orari in breve, icone social, link a Privacy Policy e Cookie Policy, ragione sociale e P.IVA (dai segnaposto), e il copyright con l'anno generato in JS.

### 8.14 — Pulsante WhatsApp fisso

Su mobile, un pulsante circolare fisso in basso a destra (ottone, icona WhatsApp) che compare dopo il primo scroll. Sopra la fold non serve: c'è già il pulsante nell'hero.

---

## 9. I PDF DEI MENÙ

`assets/menu/` deve contenere **tre file** con questi nomi esatti:

```
menu-pranzo.pdf
menu-festivo.pdf
menu-cena.pdf      ← usato sia per "Cena" che per "Asporto"
```

I nomi non cambiano mai. Aggiornare un menù significa sostituire il file mantenendo il nome: nessuna modifica al codice, nessun link da cambiare.

Crea tre PDF segnaposto (una pagina, logo e la scritta "Menù in aggiornamento") così il sito è già funzionante e testabile.

---

## 10. SEO E DATI STRUTTURATI

Questa parte vale più di quanto sembri: Yang non ce l'ha, e per un ristorante locale è dove si vincono le posizioni.

**Meta tag su `index.html`:**
- `<title>` → `Yotto Sushi Lovere | All you can eat sul Lago d'Iseo`
- `<meta name="description">` → `Ristorante giapponese e asiatico all you can eat a Lovere, sul Lago d'Iseo. Sushi, sashimi e cucina asiatica. Aperto tutti i giorni a pranzo e cena. Prenota su WhatsApp.`
- Open Graph e Twitter Card completi, con `assets/images/hero/01-esterno-notte.jpg` come immagine di anteprima.
- `<html lang="it">`, canonical, favicon in tutti i formati, `theme-color` = `#0A1413`.

**JSON-LD `Restaurant`** con: `name`, `image` (array), `address` (PostalAddress completo con `postalCode: "24065"`), `telephone`, `url`, `servesCuisine: ["Giapponese","Cinese","Sushi","Asiatica"]`, `priceRange: "€€"`, `geo` con le coordinate di Via del Cantiere 10, `aggregateRating` (4.6), `hasMenu`, e `openingHoursSpecification` per tutti e sette i giorni con **due fasce ciascuno** (12:00–15:00 e 19:00–23:30).

Più il blocco **`FAQPage`** separato.

**Anche:** `robots.txt`, `sitemap.xml`, `site.webmanifest`.

---

## 11. PRIVACY, COOKIE E ACCESSIBILITÀ

### Banner cookie
Il sito è progettato per averne uno **semplice**, perché:
- I font sono self-hosted → nessuna richiesta a Google Fonts.
- Non c'è Google Analytics (se il cliente lo vorrà, si aggiungerà dietro consenso).
- L'unico elemento esterno è la **mappa Google**, che si carica solo dopo il clic.

Quindi: banner in basso con *Accetta* / *Rifiuta* / link alla Cookie Policy, scelta salvata in `localStorage`, e la mappa che si attiva solo se accettato. Rifiutare deve essere facile quanto accettare — lo richiede il GDPR.

### Pagine legali
Crea `privacy-policy.html` e `cookie-policy.html` con **la stessa impostazione grafica del sito** e con il testo tra segnaposto chiari.

> **Nota per chi consegna il lavoro:** il testo delle policy va scritto da chi ha competenza legale, o generato con un servizio tipo Iubenda, o fornito dal commercialista del cliente. Non inventare testo legale.

### Accessibilità (target: Lighthouse ≥ 95)
- Contrasto minimo 4,5:1 su tutto il testo. **Attenzione all'ottone su fondo scuro:** verifica ogni combinazione e, se serve, usa `--ottone-luce` per il testo piccolo.
- Focus visibile e ben marcato su ogni elemento interattivo — su fondo scuro serve un outline evidente.
- HTML semantico: `<header> <nav> <main> <section> <footer>`, un solo `<h1>`, gerarchia dei titoli senza salti.
- Link "Salta al contenuto" come primo elemento focusabile.
- Alt text su tutte le immagini di contenuto; `alt=""` su quelle puramente decorative.
- Tutto navigabile da tastiera: slider, lightbox, menu mobile, accordion, banner cookie.

---

## 12. LE FOTO — INVENTARIO E ALT TEXT

Tutte le foto sono già in `assets/images/`. Sono quadrate (1080×1080 circa) tranne dove indicato. Vanno convertite in WebP e ritagliate dove serve.

### `hero/` — slideshow, in quest'ordine
| File | Contenuto | Alt text |
|---|---|---|
| `01-esterno-notte.jpg` *(1600×1213, orizzontale)* | Facciata illuminata di sera, vetrate curve, terrazza sopra | `L'esterno di Yotto Sushi illuminato di sera, con la terrazza al piano superiore` |
| `02-sala-panoramica-lago.jpg` | Sala con vetrate sul porto e i pesci di vetro | `La sala panoramica di Yotto con vista sul porto di Lovere` |
| `03-sala-pesci-vetro.jpg` | Installazione di pesci in vetro azzurro, divani verdi | `L'installazione di pesci in vetro sospesa sul soffitto della sala` |
| `04-terrazza-verde.jpg` | Piano superiore, tavolo tondo in marmo, verde, insegna YOTTO | `Il piano superiore di Yotto con tavolo tondo in marmo e piante` |

### `locale/` — sezione "Dentro Yotto" (5 foto)
`esterno-notte.jpg` · `sala-panoramica-lago.jpg` · `sala-pesci-vetro.jpg` · `sala-neon-blu.jpg` (sala con pannelli al neon blu) · `terrazza-verde.jpg`

Alt per la neon blu: `La sala di Yotto con pannelli luminosi blu e arredi in velluto`

### `piatti/` — galleria (10 foto)
| File | Alt text |
|---|---|
| `tataki-tonno-01.jpg` | `Tataki di tonno con granella di pistacchio e salsa al mango` |
| `tataki-tonno-02.jpg` | `Tataki di tonno servito su piatto scuro con salse` |
| `carpaccio-agrumi.jpg` | `Carpaccio di pesce marinato con agrumi` |
| `sashimi-ghiaccio-secco.jpg` | `Sashimi di tonno servito con ghiaccio secco` |
| `sashimi-tonno-ghiaccio.jpg` | `Sashimi di tonno su letto di ghiaccio con decorazione dorata` |
| `uramaki-fritto.jpg` | `Uramaki fritto con tonno e salsa teriyaki` |
| `tacos-salmone-pistacchio.jpg` | `Tacos di salmone con granella di pistacchio su piatto dorato` |
| `roll-salmone-caviale.jpg` *(verticale)* | `Roll di salmone con uova di pesce e salsa al mango` |
| `onigiri-lime.jpg` | `Onigiri con semi di sesamo e lime essiccato` |
| `nigiri-salmone-scottato.jpg` | `Nigiri di salmone scottato con salse al mango e teriyaki` |

### `brand/` — logo già lavorato, pronto all'uso

Il logo è stato ritagliato dalla foto originale, ripulito dagli artefatti JPEG, portato a 2884 px e **vettorializzato**. Non serve rifare nulla.

| File | Quando usarlo |
|---|---|
| **`logo-yotto.svg`** | **Da preferire sempre.** Solo il segno, colore ereditato via `fill="currentColor"`: basta impostare `color` in CSS e diventa crema, ottone o scuro a seconda del contesto. 13 KB, nitido a qualsiasi dimensione. |
| `logo-yotto-cerchio.svg` | Il segno dentro il disco scuro. Per il footer o dove serve il marchio completo. |
| `logo-yotto-crema.png` | PNG 2884×2884, segno in `--crema` su trasparente. Fallback e Open Graph. |
| `logo-yotto-scuro.png` | Stesso segno in `--laguna-notte`, per le sezioni su fondo chiaro. |
| `logo-yotto-cerchio.png` | Disco scuro con il segno, fuori trasparente. |
| `icona-512 / 192 / 180 / 64 / 32 / 16.png` | Favicon, `apple-touch-icon` e icone del webmanifest. Già pronte. |
| `favicon.ico` | Multi-dimensione 16/32/48. |
| `logo-yotto-ORIGINALE.jpg` | Solo archivio. **Non usare sul sito.** |

Nell'hero e nella navbar usa **l'SVG**, non il PNG.

> Il logo di partenza era una foto a bassa risoluzione, quindi il tracciato vettoriale è una ricostruzione fedele ma non il file originale dello studio grafico. Se un giorno il cliente recupera l'originale, sostituirlo è banale: stessi nomi file.

### `riferimenti/`
`listino-prezzi-cliente.jpg` — **non va sul sito.** È la foto del listino ufficiale, serve solo per verificare che i numeri della sezione Prezzi siano giusti.

---

## 13. COME PROCEDERE

1. Leggi tutto il brief e i file in `assets/`.
2. **Prima di scrivere codice**, proponi il piano di design: token di colore, scala tipografica, wireframe testuale delle sezioni. Fermati e fallo approvare.
3. Costruisci l'HTML semantico completo con i contenuti reali (niente lorem ipsum: i testi sono in questo brief).
4. Poi il CSS, mobile-first.
5. Poi il JS: slider, navbar, lightbox, orari dinamici, FAQ, banner cookie, mappa on-consent, strisce foto (marquee).
6. Ottimizza le immagini (WebP + `srcset`), genera favicon e manifest.
7. Aggiungi SEO e JSON-LD.
8. **Verifica:** Lighthouse mobile su tutte e quattro le voci, navigazione con la sola tastiera, contrasti, e prova a 360 px, 768 px, 1440 px di larghezza.
9. Scrivi un `README.md` che spieghi, in italiano e per non tecnici: come sostituire un PDF del menù, come cambiare orari e prezzi, come inserire i link social, come aggiungere una foto.

## 14. CRITERI DI ACCETTAZIONE

- [ ] Slideshow hero con 4 immagini, crossfade, **testo fisso**
- [ ] Navbar sticky con ancore funzionanti e menu mobile accessibile
- [ ] 4 pulsanti menù → 3 PDF (cena e asporto condividono il file)
- [ ] Prezzi corretti, coperto di 2 € ben visibile
- [ ] Badge "Aperto ora / Chiuso" funzionante su fuso `Europe/Rome`
- [ ] Mappa caricata solo dopo consenso; pulsante "Apri in Google Maps" sempre attivo
- [ ] Icone social cliccabili senza link visibili, nascoste se il link è ancora un TODO
- [ ] Nessun form di prenotazione: solo pulsante "Prenota su WhatsApp" (link precompilato) e telefono
- [ ] JSON-LD `Restaurant` + `FAQPage` validi
- [ ] Privacy e Cookie policy create, coerenti nella grafica
- [ ] Lighthouse mobile ≥ 90 su tutte e quattro le metriche
- [ ] Tutto usabile con la sola tastiera
- [ ] Nessun font, script o CDN esterno
- [ ] Nessuna recensione inventata
- [ ] `README.md` in italiano per il cliente

---

## 15. COSA MANCA ANCORA (da chiedere al cliente)

| Elemento | Serve per |
|---|---|
| I 3 PDF dei menù | Sezione menù |
| *(Logo: già risolto — vedi sezione 12)* | — |
| Link Instagram, Facebook, TikTok | Icone social |
| Ragione sociale e P.IVA | Footer, privacy |
| Conferma: fanno asporto/delivery? | FAQ, menù asporto |
| Testo delle policy legali | Pagine legali |
| Il dominio (es. `yottosushi.it`) | Deploy |

Il sito va costruito **comunque**, con i segnaposto ben evidenziati. Nessuno di questi punti deve bloccare il lavoro.
