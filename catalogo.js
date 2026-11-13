/* ==========================================================================
   KAZOOM SCOOTERS — scripts do catálogo
   --------------------------------------------------------------------------
   Regras aplicadas:
     · Contagem real por faceta; faceta sem resultado fica DESABILITADA, não
       escondida.
     · Filtro rápido por cima do grid com o atributo que decide a compra no
       nicho: categoria, faixa de autonomia e cor.
     · "Mostrando X de Y" + carregar mais.
     · Estado vazio com saída.
     · Estado esgotado lido de `produto.esgotado` (inventário do mock).
   ========================================================================== */

const ORDENS = {
  relevancia: () => 0,
  "menor-preco": (a, b) => a.preco - b.preco,
  "maior-preco": (a, b) => b.preco - a.preco,
  "desconto": (a, b) =>
    (b.precoAntes ? 1 - b.preco / b.precoAntes : 0) -
    (a.precoAntes ? 1 - a.preco / a.precoAntes : 0),
};

const VARIANTES_FILTRO = [...new Set(PRODUTOS.flatMap((p) => p.variantes))].sort(
  (a, b) => {
    const ordem = ["Único", "S", "M", "L", "XL", "Preto", "Grafite", "Off-white", "Midnight"];
    const ia = ordem.indexOf(a);
    const ib = ordem.indexOf(b);
    if (ia !== -1 && ib !== -1) return ia - ib;
    if (ia !== -1) return -1;
    if (ib !== -1) return 1;
    return String(a).localeCompare(String(b), "pt-BR", { numeric: true });
  }
);

const PASSO = 12;

const estado = {
  q: "",
  categorias: new Set(),
  variantes: new Set(),
  faixas: new Set(),
  soPromocao: false,
  ordem: "relevancia",
  visiveis: PASSO,
};

/* --------------------------------------------------------------------------
   Filtragem
   -------------------------------------------------------------------------- */
function filtrar(extra = {}) {
  const { ignorar = [] } = extra;

  return PRODUTOS.filter((p) => {
    if (!ignorar.includes("categoria") && estado.categorias.size && !estado.categorias.has(p.categoria)) return false;
    if (!ignorar.includes("variante") && estado.variantes.size && !p.variantes.some((t) => estado.variantes.has(t))) return false;
    if (
      !ignorar.includes("faixa") &&
      estado.faixas.size &&
      !(p.autonomiaKm && FREQUENCIAS_AUTONOMIA.some((f) => estado.faixas.has(f.id) && f.teste(p.autonomiaKm)))
    )
      return false;
    if (!ignorar.includes("promo") && estado.soPromocao && !p.precoAntes) return false;
    if (estado.q) {
      if (!combinaTexto(estado.q, `${p.nome} ${p.descricao} ${Object.values(p.ficha).join(" ")} ${p.categoria}`))
        return false;
    }
    return true;
  }).sort(ORDENS[estado.ordem] || ORDENS.relevancia);
}

/* --------------------------------------------------------------------------
   Facetas: contagem real, faceta sem resultado desabilitada
   -------------------------------------------------------------------------- */
function montarFacetas() {
  const base = filtrar({ ignorar: ["categoria"] });

  // Categorias
  const alvoCats = $("[data-faceta-categorias]");
  if (alvoCats) {
    alvoCats.innerHTML = CATEGORIAS.map((c) => {
      const n = base.filter((p) => p.categoria === c.id).length;
      const marcado = estado.categorias.has(c.id);
      const existe = n > 0 || marcado;
      return `<button class="chip" type="button" data-cat="${esc(c.id)}"
        aria-pressed="${marcado}" ${existe ? "" : "disabled"}
        aria-label="${esc(c.nome)}, ${n} ${n === 1 ? "modelo" : "modelos"}">
        ${esc(c.nome)} <span class="filtro__contagem">${n}</span>
      </button>`;
    }).join("");
  }

  // Variantes (cor; tamanho só nos acessórios que usam)
  const alvoTam = $("[data-faceta-variantes]");
  if (alvoTam) {
    const baseVar = filtrar({ ignorar: ["variante"] });
    alvoTam.innerHTML = VARIANTES_FILTRO.map((t) => {
      const n = baseVar.filter((p) => p.variantes.includes(t)).length;
      const marcado = estado.variantes.has(t);
      const existe = n > 0 || marcado;
      const exemplo = baseVar.find((p) => p.variantes.includes(t));
      const rotulo = exemplo ? rotuloVariante(exemplo).toLowerCase() : "variante";
      return `<button class="chip" type="button" data-var="${esc(t)}"
        aria-pressed="${marcado}" ${existe ? "" : "disabled"}
        aria-label="${rotulo} ${esc(t)}, ${n} ${n === 1 ? "modelo" : "modelos"}">${esc(t)}</button>`;
    }).join("");
  }

  // Faixa de autonomia — o atributo que decide a compra no nicho
  const alvoFai = $("[data-faceta-autonomia]");
  if (alvoFai) {
    const baseFai = filtrar({ ignorar: ["faixa"] });
    alvoFai.innerHTML = FREQUENCIAS_AUTONOMIA.map((f) => {
      const n = baseFai.filter((p) => p.autonomiaKm && f.teste(p.autonomiaKm)).length;
      const marcado = estado.faixas.has(f.id);
      const existe = n > 0 || marcado;
      return `<button class="chip" type="button" data-faixa="${esc(f.id)}"
        aria-pressed="${marcado}" ${existe ? "" : "disabled"}
        aria-label="${esc(f.nome)}, ${n} ${n === 1 ? "modelo" : "modelos"}">
        ${esc(f.nome)} <span class="filtro__contagem">${n}</span>
      </button>`;
    }).join("");
  }
}

