/* =============================================================
   YOTTO SUSHI — script.js
   JavaScript puro, nessuna libreria. Tutto commentato in italiano.

   DATI DA COMPLETARE: vedi il blocco "CONFIGURAZIONE" qui sotto.
   Ogni voce con "TODO" va sostituita con il dato reale.
   ============================================================= */

"use strict";

/* -------------------------------------------------------------
   CONFIGURAZIONE — le cose che il cliente cambierà nel tempo
   ------------------------------------------------------------- */

// Link ai profili social. Se un valore resta "#TODO-...", l'icona NON viene mostrata.
const SOCIAL = {
  instagram: "https://www.instagram.com/yottosushilovere",
  facebook:  "#TODO-FACEBOOK",
  tiktok:    "#TODO-TIKTOK",
};

// Dati dell'azienda per il footer (obbligo di legge).
const AZIENDA = {
  ragioneSociale: "TODO",   // TODO: sostituire con la ragione sociale reale
  partitaIva:     "TODO",   // TODO: sostituire con la P.IVA reale
};

// Contatti (già reali e verificati — di norma non si toccano).
const WHATSAPP_URL = "https://wa.me/393520006700?text=Ciao%20Yotto%2C%20vorrei%20prenotare%20un%20tavolo";

// I pulsanti del menù. Aggiungerne uno = aggiungere una riga.
// NB: "Cena" e "Asporto" puntano di proposito allo stesso PDF.
const MENU = [
  { file: "menu-pranzo.pdf",  nome: "Menù Pranzo",  nota: "Dal lunedì al venerdì, 12:00–15:00" },
  { file: "menu-festivo.pdf", nome: "Menù Pranzo Festivo", nota: "Sabato, domenica e festivi" },
  { file: "menu-cena.pdf",    nome: "Menù Cena",    nota: "Tutti i giorni, 19:00–23:30" },
  { file: "menu-cena.pdf",    nome: "Menù Asporto", nota: "Stessa selezione del menù cena" },
];

// Orari di apertura, uguali tutti i giorni. Formato 24h "HH:MM".
// Per cambiarli basta modificare qui (e la lista nell'HTML della sezione Orari).
const FASCE_ORARIE = [
  { apre: "12:00", chiude: "15:00" },
  { apre: "19:00", chiude: "23:30" },
];

// Indirizzo per l'iframe della mappa (caricato solo dopo consenso).
const MAPPA_EMBED_SRC =
  "https://www.google.com/maps?q=Via%20del%20Cantiere%2010%2C%2024065%20Lovere%20BG&output=embed";

const CHIAVE_CONSENSO = "yotto-consenso-cookie"; // "accettato" | "rifiutato"


/* -------------------------------------------------------------
   Utilità piccole
   ------------------------------------------------------------- */
const $  = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// La classe "js" sull'<html> è già impostata da uno script inline nell'head
// (così non c'è nessun lampeggìo prima che parta questo file).
document.body.classList.remove("no-js");


/* -------------------------------------------------------------
   1. ANNO NEL FOOTER + dati azienda
   ------------------------------------------------------------- */
function initFooter() {
  const anno = $("[data-anno]");
  if (anno) anno.textContent = new Date().getFullYear();

  const az = $("[data-footer-azienda]");
  if (az) {
    if (AZIENDA.ragioneSociale !== "TODO" || AZIENDA.partitaIva !== "TODO") {
      az.textContent = `${AZIENDA.ragioneSociale} — P.IVA ${AZIENDA.partitaIva}`;
    }
    // se sono ancora TODO lascia il testo segnaposto già presente nell'HTML
  }
}


/* -------------------------------------------------------------
   2. ICONE SOCIAL — generate solo se il link è reale
   ------------------------------------------------------------- */
