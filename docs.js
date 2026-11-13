/* ==========================================================================
   KAZOOM SCOOTERS — páginas de ajuda e políticas
   --------------------------------------------------------------------------
   Um template de documento para todas: cabeçalho com título, coluna lateral
   com o índice, corpo em linhas numeradas (01, 02…). O texto vem de
   DOCUMENTOS em dados.js — não reescrito aqui.
   ========================================================================== */

function listaDocs(tipo) {
  return Object.entries(DOCUMENTOS).filter(([, d]) => d.tipo === tipo);
}

function montarTabs(tipo) {
  const alvo = $("[data-tabs]");
  if (!alvo) return;
  const atual = param("doc");
  const base = tipo === "Ajuda" ? "ajuda.html" : "politicas.html";

  alvo.innerHTML = listaDocs(tipo)
    .map(([id, d]) => {
      const ativo = id === atual;
      return `<a class="pequeno" style="${
        ativo ? "font-weight:700;color:var(--tinta)" : "color:var(--mudo)"
      }" href="${base}?doc=${esc(id)}" ${ativo ? 'aria-current="page"' : ""}>
        ${esc(d.titulo)}
      </a>`;
    })
    .join("");
}

/** Corpo do guia de escolha: tabelas por perfil, peso e capacete. */
function corpoGuia() {
  const ordem = ["perfil", "peso", "capacete"];

  return `
    <div class="aviso-ilustrativo" style="margin-bottom:32px">
      ${icone("info")}
      <p>
        <strong>Dados ilustrativos.</strong> As tabelas do guia ainda não foram
        validadas com os modelos reais da loja. Antes de fechar, descreva seu
        trecho diário no WhatsApp e a equipe indica o modelo.
      </p>
    </div>

    <h2 class="titulo-secao" style="font-size:1.4rem;margin-bottom:16px">Como escolher</h2>
    <div class="como-medir">
      ${COMO_ESCOLHER.map(
        (m, i) => `<div class="como-medir__passo">
          <span class="como-medir__marca">${String.fromCharCode(65 + i)}</span>
          <span>${esc(m)}</span>
        </div>`
      ).join("")}
    </div>

    <p class="corpo-suave" style="max-width:66ch;margin-bottom:32px">
      Conta o ciclo completo: quanta autonomia sobra no fim da sua semana,
      como o scooter entra na sua rotina (elevador, prédio, carga), e onde
      ele guarda descanso. Modelo grande não serve se a rotina não comporta.
    </p>

    ${ordem
      .map((k) => {
        const t = GUIA_ESCOLHA[k];
        if (!t) return "";
        return `
        <section style="margin-bottom:48px">
          <h2 class="titulo-secao" style="font-size:1.4rem;margin-bottom:12px">${esc(t.titulo)}</h2>
          <table class="medidas-tabela">
            <caption>${esc(t.titulo)}</caption>
            <thead>
              <tr>${t.cabecalho.map((h) => `<th scope="col">${esc(h)}</th>`).join("")}</tr>
            </thead>
            <tbody>
              ${t.linhas
                .map((l) => `<tr>${l.map((c, i) => (i === 0 ? `<th scope="row">${esc(c)}</th>` : `<td>${esc(c)}</td>`)).join("")}</tr>`)
                .join("")}
            </tbody>
          </table>
        </section>`;
      })
      .join("")}

    <h2 class="titulo-secao" style="font-size:1.4rem;margin-bottom:12px">Entre dois perfis</h2>
    <div class="pilha-3" style="max-width:66ch">
      <p class="corpo-suave"><strong>Projeção pelo pior dia:</strong> se o seu trecho varia muito, escolha pela semana mais carregada — scooter subdimensionado vira chata no dia cansado.</p>
      <p class="corpo-suave"><strong>Peso do piloto é física:</strong> a autonomia anunciada cai com carga extra e ladeira. A margem do guia não é pessimismo, é folga para o pior caso.</p>
      <p class="corpo-suave"><strong>Dupla função, escolha dobrável:</strong> se existe ônibus, trem ou metrô no meio do caminho, a dobra vale mais do que um pouco mais de autonomia.</p>
      <p class="corpo-suave"><strong>Capacete nunca é improvisado:</strong> tamanho apertado não protege. Meça a circunferência da cabeça e escolha pela tabela.</p>
    </div>

    <div class="linha" style="margin-top:40px">
      <a class="btn btn--zap" target="_blank" rel="noopener"
         href="${esc(linkZap(mensagemGeral("Preciso de ajuda para escolher o modelo.")))}">
        ${icone("zap")} Tirar minhas dúvidas de escolha
      </a>
      <a class="btn btn--secundario" href="catalogo.html">Ver modelos</a>
    </div>`;
}

