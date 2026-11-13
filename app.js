/* ==========================================================================
   KAZOOM SCOOTERS — núcleo
   Ícones, silhuetas SVG geradas localmente, seleção, tema e LGPD.
   ========================================================================== */

/* --------------------------------------------------------------------------
   1. HELPERS
   -------------------------------------------------------------------------- */
const moeda = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const formatarPreco = (v) => moeda.format(v);

const esc = (v) =>
  String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const $ = (s, ctx = document) => ctx.querySelector(s);
const $$ = (s, ctx = document) => [...ctx.querySelectorAll(s)];

const param = (nome) => new URLSearchParams(location.search).get(nome);

/** Minúsculas e sem acento, para comparação de texto. */
function normalizar(texto) {
  return String(texto)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

/**
 * Casa por INÍCIO DE PALAVRA, não por substring solta.
 * Sem isso, buscar "terno" acha "Externo" — e a busca vira ruído.
 */
function combinaTexto(termo, texto) {
  const termos = normalizar(termo).split(/[^a-z0-9]+/).filter(Boolean);
  if (!termos.length) return false;
  const palavras = normalizar(texto).split(/[^a-z0-9]+/).filter(Boolean);
  return termos.every((t) => palavras.some((p) => p.startsWith(t)));
}

function hashTexto(t) {
  let h = 0;
  for (let i = 0; i < t.length; i++) {
    h = (h << 5) - h + t.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

/** "Tênis Court" -> 6x sem juros de R$ 90,00 */
function parcelas(preco, max = LOJA.parcelasMax) {
  const n = Math.min(max, Math.max(1, Math.floor(preco / 30)));
  return { n, valor: preco / n };
}

/* --------------------------------------------------------------------------
   2. ÍCONES
   -------------------------------------------------------------------------- */
const ICONES = {
  busca: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M16.5 16.5 21 21"/></svg>`,
  menu: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18"/></svg>`,
  fechar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>`,
  sacola: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 7h16l-1.3 12.2A2 2 0 0 1 16.7 21H7.3a2 2 0 0 1-2-1.8L4 7Z"/><path d="M9 7V5.5a3 3 0 0 1 6 0V7"/></svg>`,
  coracao: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.3 5.3a5 5 0 0 0-7.1 0L12 6.5l-1.2-1.2a5 5 0 1 0-7.1 7.1l8.3 8.3 8.3-8.3a5 5 0 0 0 0-7.1z"/></svg>`,
  coracaoCheio: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.3 5.3a5 5 0 0 0-7.1 0L12 6.5l-1.2-1.2a5 5 0 1 0-7.1 7.1l8.3 8.3 8.3-8.3a5 5 0 0 0 0-7.1z"/></svg>`,
  zap: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.4A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3.1.9.9-3-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.6.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.6-1.2.1-.2 0-.3 0-.5s-.6-1.5-.9-2c-.2-.5-.4-.5-.6-.5h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.6 4 5.2 5.2 0 0 0 3.1.7 2.5 2.5 0 0 0 1.7-1.2 2 2 0 0 0 .1-1.2c0-.1-.2-.2-.4-.3Z"/></svg>`,
  sol: `<svg class="icone-sol" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>`,
  lua: `<svg class="icone-lua" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z"/></svg>`,
  caminhao: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1 4h13v12H1zM14 8h4l3 3v5h-7z"/><circle cx="5.5" cy="18" r="1.8"/><circle cx="17" cy="18" r="1.8"/></svg>`,
  loja: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 9 5 4h14l2 5M3 9v11h18V9M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0M9 20v-6h6v6"/></svg>`,
  trocar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 7h14l-3-3M21 17H7l3 3"/></svg>`,
  ruler: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m3 15 6-6 3 3 3-3 6 6-3 3-3-3-3 3-3-3-3 3z"/><path d="M9 9 6 6m6 0 3-3m3 3 3-3"/></svg>`,
  fita: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 10v4M10 10v4M14 10v4M18 10v4"/></svg>`,
  info: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 7.6v.6"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m20 6-11 11-5-5"/></svg>`,
  alerta: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3 2 20h20L12 3Z"/><path d="M12 9v5M12 17.4v.4"/></svg>`,
  seta: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`,
  local: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.6"/></svg>`,
  relogio: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>`,
  filtro: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 5h18l-7 8v6l-4 2v-8L3 5Z"/></svg>`,
  instagram: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none"/></svg>`,
  casa: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 11 12 3l9 8"/><path d="M5 10v11h14V10"/></svg>`,
};

const icone = (n) => ICONES[n] || "";

/* --------------------------------------------------------------------------
   3. SILHUETAS — substituem as fotos reais até elas chegarem
   Cada silhueta é um flat-lay vetorial: mesma proporção, mesmo fundo, o que
   mantém o grid coerente mesmo sem foto. Trocar por <img> real depois.
   --------------------------------------------------------------------------
   viewBox 0 0 200 260 (proporção 3:4, igual à do card)
   -------------------------------------------------------------------------- */
const SILHUETAS = {
  scooter: `<g stroke="__COR__" stroke-width="11" stroke-linecap="round" fill="none">
    <path d="M150 208 118 56"/>
    <path d="M94 50h50"/>
    <path d="M60 204h88"/>
  </g>
  <circle cx="152" cy="214" r="24" fill="__COR__"/>
  <circle cx="152" cy="214" r="10" fill="__LUZ__" opacity=".75"/>
  <circle cx="48" cy="214" r="24" fill="__COR__"/>
  <circle cx="48" cy="214" r="10" fill="__LUZ__" opacity=".75"/>
  <circle cx="134" cy="132" r="12" fill="none" stroke="__LUZ__" stroke-width="4" opacity=".5"/>
  <path d="M60 214h44" stroke="__LUZ__" stroke-width="4" opacity=".35"/>`,
  scooterDobravel: `<g stroke="__COR__" stroke-width="11" stroke-linecap="round" fill="none">
    <path d="M150 208 118 56"/>
    <path d="M94 50h50"/>
    <path d="M66 204h78"/>
  </g>
  <circle cx="152" cy="214" r="24" fill="__COR__"/>
  <circle cx="152" cy="214" r="10" fill="__LUZ__" opacity=".75"/>
  <circle cx="54" cy="214" r="24" fill="__COR__"/>
  <circle cx="54" cy="214" r="10" fill="__LUZ__" opacity=".75"/>
  <circle cx="134" cy="132" r="14" fill="none" stroke="__LUZ__" stroke-width="5" opacity=".6"/>
  <rect x="96" y="188" width="14" height="30" rx="7" fill="__LUZ__" opacity=".45"/>`,
  capacete: `<path d="M46 150a54 54 0 0 1 108 0v10H46z"/>
    <path d="M46 160h108v12H46z" opacity=".92"/>
    <path d="M58 150a42 42 0 0 1 52-40" stroke="__LUZ__" stroke-width="3.5" fill="none" opacity=".55"/>
    <path d="M56 144h88" stroke="__LUZ__" stroke-width="3" fill="none" opacity=".4"/>
    <circle cx="100" cy="200" r="8" fill="__LUZ__" opacity=".8"/>`,
  bateria: `<rect x="52" y="76" width="96" height="128" rx="10"/>
    <rect x="68" y="58" width="22" height="18" rx="4"/>
    <rect x="110" y="58" width="22" height="18" rx="4"/>
    <path d="M52 124h96" stroke="__LUZ__" stroke-width="3" opacity=".4"/>
    <path d="M92 178l16-22h-11l7-16-19 24h10z" fill="__LUZ__" opacity=".85"/>
    <rect x="70" y="126" width="60" height="18" rx="6" fill="__LUZ__" opacity=".35"/>`,
  cadeado: `<rect x="54" y="118" width="92" height="82" rx="10"/>
    <path d="M74 118V92a26 26 0 0 1 52 0v26" stroke="__COR__" stroke-width="9" fill="none"/>
    <rect x="88" y="118" width="24" height="82" fill="__LUZ__" opacity=".22"/>
    <circle cx="100" cy="158" r="10" fill="__LUZ__" opacity=".75"/>
    <path d="M100 168v20" stroke="__LUZ__" stroke-width="4" opacity=".7"/>`,
  kit: `<rect x="40" y="112" width="120" height="92" rx="8"/>
    <path d="M82 112V96a18 18 0 0 1 36 0v16" stroke="__COR__" stroke-width="8" fill="none"/>
    <rect x="40" y="154" width="120" height="16" fill="__LUZ__" opacity=".5"/>
    <path d="M84 134h32" stroke="__LUZ__" stroke-width="4" opacity=".6"/>
    <path d="M60 178h22M110 178h28" stroke="__LUZ__" stroke-width="4" opacity=".5"/>`,
};

/**
 * Paletas de corpo: cor da carenagem base + tom claro para os detalhes.
 */
const PALETAS = [
  ["#242a24", "#5c6258"],
  ["#5b6570", "#aeb9c2"],
  ["#7e2a1e", "#c98a6a"],
  ["#33465a", "#8fa8bd"],
  ["#6b7023", "#c3c98c"],
  ["#3f3f3f", "#8e8e8e"],
  ["#5a2f52", "#a8829c"],
  ["#2f3a44", "#7f99a8"],
];

/**
 * Gera a imagem do modelo como SVG (data URI). 100% local, sem CDN.
 * `variacao` muda a paleta — usada como "2ª foto" no hover do card e
 * como vistas 1–4 na galeria da PDP.
 */
function imagemPeca(produto, variacao = 0) {
  // FOTO REAL >>> quando o produto tem `fotos`, usa os arquivos de img/.
  // (fotos são placeholder genérico a_ substituir pelas fotos da loja — VALIDAR.md)
  if (produto.fotos && produto.fotos.length) {
    return produto.fotos[variacao % produto.fotos.length];
  }
  // Fallback vetorial: \\
  const cat = CATEGORIAS.find((c) => c.id === produto.categoria);
  const [base, luz] = PALETAS[hashTexto(produto.id + "#" + variacao) % PALETAS.length];
  const papel = cat?.fundo || "#ede6dc";
  const silhueta = SILHUETAS[produto.silhueta] || SILHUETAS.scooter;
  const gid = `s${produto.id.replace(/\W/g, "")}${variacao}`;

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 260" width="200" height="260" role="img" aria-label="${esc(produto.nome)}">
  <defs>
    <linearGradient id="${gid}" x1="0" y1="0" x2="0.4" y2="1">
      <stop offset="0%" stop-color="${base}"/>
      <stop offset="100%" stop-color="${luz}" stop-opacity=".55"/>
    </linearGradient>
    <linearGradient id="fundo${gid}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${papel}"/>
      <stop offset="100%" stop-color="${papel}" stop-opacity=".6"/>
    </linearGradient>
  </defs>
  <rect width="200" height="260" fill="url(#fundo${gid})"/>
  <ellipse cx="100" cy="238" rx="56" ry="8" fill="#000" opacity=".07"/>
  <g fill="url(#${gid})" stroke="none" transform="translate(0 4)">
    ${silhueta.split("__COR__").join(base).split("__LUZ__").join(luz)}
  </g>
</svg>`;

  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg.trim());
}

/** Arte de hero: editorial, com as linhas dos modelos (o texto é a mensagem). */
function arteHero(formato = "desktop") {
  const vertical = formato === "mobile";
  const w = vertical ? 800 : 1440;
  const h = vertical ? 1000 : 900;
  const gid = vertical ? "hm" : "hd";

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="Fundo editorial Kazoom Scooters">
  <defs>
    <linearGradient id="bg${gid}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1d231a"/>
      <stop offset="55%" stop-color="#111510"/>
      <stop offset="100%" stop-color="#1a2016"/>
    </linearGradient>
    <radialGradient id="luz${gid}" cx="70%" cy="25%" r="62%">
      <stop offset="0%" stop-color="#9fcb1c" stop-opacity=".42"/>
      <stop offset="100%" stop-color="#9fcb1c" stop-opacity="0"/>
    </radialGradient>
    <pattern id="trama${gid}" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <line x1="0" y1="0" x2="0" y2="8" stroke="#ffffff" stroke-opacity=".035" stroke-width="3"/>
    </pattern>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#bg${gid})"/>
  <rect width="${w}" height="${h}" fill="url(#trama${gid})"/>
  <rect width="${w}" height="${h}" fill="url(#luz${gid})"/>

  <!-- silhuetas de scooter em linha, tipo-showroom -->
  <g stroke="#eef2e6" fill="none" stroke-width="3" opacity=".24" stroke-linecap="round">
    <g transform="translate(${vertical ? 120 : 700} ${vertical ? 280 : 190}) scale(2.4)">
      <path d="M150 208 118 56"/><path d="M94 50h50"/><path d="M60 204h88"/>
      <circle cx="152" cy="214" r="24"/><circle cx="48" cy="214" r="24"/>
    </g>
    <g transform="translate(${vertical ? 430 : 1120} ${vertical ? 420 : 470}) scale(1.9)">
      <path d="M150 208 118 56"/><path d="M66 204h78"/>
      <circle cx="152" cy="214" r="24"/><circle cx="54" cy="214" r="24"/>
      <circle cx="134" cy="132" r="14"/>
    </g>
  </g>

  <!-- linha de velocidade -->
  <g stroke="#c9f24b" stroke-width="2.5" opacity=".5" stroke-linecap="round">
    <line x1="${vertical ? 130 : 880}" y1="${vertical ? 560 : 620}" x2="${vertical ? 330 : 1200}" y2="${vertical ? 560 : 620}"/>
    <line x1="${vertical ? 180 : 960}" y1="${vertical ? 600 : 660}" x2="${vertical ? 300 : 1140}" y2="${vertical ? 600 : 660}" opacity=".6"/>
    <line x1="${vertical ? 220 : 1020}" y1="${vertical ? 640 : 700}" x2="${vertical ? 330 : 1160}" y2="${vertical ? 640 : 700}" opacity=".35"/>
  </g>

  <circle cx="${vertical ? 200 : 1080}" cy="${vertical ? 700 : 700}" r="${vertical ? 130 : 170}" fill="none" stroke="#c9f24b" stroke-width="1.5" opacity=".4"/>
  <circle cx="${vertical ? 200 : 1080}" cy="${vertical ? 700 : 700}" r="${vertical ? 84 : 110}" fill="none" stroke="#eef2e6" stroke-width="1" opacity=".2"/>
</svg>`;

  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg.trim());
}

/** Arte do bloco de história: showroom / bancada de assistência. */
function arteHistoria() {
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" width="800" height="1000" role="img" aria-label="Showroom da Kazoom Scooters">
  <defs>
    <linearGradient id="fh" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#2b3326"/><stop offset="100%" stop-color="#131711"/>
    </linearGradient>
    <linearGradient id="vid" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#9fcb1c" stop-opacity=".55"/><stop offset="100%" stop-color="#9fcb1c" stop-opacity=".08"/>
    </linearGradient>
  </defs>
  <rect width="800" height="1000" fill="url(#fh)"/>
  <rect x="70" y="180" width="660" height="520" rx="8" fill="url(#vid)"/>
  <rect x="70" y="180" width="660" height="520" rx="8" fill="none" stroke="#eef2e6" stroke-opacity=".3" stroke-width="3"/>
  <path d="M70 440h660M400 180v520" stroke="#eef2e6" stroke-opacity=".25" stroke-width="3"/>
  <rect x="0" y="700" width="800" height="300" fill="#1c2118"/>
  <g stroke="#eef2e6" stroke-opacity=".14" stroke-width="2" fill="none">
    <rect x="40" y="740" width="180" height="220" rx="6"/>
    <rect x="250" y="740" width="180" height="220" rx="6"/>
    <rect x="460" y="740" width="180" height="220" rx="6"/>
    <path d="M40 810h180M40 880h180M250 810h180M250 880h180M460 810h180M460 880h180"/>
  </g>
  <!-- 3 scooters em linha no showroom -->
  <g stroke="#eef2e6" fill="none" stroke-width="2.6" opacity=".35" stroke-linecap="round">
    <g transform="translate(120 560) scale(0.75)">
      <path d="M150 208 118 56"/><path d="M94 50h50"/><path d="M60 204h88"/>
      <circle cx="152" cy="214" r="24"/><circle cx="48" cy="214" r="24"/>
    </g>
    <g transform="translate(320 560) scale(0.75)">
      <path d="M150 208 118 56"/><path d="M94 50h50"/><path d="M60 204h88"/>
      <circle cx="152" cy="214" r="24"/><circle cx="48" cy="214" r="24"/>
    </g>
    <g transform="translate(520 560) scale(0.75)">
      <path d="M150 208 118 56"/><path d="M94 50h50"/><path d="M60 204h88"/>
      <circle cx="152" cy="214" r="24"/><circle cx="48" cy="214" r="24"/>
    </g>
  </g>
  <text x="400" y="130" text-anchor="middle" font-family="Arial, sans-serif" font-size="46"
        font-weight="700" letter-spacing="12" fill="#eef2e6" fill-opacity=".9">KAZOOM</text>
  <text x="400" y="900" text-anchor="middle" font-family="Arial, sans-serif" font-size="24"
        letter-spacing="8" fill="#c9f24b">MOBILIDADE EL&#201;TRICA</text>
</svg>`;
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg.trim());
}

/* --------------------------------------------------------------------------
   4. MONTAGEM DO LINK DO WHATSAPP
   A regra é simples: a mensagem é montada com dados REAIS do produto, nunca
   com texto fixo que pode desatualizar do estoque.
   -------------------------------------------------------------------------- */
function linkZap(texto) {
  return `https://wa.me/${LOJA.whatsapp}?text=${encodeURIComponent(texto)}`;
}

function mensagemProduto(produto, variante = "") {
  const p = parcelas(produto.preco);
  const rotulo = rotuloVariante(produto);
  const linhas = [
    `Olá, Kazoom Scooters! Vim pelo site.`,
    ``,
    `*${produto.nome}*`,
    variante ? `${rotulo}: ${variante}` : null,
    `Código: ${produto.id.toUpperCase()}`,
    `Preço: ${formatarPreco(produto.preco)} (${p.n}x de ${formatarPreco(p.valor)})`,
    ``,
    `Ainda tem disponível?`,
  ].filter((l) => l !== null);
  return linhas.join("\n");
}

function mensagemSelecao(itens) {
  const total = itens.reduce((s, i) => s + i.preco * i.quantidade, 0);
  const linhas = [
    `Olá, Kazoom Scooters! Quero orçar estes modelos:`,
    ``,
    ...itens.map((i, n) => `${n + 1}. *${i.nome}*${i.variante ? ` — ${rotuloVariante(i.produto)}: ${i.variante}` : ""} — ${formatarPreco(i.preco)}`),
    ``,
    `Total: ${formatarPreco(total)}`,
    ``,
    `Tem todos disponíveis? Qual o frete para meu CEP?`,
  ];
  return linhas.join("\n");
}

function mensagemGeral(assunto = "") {
  return `Olá, Kazoom Scooters!${assunto ? ` ${assunto}` : ""} Vim pelo site.`;
}

/**
 * Amostra de cor por nome de variante: mostra o círculo junto ao nome no
 * seletor da PDP. Cores fora do mapa viram chip de texto puro.
 */
const AMOSTRAS_COR = {
  "Preto": "#20241f",
  "Grafite": "#4a4d4e",
  "Off-white": "#ece8e0",
  "Midnight": "#10121c",
};

const amostraCor = (nome) => AMOSTRAS_COR[nome] || null;

/**
 * Rótulo da variante: tamanho só quando o produto os usa (capacete);
 * nos modelos, a variante é a cor. Disponível para PDP e catálogo.
 */
function rotuloVariante(produto) {
  return produto.tipoVariante === "tamanho" ? "Tamanho" : "Cor";
}

/* --------------------------------------------------------------------------
   5. SELEÇÃO (equivalente à sacola; a saída é o WhatsApp)
   Guardamos só o id + variante no storage: as imagens são SVG gerados.
   -------------------------------------------------------------------------- */
const CHAVE_SELECAO = "kazoom:selecao";

/** ILUSTRATIVO — ver VALIDAR.md §2. Substituir por uma regra real da loja. */
const FAIXA_SELECAO = 499;

const Selecao = {
  ler() {
    try {
      const v = JSON.parse(localStorage.getItem(CHAVE_SELECAO) || "[]");
      return Array.isArray(v) ? v : [];
    } catch {
      return [];
    }
  },

  gravar(itens) {
    try {
      localStorage.setItem(CHAVE_SELECAO, JSON.stringify(itens));
    } catch {}
    Selecao.notificar();
  },

  adicionar(id, variante = "", quantidade = 1) {
    const produto = PRODUTOS.find((p) => p.id === id);
    if (!produto) return;
    const itens = Selecao.ler();
    const i = itens.findIndex((x) => x.id === id && x.variante === variante);
    if (i >= 0) itens[i].quantidade = Math.min(itens[i].quantidade + quantidade, 20);
    else itens.push({ id, variante, quantidade: Math.min(quantidade, 20) });
    Selecao.gravar(itens);
  },

  alterar(indice, delta) {
    const itens = Selecao.ler();
    if (!itens[indice]) return;
    itens[indice].quantidade = Math.min(Math.max(itens[indice].quantidade + delta, 0), 20);
    Selecao.gravar(itens.filter((x) => x.quantidade > 0));
  },

  remover(indice) {
    const itens = Selecao.ler();
    itens.splice(indice, 1);
    Selecao.gravar(itens);
  },

  limpar() {
    Selecao.gravar([]);
  },

  contar() {
    return Selecao.ler().reduce((s, i) => s + i.quantidade, 0);
  },

  /** Enriquece com dados do catálogo atual (nome e preço de verdade). */
  detalhado() {
    return Selecao.ler()
      .map((i) => {
        const p = PRODUTOS.find((x) => x.id === i.id);
        return p ? { ...i, nome: p.nome, preco: p.preco, produto: p } : null;
      })
      .filter(Boolean);
  },

  total() {
    return Selecao.detalhado().reduce((s, i) => s + i.preco * i.quantidade, 0);
  },

  link() {
    return linkZap(mensagemSelecao(Selecao.detalhado()));
  },

  ouvintes: [],
  inscrever(fn) {
    Selecao.ouvintes.push(fn);
    fn(Selecao.contar());
  },
  notificar() {
    const n = Selecao.contar();
    Selecao.ouvintes.forEach((fn) => fn(n));
    document.dispatchEvent(new CustomEvent("selecao:mudou", { detail: { total: n } }));
  },
};

/* --------------------------------------------------------------------------
   6. FAVORITOS (salvar modelo)
   -------------------------------------------------------------------------- */
const CHAVE_FAVS = "kazoom:favoritos";

const Favoritos = {
  ler() {
    try {
      return JSON.parse(localStorage.getItem(CHAVE_FAVS) || "[]");
    } catch {
      return [];
    }
  },
  tem: (id) => Favoritos.ler().includes(id),
  alternar(id) {
    const l = Favoritos.ler();
    const i = l.indexOf(id);
    if (i >= 0) l.splice(i, 1);
    else l.push(id);
    try {
      localStorage.setItem(CHAVE_FAVS, JSON.stringify(l));
    } catch {}
    return i < 0;
  },
};

/* --------------------------------------------------------------------------
   7. TEMA (claro/escuro) — aplicado antes da primeira pintura
   -------------------------------------------------------------------------- */
const CHAVE_TEMA = "kazoom:tema";

function aplicarTema(tema) {
  document.documentElement.dataset.tema = tema;
  try {
    localStorage.setItem(CHAVE_TEMA, tema);
  } catch {}
  rotularBotaoTema(tema);
}

/** O rótulo tem que dizer a ação disponível, não o estado atual. */
function rotularBotaoTema(tema) {
  const btn = $("[data-btn-tema]");
  if (!btn) return;
  const escuro = tema === "escuro";
  btn.setAttribute("aria-label", escuro ? "Ativar modo claro" : "Ativar modo escuro");
  btn.setAttribute("title", escuro ? "Ativar modo claro" : "Ativar modo escuro");
  btn.setAttribute("aria-pressed", String(escuro));
}

function iniciarTema() {
  // O <head> já aplicou o atributo; aqui rotulamos e ligamos o botão.
  const btn = $("[data-btn-tema]");
  rotularBotaoTema(document.documentElement.dataset.tema || "claro");
  if (!btn) return;
  btn.addEventListener("click", () => {
    aplicarTema(document.documentElement.dataset.tema === "escuro" ? "claro" : "escuro");
  });
}

/* --------------------------------------------------------------------------
   8. TOAST
   -------------------------------------------------------------------------- */
let toastTimer = null;

function toast(msg, tipo = "ok") {
  let el = $(".toast");
  if (!el) {
    el = document.createElement("div");
    el.className = "toast";
    el.setAttribute("role", "status");
    el.setAttribute("aria-live", "polite");
    document.body.appendChild(el);
  }
  el.innerHTML = `<span class="toast__icone">${icone(tipo === "erro" ? "alerta" : "check")}</span><span>${esc(msg)}</span>`;
  el.classList.add("visivel");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("visivel"), 3000);
}

/* --------------------------------------------------------------------------
   9. COMPONENTES COMPARTILHADOS
   -------------------------------------------------------------------------- */

/** Cartão de produto. Sem estrelas e sem "mais vendido": não há dado real. */
function cardProduto(produto, indice = 0) {
  const cat = CATEGORIAS.find((c) => c.id === produto.categoria);
  const p = parcelas(produto.preco);
  const fav = Favoritos.tem(produto.id);
  const temVariantes = produto.variantes.length > 1;
  const rotuloVar = rotuloVariante(produto);

  const selos = [];
  if (produto.precoAntes) {
    const off = Math.round((1 - produto.preco / produto.precoAntes) * 100);
    selos.push(`<span class="selo selo--acento">-${off}%</span>`);
  }
  if (produto.esgotado.length >= produto.variantes.length) {
    selos.push(`<span class="selo selo--esgotado">Esgotado</span>`);
  }

  const variantes = temVariantes
    ? `<div class="tamanhos-rapidos" role="group" aria-label="Escolher ${rotuloVar.toLowerCase()} de ${esc(produto.nome)}">
        ${produto.variantes
          .map(
            (t) => `<button class="tamanho-rapido" type="button" data-selecionar
              data-id="${esc(produto.id)}" data-variante="${esc(t)}"
              ${produto.esgotado.includes(t) ? "disabled" : ""}
              aria-label="Selecionar ${rotuloVar.toLowerCase()} ${esc(t)}${produto.esgotado.includes(t) ? ", esgotado" : ""}">${esc(t)}</button>`
          )
          .join("")}
      </div>`
    : "";

  return `
  <article class="card" data-card="${esc(produto.id)}">
    <div class="card__midia">
      <a href="produto.html?id=${esc(produto.id)}" aria-label="Ver ${esc(produto.nome)}">
        <img class="card__img card__img--frente" src="${imagemPeca(produto, 0)}"
             alt="${esc(produto.nome)}" loading="lazy" width="200" height="260">
        <img class="card__img card__img--dupla" src="${imagemPeca(produto, 1)}"
             alt="" aria-hidden="true" loading="lazy" width="200" height="260">
      </a>
      ${selos.length ? `<div class="card__selos">${selos.join("")}</div>` : ""}
      <button class="card__fav" type="button" data-fav="${esc(produto.id)}"
              aria-pressed="${fav}" aria-label="Salvar ${esc(produto.nome)}">
        ${fav ? icone("coracaoCheio") : icone("coracao")}
      </button>
    </div>
    <div class="card__corpo">
      <span class="card__cat">${esc(cat?.nome || "")}</span>
      <h3 class="card__nome"><a href="produto.html?id=${esc(produto.id)}">${esc(produto.nome)}</a></h3>
      <div class="card__precos">
        <span class="preco">${formatarPreco(produto.preco)}</span>
        ${produto.precoAntes ? `<span class="preco-antigo">${formatarPreco(produto.precoAntes)}</span>` : ""}
      </div>
      <span class="card__parcelas">${p.n}x de ${formatarPreco(p.valor)} sem juros</span>
      <div class="card__acoes">
        <a class="btn btn--zap card__zap" target="_blank" rel="noopener"
           href="${esc(linkZap(mensagemProduto(produto)))}">
          ${icone("zap")} Consultar
        </a>
      </div>
      ${variantes}
    </div>
  </article>`;
}

function renderProdutos(el, lista) {
  if (!el) return;
  if (!lista.length) {
    el.innerHTML = `
      <div class="estado-vazio">
        <h3>Nenhum modelo encontrado</h3>
        <p>Tente outra cor, outro perfil de uso ou fale com a gente no WhatsApp — a loja pode ter modelo que não está no site ainda.</p>
        <a class="btn" href="catalogo.html">Ver todos os modelos</a>
      </div>`;
    return;
  }
  el.innerHTML = lista.map(cardProduto).join("");
}

/** Círculo de categoria (navegação visual logo abaixo do hero). */
function circuloCategoria(cat) {
  const qtd = PRODUTOS.filter((p) => p.categoria === cat.id).length;
  const exemplo = PRODUTOS.find((p) => p.categoria === cat.id);
  return `
  <a class="bolha" href="catalogo.html?categoria=${esc(cat.id)}">
    <span class="bolha__foto">
      <img src="${imagemPeca(exemplo, 0)}" alt="" aria-hidden="true" loading="lazy" width="200" height="260">
    </span>
    <span class="bolha__nome">${esc(cat.nome)}</span>
    <span class="bolha__qtd">${qtd} ${qtd === 1 ? "modelo" : "modelos"}</span>
  </a>`;
}

/* --------------------------------------------------------------------------
   10. CABEÇALHO: sticky que encolhe, painéis, contador
   -------------------------------------------------------------------------- */
function iniciarHeader() {
  const header = $("[data-header]");
  if (!header) return;

  // Estado "rolado"
  const aoRolar = () => {
    header.dataset.rolado = String(window.scrollY > 12);
  };
  aoRolar();
  window.addEventListener("scroll", aoRolar, { passive: true });

  // Contador da seleção
  Selecao.inscrever((n) => {
    $$("[data-contador]").forEach((el) => {
      el.textContent = n > 99 ? "99+" : String(n);
      el.dataset.vazio = String(n === 0);
    });
  });
}

/* Painéis: menu, busca, seleção. Um por vez. */
const FOCAVEIS =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

const Painel = {
  atual: null,
  elemento: null,
  focoAnterior: null,

  abrir(nome) {
    this.fechar();
    const el = $(`[data-painel="${nome}"]`);
    if (!el) return;

    this.focoAnterior = document.activeElement;
    el.classList.add("aberto");
    document.body.classList.add("travado");
    this.atual = nome;
    this.elemento = el;

    const foco = el.querySelector("input, select, textarea, button, a");
    if (foco) setTimeout(() => foco.focus(), 40);
  },

  fechar() {
    if (!this.atual) return;
    $$("[data-painel]").forEach((el) => el.classList.remove("aberto"));
    document.body.classList.remove("travado");

    // Devolve o foco para onde estava: sem isso, quem usa teclado perde o
    // ponto de partida e precisa varrer a página para continuar.
    const voltar = this.focoAnterior;
    this.atual = null;
    this.elemento = null;
    this.focoAnterior = null;
    if (voltar && document.contains(voltar)) voltar.focus();
  },

  /** Mantém o Tab dentro do painel aberto. */
  prenderFoco(e) {
    if (e.key !== "Tab" || !this.elemento) return;
    const alvos = $$(FOCAVEIS, this.elemento).filter(
      (el) => el.offsetParent !== null || el === document.activeElement
    );
    if (!alvos.length) return;

    const primeiro = alvos[0];
    const ultimo = alvos[alvos.length - 1];
    const dentro = this.elemento.contains(document.activeElement);

    if (e.shiftKey && (!dentro || document.activeElement === primeiro)) {
      e.preventDefault();
      ultimo.focus();
    } else if (!e.shiftKey && (!dentro || document.activeElement === ultimo)) {
      e.preventDefault();
      primeiro.focus();
    }
  },
};

function iniciarPaineis() {
  document.addEventListener("click", (e) => {
    const abrir = e.target.closest("[data-abrir-painel]");
    if (abrir) {
      e.preventDefault();
      Painel.abrir(abrir.dataset.abrirPainel);
      return;
    }
    if (e.target.closest("[data-fechar-painel]")) {
      e.preventDefault();
      Painel.fechar();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && Painel.atual) Painel.fechar();
    else Painel.prenderFoco(e);
  });
}

/* --------------------------------------------------------------------------
   9b. WHATSAPP FLUTUANTE
   Fica no app.js, não na home: o botão existe em todas as páginas e precisa
   do mesmo comportamento em todas. Aparece depois da primeira dobra (para não
   competir com o CTA do hero) e some dentro de qualquer painel.
   -------------------------------------------------------------------------- */
function iniciarWhatsappFlutuante() {
  const btn = $("[data-falar-zap]");
  if (!btn) return;

  const algumAberto = () =>
    !!$(".painel.aberto") || !!$("[data-cookies-painel].aberto");

  const avaliar = () => {
    btn.hidden = window.scrollY <= 420 || algumAberto();
  };

  avaliar();
  window.addEventListener("scroll", avaliar, { passive: true });
  document.addEventListener("selecao:mudou", avaliar);
  // Reavalia ao abrir/fechar painel: o botão nunca pode ficar sobre o overlay.
  document.addEventListener("click", (e) => {
    if (
      e.target.closest("[data-abrir-painel]") ||
      e.target.closest("[data-fechar-painel]") ||
      e.target.closest("[data-cookies-abrir]") ||
      e.target.closest("[data-cookies-fechar]") ||
      e.target.closest("[data-cookies-acao]")
    ) {
      setTimeout(avaliar, 60);
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setTimeout(avaliar, 60);
  });
}

/* Seleção: painel com barra de progresso e envio único ao WhatsApp.
   Textos abaixo falam de "seleção" — a loja sem checkout online fecha a
   compra pelo WhatsApp, e a barra é só referência de faixa combinada. */
function iniciarPainelSelecao() {
  const corpo = $("[data-selecao-corpo]");
  const base = $("[data-selecao-base]");
  const barra = $("[data-selecao-progresso]");
  const textoBarra = $("[data-selecao-progresso-txt]");

  function pintar() {
    if (!corpo) return;
    const itens = Selecao.detalhado();

    if (!itens.length) {
      corpo.innerHTML = `
        <div class="selecao-vazia">
          <span class="selecao-vazia__icone">${icone("sacola")}</span>
          <h3>Sua seleção está vazia</h3>
          <p>Toque no coração para salvar modelos, ou em “Consultar” para perguntar sobre um.</p>
          <a class="btn btn--secundario" href="catalogo.html">Ver modelos</a>
        </div>`;
      if (base) base.hidden = true;
      return;
    }

    if (base) base.hidden = false;

    corpo.innerHTML = itens
      .map(
        (i, idx) => `
      <article class="item-selecao">
        <a class="item-selecao__img" href="produto.html?id=${esc(i.id)}">
          <img src="${imagemPeca(i.produto, 0)}" alt="${esc(i.nome)}" loading="lazy" width="200" height="260">
        </a>
        <div>
          <p class="item-selecao__nome">${esc(i.nome)}</p>
          <p class="item-selecao__meta">${i.variante ? `${rotuloVariante(i.produto)} ${esc(i.variante)}` : `Código ${esc(i.id.toUpperCase())}`}</p>
        </div>
        <div class="item-selecao__dir">
          <span class="item-selecao__preco">${formatarPreco(i.preco * i.quantidade)}</span>
          <div class="linha-forte">
            <div class="qtd-mini">
              <button type="button" data-sel-acao="menos" data-i="${idx}" aria-label="Diminuir">−</button>
              <span>${i.quantidade}</span>
              <button type="button" data-sel-acao="mais" data-i="${idx}" aria-label="Aumentar">+</button>
            </div>
            <button class="remover" type="button" data-sel-acao="remover" data-i="${idx}">Remover</button>
          </div>
        </div>
      </article>`
      )
      .join("");

    // Barra de progresso: ILUSTRATIVO (VALIDAR.md §2). Referência de valor
    // mínimo combinado — troque por uma regra que a loja de fato publique,
    // e diga a região se a regra for regional.
    if (barra && textoBarra) {
      const t = Selecao.total();
      const pct = Math.min(100, Math.round((t / FAIXA_SELECAO) * 100));
      barra.style.width = pct + "%";
      textoBarra.textContent =
        t >= FAIXA_SELECAO
          ? "Você atingiu a faixa de frete combinado no WhatsApp."
          : `Faltam ${formatarPreco(FAIXA_SELECAO - t)} para a faixa de frete combinado.`;
    }

    const link = $("[data-selecao-link]");
    if (link) link.href = Selecao.link();

    const totalEl = $("[data-selecao-total]");
    if (totalEl) totalEl.textContent = formatarPreco(Selecao.total());
  }

  document.addEventListener("selecao:mudou", pintar);
  document.addEventListener("click", (e) => {
    // Esvaziar seleção
    if (e.target.closest("[data-limpar-selecao]")) {
      e.preventDefault();
      if (!Selecao.contar()) return;
      Selecao.limpar();
      toast("Seleção esvaziada.");
      return;
    }

    const btn = e.target.closest("[data-sel-acao]");
    if (!btn) return;
    const i = Number(btn.dataset.i);
    if (btn.dataset.selAcao === "mais") Selecao.alterar(i, 1);
    if (btn.dataset.selAcao === "menos") Selecao.alterar(i, -1);
    if (btn.dataset.selAcao === "remover") Selecao.remover(i);
  });

  pintar();
}

/* --------------------------------------------------------------------------
   11. AÇÕES DELEGADAS
   -------------------------------------------------------------------------- */
function iniciarDelegadas() {
  document.addEventListener("click", (e) => {
    // Salvar modelo
    const fav = e.target.closest("[data-fav]");
    if (fav) {
      e.preventDefault();
      const ativo = Favoritos.alternar(fav.dataset.fav);
      fav.setAttribute("aria-pressed", String(ativo));
      fav.innerHTML = ativo ? icone("coracaoCheio") : icone("coracao");
      toast(ativo ? "Modelo salvo nos favoritos." : "Modelo removido dos favoritos.");
      return;
    }

    // Adição rápida por variante (cor ou tamanho) no card
    const sel = e.target.closest("[data-selecionar]");
    if (sel && !sel.disabled) {
      e.preventDefault();
      const id = sel.dataset.id;
      const variante = sel.dataset.variante;
      Selecao.adicionar(id, variante, 1);
      const produto = PRODUTOS.find((p) => p.id === id);
      toast(`${produto.nome} (${variante}) entrou na sua seleção.`);
    }
  });
}

/* --------------------------------------------------------------------------
   12. REVEAL
   -------------------------------------------------------------------------- */
function iniciarReveal() {
  const alvos = $$("[data-revelar]");
  if (!alvos.length) return;

  const marcar = (el, atraso = 0) => {
    el.style.animationDelay = `${atraso}ms`;
    el.classList.add("visivel");
  };
  const visivel = (el) => {
    const r = el.getBoundingClientRect();
    return r.top < window.innerHeight * 0.92 && r.bottom > 0;
  };

  if (!("IntersectionObserver" in window)) {
    alvos.forEach((el) => marcar(el));
    return;
  }

  const obs = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada, i) => {
        if (!entrada.isIntersecting) return;
        marcar(entrada.target, i * 60);
        obs.unobserve(entrada.target);
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -30px" }
  );

  alvos.forEach((el) => (visivel(el) ? marcar(el) : obs.observe(el)));

  let agendado = false;
  const varrer = () => {
    if (agendado) return;
    agendado = true;
    requestAnimationFrame(() => {
      agendado = false;
      $$("[data-revelar]:not(.visivel)").forEach((el) => visivel(el) && marcar(el));
    });
  };
  window.addEventListener("scroll", varrer, { passive: true });
  window.addEventListener("resize", varrer);
  window.addEventListener("load", varrer);
  setTimeout(varrer, 600);

  // Rede de segurança definitiva: se nada mais rodar (aba em segundo plano,
  // extensão bloqueando observer, print de página inteira), tudo aparece.
  // Conteúdo invisível é pior do que animação perdida.
  setTimeout(() => {
    $$("[data-revelar]:not(.visivel)").forEach((el, i) => marcar(el, Math.min(i, 8) * 40));
  }, 1500);
}

/* --------------------------------------------------------------------------
   13. BARRA DE COMPRA FIXA (mobile) — só quando o usuário JÁ PASSOU do botão
   --------------------------------------------------------------------------
   Regra: aparece quando o botão principal saiu da tela para cima; some quando
   ele volta. Um observer puro erra aqui: no topo da página o botão já está
   fora da tela e a barra apareceria antes de o cliente ver qualquer coisa.
   -------------------------------------------------------------------------- */
function iniciarBarraCompra() {
  const barra = $("[data-barra-compra]");
  const alvo = $("[data-acoes-comprar]");
  if (!barra || !alvo) return;

  let agendado = false;

  const avaliar = () => {
    const r = alvo.getBoundingClientRect();
    // "Passou" = o botão ficou inteiro acima da dobra. Enquanto ele estiver
    // visível na tela, a barra é ruído.
    const passou = r.bottom < 0;
    barra.classList.toggle("visivel", passou);
    document.body.classList.toggle("com-barra", passou);
  };

  const agendar = () => {
    if (agendado) return;
    agendado = true;
    requestAnimationFrame(() => {
      agendado = false;
      avaliar();
    });
  };

  avaliar();
  window.addEventListener("scroll", agendar, { passive: true });
  window.addEventListener("resize", agendar);
  setTimeout(avaliar, 200);
}

/* --------------------------------------------------------------------------
   14. TEMA BOOT
   -------------------------------------------------------------------------- */

/** Botão de menu mobile: visível até 900px, escondido no desktop.
 *  Era da home.js e por isso o menu não abria em catálogo/produto/docs. */
function ajustarBotaoMenu() {
  const btn = $('[data-abrir-painel="menu"]');
  if (!btn) return;
  const mql = matchMedia("(max-width: 900px)");
  const aplicar = () => (btn.style.display = mql.matches ? "grid" : "none");
  aplicar();
  mql.addEventListener("change", aplicar);
}

document.addEventListener("DOMContentLoaded", () => {
  ajustarBotaoMenu();
  iniciarHeader();
  iniciarPaineis();
  iniciarPainelSelecao();
  iniciarDelegadas();
  iniciarTema();
  iniciarReveal();
  iniciarBarraCompra();
  iniciarWhatsappFlutuante();
  if (typeof iniciarBusca === "function") iniciarBusca();
  $$("[data-ano]").forEach((el) => (el.textContent = new Date().getFullYear()));
});