const SVG_SOCIAL = {
  instagram: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2.2c3.2 0 3.6 0 4.9.07 1.2.06 1.8.25 2.2.42.6.2 1 .48 1.4.9.42.4.7.8.9 1.4.17.4.36 1 .42 2.2.06 1.3.07 1.7.07 4.9s0 3.6-.07 4.9c-.06 1.2-.25 1.8-.42 2.2-.2.6-.48 1-.9 1.4-.4.42-.8.7-1.4.9-.4.17-1 .36-2.2.42-1.3.06-1.7.07-4.9.07s-3.6 0-4.9-.07c-1.2-.06-1.8-.25-2.2-.42-.6-.2-1-.48-1.4-.9-.42-.4-.7-.8-.9-1.4-.17-.4-.36-1-.42-2.2C2.21 15.6 2.2 15.2 2.2 12s0-3.6.07-4.9c.06-1.2.25-1.8.42-2.2.2-.6.48-1 .9-1.4.4-.42.8-.7 1.4-.9.4-.17 1-.36 2.2-.42C8.4 2.21 8.8 2.2 12 2.2Zm0 1.8c-3.14 0-3.5.01-4.74.07-.9.04-1.4.2-1.72.32-.43.17-.74.37-1.06.7-.32.31-.52.62-.7 1.05-.12.33-.28.83-.32 1.73-.06 1.23-.07 1.6-.07 4.73s.01 3.5.07 4.74c.04.9.2 1.4.32 1.72.17.43.37.74.7 1.06.31.32.62.52 1.05.7.33.12.83.28 1.73.32 1.23.06 1.6.07 4.73.07s3.5-.01 4.74-.07c.9-.04 1.4-.2 1.72-.32.43-.17.74-.37 1.06-.7.32-.31.52-.62.7-1.05.12-.33.28-.83.32-1.73.06-1.23.07-1.6.07-4.73s-.01-3.5-.07-4.74c-.04-.9-.2-1.4-.32-1.72a2.9 2.9 0 0 0-.7-1.06 2.9 2.9 0 0 0-1.05-.7c-.33-.12-.83-.28-1.73-.32C15.5 4.01 15.14 4 12 4Zm0 3.06A4.94 4.94 0 1 1 12 17a4.94 4.94 0 0 1 0-9.94Zm0 1.8a3.14 3.14 0 1 0 0 6.28 3.14 3.14 0 0 0 0-6.28Zm5.15-3.2a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3Z"/></svg>',
  facebook:  '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5H17V3.6c-.3-.04-1.3-.13-2.46-.13-2.43 0-4.1 1.49-4.1 4.22v2.35H7.6V13h2.84v8h3.06Z"/></svg>',
  tiktok:    '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M16.5 3c.3 2.1 1.5 3.4 3.5 3.6v2.4c-1.2.1-2.3-.3-3.5-1v6.3c0 3.4-2.6 5.7-5.8 5.7-2.9 0-5.2-2.1-5.2-5s2.4-5.1 5.6-4.8v2.5c-.4-.1-.8-.2-1.2-.2-1.4 0-2.5 1.1-2.5 2.5s1 2.5 2.4 2.5c1.5 0 2.6-1.1 2.6-2.8V3h2.6Z"/></svg>',
};
const NOME_SOCIAL = { instagram: "Instagram", facebook: "Facebook", tiktok: "TikTok" };

function initSocial() {
  const contenitori = $$("[data-social]");
  if (!contenitori.length) return;

  const voci = Object.entries(SOCIAL)
    .filter(([, url]) => url && !url.startsWith("#TODO"));

  contenitori.forEach((ul) => {
    ul.innerHTML = "";
    if (!voci.length) { ul.hidden = true; return; }
    ul.hidden = false;
    voci.forEach(([rete, url]) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.setAttribute("aria-label", `Yotto Sushi su ${NOME_SOCIAL[rete] || rete}`);
      a.innerHTML = SVG_SOCIAL[rete] || "";
      li.appendChild(a);
      ul.appendChild(li);
    });
  });

  // Blocco "Seguici" nel footer: si mostra solo se c'è almeno un social reale.
  $$("[data-seguici]").forEach((b) => { b.hidden = !voci.length; });
}


/* -------------------------------------------------------------
   3. PULSANTI MENÙ — generati dall'array MENU
   ------------------------------------------------------------- */
function initMenu() {
  const ul = $("[data-menu-lista]");
  if (!ul) return;
  const icona = '<svg class="menu__card-ico" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 3v10.6l3.3-3.3 1.4 1.4L12 17.4l-4.7-4.7 1.4-1.4L12 13.6V3h0Zm-7 15h14v2H5v-2Z"/></svg>';
  ul.innerHTML = "";
  MENU.forEach((m) => {
    const li = document.createElement("li");
    li.innerHTML =
      `<a class="menu__card" href="/assets/menu/${m.file}" target="_blank" rel="noopener">
         <span class="menu__card-testo"><strong>${m.nome}</strong><span>${m.nota}</span></span>
         ${icona}
       </a>`;
    ul.appendChild(li);
  });
}


