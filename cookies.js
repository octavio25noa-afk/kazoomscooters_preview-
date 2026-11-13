/* ==========================================================================
   KAZOOM SCOOTERS — cookies (LGPD)
   --------------------------------------------------------------------------
   Regra implementada:
     · Antes da escolha, NENHUM script de análise/marketing é carregado.
     · "Recusar" = nada ligado.
     · "Salvar escolhas" liga só o que foi marcado.
     · Analíticos e Marketing começam DESLIGADOS (opt-in).
     · Necessários ficam sempre ativos e sem interruptor.
   ========================================================================== */

const CHAVE_CONSENT = "kazoom:consentimento";

const CATEGORIAS_COOKIE = [
  {
    id: "necessarios",
    nome: "Necessários",
    descricao:
      "Mantêm o site funcionando: sua seleção de modelos, o tema claro/escuro e a sua escolha neste painel. Não podem ser desligados.",
    fixo: true,
  },
  {
    id: "analiticos",
    nome: "Analíticos",
    descricao:
      "Medem quais páginas e modelos são mais visitados, para a gente melhorar a vitrine. Desligado por padrão.",
    fixo: false,
  },
  {
    id: "marketing",
    nome: "Marketing",
    descricao:
      "Permitem medir anúncios e campanhas no Instagram e no Facebook. Desligado por padrão.",
    fixo: false,
  },
];

/* Simula o que as ferramentas de cada categoria fariam. */
const CARREGADORES = {
  analiticos: () => {
    // Substituir pelo snippet real (GA4, Plausible, Metabase...).
    document.dispatchEvent(new CustomEvent("cookie:analiticos", { detail: { ativo: true } }));
  },
  marketing: () => {
    // Substituir pelo pixel real (Meta Pixel, TikTok...).
    document.dispatchEvent(new CustomEvent("cookie:marketing", { detail: { ativo: true } }));
  },
};

const Consentimento = {
  ler() {
    try {
      return JSON.parse(localStorage.getItem(CHAVE_CONSENT) || "null");
    } catch {
      return null;
    }
  },

  gravar(mapa) {
    try {
      localStorage.setItem(CHAVE_CONSENT, JSON.stringify(mapa));
    } catch {}
    Consentimento.aplicar(mapa);
  },

  aplicar(mapa) {
    Object.entries(CARREGADORES).forEach(([cat, fn]) => {
      if (mapa[cat]) fn();
    });
  },

  aceitouAlgumaVez() {
    return Consentimento.ler() !== null;
  },
};

let focoAnteriorCookies = null;

function abrirPainelCookies() {
  const painel = $("[data-cookies-painel]");
  if (!painel) return;
  const guardado = Consentimento.ler() || { necessarios: true, analiticos: false, marketing: false };

  $$("[data-cookie-cat]", painel).forEach((input) => {
    const cat = input.dataset.cookieCat;
    input.checked = cat === "necessarios" ? true : Boolean(guardado[cat]);
  });

  focoAnteriorCookies = document.activeElement;
  painel.classList.add("aberto");
  document.body.classList.add("travado");
  const foco = painel.querySelector("input:not([disabled]), button");
  if (foco) setTimeout(() => foco.focus(), 40);
}

function fecharPainelCookies() {
  const painel = $("[data-cookies-painel]");
  if (!painel) return;
  painel.classList.remove("aberto");
  document.body.classList.remove("travado");
  if (focoAnteriorCookies && document.contains(focoAnteriorCookies)) {
    focoAnteriorCookies.focus();
  }
  focoAnteriorCookies = null;
}

/** Mantém o Tab dentro do painel de cookies. */
function prenderFocoCookies(e) {
  const painel = $("[data-cookies-painel]");
  if (e.key !== "Tab" || !painel?.classList.contains("aberto")) return;

  const alvos = $$(
    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
    painel
  ).filter((el) => el.offsetParent !== null || el === document.activeElement);
  if (!alvos.length) return;

  const primeiro = alvos[0];
  const ultimo = alvos[alvos.length - 1];
  const dentro = painel.contains(document.activeElement);

  if (e.shiftKey && (!dentro || document.activeElement === primeiro)) {
    e.preventDefault();
    ultimo.focus();
  } else if (!e.shiftKey && (!dentro || document.activeElement === ultimo)) {
    e.preventDefault();
    primeiro.focus();
  }
}

function iniciarCookies() {
  const banner = $("[data-cookies-banner]");

  // Aplica o que já foi salvo (ou não aplica nada — opt-in).
  const guardado = Consentimento.ler();
  if (guardado) Consentimento.aplicar(guardado);
  else if (banner) {
    banner.hidden = false;
    // Duplo rAF: dá tempo ao navegador de pintar antes de animar a entrada.
    requestAnimationFrame(() =>
      requestAnimationFrame(() => banner.classList.add("visivel"))
    );
  }

  document.addEventListener("click", (e) => {
    // Abrir
    if (e.target.closest("[data-cookies-abrir]")) {
      e.preventDefault();
      abrirPainelCookies();
      return;
    }
    if (e.target.closest("[data-cookies-fechar]")) {
      e.preventDefault();
      fecharPainelCookies();
      return;
    }

    // Decisões diretas da faixa
    const acao = e.target.closest("[data-cookies-acao]")?.dataset.cookiesAcao;
    if (!acao) return;
    e.preventDefault();

    if (acao === "todos") {
      Consentimento.gravar({ necessarios: true, analiticos: true, marketing: true });
    } else if (acao === "recusar") {
      Consentimento.gravar({ necessarios: true, analiticos: false, marketing: false });
    } else if (acao === "preferencias") {
      abrirPainelCookies();
      return;
    } else if (acao === "salvar") {
      const mapa = { necessarios: true, analiticos: false, marketing: false };
      $$("[data-cookie-cat]").forEach((i) => {
        if (i.dataset.cookieCat !== "necessarios") mapa[i.dataset.cookieCat] = i.checked;
      });
      Consentimento.gravar(mapa);
    }

    fecharPainelCookies();
    if (banner) {
      banner.classList.remove("visivel");
      banner.hidden = true;
    }
    toast("Preferências de cookies salvas.");
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") fecharPainelCookies();
    else prenderFocoCookies(e);
  });
}

function montarPainelCookies() {
  const painel = $("[data-cookies-painel]");
  if (!painel) return;

  const corpo = $("[data-cookies-corpo]", painel);
  if (corpo) {
    corpo.innerHTML = CATEGORIAS_COOKIE.map(
      (c) => `
      <div class="categoria-cookie">
        <div class="categoria-cookie__info">
          <strong>${esc(c.nome)}</strong>
          <p>${esc(c.descricao)}</p>
        </div>
        ${
          c.fixo
            ? `<span class="selo">Sempre ativo</span>`
            : `<label class="interruptor">
                 <input type="checkbox" data-cookie-cat="${c.id}" aria-label="Permitir cookies de ${esc(c.nome)}">
                 <span class="interruptor__trilho"></span>
               </label>`
        }
      </div>`
    ).join("");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  montarPainelCookies();
  iniciarCookies();
});