/** Corpo de contato: canais, atalhos e formulário que abre o WhatsApp. */
function corpoContato() {
  return `
    <div class="pilha-3" style="margin-bottom:40px;max-width:66ch">
      <p style="font-size:1.02rem">
        A loja atende pelo WhatsApp. Não há checkout online: a compra é
        combinada com a equipe, e é lá que a disponibilidade da cor ou do
        tamanho, o frete do seu CEP e o prazo são confirmados.
      </p>
      <p class="corpo-suave">
        A loja tem showroom em Gaspar, SC e oferece teste drive — dá para
        conhecer o modelo pessoalmente e combinar tudo por lá ou aqui mesmo
        (o teste drive é anunciado no Instagram @kazoomscooters).
      </p>
    </div>

    <div class="grade grade--2" style="margin-bottom:40px">
      <div class="pilha-2">
        <span class="filtro__titulo">WhatsApp</span>
        <a class="link-seta" style="font-size:1.05rem" target="_blank" rel="noopener"
           href="${esc(linkZap(mensagemGeral()))}">${esc(LOJA.whatsappFormatado)}</a>
        <p class="pequeno corpo-suave">${esc(LOJA.horario)}</p>
      </div>
      <div class="pilha-2">
        <span class="filtro__titulo">WhatsApp oficial (perfil)</span>
        <a class="link-seta" target="_blank" rel="noopener"
           href="${esc(LOJA.whatsappOficial)}">Canal oficial no WhatsApp</a>
        <p class="pequeno corpo-suave">Link direto do perfil @kazoomscooters no Instagram.</p>
      </div>
      <div class="pilha-2">
        <span class="filtro__titulo">Instagram</span>
        <a class="link-seta" target="_blank" rel="noopener"
           href="${esc(LOJA.instagram)}">${esc(LOJA.instagramHandle)}</a>
        <p class="pequeno corpo-suave">Perfil verificado · lançamentos, teste drive e clientes reais.</p>
      </div>
      <div class="pilha-2">
        <span class="filtro__titulo">E-mail</span>
        <p class="corpo-suave">ILUSTRATIVO — em definição com o cliente. Atendimento confirmado por WhatsApp.</p>
      </div>
      <div class="pilha-2">
        <span class="filtro__titulo">Showroom</span>
        <p style="font-weight:600">${esc(LOJA.retirada)}</p>
      </div>
      <div class="pilha-2">
        <span class="filtro__titulo">Horários</span>
        <p style="font-weight:600">${esc(LOJA.horario)}</p>
      </div>
    </div>

    <h2 class="titulo-secao" style="font-size:1.4rem;margin-bottom:8px">Já resolve antes?</h2>
    <div class="pilha-2" style="margin-bottom:40px;max-width:60ch">
      <a class="link-seta" href="ajuda.html?doc=guia-de-escolha">Escolher o modelo certo</a>
      <a class="link-seta" href="ajuda.html?doc=envios">Frete, prazo e retirada</a>
      <a class="link-seta" href="ajuda.html?doc=garantia">Garantia e pós-venda</a>
      <a class="link-seta" href="ajuda.html?doc=trocas">Trocas e devoluções</a>
    </div>

    <h2 class="titulo-secao" style="font-size:1.4rem;margin-bottom:8px">Mandar mensagem</h2>
    <p class="corpo-suave" style="max-width:62ch;margin-bottom:20px">
      O formulário abaixo não envia e-mail: ele abre o WhatsApp com a mensagem
      já escrita. Assim a resposta chega no canal que a loja já atende.
    </p>

    <form class="form" data-form-contato novalidate style="max-width:620px">
      <div class="campo">
        <label for="ct-nome">Seu nome</label>
        <input id="ct-nome" name="nome" type="text" autocomplete="name" required>
        <span class="campo__erro" data-erro="nome"></span>
      </div>
      <div class="campo">
        <label for="ct-assunto">Assunto</label>
        <select id="ct-assunto" name="assunto" required>
          <option value="">Selecione…</option>
          <option>Escolher modelo</option>
          <option>Disponibilidade de um modelo</option>
          <option>Frete e prazo</option>
          <option>Troca ou devolução</option>
          <option>Garantia e assistência</option>
          <option>Pedido já feito</option>
          <option>Outro assunto</option>
        </select>
        <span class="campo__erro" data-erro="assunto"></span>
      </div>
      <div class="campo">
        <label for="ct-msg">Mensagem</label>
        <textarea id="ct-msg" name="mensagem" required minlength="8"
                  placeholder="Se for sobre escolha, conte seu trecho diário e o peso com que vai usar."></textarea>
        <span class="campo__erro" data-erro="mensagem"></span>
      </div>
      <button class="btn btn--zap btn--grande" type="submit">${icone("zap")} Abrir no WhatsApp</button>
      <p class="aviso-cupom" data-sucesso style="font-size:.85rem;font-weight:600;color:var(--sucesso,#16a34a)"></p>
    </form>`;
}