/* -------------------------------------------------------------
   3-bis. STRISCE A SCORRIMENTO — piatti e "il locale"
   Due strisce orizzontali che scorrono da sole in versi opposti
   (piatti verso sinistra, locale verso destra) MA che si possono
   anche scorrere a mano: swipe sul telefono, drag col mouse,
   scroll orizzontale con trackpad/rotellina, frecce da tastiera.

   Come funziona:
   - Il contenitore .marquee ha overflow-x scrollabile (scrollbar
     nascosta via CSS). Swipe, trackpad e frecce funzionano nativi.
   - Lo scorrimento automatico è in JS: un requestAnimationFrame che
     incrementa/decrementa scrollLeft. Così si può "afferrare" a metà.
   - Loop infinito invisibile: gli elementi vengono duplicati più volte;
     quando scrollLeft esce dall'intervallo di una serie viene riportato
     indietro (o avanti) di una serie esatta, su contenuto identico:
     lo stacco non si vede.
   - Pause che si sommano: mouse sopra, focus da tastiera dentro,
     lightbox aperto, e interazione di trascinamento/scroll in corso
     (+ ~2 s di inattività dopo). Riprende SOLO se nessuna è attiva,
     e riprende da dove si trova.
   - Il clic su una foto apre il lightbox, ma NON se era un drag
     (spostamento del puntatore > ~5 px): vedi mq.gestoEraDrag().
   - prefers-reduced-motion: niente scorrimento automatico (niente
     cloni, niente rAF), lo scorrimento manuale resta disponibile.
   ------------------------------------------------------------- */
