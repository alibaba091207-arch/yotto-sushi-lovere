# Sito Yotto Sushi — guida per chi lo gestisce

Sito vetrina di **Yotto Sushi Asian Cuisine**, Lovere (BG).
È fatto di semplici file HTML, CSS e JavaScript: **nessun programma da installare**,
nessuna build. Si può aprire `index.html` con un doppio clic per vederlo.

Questa guida spiega, senza tecnicismi, come fare le modifiche più comuni.
Quasi tutto si fa da **github.com**, dal browser, anche dal telefono. Dopo ogni
modifica salvata su GitHub, il sito online si aggiorna da solo in circa mezzo minuto
(ci pensa Netlify).

---

## 1. Aggiornare un menù (PDF)

I menù sono 3 file dentro la cartella `assets/menu/`:

| File | A cosa serve |
|---|---|
| `menu-pranzo.pdf`  | Menù Pranzo (lun–ven) |
| `menu-festivo.pdf` | Menù Pranzo Festivo (sab, dom e festivi) |
| `menu-cena.pdf`    | Menù Cena **e** Menù Asporto (stesso file) |

**I nomi non vanno mai cambiati.** Per aggiornare un menù:

1. Su **github.com**, apri il repository del sito.
2. Entra in `assets` → `menu`.
3. **Add file** → **Upload files**.
4. Trascina il PDF nuovo, **rinominato esattamente come quello vecchio**.
5. In fondo, **Commit changes**.

Fatto. Non serve toccare il codice: i pulsanti sul sito puntano sempre a quei nomi.

> I file attualmente presenti sono **segnaposto** ("Menù in aggiornamento"):
> vanno sostituiti con i PDF veri appena disponibili.

---

## 2. Cambiare orari o prezzi

### Prezzi
Si modificano nel file **`index.html`**, nella sezione con `id="prezzi"`.
Cerca il numero da cambiare (es. `16,90 €`) e sostituiscilo. I prezzi compaiono
anche nella sezione **FAQ** ("Quanto costa?") e nei dati per Google in cima al file
(`application/ld+json`): aggiorna anche lì se cambia il prezzo di partenza.

### Orari
Se cambiano gli orari di apertura servono **due** modifiche, entrambe semplici:

1. In **`index.html`**, sezione `id="orari"`: cambia il testo degli orari nella lista
   dei sette giorni.
2. In **`script.js`**, in cima, nel blocco `FASCE_ORARIE`: cambia gli orari lì, così
   il badge "Aperto ora / Chiuso" resta corretto.

```js
const FASCE_ORARIE = [
  { apre: "12:00", chiude: "15:00" },
  { apre: "19:00", chiude: "23:30" },
];
```

---

## 3. Inserire i link ai social (Instagram, Facebook, TikTok)

Apri **`script.js`**, in cima trovi:

```js
const SOCIAL = {
  instagram: "#TODO-INSTAGRAM",
  facebook:  "#TODO-FACEBOOK",
  tiktok:    "#TODO-TIKTOK",
};
```

Sostituisci il testo tra virgolette con l'indirizzo completo del profilo, per esempio:

```js
const SOCIAL = {
  instagram: "https://www.instagram.com/yottosushi",
  facebook:  "https://www.facebook.com/yottosushi",
  tiktok:    "#TODO-TIKTOK",
};
```

**Regola:** finché un valore resta `#TODO-...`, l'icona di quel social **non compare**
da nessuna parte (meglio niente che un link che non porta a niente).
Le icone appaiono automaticamente nella navbar, nella sezione Contatti e nel footer.

---

## 4. Ragione sociale e Partita IVA (footer)

Apri **`script.js`**, blocco `AZIENDA`:

```js
const AZIENDA = {
  ragioneSociale: "TODO",
  partitaIva:     "TODO",
};
```

Inserisci i dati reali. Compariranno in fondo alla pagina.

---