/** Corpo padrão: linhas numeradas. */
function corpoLinhas(linhas) {
  return `<div class="pilha-6">${linhas
    .map(
      (l, i) => `
    <div class="linha" style="align-items:flex-start;gap:24px;flex-wrap:nowrap">
      <span style="font-family:var(--fonte-display);font-weight:800;font-size:1.4rem;line-height:1;color:var(--acento);min-width:40px;flex-shrink:0">
        ${String(i + 1).padStart(2, "0")}
      </span>
      <div style="min-width:0">
        <h2 class="titulo-secao" style="font-size:1.15rem;margin-bottom:8px">${esc(l.titulo)}</h2>
        <p class="corpo-suave" style="max-width:66ch">${esc(l.texto)}</p>
      </div>
    </div>`
    )
    .join("")}</div>`;
}

/* --------------------------------------------------------------------------
   Render
   -------------------------------------------------------------------------- */
function renderDoc() {
  // O grupo vem do próprio arquivo: politicas.html mostra Políticas, o resto
  // mostra Ajuda. Evita duplicar a lista de IDs em dois lugares.
  const ehPoliticas = location.pathname.includes("politicas");
  const grupo = ehPoliticas ? "Políticas" : "Ajuda";

  const pedido = param("doc");
  const fallback = grupo === "Ajuda" ? "guia-de-escolha" : "privacidade";
  const id = DOCUMENTOS[pedido] && DOCUMENTOS[pedido].tipo === grupo ? pedido : fallback;
  const doc = DOCUMENTOS[id];

  montarTabs(grupo);

  const tipoEl = $("[data-doc-tipo]");
  if (tipoEl) tipoEl.textContent = doc.tipo;

  const tituloEl = $("[data-doc-titulo]");
  if (tituloEl) tituloEl.textContent = doc.titulo;

  const resumoEl = $("[data-doc-resumo]");
  if (resumoEl) resumoEl.textContent = doc.resumo;

  const avisoEl = $("[data-doc-aviso]");
  if (avisoEl) {
    avisoEl.innerHTML = doc.aviso
      ? `<div class="aviso-ilustrativo">${icone("info")}<p>${esc(doc.aviso)}</p></div>`
      : "";
  }

  const migalha = $("[data-migalha]");
  if (migalha) migalha.textContent = doc.titulo;

  const corpoEl = $("[data-doc-corpo]");
  if (corpoEl) {
    if (doc.corpo === "guia") corpoEl.innerHTML = corpoGuia();
    else if (doc.corpo === "contato") corpoEl.innerHTML = corpoContato();
    else corpoEl.innerHTML = corpoLinhas(doc.linhas || []);

    // Âncora #guia usada pelo link "Como medir" da PDP
    if (location.hash === "#guia") {
      const t = corpoEl.querySelector(".medidas-tabela");
      t?.scrollIntoView({ block: "start" });
    }
  }

  document.title = `${doc.titulo} — Kazoom Scooters`;
  const meta = $('meta[name="description"]');
  if (meta) meta.setAttribute("content", doc.resumo);
}

/* --------------------------------------------------------------------------
   Formulário de contato (abre o WhatsApp, não envia e-mail)
   -------------------------------------------------------------------------- */
function iniciarFormulario() {
  const form = $("[data-form-contato]");
  if (!form) return;

  const REGRAS = {
    nome: (v) => (!v ? "Informe seu nome." : v.length < 3 ? "Nome muito curto." : ""),
    assunto: (v) => (v ? "" : "Selecione um assunto."),
    mensagem: (v) => (!v ? "Escreva sua mensagem." : v.length < 8 ? "Descreva com um pouco mais de detalhe." : ""),
  };

  const validar = (campo) => {
    const regra = REGRAS[campo.name];
    if (!regra) return true;
    const erro = regra(campo.value.trim());
    campo.closest(".campo")?.classList.toggle("campo--erro", Boolean(erro));
    const alvo = form.querySelector(`[data-erro="${campo.name}"]`);
    if (alvo) alvo.textContent = erro;
    return !erro;
  };

  $$("input, select, textarea", form).forEach((c) => c.addEventListener("blur", () => validar(c)));

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const campos = $$("input, select, textarea", form);
    let ok = true;
    let primeiro = null;
    campos.forEach((c) => {
      if (!validar(c)) {
        ok = false;
        if (!primeiro) primeiro = c;
      }
    });
    if (!ok) {
      primeiro?.focus();
      toast("Revise os campos destacados.", "erro");
      return;
    }

    const d = Object.fromEntries(new FormData(form));
    const texto = [
      `Olá, Kazoom Scooters!`,
      ``,
      `Assunto: ${d.assunto}`,
      `Meu nome é ${d.nome}.`,
      ``,
      d.mensagem,
    ].join("\n");

    window.open(linkZap(texto), "_blank", "noopener");
    const okEl = form.querySelector("[data-sucesso]");
    if (okEl) okEl.textContent = "Mensagem aberta no WhatsApp.";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderDoc();
  iniciarFormulario();
  iniciarReveal();
});