function initMarquee() {
  const strisce = $$("[data-marquee]");
  if (!strisce.length) return;

  const menoMovimento = prefersReducedMotion();
  const SOGLIA_DRAG = 5;      // px oltre i quali un press diventa "drag", non "click"
  const ATTESA_RIPRESA = 2000; // ms di inattività prima che riparta l'automatico

  strisce.forEach((mq) => {
    const track = $("[data-marquee-track]", mq);
    if (!track) return;
    const originali = Array.from(track.children);
    if (!originali.length) return;

    // indice stabile su ogni <li> (il lightbox lo usa per ritrovare la foto
    // giusta anche quando si clicca su un clone)
    originali.forEach((el, i) => { el.dataset.marqueeIndice = String(i); });

    // il contenitore riceve il focus: così le frecce da tastiera lo scrollano
    if (!mq.hasAttribute("tabindex")) mq.tabIndex = 0;

    /* ---- distinzione drag / click (serve sempre, anche con reduced-motion) ---- */
    let puntatoreGiu = false;
    let mossoOltreSoglia = false;
    let trascinandoMouse = false;
    let startX = 0, ultimoX = 0;

    mq.gestoEraDrag = () => mossoOltreSoglia;

    mq.addEventListener("pointerdown", (e) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      puntatoreGiu = true;
      mossoOltreSoglia = false;
      startX = ultimoX = e.clientX;
      segnalaInterazione();
      // per il mouse gestiamo noi il drag; touch/pen usano lo scroll nativo
      if (e.pointerType === "mouse") {
        trascinandoMouse = true;
        mq.classList.add("is-trascinando");
        try { mq.setPointerCapture(e.pointerId); } catch (_) {}
      }
    });
    mq.addEventListener("pointermove", (e) => {
      if (!puntatoreGiu) return;
      if (Math.abs(e.clientX - startX) > SOGLIA_DRAG) mossoOltreSoglia = true;
      segnalaInterazione();
      if (trascinandoMouse) {
        mq.scrollLeft -= (e.clientX - ultimoX);
        ultimoX = e.clientX;
      }
    });
    const finePress = (e) => {
      puntatoreGiu = false;
      if (trascinandoMouse) {
        trascinandoMouse = false;
        mq.classList.remove("is-trascinando");
        try { mq.releasePointerCapture(e.pointerId); } catch (_) {}
      }
      segnalaInterazione(); // fa partire il conteggio dei ~2 s
    };
    mq.addEventListener("pointerup", finePress);
    mq.addEventListener("pointercancel", finePress);
    mq.addEventListener("dragstart", (e) => e.preventDefault()); // niente "fantasma" dell'immagine

    /* ---------------- da qui in poi: solo scorrimento automatico ---------------- */
    // segnalaInterazione va definita anche se usciamo subito (reduced-motion)
    let cond = { hover: false, focus: false, lightbox: false, interazione: false };
    let timerRipresa = null;
    function segnalaInterazione() {
      cond.interazione = true;
      if (timerRipresa) clearTimeout(timerRipresa);
      timerRipresa = setTimeout(() => { cond.interazione = false; }, ATTESA_RIPRESA);
    }

    if (menoMovimento) {
      mq.pausaPerLightbox = () => {};   // no-op: non c'è nulla da mettere in pausa
      return;                           // niente cloni, niente rAF
    }

    // Quante copie servono perché il "salto" del loop non tocchi mai i bordi
    // dello scroll. Stima prudente con la foto più stretta (15rem) e la
    // larghezza massima possibile della finestra.
    const larghezzaMax = (window.screen && window.screen.width) || window.innerWidth;
    const serieStretta = originali.length * (15 * 16 + 16);
    const nCopie = Math.min(8, Math.max(3, Math.ceil(larghezzaMax / serieStretta) + 2));
    for (let c = 0; c < nCopie; c++) {
      originali.forEach((el) => {
        const clone = el.cloneNode(true);
        clone.classList.add("is-clone");
        clone.setAttribute("aria-hidden", "true");
        $$('a, button, input, textarea, select, [tabindex]', clone)
          .forEach((f) => f.setAttribute("tabindex", "-1"));
        track.appendChild(clone);
      });
    }

    // Larghezza di UNA serie = n foto + il loro stacco (margine destro).
    const misuraSerie = () => {
      let w = 0;
      originali.forEach((el) => {
        const cs = getComputedStyle(el);
        w += el.getBoundingClientRect().width +
             parseFloat(cs.marginRight || cs.marginInlineEnd || "0");
      });
      return w;
    };
    let seriesW = misuraSerie();
    if (!seriesW) { mq.pausaPerLightbox = () => {}; return; }

    const segno = mq.dataset.marqueeDir === "dx" ? -1 : 1;
    let velocita = seriesW / (originali.length * 4.5); // px/s (~4,5 s a foto)

    // Partenza: chi va a sinistra (sx) parte dall'inizio della 2ª serie e sale;
    // chi va a destra (dx) parte dalla fine della 2ª serie e scende. Così
    // entrambi hanno una serie intera di margine prima del primo riavvolgimento.
    let pos = segno > 0 ? seriesW : (2 * seriesW - 2);
    let atteso = pos;
    mq.scrollLeft = pos;

    /* --- pause --- */
    const scorreDaSolo = () =>
      !cond.hover && !cond.focus && !cond.lightbox && !cond.interazione;

    mq.pausaPerLightbox = (aperto) => { cond.lightbox = !!aperto; };

    mq.addEventListener("mouseenter", () => { cond.hover = true; });
    mq.addEventListener("mouseleave", () => { cond.hover = false; });
    mq.addEventListener("focusin",  () => { cond.focus = true; });
    mq.addEventListener("focusout", () => { cond.focus = false; });
    mq.addEventListener("keydown", (e) => {
      if (/^Arrow|^Page|^Home$|^End$/.test(e.key)) segnalaInterazione();
    });
    // scroll orizzontale con trackpad / rotellina (anche Shift+rotellina)
    mq.addEventListener("wheel", (e) => {
      if (e.deltaX !== 0 || e.shiftKey) segnalaInterazione();
    }, { passive: true });

    /* --- loop invisibile: riporta scrollLeft nell'intervallo [seriesW, 2·seriesW),
       su contenuto identico, così lo stacco non si vede. Si fa solo quando lo
       scorrimento manuale si è fermato (~120 ms), per non spezzare lo slancio. --- */
    function normalizza() {
      const s = mq.scrollLeft;
      if (s >= 2 * seriesW || s < seriesW) {
        mq.scrollLeft = seriesW + (((s - seriesW) % seriesW) + seriesW) % seriesW;
      }
      pos = mq.scrollLeft;
      atteso = mq.scrollLeft;
    }
    let tNorm = null;
    mq.addEventListener("scroll", () => {
      if (Math.abs(mq.scrollLeft - atteso) > 2) segnalaInterazione();
      if (scorreDaSolo()) { atteso = mq.scrollLeft; return; }
      pos = mq.scrollLeft;
      if (tNorm) clearTimeout(tNorm);
      tNorm = setTimeout(normalizza, 120);
    }, { passive: true });

    /* --- motore dello scorrimento automatico --- */
    let ultimoT = null;
    function tick(t) {
      const dt = ultimoT == null ? 0 : Math.min((t - ultimoT) / 1000, 0.1);
      ultimoT = t;
      if (scorreDaSolo()) {
        pos += segno * velocita * dt;
        if (pos >= 2 * seriesW) pos -= seriesW;
        else if (pos < seriesW) pos += seriesW;
        mq.scrollLeft = pos;
        const reale = mq.scrollLeft;
        if (Math.abs(reale - pos) > 1) pos = reale; // il browser ha clampato
        atteso = reale;
      } else {
        pos = mq.scrollLeft;
      }
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);

    /* --- ai breakpoint le foto cambiano larghezza: ricalcola la serie --- */
    let tResize = null;
    window.addEventListener("resize", () => {
      if (tResize) clearTimeout(tResize);
      tResize = setTimeout(() => {
        const nuova = misuraSerie();
        if (nuova > 0 && Math.abs(nuova - seriesW) > 0.5) {
          let frazione = (mq.scrollLeft - seriesW) / seriesW;
          frazione = Math.min(Math.max(frazione, 0), 1);
          seriesW = nuova;
          velocita = seriesW / (originali.length * 4.5);
          pos = seriesW + frazione * seriesW;
          mq.scrollLeft = pos;
          atteso = pos;
        }
      }, 200);
    });
  });
}


