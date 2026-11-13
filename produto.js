/* ==========================================================================
   KAZOOM SCOOTERS — scripts da PDP
   --------------------------------------------------------------------------
   Ordem da coluna de compra (guia, Nichos > Eletrônico/técnico):
   breadcrumb → selo → nome → código → preço + parcelamento →
   FICHA RÁPIDA (autonomia, potência, velocidade, bateria…) →
   variantes (cor; tamanho no capacete) → quantidade → botão →
   nota de frete/prazo → descrição → acordeões (Ficha completa /
   Guia de escolha / Trocas / Garantia / Como funciona a compra) → contato.

   Estado esgotado: o botão vira "avise-me". Sem app de aviso automático por
   variante, então o formulário SÓ CAPTA o contato — e o texto diz isso.
   ========================================================================== */

let sel = { variante: "", quantidade: 1 };
let atual = null;

/** Acima de 32 km/h ou 1.000 W o modelo foge do enquadramento de autopropelido; a PDP avisa em cada ficha. */
const AVISO_VELOCIDADE =
  "Este modelo ultrapassa os limites de equipamento autopropelido da Resolução CONTRAN 996/2023 (32 km/h e 1.000 W de potência nominal). Nesse caso pode ser classificado como ciclomotor, com exigências de registro e habilitação. Confira as regras antes de usar em via pública.";