/* --------------------------------------------------------------------------
   Chips rápidos acima do grid
   -------------------------------------------------------------------------- */
function montarChipsRapidos() {
  const alvo = $("[data-chips-rapidos]");
  if (!alvo) return;

  const chips = [
    { id: "promo", rot: "Em promoção", ativo: estado.soPromocao },
    ...CATEGORIAS.map((c) => ({
      id: c.id,
      rot: c.nome,
      ativo: estado.categorias.has(c.id),
    })),
  ];

  alvo.innerHTML = chips
    .map(
      (c) => `<button class="chip" type="button" data-rapido="${esc(c.id)}"
        aria-pressed="${c.ativo}">${esc(c.rot)}</button>`
    )
    .join("");
}

/* --------------------------------------------------------------------------
   Render
   -------------------------------------------------------------------------- */
function aplicar() {
  const total = filtrar().length;
  const visiveis = filtrar().slice(0, estado.visiveis);

  renderProdutos($("[data-grade]"), visiveis);

  const info = $("[data-info]");
  if (info) {
    info.innerHTML = total
      ? `Mostrando <strong>${visiveis.length}</strong> de <strong>${total}</strong> ${total === 1 ? "modelo" : "modelos"}`
      : "Nenhum modelo com esses filtros";
  }

  const mais = $("[data-carregar-mais]");
  if (mais) {
    mais.hidden = visiveis.length >= total;
    const contador = mais.querySelector("span");
    if (contador) contador.textContent = `Mostrar mais ${Math.min(PASSO, total - visiveis.length)} modelos`;
  }

  // Título da aba e cabeçalho
  const cat = [...estado.categorias][0];
  const nomeCat = CATEGORIAS.find((c) => c.id === cat)?.nome;
  if (nomeCat) {
    const h = $("[data-titulo]");
    if (h) h.textContent = nomeCat;
    document.title = `${nomeCat} — Kazoom Scooters`;
  } else if (estado.q) {
    document.title = `Busca: ${estado.q} — Kazoom Scooters`;
  } else {
    document.title = "Todos os modelos — Kazoom Scooters";
  }

  montarFacetas();
  montarChipsRapidos();
  pintarCtaLista();
  sincronizarURL();

  // Botão "Ver N modelos" do painel mobile
  const verN = $("[data-ver-resultados]");
  if (verN) verN.textContent = `Ver ${total} ${total === 1 ? "modelo" : "modelos"}`;
}

/**
 * Monta a mensagem com a lista que está na tela agora: respeita categoria,
 * variante, autonomia, promoção e busca. É o atalho que casa com a loja como
 * ela é — o cliente vai embora com a lista, sem precisar favoritar um a um.
 */
function pintarCtaLista() {
  const caixa = $("[data-cta-lista]");
  const link = $("[data-link-lista]");
  if (!caixa || !link) return;

  const lista = filtrar();
  caixa.hidden = lista.length === 0;
  if (!lista.length) return;

  // Com muitos modelos, mandar 40 nomes deixa o atendimento inviável.
  const envio = lista.slice(0, 12);
  const resto = lista.length - envio.length;

  const linhas = [
    "Olá, Kazoom Scooters! Vim pelo site e queria orçar estes modelos:",
    "",
    ...envio.map(
      (p, i) => `${i + 1}. *${p.nome}* (${p.id.toUpperCase()}) — ${formatarPreco(p.preco)}`
    ),
    resto > 0 ? `…e mais ${resto} ${resto === 1 ? "modelo" : "modelos"} da mesma lista.` : null,
    "",
    "Quais cores vocês têm disponíveis? E o frete para meu CEP?",
  ].filter((l) => l !== null);

  link.href = linkZap(linhas.join("\n"));
}