/* -------------------------------------------------------------
   4. NAVBAR — sfondo allo scroll + menu mobile
   ------------------------------------------------------------- */
function initNavbar() {
  const nav = $("[data-nav]");
  const toggle = $("[data-nav-toggle]");
  const mobile = $("[data-nav-mobile]");
  if (!nav) return;

  // Sfondo quando si è scrollato oltre ~metà altezza schermo
  const aggiornaSfondo = () => {
    nav.classList.toggle("nav--scrolled", window.scrollY > 24);
  };
  aggiornaSfondo();
  window.addEventListener("scroll", aggiornaSfondo, { passive: true });

  if (!toggle || !mobile) return;

  let ultimoFocus = null;

  const apri = () => {
    mobile.hidden = false;
    toggle.setAttribute("aria-expanded", "true");
    document.body.classList.add("nav-aperta");
    ultimoFocus = document.activeElement;
    const primo = $("a, button", mobile);
    if (primo) primo.focus();
    document.addEventListener("keydown", suEsc);
    mobile.addEventListener("keydown", trappolaFocus);
  };
  const chiudi = () => {
    mobile.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("nav-aperta");
    document.removeEventListener("keydown", suEsc);
    mobile.removeEventListener("keydown", trappolaFocus);
    if (ultimoFocus) ultimoFocus.focus();
  };
  const suEsc = (e) => { if (e.key === "Escape") chiudi(); };
  const trappolaFocus = (e) => {
    if (e.key !== "Tab") return;
    const fuoco = $$('a, button', mobile).filter((el) => !el.disabled);
    if (!fuoco.length) return;
    const primo = fuoco[0], ultimo = fuoco[fuoco.length - 1];
    if (e.shiftKey && document.activeElement === primo) { e.preventDefault(); ultimo.focus(); }
    else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primo.focus(); }
  };

  toggle.addEventListener("click", () => {
    (toggle.getAttribute("aria-expanded") === "true") ? chiudi() : apri();
  });
  // pulsante X in alto a destra nel menu mobile (raggiungibile da Tab, attivabile
  // con Invio/Spazio perché è un <button>; l'Esc è già gestito da suEsc)
  $("[data-nav-chiudi]", mobile)?.addEventListener("click", chiudi);
  // chiudi quando si clicca un link della navigazione mobile
  $$("a", mobile).forEach((a) => a.addEventListener("click", chiudi));
  // se si passa a desktop mentre è aperto
  window.matchMedia("(min-width: 900px)").addEventListener("change", (ev) => {
    if (ev.matches && toggle.getAttribute("aria-expanded") === "true") chiudi();
  });
}


/* -------------------------------------------------------------
   5. SLIDESHOW HERO — crossfade ogni 6s, contenuto FISSO
   ------------------------------------------------------------- */