function renderizar(produto) {
  const area = $("[data-area-produto]");
  atual = produto;
  const cat = CATEGORIAS.find((c) => c.id === produto.categoria);
  const p = parcelas(produto.preco);
  const rotuloVar = rotuloVariante(produto);
  const ficha = Object.entries(produto.ficha || {});
  const todoEsgotado = produto.esgotado.length >= produto.variantes.length;
  // Velocidade acima de 32 km/h ou potência acima de 1.000 W merece o aviso do CONTRAN na ficha.
  const velTexto = String((produto.ficha || {}).velocidade || "");
  const velocidadeMax = Math.max(
    0,
    ...(velTexto.match(/(\d+)\s*km\/h/g) || []).map((m) => parseInt(m, 10))
  );
  // Potência nominal (primeiro número da ficha, antes do "W"); o "pico" não conta.
  const potMatch = String((produto.ficha || {}).potencia || "").match(/^\s*([\d.]+)\s*W/i);
  const potenciaW = potMatch ? parseInt(potMatch[1].replace(/\./g, ""), 10) : 0;
  const avisaVelocidade = velocidadeMax > 32 || potenciaW > 1000;

  // ---- Galeria: vistas do modelo (fotos reais quando existem; 4 vetoriais no fallback) ----
  const nVistas = produto.fotos && produto.fotos.length ? produto.fotos.length : 4;
  const miniaturas = [...Array(nVistas).keys()]
    .map(
      (i) => `<button class="pdp__miniatura" type="button" role="tab" data-mini="${i}"
        aria-selected="${i === 0}" aria-label="Vista ${i + 1} de ${nVistas}">
        <img src="${imagemPeca(produto, i)}" alt="" loading="lazy" width="200" height="260"></button>`
    )
    .join("");

  // ---- Selo: um por vez ----
  const selo = todoEsgotado
    ? `<span class="selo selo--esgotado">Esgotado no momento</span>`
    : produto.precoAntes
    ? `<span class="selo selo--acento">-${Math.round((1 - produto.preco / produto.precoAntes) * 100)}% neste modelo</span>`
    : "";

  area.innerHTML = `
  <article class="pdp">
    <!-- ============ GALERIA ============ -->
    <div class="pdp__galeria">
      <div class="pdp__foto">
        <img id="foto-principal" src="${imagemPeca(produto, 0)}"
             alt="${esc(produto.nome)}" width="200" height="260" fetchpriority="high">
      </div>
      <div class="pdp__miniaturas" role="tablist" aria-label="Vistas do modelo">${miniaturas}</div>
    </div>

    <!-- ============ COLUNA DE COMPRA ============ -->
    <div class="pdp__coluna">
      <div>
        <span class="card__cat">${esc(cat?.nome || "")}</span>
        ${selo ? `<div class="card__selos" style="position:static;margin-top:8px">${selo}</div>` : ""}
        <h1 class="titulo-produto" style="margin-top:8px">${esc(produto.nome)}</h1>
        <p class="pequeno corpo-suave">Código ${esc(produto.id.toUpperCase())} · Ilustrativo: preços e ficha pendentes de validação</p>
      </div>

      <!-- Preço + parcelamento -->
      <div>
        <div class="pdp__preco-linha">
          <span class="pdp__preco">${formatarPreco(produto.preco)}</span>
          ${produto.precoAntes ? `<span class="preco-antigo">${formatarPreco(produto.precoAntes)}</span>` : ""}
        </div>
        <div class="pdp__condicoes">
          <span><strong>${p.n}x de ${formatarPreco(p.valor)}</strong> sem juros</span>
          <span>ou <strong>${formatarPreco(produto.preco)} à vista</strong></span>
        </div>
      </div>

      <!-- FICHA RÁPIDA: o bloco que decide a compra em produto técnico -->
      ${
        ficha.length
          ? `<div class="ficha-rapida" aria-label="Ficha técnica resumida">
        ${ficha
          .filter(([k]) => !["certificado", "comprovação"].includes(k))
          .slice(0, 6)
          .map(
            ([k, v]) => `<div class="ficha-rapida__item">
          <span class="ficha-rapida__rotulo">${esc(ROTULOS_FICHA[k] || k)}</span>
          <span class="ficha-rapida__valor">${esc(v)}</span>
        </div>`
          )
          .join("")}
      </div>`
          : ""
      }

      <!-- Variante: cor do modelo, tamanho só no capacete -->
      <div class="variantes">
        <div class="variantes__linha">
          <span class="filtro__titulo" id="rot-var">${esc(rotuloVar)}</span>
          <a class="pequeno" style="text-decoration:underline;text-underline-offset:3px"
             href="ajuda.html?doc=guia-de-escolha#guia">Guia de escolha</a>
        </div>
        <div class="seletor" role="group" aria-labelledby="rot-var" data-seletor-variante>
          ${produto.variantes
            .map((t) => {
              const fora = produto.esgotado.includes(t);
              const cor = rotuloVar === "Cor" ? amostraCor(t) : null;
              return `<button class="seletor__opcao${cor ? " seletor__opcao--cor" : ""}" type="button" data-variante="${esc(t)}"
                ${fora ? "disabled" : ""} aria-pressed="false"
                ${fora ? 'title="Esgotado — chame no WhatsApp para avisar quando voltar"' : ""}
                >${cor ? `<span class="amostra" style="background:${cor}"></span>` : ""}${esc(t)}</button>`;
            })
            .join("")}
        </div>
        <p class="pequeno corpo-suave" data-aviso-variante>
          Variante riscada = ${rotuloVar === "Cor" ? "cor" : "tamanho"} esgotada. A disponibilidade muda;
          chame no WhatsApp que a loja confirma na hora.
        </p>
      </div>

      <!-- Quantidade -->
      <div class="variantes">
        <span class="filtro__titulo" id="rot-qtd">Quantidade</span>
        <div class="linha">
          <div class="qtd-mini">
            <button type="button" data-qtd="-1" aria-label="Diminuir quantidade">−</button>
            <span data-qtd-val aria-live="polite">1</span>
            <button type="button" data-qtd="1" aria-label="Aumentar quantidade">+</button>
          </div>
        </div>
      </div>

      <!-- Ações -->
      <div class="pdp__acoes" data-acoes-comprar>
        ${
          todoEsgotado
            ? `<button class="btn btn--grande btn--bloco" type="button" data-avise-me>
                 Avise-me quando voltar
               </button>
               <p class="pequeno corpo-suave">
                 O aviso chega no seu WhatsApp quando a loja repor. Não é
                 automático: quem te chama é a equipe da loja.
               </p>`
            : `<button class="btn btn--zap btn--grande btn--bloco" type="button" data-comprar>
                 ${icone("zap")} Consultar no WhatsApp
               </button>
               <button class="btn btn--secundario btn--bloco" type="button" data-salvar>
                 ${icone("coracao")} Salvar modelo
               </button>`
        }
      </div>

      <!-- Frete / prazo: bloco honesto, sem valor inventado -->
      <div class="calculadora-cep">
        <div style="flex:1 1 200px">
          <span class="filtro__titulo">Frete e prazo</span>
          <p class="pequeno corpo-suave" style="margin-top:2px">
            A loja calcula por WhatsApp, porque depende do CEP e do peso.
            Baterias viajam com regra própria de transporte de lítio.
            A retirada no showroom é sempre sem custo.
          </p>
        </div>
        <a class="btn btn--secundario" target="_blank" rel="noopener"
           href="${esc(linkZap(mensagemGeral("Quero saber o frete e o prazo para meu CEP.")))}">
          Calcular no WhatsApp
        </a>
      </div>

      <!-- Aviso obrigatório: preço ilustrativo -->
      <div class="aviso-ilustrativo">
        ${icone("info")}
        <p>
          <strong>Preço ilustrativo.</strong> Catálogo-base: a tabela oficial
          ainda não foi publicada. O valor confirmado é sempre o que a loja
          informa antes do pagamento.
        </p>
      </div>

      <!-- Descrição -->
      <p style="font-size:.98rem">${esc(produto.descricao)}</p>

      <!-- Acordeões -->
      <div>
        <details class="acordeao" open>
          <summary class="acordeao__gatilho">Ficha técnica completa</summary>
          <div class="acordeao__conteudo">
            <dl class="ficha-tabela">
              ${
                ficha.length
                  ? ficha
                      .map(
                        ([k, v]) => `<div class="ficha-tabela__linha">
                  <dt>${esc(ROTULOS_FICHA[k] || k)}</dt>
                  <dd>${esc(v)}</dd>
                </div>`
                      )
                      .join("")
                  : `<p class="corpo-suave">A ficha técnica deste modelo não foi carregada.</p>`
              }
            </dl>
            ${
              avisaVelocidade
                ? `<div class="aviso-ilustrativo" style="margin-top:12px">${icone("info")}
                     <p><strong>Enquadramento legal.</strong> ${esc(AVISO_VELOCIDADE)}</p>
                   </div>`
                : ""
            }
          </div>
        </details>

        <details class="acordeao" id="guia">
          <summary class="acordeao__gatilho">Guia de escolha</summary>
          <div class="acordeao__conteudo">
            <p>Modelo pelo perfil de uso, peso do piloto e — para o capacete — tamanho da cabeça. <em>(Dados ilustrativos — confirmar com a loja.)</em></p>
            <table class="medidas-tabela">
              <caption>${esc(GUIA_ESCOLHA.perfil.titulo)}</caption>
              <thead>
                <tr>${GUIA_ESCOLHA.perfil.cabecalho.map((h) => `<th scope="col">${esc(h)}</th>`).join("")}</tr>
              </thead>
              <tbody>
                ${GUIA_ESCOLHA.perfil.linhas
                  .map((l) => `<tr>${l.map((c, i) => (i === 0 ? `<th scope="row">${esc(c)}</th>` : `<td>${esc(c)}</td>`)).join("")}</tr>`)
                  .join("")}
              </tbody>
            </table>
            <table class="medidas-tabela" style="margin-top:24px">
              <caption>${esc(GUIA_ESCOLHA.capacete.titulo)}</caption>
              <thead>
                <tr>${GUIA_ESCOLHA.capacete.cabecalho.map((h) => `<th scope="col">${esc(h)}</th>`).join("")}</tr>
              </thead>
              <tbody>
                ${GUIA_ESCOLHA.capacete.linhas
                  .map((l) => `<tr>${l.map((c, i) => (i === 0 ? `<th scope="row">${esc(c)}</th>` : `<td>${esc(c)}</td>`)).join("")}</tr>`)
                  .join("")}
              </tbody>
            </table>
            <div class="como-medir">
              ${COMO_ESCOLHER.map(
                (m, i) => `<div class="como-medir__passo">
                  <span class="como-medir__marca">${String.fromCharCode(65 + i)}</span>
                  <span>${esc(m)}</span>
                </div>`
              ).join("")}
            </div>
            <p>
              No limite entre dois perfis? Descreva seu trecho diário no
              <a target="_blank" rel="noopener" href="${esc(linkZap(mensagemGeral("Preciso de ajuda para escolher o modelo.")))}">WhatsApp</a>
              que a loja indica o modelo.
            </p>
          </div>
        </details>

        <details class="acordeao" id="trocas">
          <summary class="acordeao__gatilho">Trocas e garantia</summary>
          <div class="acordeao__conteudo">
            <div class="pilha-2">
              <p><strong>Arrependimento:</strong> 7 dias corridos após o recebimento, sem precisar justificar (CDC, art. 49).</p>
              <p><strong>Troca de modelo:</strong> em até 7 dias, caixa fechada e sem uso. Combinada com a equipe.</p>
              <p><strong>Defeito de fabricação:</strong> com nota, a loja troca ou repara, sem custo.</p>
              <p><strong>Garantia:</strong> proposta da loja: 12 meses em motor, controlador e chassi; 3 meses em acessórios. Bateria perde alcance com o uso — é degradação natural, não defeito. Prazos ilustrativos, passar pela revisão da ficha.</p>
            </div>
            <p style="margin-top:12px">
              Detalhes em <a href="ajuda.html?doc=trocas">Trocas e devoluções</a>
              e <a href="ajuda.html?doc=garantia">Garantia</a>.
            </p>
          </div>
        </details>

        <details class="acordeao">
          <summary class="acordeao__gatilho">Como funciona a compra</summary>
          <div class="acordeao__conteudo">
            <div class="como-medir">
              <div class="como-medir__passo"><span class="como-medir__marca">A</span>
                <span>Você monta a seleção no site ou abre o WhatsApp de um modelo.</span></div>
              <div class="como-medir__passo"><span class="como-medir__marca">B</span>
                <span>A loja confirma a disponibilidade da cor, o frete do seu CEP e o prazo.</span></div>
              <div class="como-medir__passo"><span class="como-medir__marca">C</span>
                <span>Você paga ao confirmar (à vista ou em até 10x sem juros, condição ilustrativa).</span></div>
              <div class="como-medir__passo"><span class="como-medir__marca">D</span>
                <span>Retira no showroom ou recebe em casa, com o código de rastreio — e um teste de segurança guiado na primeira sessão.</span></div>
            </div>
          </div>
        </details>
      </div>

      <!-- Contato -->
      <div class="pilha-2" style="padding-top:8px">
        <span class="filtro__titulo">Falar com a loja</span>
        <p class="pequeno corpo-suave">
          Showroom em Gaspar, SC (oferecemos teste drive) ·
          ${esc(LOJA.horario)}
        </p>
        <div class="linha">
          <a class="btn btn--zap" target="_blank" rel="noopener" href="${esc(linkZap(mensagemGeral()))}">WhatsApp da loja</a>
          <a class="btn btn--secundario" href="ajuda.html?doc=contato">Onde estamos</a>
        </div>
      </div>
    </div>
  </article>

  <!-- Aviso de modelo esgotado (painel de captura de contato) -->
  <div class="painel" data-painel="avise" role="dialog" aria-modal="true" aria-label="Avisar quando voltar">
    <button class="painel__fundo" type="button" data-fechar-painel aria-label="Fechar"></button>
    <div class="painel__corpo" style="width:min(420px,100vw)">
      <div class="painel__topo">
        <span class="painel__titulo">Avise-me</span>
        <button class="icone-btn" type="button" data-fechar-painel aria-label="Fechar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>
        </button>
      </div>
      <div class="painel__conteudo pilha-4">
        <p class="corpo-suave pequeno">
          Este formulário <strong>não</strong> manda aviso automático: ele abre o
          WhatsApp com o pedido de aviso já escrito. Quem responde é a equipe da
          loja, no horário de atendimento.
        </p>
        <a class="btn btn--zap btn--grande btn--bloco" target="_blank" rel="noopener"
           data-link-avise href="${esc(linkZap(mensagemGeral()))}">
          ${icone("zap")} Avisar no WhatsApp
        </a>
      </div>
    </div>
  </div>`;

  // Estado inicial do seletor de variante
  const primeiro = produto.variantes.find((t) => !produto.esgotado.includes(t));
  if (primeiro) escolherVariante(primeiro);
  else sel.variante = "";

  document.title = `${produto.nome} — Kazoom Scooters`;
  const meta = $('meta[name="description"]');
  if (meta) meta.setAttribute("content", `${produto.nome}. ${produto.descricao}`.slice(0, 158));

  montarMigalhas(produto, cat);
  ligarEventos(produto);
  montarBarraCompra(produto);
}

