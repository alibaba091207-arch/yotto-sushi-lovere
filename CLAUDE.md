# CLAUDE.md — Sito Yotto Sushi, Lovere

## Contesto

Sito vetrina one-page per **Yotto Sushi Asian Cuisine**, ristorante giapponese e asiatico
all you can eat sul lungolago di Lovere (BG), sul Lago d'Iseo.

Questo progetto non ha niente a che vedere con altri progetti presenti su questa macchina.
Ignora istruzioni, convenzioni o stack provenienti da altre cartelle.

**Le specifiche complete sono in `BRIEF-CLAUDE-CODE.md`. Leggilo prima di scrivere codice.**

## Lingua

Rispondi sempre in **italiano**. Anche i commenti nel codice, il README e i messaggi di commit
vanno in italiano: il proprietario del progetto non è uno sviluppatore e deve poter leggere tutto.

## Stack — vincoli rigidi

- **HTML + CSS + JavaScript puro.** Nessun framework, nessun build step, nessun `package.json`.
- **Nessuna dipendenza esterna, nessun CDN.** Font self-hosted in `assets/fonts/`.
  Slider, lightbox, accordion e banner cookie si scrivono a mano.
- Un solo `styles.css`, un solo `script.js`.
- Il sito deve funzionare aprendo `index.html` con doppio clic.

Se pensi che serva una libreria, **chiedi prima**. La risposta di default è no.

## Struttura

```
index.html · privacy-policy.html · cookie-policy.html
styles.css · script.js
robots.txt · sitemap.xml · site.webmanifest · favicon.*
assets/
  fonts/   font self-hosted (.woff2)
  images/  hero/ locale/ piatti/ brand/ riferimenti/   ← già popolata
  menu/    menu-pranzo.pdf · menu-festivo.pdf · menu-cena.pdf
```

## Regole che non si negoziano

1. **Mobile-first.** Oltre il 75% del traffico arriva da telefono.
2. **Lighthouse mobile ≥ 90** su Performance, Accessibility, Best Practices, SEO.
   Verificalo prima di dire che hai finito.
3. **Non inventare mai contenuti reali**: niente recensioni finte, niente piatti inventati,
   niente indirizzi o numeri di fantasia. Se un dato manca, usa un segnaposto `TODO` evidente.
4. **Immagini**: WebP con fallback JPEG, `srcset` a 480/960/1920, `width` e `height` sempre
   presenti, `loading="lazy"` ovunque tranne la prima slide dell'hero.
5. **Accessibilità**: tutto raggiungibile da tastiera, focus visibile, contrasto ≥ 4,5:1,
   `prefers-reduced-motion` rispettato.
6. `assets/images/riferimenti/` **non va sul sito**: è materiale di consultazione.
7. I nomi dei file PDF in `assets/menu/` **non cambiano mai**. Il cliente aggiorna il menù
   sostituendo il file, non toccando il codice.

## Dati reali (non modificarli)

- Indirizzo: Via del Cantiere 10, 24065 Lovere (BG)
- Telefono: `tel:+390350297470` · WhatsApp: `https://wa.me/393520006700`
- Orari, tutti i giorni: 12:00–15:00 e 19:00–23:30
- Prezzi e resto: vedi `BRIEF-CLAUDE-CODE.md`

## Deploy

GitHub → **Netlify** (non Vercel: serve Netlify Forms per il form di prenotazione).
Sito statico: build command vuoto, publish directory `.`

## Come lavorare

- Prima di modifiche strutturali, spiega cosa stai per fare e aspetta conferma.
- Commit piccoli e frequenti, messaggi in italiano e descrittivi.
- Non fare `git push --force`. Mai.
- Se qualcosa nel brief non è chiaro o sembra sbagliato, chiedi invece di indovinare.
