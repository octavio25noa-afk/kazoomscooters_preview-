/* ==========================================================================
   KAZOOM SCOOTERS — home
   ========================================================================== */

function montarHero() {
  const desktop = $("[data-arte-hero='desktop']");
  if (desktop) desktop.src = arteHero("desktop");

  const mobile = $("[data-arte-hero-mobile]");
  if (mobile) mobile.innerHTML = `<img src="${arteHero("mobile")}" alt="" width="800" height="1000" fetchpriority="high">`;

  const historia = $("[data-arte-historia]");
  if (historia) historia.src = arteHistoria();
}

function montarIcones() {
  $$("[data-ic]").forEach((el) => (el.innerHTML = icone(el.dataset.ic)));
}

function montarBolhas() {
  const alvo = $("[data-bolhas]");
  if (alvo) alvo.innerHTML = CATEGORIAS.map(circuloCategoria).join("");
}

/**
 * "Novidades" não pode ser um filtro inventado. Como o catálogo é ilustrativo,
 * mostramos os modelos com preço promocional definido (precoAntes existe) — que
 * é a única "novidade" que os dados sustentam.
 */
function montarNovidades() {
  const comDesconto = PRODUTOS.filter((p) => p.precoAntes);
  const lista = [...comDesconto, ...PRODUTOS.filter((p) => !p.precoAntes)].slice(0, 4);
  renderProdutos($("[data-grade-novidades]"), lista);
}

function montarPorCategoria(chave, filtro, limite = 3) {
  renderProdutos(
    $(`[data-grade-${chave}]`),
    PRODUTOS.filter(filtro).slice(0, limite)
  );
}

/** Contadores da home calculados a partir do catálogo, para nunca ficarem desatualizados. */
function montarContadores() {
  $$("[data-total-modelos]").forEach((el) => (el.textContent = PRODUTOS.length));
  $$("[data-total-scooters]").forEach(
    (el) => (el.textContent = PRODUTOS.filter((p) => p.categoria !== "acessorios").length)
  );
}

/* Botão de menu mobile: agora é controlado pelo app.js (todas as páginas). */

document.addEventListener("DOMContentLoaded", () => {
  montarHero();
  montarIcones();
  montarBolhas();
  montarContadores();
  montarNovidades();
  montarPorCategoria("dobraveis", (p) => p.categoria === "dobraveis", 2);
  montarPorCategoria("offroad", (p) => p.categoria === "offroad", 2);
  montarPorCategoria("acessorios", (p) => p.categoria === "acessorios", 4);

  iniciarReveal();
});