function initHero() {
  const hero = $("[data-hero]");
  if (!hero) return;
  const slides = $$("[data-hero-slide]", hero);
  const dotsWrap = $("[data-hero-dots]", hero);
  if (slides.length < 2) { if (slides[0]) slides[0].classList.add("is-attiva"); return; }

  const INTERVALLO = 5500;   // ogni quanti millisecondi cambia l'immagine
  let corrente = 0;
  let timer = null;
  let inPausa = false;

  // puntini
  const dots = slides.map((_, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.setAttribute("role", "tab");
    b.setAttribute("aria-label", `Mostra immagine ${i + 1} di ${slides.length}`);
    b.addEventListener("click", () => { vaiA(i); riavvia(); });
    dotsWrap.appendChild(b);
    return b;
  });

  function vaiA(i) {
    slides[corrente].classList.remove("is-attiva");
    dots[corrente].setAttribute("aria-selected", "false");
    corrente = (i + slides.length) % slides.length;
    slides[corrente].classList.add("is-attiva");
    dots[corrente].setAttribute("aria-selected", "true");
  }

  function avanti() { vaiA(corrente + 1); }
  function avvia() {
    if (inPausa) return;
    clearInterval(timer);
    timer = setInterval(avanti, INTERVALLO);
  }
  function ferma() { clearInterval(timer); }
  function riavvia() { ferma(); avvia(); }

  vaiA(0);

  // Le immagini cambiano sempre da sole. Se l'utente ha attivato
  // "riduci animazioni" nel sistema, il CSS toglie la dissolvenza
  // (@media prefers-reduced-motion) e il cambio diventa netto: la
  // rotazione resta comunque attiva.
  avvia();

  // pausa su hover e su focus da tastiera
  hero.addEventListener("mouseenter", () => { inPausa = true; ferma(); });
  hero.addEventListener("mouseleave", () => { inPausa = false; avvia(); });
  hero.addEventListener("focusin", () => { inPausa = true; ferma(); });
  hero.addEventListener("focusout", () => { inPausa = false; avvia(); });
  // pausa quando la scheda del browser non è in primo piano (riparte al ritorno)
  document.addEventListener("visibilitychange", () => {
    document.hidden ? ferma() : avvia();
  });
}


/* -------------------------------------------------------------
   5-bis. ANIMAZIONI D'INGRESSO
   - l'hero entra in dissolvenza dall'alto al caricamento (solo CSS)
   - i blocchi principali fanno un fade-up quando entrano nello scroll.
     Ogni blocco marcato con [data-animate] si anima come UN pezzo solo,
     non elemento per elemento.
   ------------------------------------------------------------- */
function initAnimazioni() {
  const blocchi = $$("[data-animate]");
  if (!blocchi.length) return;

  // Con "riduci animazioni" o senza IntersectionObserver: mostra tutto subito.
  if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
    blocchi.forEach((b) => b.classList.add("is-visibile"));
    return;
  }

  const mostra = (el) => el.classList.add("is-visibile");

  const osservatore = new IntersectionObserver((voci) => {
    voci.forEach((v) => {
      if (v.isIntersecting) {
        mostra(v.target);
        osservatore.unobserve(v.target);
      }
    });
  }, { threshold: 0, rootMargin: "0px 0px -12% 0px" });

  blocchi.forEach((b) => osservatore.observe(b));

  // Rete di sicurezza: se per qualsiasi motivo un blocco non venisse rivelato
  // (observer non scattato, errore, ecc.), dopo 3 secondi lo mostriamo comunque.
  setTimeout(() => blocchi.forEach(mostra), 3000);
}


/* -------------------------------------------------------------
   6. LIGHTBOX GALLERIA PIATTI — scritto a mano
   ------------------------------------------------------------- */