## 5. Aggiungere o cambiare una foto

Le foto stanno in `assets/images/`, divise per cartella:
`hero/` (slideshow), `piatti/`, `locale/`, `brand/` (loghi).

Le foto sul sito vengono usate in più formati (per essere leggere sul telefono).
Questi formati vengono generati da uno script. Quindi, per **cambiare o aggiungere**
una foto conviene **chiedere a chi ha costruito il sito** (o a Claude Code):

> "Sostituisci la foto `piatti/uramaki-fritto.jpg` con questa nuova e rigenera le versioni."

Se invece vuoi solo **sostituire** una foto esistente mantenendo lo stesso nome, e
non ti preoccupa che sia un po' più pesante sul telefono, puoi caricarla su GitHub
al posto della vecchia (stesso nome, stessa cartella). Le versioni ottimizzate però
resteranno quelle vecchie finché non vengono rigenerate.

La cartella `assets/images/riferimenti/` **non compare sul sito**: è solo materiale
di consultazione (la foto del listino prezzi).

---

## 6. Cose ancora da completare prima di considerarlo "finito"

- [ ] I 3 PDF veri dei menù (ora sono segnaposto)
- [ ] Link Instagram / Facebook / TikTok (in `script.js`)
- [ ] Ragione sociale e P.IVA (in `script.js`)
- [ ] Testo di **Privacy Policy** e **Cookie Policy** (file `privacy-policy.html` e
      `cookie-policy.html`): vanno scritti da un consulente o generati con un
      servizio tipo Iubenda. Nei file ci sono i punti segnati con `TODO`.
- [ ] Recensioni reali da Google Maps (sezione "Cosa dicono di noi" in `index.html`,
      cerca `TODO: recensioni reali`). **Non inventare recensioni.**
- [ ] Coordinate della mappa per i dati Google (cerca `TODO` con la parola `geo`
      in `index.html`)
- [ ] Conferma dal cliente: fanno asporto/delivery? (cerca i commenti `VERIFICARE` nei file)
- [ ] Quando ci sarà il dominio vero (es. `www.yottosushi.it`), sostituirlo in:
      `index.html`, `sitemap.xml`, `robots.txt`, `site.webmanifest`

---

## 7. Le prenotazioni

**Non c'è un modulo da compilare.** Nella sezione Contatti c'è il pulsante
**Prenota su WhatsApp**: apre la chat di WhatsApp del ristorante con un messaggio
già pronto ("Ciao Yotto, vorrei prenotare un tavolo"). La prenotazione si
gestisce lì, oppure al telefono.

Non c'è niente da attivare o configurare. Se un domani servisse un modulo con
i dati (data, persone…) o ricevere le richieste via email, chiedilo a chi ha
costruito il sito.

---

## 8. Struttura dei file (per riferimento)

```
index.html            la pagina principale (tutti i contenuti)
privacy-policy.html    pagina Privacy
cookie-policy.html     pagina Cookie
styles.css            tutto l'aspetto grafico
script.js             slideshow, menu mobile, orari, mappa, strisce foto...  (con i dati da compilare in cima)
netlify.toml          impostazioni di pubblicazione
robots.txt · sitemap.xml · site.webmanifest · favicon.ico
_ottimizza-immagini.py  script per rigenerare le versioni leggere delle foto
assets/
  fonts/   i caratteri tipografici (Fraunces, Karla)
  images/  le foto
  menu/    i PDF dei menù
```

---

## 9. Per modifiche più grosse

Apri **Claude Code** nella cartella del progetto e spiega a voce cosa vuoi,
in italiano. Esempi:

- "Il logo nell'hero è troppo grande sul telefono, riducilo."
- "Aggiungi una sezione 'Cocktail bar' dopo 'Il locale'."
- "Le recensioni sono arrivate, eccole: [testo]. Inseriscile."

Poi, per pubblicare:

```
Fai il commit e il push delle modifiche
```