function escolherVariante(t) {
  sel.variante = t;
  $$("[data-variante]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.variante === t)));
  const aviso = $("[data-aviso-variante]");
  if (aviso && atual) {
    aviso.textContent = `${rotuloVariante(atual)} ${t} selecionado. Confirme a disponibilidade no WhatsApp.`;
  }
  atualizarBarra();
}

function montarMigalhas(produto, cat) {
  const nav = $("[data-migalhas]");
  if (nav) {
    nav.innerHTML = `
      <a href="index.html" style="font-size:.85rem;color:var(--mudo)">Início</a>
      <span style="color:var(--mudo)">/</span>
      <a href="catalogo.html" style="font-size:.85rem;color:var(--mudo)">Modelos</a>
      <span style="color:var(--mudo)">/</span>
      <a href="catalogo.html?categoria=${esc(produto.categoria)}" style="font-size:.85rem;color:var(--mudo)">${esc(cat?.nome || "")}</a>
      <span style="color:var(--mudo)">/</span>
      <span aria-current="page" style="font-size:.85rem;font-weight:600">${esc(produto.nome)}</span>`;
  }
  const b = $("[data-barra-nome]");
  if (b) b.textContent = produto.nome;
}

/* --------------------------------------------------------------------------
   Barra de compra fixa (mobile)
   -------------------------------------------------------------------------- */
function montarBarraCompra(produto) {
  atualizarBarra();
}

function atualizarBarra() {
  if (!atual) return;
  const p = $("[data-barra-preco]");
  if (p) p.textContent = formatarPreco(atual.preco);
  // A mensagem precisa acompanhar a variante escolhida, senão a barra envia a
  // cor (ou tamanho) errado para a loja.
  const link = $("[data-barra-link]");
  if (link) link.href = linkZap(mensagemProduto(atual, sel.variante));
}

/* --------------------------------------------------------------------------
   Eventos
   -------------------------------------------------------------------------- */
function ligarEventos(produto) {
  // Galeria
  const principal = $("#foto-principal");
  if (principal) principal.style.transition = "opacity 140ms ease";
  $$("[data-mini]").forEach((b) => {
    b.addEventListener("click", () => {
      if (!principal) return;
      principal.style.opacity = "0";
      setTimeout(() => {
        principal.src = imagemPeca(produto, Number(b.dataset.mini));
        principal.style.opacity = "1";
      }, 130);
      $$("[data-mini]").forEach((x) => x.setAttribute("aria-selected", String(x === b)));
    });
  });

  // Variante
  $$("[data-variante]").forEach((b) => {
    b.addEventListener("click", () => {
      if (b.disabled) return;
      escolherVariante(b.dataset.variante);
    });
  });

  // Quantidade
  const saida = $("[data-qtd-val]");
  $$("[data-qtd]").forEach((b) => {
    b.addEventListener("click", () => {
      sel.quantidade = Math.min(Math.max(sel.quantidade + Number(b.dataset.qtd), 1), 10);
      if (saida) saida.textContent = sel.quantidade;
    });
  });

  // Comprar
  $("[data-comprar]")?.addEventListener("click", () => {
    if (!sel.variante) {
      toast(`Escolha uma ${rotuloVariante(produto).toLowerCase()} antes de continuar.`, "erro");
      const grupo = $("[data-seletor-variante]");
      grupo?.scrollIntoView({ block: "center", behavior: "smooth" });
      return;
    }
    window.open(linkZap(mensagemProduto(produto, sel.variante)), "_blank", "noopener");
  });

  // Salvar
  $("[data-salvar]")?.addEventListener("click", () => {
    Favoritos.alternar(produto.id);
    toast("Modelo salvo nos favoritos.");
  });

  // Avise-me (esgotado)
  $("[data-avise-me]")?.addEventListener("click", () => Painel.abrir("avise"));
  const linkAvise = $("[data-link-avise]");
  if (linkAvise) {
    linkAvise.href = linkZap(
      `Olá, Kazoom Scooters! Quero ser avisado quando voltar:\n\n*${produto.nome}*\nCódigo: ${produto.id.toUpperCase()}`
    );
  }

  // Âncoras #guia e #trocas abrem o acordeão correspondente
  if (location.hash) {
    const alvo = document.querySelector(location.hash);
    if (alvo?.tagName === "DETAILS") alvo.open = true;
  }
}

/* --------------------------------------------------------------------------
   Relacionados + vistos recentemente
   -------------------------------------------------------------------------- */
function montarRelacionados(produto) {
  const mesma = PRODUTOS.filter((p) => p.id !== produto.id && p.categoria === produto.categoria);
  const outras = PRODUTOS.filter((p) => p.id !== produto.id && p.categoria !== produto.categoria);
  const lista = [...mesma, ...outras].slice(0, 4);
  if (!lista.length) return;
  $("[data-area-relacionados]").hidden = false;
  renderProdutos($("[data-grade-relacionados]"), lista);
}

const CHAVE_VISTOS = "kazoom:vistos";
const MAX_VISTOS = 4;

function registrarVisita(id) {
  try {
    const l = JSON.parse(localStorage.getItem(CHAVE_VISTOS) || "[]").filter((x) => x !== id);
    l.unshift(id);
    localStorage.setItem(CHAVE_VISTOS, JSON.stringify(l.slice(0, MAX_VISTOS)));
  } catch {}
}

function montarVistos(atualId) {
  let ids = [];
  try {
    ids = JSON.parse(localStorage.getItem(CHAVE_VISTOS) || "[]");
  } catch {}
  const lista = ids.filter((id) => id !== atualId).map((id) => PRODUTOS.find((p) => p.id === id)).filter(Boolean);
  if (!lista.length) return;
  $("[data-area-recentes]").hidden = false;
  renderProdutos($("[data-grade-recentes]"), lista);
}

/* --------------------------------------------------------------------------
   Modelo não encontrado
   -------------------------------------------------------------------------- */
function naoEncontrado() {
  $("[data-area-produto]").innerHTML = `
    <div class="estado-vazio" style="padding:96px 24px;margin-bottom:64px">
      <h3>Modelo não encontrado</h3>
      <p>Esse código não existe mais no site. Pode ser um modelo que saiu de linha —
        a loja ainda tem outras opções e condições no WhatsApp.</p>
      <div class="linha" style="justify-content:center">
        <a class="btn" href="catalogo.html">Ver todos os modelos</a>
        <a class="btn btn--zap" target="_blank" rel="noopener" href="${esc(linkZap(mensagemGeral("Procuro um modelo que saiu do site.")))}">Perguntar no WhatsApp</a>
      </div>
    </div>`;
  document.title = "Modelo não encontrado — Kazoom Scooters";
}

document.addEventListener("DOMContentLoaded", () => {
  const produto = PRODUTOS.find((p) => p.id === param("id"));

  if (produto) {
    renderizar(produto);
    montarRelacionados(produto);
    registrarVisita(produto.id);
    montarVistos(produto.id);
  } else {
    naoEncontrado();
  }

  iniciarBarraCompra();
  iniciarReveal();
});
