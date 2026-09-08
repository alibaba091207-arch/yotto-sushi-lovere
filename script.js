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
  instagram: "#TODO-INSTAGRAM",
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
  { file: "menu-festivo.pdf", nome: "Menù Festivo", nota: "Sabato, domenica e festivi" },
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

document.documentElement.classList.remove("no-js");
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

  const bottoni = $$("[data-lightbox]", galleria);
  const foto = bottoni.map((b) => {
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
    btnChiudi.focus();
    document.addEventListener("keydown", suTasto);
  }
  function chiudi() {
    modal.hidden = true;
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("nav-aperta");
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

  bottoni.forEach((b, i) => b.addEventListener("click", () => apri(i)));
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
   9. FORM PRENOTAZIONE — invio a Netlify senza cambiare pagina
   ------------------------------------------------------------- */
function initForm() {
  const form = $("[data-form-prenota]");
  if (!form) return;
  const esito = $("[data-form-esito]", form);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }

    const dati = new URLSearchParams(new FormData(form)).toString();
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: dati,
    })
      .then((r) => {
        if (!r.ok) throw new Error("risposta non ok");
        form.reset();
        mostraEsito(true,
          "Richiesta inviata. Ti ricontattiamo per confermare. Per una risposta subito, scrivici su WhatsApp.");
      })
      .catch(() => {
        mostraEsito(false,
          "Invio non riuscito. Riprova tra poco, oppure scrivici direttamente su WhatsApp o al telefono.");
      });
  });

  function mostraEsito(ok, testo) {
    if (!esito) return;
    esito.hidden = false;
    esito.textContent = testo;
    esito.classList.toggle("is-ok", ok);
    esito.classList.toggle("is-ko", !ok);
    esito.scrollIntoView({ block: "nearest", behavior: prefersReducedMotion() ? "auto" : "smooth" });
  }
}


/* -------------------------------------------------------------
   10. PULSANTE WHATSAPP FISSO — compare dopo il primo scroll
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
  initNavbar();
  initHero();
  initLightbox();
  initOrari();
  initCookieMappa();
  initForm();
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
