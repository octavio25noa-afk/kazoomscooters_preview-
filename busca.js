/* ==========================================================================
   KAZOOM SCOOTERS — busca (painel)
   ========================================================================== */

/* Termos derivados do que a loja realmente tem. */
const ATALHOS_BUSCA = ["dobrável", "autonomia", "capacete", "patinete", "off-road"];

function buscar(termo) {
  if (!termo.trim()) return [];
  return PRODUTOS.filter((p) =>
    combinaTexto(termo, `${p.nome} ${p.descricao} ${Object.values(p.ficha).join(" ")}`)
  ).slice(0, 6);
}

function iniciarBusca() {
  const input = $("[data-busca-input]");
  if (!input) return;

  const cxSug = $("[data-busca-sugestoes]");
  const cxRes = $("[data-busca-resultados]");
  const form = $("[data-form-busca-painel]");

  function pintarSugestoes() {
    if (!cxSug) return;
    cxSug.innerHTML = `
      <p class="filtro__titulo" style="margin-top:24px">Sugestões</p>
      <div class="sugestoes">
        ${ATALHOS_BUSCA.map(
          (s) => `<button class="chip" type="button" data-sug="${esc(s)}">${esc(s)}</button>`
        ).join("")}
        ${CATEGORIAS.slice(0, 5)
          .map(
            (c) =>
              `<button class="chip" type="button" data-ir-categoria="${esc(c.id)}">${esc(c.nome)}</button>`
          )
          .join("")}
      </div>`;
  }

  function pintarResultados(termo) {
    if (!cxRes) return;
    if (!termo.trim()) {
      cxRes.innerHTML = "";
      return;
    }

    const lista = buscar(termo);

    if (!lista.length) {
      cxRes.innerHTML = `
        <div class="estado-vazio" style="padding:40px 20px">
          <h3 style="font-size:1.15rem">Nada encontrado para "${esc(termo)}"</h3>
          <p class="pequeno">A loja pode ter esse modelo no showroom sem estar no site ainda. Tente uma categoria:</p>
          <div class="sugestoes" style="justify-content:center">
            ${CATEGORIAS.slice(0, 4)
              .map((c) => `<button class="chip" type="button" data-ir-categoria="${esc(c.id)}">${esc(c.nome)}</button>`)
              .join("")}
          </div>
          <a class="btn btn--zap" style="margin-top:20px" target="_blank" rel="noopener"
             href="${esc(linkZap(mensagemGeral('Procuro por: ' + termo + '.')))}">Perguntar no WhatsApp</a>
        </div>`;
      return;
    }

    cxRes.innerHTML = `
      <p class="filtro__titulo" style="margin-bottom:12px">
        ${lista.length} ${lista.length === 1 ? "resultado" : "resultados"}
      </p>
      <div class="pilha-2">
        ${lista
          .map((p) => {
            const par = parcelas(p.preco);
            return `
            <a class="item-selecao" href="produto.html?id=${esc(p.id)}" style="grid-template-columns:64px 1fr auto">
              <span class="item-selecao__img" style="width:64px">
                <img src="${imagemPeca(p, 0)}" alt="" loading="lazy" width="200" height="260">
              </span>
              <span>
                <span class="item-selecao__nome">${esc(p.nome)}</span><br>
                <span class="item-selecao__meta">${par.n}x de ${formatarPreco(par.valor)}</span>
              </span>
              <span class="item-selecao__preco">${formatarPreco(p.preco)}</span>
            </a>`;
          })
          .join("")}
      </div>
      <a class="link-seta" style="margin-top:16px" href="catalogo.html?q=${encodeURIComponent(termo)}">
        Ver todos os resultados
      </a>`;
  }

  let debounce;
  input.addEventListener("input", () => {
    clearTimeout(debounce);
    debounce = setTimeout(() => pintarResultados(input.value), 180);
  });

  document.addEventListener("click", (e) => {
    const sug = e.target.closest("[data-sug]");
    if (sug) {
      input.value = sug.dataset.sug;
      pintarResultados(input.value);
      input.focus();
      return;
    }
    const ir = e.target.closest("[data-ir-categoria]");
    if (ir) {
      location.href = `catalogo.html?categoria=${ir.dataset.irCategoria}`;
    }
  });

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!input.value.trim()) return;
    location.href = `catalogo.html?q=${encodeURIComponent(input.value.trim())}`;
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest('[data-abrir-painel="busca"]')) return;
    setTimeout(() => {
      pintarSugestoes();
      input.focus();
    }, 40);
  });

  pintarSugestoes();
}