function initLightbox() {
  const modal = $("[data-lightbox-modal]");
  const galleria = $("[data-galleria]");
  if (!modal || !galleria) return;

  const img = $("[data-lightbox-img]", modal);
  const btnChiudi = $("[data-lightbox-chiudi]", modal);
  const btnPrec = $("[data-lightbox-prec]", modal);
  const btnSucc = $("[data-lightbox-succ]", modal);
  const overlay = $("[data-lightbox-chiudi-overlay]", modal);

  // La striscia (marquee) che contiene la galleria: la mettiamo in pausa
  // mentre il lightbox è aperto, così alla chiusura le foto sono ferme dov'erano.
  const mqDietro = galleria.closest("[data-marquee]");

  // Tutti i pulsanti, cloni compresi (i cloni servono solo al ciclo continuo).
  const bottoni = $$("[data-lightbox]", galleria);
  // Solo gli originali, in ordine, per costruire l'elenco delle foto.
  const originali = bottoni.filter((b) => !b.closest(".is-clone"));
  const foto = originali.map((b) => {
    const im = $("img", b);
    return { src: im.currentSrc || im.src, alt: im.getAttribute("alt") || "" };
  });

  let indice = 0;
  let ultimoFocus = null;

  function mostra(i) {
    indice = (i + foto.length) % foto.length;
    img.src = foto[indice].src;
    img.alt = foto[indice].alt;
  }
  function apri(i) {
    ultimoFocus = document.activeElement;
    mostra(i);
    modal.hidden = false;
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("nav-aperta"); // blocca lo scroll
    if (mqDietro && mqDietro.pausaPerLightbox) mqDietro.pausaPerLightbox(true);
    btnChiudi.focus();
    document.addEventListener("keydown", suTasto);
  }
  function chiudi() {
    modal.hidden = true;
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("nav-aperta");
    if (mqDietro && mqDietro.pausaPerLightbox) mqDietro.pausaPerLightbox(false);
    document.removeEventListener("keydown", suTasto);
    if (ultimoFocus) ultimoFocus.focus();
  }
  function suTasto(e) {
    if (e.key === "Escape") chiudi();
    else if (e.key === "ArrowLeft") mostra(indice - 1);
    else if (e.key === "ArrowRight") mostra(indice + 1);
    else if (e.key === "Tab") {
      // focus trap semplice tra i pulsanti del dialog
      const f = [btnChiudi, btnPrec, btnSucc];
      const pos = f.indexOf(document.activeElement);
      if (e.shiftKey && pos <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && pos === f.length - 1) { e.preventDefault(); f[0].focus(); }
      else if (pos === -1) { e.preventDefault(); f[0].focus(); }
    }
  }

  bottoni.forEach((b) => {
    b.addEventListener("click", () => {
      // se l'utente stava trascinando la striscia, il "clic" non deve aprire nulla
      if (mqDietro && mqDietro.gestoEraDrag && mqDietro.gestoEraDrag()) return;
      const host = b.closest("[data-marquee-indice]");
      const i = host ? Number(host.dataset.marqueeIndice) : bottoni.indexOf(b);
      apri(i);
    });
  });
  btnChiudi.addEventListener("click", chiudi);
  overlay.addEventListener("click", chiudi);
  btnPrec.addEventListener("click", () => mostra(indice - 1));
  btnSucc.addEventListener("click", () => mostra(indice + 1));
}


/* -------------------------------------------------------------
   7. ORARI — badge "Aperto ora / Chiuso" su fuso Europe/Rome
   ------------------------------------------------------------- */
function initOrari() {
  const stato = $("[data-orari-stato]");
  const lista = $("[data-orari-lista]");
  if (!stato && !lista) return;

  // Minuti dall'inizio del giorno secondo l'ora italiana, a prescindere
  // dal fuso del visitatore.
  function oraItaliana() {
    const fmt = new Intl.DateTimeFormat("it-IT", {
      timeZone: "Europe/Rome",
      hour: "2-digit", minute: "2-digit", weekday: "short", hourCycle: "h23",
    });
    const parti = Object.fromEntries(fmt.formatToParts(new Date()).map((p) => [p.type, p.value]));
    const minuti = parseInt(parti.hour, 10) * 60 + parseInt(parti.minute, 10);
    // indice giorno 0=Lun ... 6=Dom
    const mappaGiorni = { lun: 0, mar: 1, mer: 2, gio: 3, ven: 4, sab: 5, dom: 6 };
    const chiave = parti.weekday.toLowerCase().slice(0, 3);
    return { minuti, giorno: mappaGiorni[chiave] ?? 0 };
  }
  const aMinuti = (hhmm) => {
    const [h, m] = hhmm.split(":").map(Number);
    return h * 60 + m;
  };

  function calcola() {
    const { minuti } = oraItaliana();
    for (const f of FASCE_ORARIE) {
      if (minuti >= aMinuti(f.apre) && minuti < aMinuti(f.chiude)) {
        return { aperto: true, chiudeAlle: f.chiude };
      }
    }
    // trova la prossima apertura di oggi
    const prossima = FASCE_ORARIE
      .map((f) => aMinuti(f.apre))
      .filter((m) => m > minuti)
      .sort((a, b) => a - b)[0];
    let riapre;
    if (prossima != null) {
      riapre = `${String(Math.floor(prossima / 60)).padStart(2, "0")}:${String(prossima % 60).padStart(2, "0")}`;
    } else {
      riapre = FASCE_ORARIE[0].apre; // domani
    }
    return { aperto: false, riapreAlle: riapre, domani: prossima == null };
  }

  function aggiorna() {
    const r = calcola();
    if (stato) {
      const badge = document.createElement("span");
      badge.className = "orari__badge " + (r.aperto ? "orari__badge--aperto" : "orari__badge--chiuso");
      badge.textContent = r.aperto
        ? `Aperto ora — fino alle ${r.chiudeAlle}`
        : (r.domani ? `Chiuso — riapre domani alle ${r.riapreAlle}` : `Chiuso — riapre alle ${r.riapreAlle}`);
      stato.innerHTML = "";
      stato.appendChild(badge);
    }
    if (lista) {
      const { giorno } = oraItaliana();
      $$("li", lista).forEach((li, i) => li.classList.toggle("is-oggi", i === giorno));
    }
  }

  aggiorna();
  setInterval(aggiorna, 60 * 1000); // ricontrolla ogni minuto
}