function sincronizarURL() {
  const p = new URLSearchParams();
  if (estado.q) p.set("q", estado.q);
  if (estado.categorias.size === 1) p.set("categoria", [...estado.categorias][0]);
  if (estado.soPromocao) p.set("promo", "1");
  const qs = p.toString();
  history.replaceState(null, "", qs ? `?${qs}` : location.pathname);
}

/* --------------------------------------------------------------------------
   Eventos
   -------------------------------------------------------------------------- */
function iniciarCatalogo() {
  const grade = $("[data-grade]");

  // Categoria (faceta lateral)
  $("[data-faceta-categorias]")?.addEventListener("click", (e) => {
    const b = e.target.closest("[data-cat]");
    if (!b || b.disabled) return;
    alternar(estado.categorias, b.dataset.cat);
    estado.visiveis = PASSO;
    aplicar();
  });

  // Variante (faceta lateral)
  $("[data-faceta-variantes]")?.addEventListener("click", (e) => {
    const b = e.target.closest("[data-var]");
    if (!b || b.disabled) return;
    alternar(estado.variantes, b.dataset.var);
    estado.visiveis = PASSO;
    aplicar();
  });

  // Faixa de autonomia (faceta lateral)
  $("[data-faceta-autonomia]")?.addEventListener("click", (e) => {
    const b = e.target.closest("[data-faixa]");
    if (!b || b.disabled) return;
    alternar(estado.faixas, b.dataset.faixa);
    estado.visiveis = PASSO;
    aplicar();
  });

  // Chips rápidos
  $("[data-chips-rapidos]")?.addEventListener("click", (e) => {
    const b = e.target.closest("[data-rapido]");
    if (!b) return;
    const id = b.dataset.rapido;
    if (id === "promo") estado.soPromocao = !estado.soPromocao;
    else alternar(estado.categorias, id);
    estado.visiveis = PASSO;
    aplicar();
  });

  // Promoção (checkbox da faceta)
  $("[data-check-promo]")?.addEventListener("change", (e) => {
    estado.soPromocao = e.target.checked;
    estado.visiveis = PASSO;
    aplicar();
  });

  // Ordenar
  $("[data-ordenar]")?.addEventListener("change", (e) => {
    estado.ordem = e.target.value;
    aplicar();
  });

  // Busca no catálogo
  const busca = $("[data-busca-catalogo]");
  if (busca) {
    let t;
    busca.addEventListener("input", () => {
      clearTimeout(t);
      t = setTimeout(() => {
        estado.q = busca.value.trim();
        estado.visiveis = PASSO;
        aplicar();
      }, 250);
    });
  }

  // Limpar
  $("[data-limpar-filtros]")?.addEventListener("click", () => {
    estado.q = "";
    estado.categorias.clear();
    estado.variantes.clear();
    estado.faixas.clear();
    estado.soPromocao = false;
    estado.ordem = "relevancia";
    estado.visiveis = PASSO;
    if (busca) busca.value = "";
    const check = $("[data-check-promo]");
    if (check) check.checked = false;
    const sel = $("[data-ordenar]");
    if (sel) sel.value = "relevancia";
    aplicar();
  });

  // Carregar mais
  $("[data-carregar-mais]")?.addEventListener("click", () => {
    estado.visiveis += PASSO;
    aplicar();
  });

  // Painel de filtros no mobile
  const painel = $("[data-filtros]");
  const abrir = () => {
    painel.classList.add("aberto");
    document.body.classList.add("travado");
  };
  const fechar = () => {
    painel.classList.remove("aberto");
    document.body.classList.remove("travado");
  };
  $("[data-abrir-filtros]")?.addEventListener("click", abrir);
  $("[data-fechar-filtros]")?.addEventListener("click", fechar);
  $("[data-ver-resultados]")?.addEventListener("click", fechar);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") fechar();
  });
}

function alternar(set, valor) {
  if (set.has(valor)) set.delete(valor);
  else set.add(valor);
}

/* --------------------------------------------------------------------------
   URL inicial
   -------------------------------------------------------------------------- */
function lerURL() {
  const q = param("q");
  const cat = param("categoria");
  const promo = param("promo");

  if (q) {
    estado.q = q.trim();
    const input = $("[data-busca-catalogo]");
    if (input) input.value = q;
  }
  if (cat && CATEGORIAS.some((c) => c.id === cat)) estado.categorias.add(cat);
  if (promo === "1") {
    estado.soPromocao = true;
    const check = $("[data-check-promo]");
    if (check) check.checked = true;
  }

  const h = $("[data-titulo]");
  if (h) {
    const nomeCat = CATEGORIAS.find((c) => c.id === cat)?.nome;
    h.textContent = nomeCat || (q ? `Busca por “${q}”` : "Todos os modelos");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  lerURL();
  iniciarCatalogo();
  aplicar();
});