/* -------------------------------------------------------------
   8. BANNER COOKIE + MAPPA SU CONSENSO
   ------------------------------------------------------------- */
function initCookieMappa() {
  const banner = $("[data-cookie]");
  const mappa = $("[data-mappa]");
  const placeholder = $("[data-mappa-placeholder]");
  const btnCarica = $("[data-mappa-carica]");

  const leggiConsenso = () => {
    try { return localStorage.getItem(CHIAVE_CONSENSO); } catch { return null; }
  };
  const salvaConsenso = (v) => {
    try { localStorage.setItem(CHIAVE_CONSENSO, v); } catch {}
  };

  function caricaMappa() {
    if (!mappa || mappa.dataset.caricata === "si") return;
    const iframe = document.createElement("iframe");
    iframe.src = MAPPA_EMBED_SRC;
    iframe.title = "Mappa: Yotto Sushi, Via del Cantiere 10, Lovere";
    iframe.loading = "lazy";
    iframe.referrerPolicy = "no-referrer-when-downgrade";
    iframe.allowFullscreen = true;
    if (placeholder) placeholder.remove();
    mappa.appendChild(iframe);
    mappa.dataset.caricata = "si";
  }

  // stato iniziale
  const consenso = leggiConsenso();
  if (consenso === "accettato") {
    caricaMappa();
  } else if (!consenso && banner) {
    banner.hidden = false;
  }

  if (banner) {
    $("[data-cookie-accetta]", banner)?.addEventListener("click", () => {
      salvaConsenso("accettato");
      banner.hidden = true;
      caricaMappa();
    });
    $("[data-cookie-rifiuta]", banner)?.addEventListener("click", () => {
      salvaConsenso("rifiutato");
      banner.hidden = true;
    });
  }

  // Il pulsante "Carica la mappa" nel riquadro: carica una volta sola,
  // senza cambiare la scelta salvata sui cookie.
  btnCarica?.addEventListener("click", caricaMappa);
}


/* -------------------------------------------------------------
   9. PULSANTE WHATSAPP FISSO — compare dopo il primo scroll
   ------------------------------------------------------------- */
function initWaFab() {
  const fab = $("[data-wa-fab]");
  if (!fab) return;
  fab.href = WHATSAPP_URL;
  const aggiorna = () => { fab.hidden = window.scrollY < window.innerHeight * 0.6; };
  aggiorna();
  window.addEventListener("scroll", aggiorna, { passive: true });
}


/* -------------------------------------------------------------
   Avvio
   ------------------------------------------------------------- */
function init() {
  initFooter();
  initSocial();
  initMenu();
  initMarquee();
  initNavbar();
  initHero();
  initAnimazioni();
  initLightbox();
  initOrari();
  initCookieMappa();
  initWaFab();

  // Allinea i link WhatsApp che usano il messaggio precompilato
  $$('a[href^="https://wa.me/"]').forEach((a) => {
    if (!a.getAttribute("href").includes("text=")) a.href = WHATSAPP_URL;
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
