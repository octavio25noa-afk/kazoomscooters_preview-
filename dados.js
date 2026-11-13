/* ==========================================================================
   KAZOOM SCOOTERS — dados
   --------------------------------------------------------------------------
   ATENÇÃO — origem de cada campo:
     · CONFIRMADO pelo Instagram @kazoomscooters (perfil verificado): nome,
       cidade (Gaspar, SC), oferta de teste drive e link oficial de WhatsApp.
       Ver VALIDAR.md §0 antes de alterar esses campos.
     · Todo o resto é ILUSTRATIVO (preços, fichas técnicas, horários,
       endereço de rua), marcado e listado em VALIDAR.md.
     · O WhatsApp real usa um número de marcador (5500000000000) de
       propósito: não pode disparar mensagem para um número real de ninguém.
       O link oficial do perfil (wa.me/message/…) fica em `whatsappOficial`.
     · Imagens: todas as imagens são silhuetas vetoriais geradas por código
       (SILHUETAS em js/app.js). O suporte a foto real existe em imagemPeca:
       basta adicionar `fotos: [...]` no produto com os arquivos em img/
       (substituir pelas fotos dos modelos da loja — VALIDAR.md §2.2).
   ========================================================================== */

const LOJA = {
  nome: "Kazoom Scooters",
  // MARCADOR — substituir pelo número real da loja (VALIDAR.md §1)
  whatsapp: "5500000000000",
  whatsappFormatado: "(00) 00000-0000",
  // CONFIRMADO — link oficial de WhatsApp do perfil @kazoomscooters.
  // Não expõe o número e não aceita mensagem pré-escrita (?text=): por isso
  // os CTAs com texto continuam no marcador até o número real ser confirmado.
  whatsappOficial: "https://wa.me/message/7IMOEWVABPDXD1",
  // CONFIRMADO — perfil verificado (VALIDAR.md §0)
  instagram: "https://www.instagram.com/kazoomscooters/",
  instagramHandle: "@kazoomscooters",
  // CONFIRMADO — bio: "Venha conhecer a Kazoom em Gaspar, SC!"
  cidade: "Gaspar, SC",
  // ILUSTRATIVO — confirmar com a loja
  horario: "Seg a sex, 9h às 18h · Sáb, 9h às 13h",
  // Cidade confirmada pelo Instagram; endereço de rua ainda pendente.
  retirada: "Showroom em Gaspar, SC (endereço completo a confirmar)",
  // ILUSTRATIVO — confirmar se a loja quer parcelamento e em quantas vezes
  parcelasMax: 10,
};

/* --------------------------------------------------------------------------
   Categorias — a vitrine toda do nicho
   -------------------------------------------------------------------------- */
const CATEGORIAS = [
  { id: "urbanos", nome: "Urbano", silhueta: "scooter", fundo: "#e6ead9" },
  { id: "dobraveis", nome: "Dobráveis", silhueta: "scooter", fundo: "#e0e7ec" },
  { id: "offroad", nome: "Off-road", silhueta: "scooter", fundo: "#ece5d7" },
  { id: "performance", nome: "Performance", silhueta: "scooter", fundo: "#e9e1ea" },
  { id: "acessorios", nome: "Acessórios", silhueta: "capacete", fundo: "#e7e2d8" },
];

/* --------------------------------------------------------------------------
   /variantes — cores do produto (tamanho só no capacete)
   -------------------------------------------------------------------------- */
const VARIANTES_BASE = {
  cores: ["Preto", "Grafite", "Off-white", "Midnight"],
  capacete: ["S", "M", "L"],
  unico: ["Único"],
};

/* --------------------------------------------------------------------------
   Produtos
   `preco` é ILUSTRATIVO — ver VALIDAR.md
   `esgotado` marca indisponibilidade por variante (estado de PDP)
   `ficha` alimenta os blocos de ficha técnica da PDP
   `autonomiaKm` alimenta o filtro de autonomia no catálogo (só scooters)
   -------------------------------------------------------------------------- */
const PRODUTOS = [
  /* ---------------- URBANO ---------------- */
  {
    id: "kaz-01",
    nome: "Kazoom Go 8",
    categoria: "urbanos",
    silhueta: "scooter",
    preco: 1899.9,
    precoAntes: 2199.9,
    variantes: VARIANTES_BASE.cores.slice(0, 2),
    esgotado: [],
    autonomiaKm: 25,
    descricao:
      "A entrada da linha: leve de subir a calçada e de carregar apertado e compacto pelo elevador. 8,5\u2033 pneumáticos que absorvem a calçada imperfeita e freio elétrico com disco mecânico atrás.",
    ficha: {
      potencia: "350 W (pico 500 W)",
      autonomia: "até 25 km por carga",
      velocidade: "25 km/h — limite do modo padrão",
      bateria: "36 V · 7,8 Ah (280 Wh)",
      carga: "4 h",
      suporte: "100 kg",
      peso: "13 kg",
      pneus: "8,5\u2033 pneumáticos",
      freios: "Elétrico + disco traseiro",
      iluminacao: "Farol LED dianteiro + freio acende",
    },
    ilustrativo: true,
  },
  {
    id: "kaz-02",
    nome: "Kazoom City 500",
    categoria: "urbanos",
    silhueta: "scooter",
    preco: 2899.9,
    precoAntes: null,
    variantes: VARIANTES_BASE.cores.slice(0, 2),
    esgotado: [],
    autonomiaKm: 40,
    descricao:
      "O commute com folga de sobra: autonomia para a semana inteira de deslocamentos curtos, 10\u2033 tubeless e suspensão dianteira para quando o asfalto acaba. Freio regenerativo no guidão.",
    ficha: {
      potencia: "500 W (pico 720 W)",
      autonomia: "até 40 km por carga",
      velocidade: "32 km/h — limite legal de via pública (CONTRAN 996/2023)",
      bateria: "36 V · 10,4 Ah (374 Wh)",
      carga: "5,5 h",
      suporte: "120 kg",
      peso: "17 kg",
      pneus: "10\u2033 tubeless",
      freios: "Disco dianteiro + regenerativo",
      iluminacao: "Farol LED + lanterna traseira",
    },
    ilustrativo: true,
  },

  /* ---------------- DOBRÁVEIS ---------------- */
  {
    id: "kaz-03",
    nome: "Kazoom Fold Air",
    categoria: "dobraveis",
    silhueta: "scooterDobravel",
    preco: 3499.9,
    precoAntes: 3999.9,
    variantes: VARIANTES_BASE.cores.slice(0, 2),
    esgotado: [],
    autonomiaKm: 55,
    descricao:
      "Para quem mistura scooter com ônibus ou trem: dobra em 3 segundos, fica em pé dobrado no armário e a bateria vem com identificação de transporte de lítio. Suporte ao guidão ajustável na altura.",
    ficha: {
      potencia: "500 W (pico 800 W)",
      autonomia: "até 55 km por carga",
      velocidade: "32 km/h em via pública (CONTRAN 996/2023)",
      bateria: "36 V · 15,6 Ah (561 Wh)",
      carga: "6 h",
      suporte: "120 kg",
      peso: "19 kg",
      pneus: "10\u2033 pneumáticos",
      freios: "Disco dianteiro + elétrico",
      iluminacao: "Farol LED + lanterna + freio",
      dobravel: "Sim — dobradura central, 3 segundos",
    },
    ilustrativo: true,
  },
  {
    id: "kaz-04",
    nome: "Kazoom Fold Lite",
    categoria: "dobraveis",
    silhueta: "scooterDobravel",
    preco: 2499.9,
    precoAntes: null,
    variantes: VARIANTES_BASE.cores.slice(0, 2),
    esgotado: ["Off-white"],
    autonomiaKm: 30,
    descricao:
      "O mais leve da linha dobrável: cabe no rack do carro e sobe escadas curtas sem drama. Para trechos curtos de dia, com bateria removível para carregar fora do deck.",
    ficha: {
      potencia: "350 W (pico 500 W)",
      autonomia: "até 30 km por carga",
      velocidade: "25 km/h",
      bateria: "36 V · 9,6 Ah (345 Wh) — removível",
      carga: "4,5 h",
      suporte: "110 kg",
      peso: "15 kg",
      pneus: "8,5\u2033 pneumáticos",
      freios: "Elétrico + pé",
      iluminacao: "Farol LED dianteiro",
      dobravel: "Sim — dobradura de 4 s",
    },
    ilustrativo: true,
  },

  /* ---------------- OFF-ROAD ---------------- */
  {
    id: "kaz-05",
    nome: "Kazoom Trail Pro",
    categoria: "offroad",
    silhueta: "scooter",
    preco: 6999.9,
    precoAntes: 7999.9,
    variantes: VARIANTES_BASE.cores.slice(0, 2),
    esgotado: [],
    autonomiaKm: 80,
    descricao:
      "Suspensão dupla hidráulica, pneus off-road de 11\u2033 e bateria grande para trilha longa. Velocidade reforçada está bloqueada por senha e limitada em via pública.",
    ficha: {
      potencia: "1.000 W (pico 1.400 W)",
      autonomia: "até 80 km por carga",
      velocidade: "55 km/h em propriedade privada · limitado a 32 km/h em via pública",
      bateria: "48 V · 20,8 Ah (998 Wh)",
      carga: "9 h",
      suporte: "150 kg",
      peso: "34 kg",
      pneus: "11\u2033 off-road tubeless",
      freios: "Disco hidráulico dianteiro e traseiro",
      iluminacao: "Farol LED duplo + lanterna",
      suspensao: "Hidráulica dupla, dianteira e traseira",
    },
    ilustrativo: true,
  },
  {
    id: "kaz-06",
    nome: "Kazoom Trail X2",
    categoria: "offroad",
    silhueta: "scooter",
    preco: 5499.9,
    precoAntes: null,
    variantes: VARIANTES_BASE.cores.slice(0, 2),
    esgotado: ["Grafite"],
    autonomiaKm: 60,
    descricao:
      "Off-road de entrada com a mesma família de pneus e suspensão: para trilha leve e estrada de terra. Chassi reforçado com barra central e plataforma antideslizante.",
    ficha: {
      potencia: "800 W (pico 1.100 W)",
      autonomia: "até 60 km por carga",
      velocidade: "45 km/h em propriedade privada · limitado a 32 km/h em via pública",
      bateria: "48 V · 18 Ah (864 Wh)",
      carga: "8 h",
      suporte: "140 kg",
      peso: "29 kg",
      pneus: "10\u2033 off-road tubeless",
      freios: "Disco dianteiro + elétrico",
      iluminacao: "Farol LED + lanterna",
      suspensao: "Dianteira hidráulica + traseira mola",
    },
    ilustrativo: true,
  },

  /* ---------------- PERFORMANCE ---------------- */
  {
    id: "kaz-07",
    nome: "Kazoom GT 1200",
    categoria: "performance",
    silhueta: "scooter",
    preco: 8999.9,
    precoAntes: null,
    variantes: ["Grafite", "Midnight"],
    esgotado: ["Midnight"],
    autonomiaKm: 90,
    descricao:
      "O topo da linha: aceleração imediata, pneus 10\u2033 de perfil esportivo e bateria para a rota longa da cidade. O quadro traz pintura anti-risco e base de guidão reforçada.",
    ficha: {
      potencia: "1.200 W (pico 1.800 W)",
      autonomia: "até 90 km por carga",
      velocidade: "55 km/h em propriedade privada · limitado a 32 km/h em via pública",
      bateria: "48 V · 24 Ah (1.152 Wh)",
      carga: "10 h",
      suporte: "150 kg",
      peso: "33 kg",
      pneus: "10\u2033 esportivos tubeless",
      freios: "Disco hidráulico duplo",
      iluminacao: "Farol LED duplo + lanterna de direção",
      suspensao: "Dianteira telescópica + traseira mola",
    },
    ilustrativo: true,
  },

  /* ---------------- ACESSÓRIOS ---------------- */
  {
    id: "kaz-08",
    nome: "Capacete Urban Pro",
    categoria: "acessorios",
    silhueta: "capacete",
    preco: 249.9,
    precoAntes: null,
    variantes: VARIANTES_BASE.capacete,
    tipoVariante: "tamanho",
    esgotado: ["S"],
    descricao:
      "Capacete de casco externo ABS, luz traseira embutida e 12 entradas de ventilação. A viseira removível trava em duas posições.",
    ficha: {
      certificado: "Inmetro — ILUSTRATIVO: confirmar número de homologação",
      peso: "≈ 380 g",
      ventilacao: "12 entradas de ar",
      ajuste: "Regulagem com roda de encaixe · viseira removível",
      iluminacao: "Luz traseira de 3 modos",
    },
    ilustrativo: true,
  },
  {
    id: "kaz-09",
    nome: "Bateria de reserva 36 V · 10 Ah",
    categoria: "acessorios",
    silhueta: "bateria",
    preco: 1499.9,
    precoAntes: null,
    variantes: VARIANTES_BASE.unico,
    esgotado: [],
    descricao:
      "Bateria reserva para dobrar a autonomia do dia sem esperar carga: uma no deck, a outra no carregador. Acompanha base de transporte compatível com os modelos 36 V da linha.",
    ficha: {
      bateria: "36 V · 10 Ah (360 Wh)",
      carga: "5,5 h com o carregador original",
      peso: "3,1 kg",
      compatibilidade: "Kazoom Go 8 · City 500 · Fold Air · Fold Lite",
      transportar: "Transporte de lítio exige regras próprias — o envio é combinado no WhatsApp",
    },
    ilustrativo: true,
  },
  {
    id: "kaz-10",
    nome: "Cadeado dobrável PB Pro",
    categoria: "acessorios",
    silhueta: "cadeado",
    preco: 189.9,
    precoAntes: null,
    variantes: VARIANTES_BASE.unico,
    esgotado: [],
    descricao:
      "Cadeado de elos em aço com revestimento de polímero, dobra em três segmentos e vai no canto traseiro do deck com suporte embutido.",
    ficha: {
      material: "Aço endurecido com revestimento de polímero",
      comprimento: "60 cm aberto · 22 cm dobrado",
      peso: "0,9 kg",
      seguranca: "Nível 5 de segurança (escala da marca) — ILUSTRATIVO",
    },
    ilustrativo: true,
  },
  {
    id: "kaz-11",
    nome: "Kit de manutenção essencial",
    categoria: "acessorios",
    silhueta: "kit",
    preco: 129.9,
    precoAntes: 159.9,
    variantes: VARIANTES_BASE.unico,
    esgotado: [],
    descricao:
      "O kit que complica menos no dia a dia: chaves Allen, desmontável de pneu, remendo e bomba. Cabe tudo no estojo rígido que vai na mochila.",
    ficha: {
      inclui: "Chaves Allen 3, 4 e 5 mm · desmontáveis de pneu · kit de remendo · bomba portátil · bico de válvula",
      peso: "0,8 kg",
      estojo: "Rígido, com encaixe elástico por peça",
    },
    ilustrativo: true,
  },
];

/* --------------------------------------------------------------------------
   Rótulos da ficha técnica (ordem de exibição na PDP)
   -------------------------------------------------------------------------- */
const ROTULOS_FICHA = {
  potencia: "Potência",
  autonomia: "Autonomia",
  velocidade: "Velocidade",
  bateria: "Bateria",
  carga: "Tempo de carga",
  suporte: "Carga suportada",
  peso: "Peso",
  pneus: "Pneus",
  freios: "Freios",
  iluminacao: "Iluminação",
  suspensao: "Suspensão",
  dobravel: "Dobrável",
  certificado: "Certificação",
  ventilacao: "Ventilação",
  ajuste: "Ajuste",
  compatibilidade: "Compatibilidade",
  transportar: "Transporte",
  material: "Material",
  comprimento: "Comprimento",
  seguranca: "Segurança",
  inclui: "Acompanha",
  estojo: "Estojo",
};

/* --------------------------------------------------------------------------
   /Faixas do filtro de autonomia no catálogo
   -------------------------------------------------------------------------- */
const FREQUENCIAS_AUTONOMIA = [
  { id: "ate-30", nome: "Até 30 km", teste: (km) => km <= 30 },
  { id: "30-60", nome: "30 a 60 km", teste: (km) => km > 30 && km <= 60 },
  { id: "mais-60", nome: "Mais de 60 km", teste: (km) => km > 60 },
];

/* --------------------------------------------------------------------------
   Guia de escolha — substitui o guia de medidas do template de moda.
   É o bloco que reduz devolução e dúvida no WhatsApp: escolher o modelo
   pelo perfil de uso, pelo peso do piloto e pelo tamanho do capacete.
   Todas as tabelas são ILUSTRATIVAS. Substituir pela tabela real da loja.
   -------------------------------------------------------------------------- */
const GUIA_ESCOLHA = {
  perfil: {
    titulo: "Modelo por perfil de uso",
    cabecalho: ["Uso típico", "Autonomia sugerida", "Potência sugerida", "Peso do scooter"],
    linhas: [
      ["Trecho curto (até 4 km por dia)", "até 25 km", "350 W", "até 14 kg"],
      ["Commute diário (5 a 10 km)", "30 a 55 km", "450–500 W", "até 20 kg"],
      ["Mistura com ônibus ou trem", "30 a 45 km + dobra", "450–500 W", "até 20 kg"],
      ["Terreno irregular ou uso intenso", "60 km ou mais", "800–1.000 W", "28 kg ou mais"],
    ],
  },
  peso: {
    titulo: "Modelo pelo peso do piloto e do scooter",
    cabecalho: ["Peso do piloto", "Autonomia real esperada", "Linha indicada"],
    linhas: [
      ["até 70 kg", "a tabela de autonomia se aplica", "Toda a linha"],
      ["70 a 90 kg", "reserve 15% a menos que a tabela", "City · Fold · Off-road"],
      ["90 a 110 kg", "reserve 25% a menos e vale pneu maior", "Off-road · GT"],
      ["110 a 150 kg", "peça recomendação no WhatsApp", "Off-road · GT"],
    ],
  },
  capacete: {
    titulo: "Tamanho do capacete",
    cabecalho: ["Tamanho", "Circunferência da cabeça", "Observação"],
    linhas: [
      ["S", "52–54 cm", "fit aperta na testa"],
      ["M", "54–56 cm", "medida mais comum"],
      ["L", "56–58 cm", "folga na nuca"],
    ],
  },
};

const COMO_ESCOLHER = [
  "Percurso: some a ida e a volta do seu dia e reserve 20% de margem de autonomia além disso.",
  "Peso: a autonomia anunciada vale para um piloto de ±70 kg em asfalto plano e sem vento. Acima disso, reserve margem extra.",
  "Terreno: pneu pneumático absorve a calçada da cidade; o elemento-chave do off-road é a suspensão, e não a velocidade.",
  "Rotina: pese o scooter na escada e no elevador do prédio antes de decidir — o dobro de peso se sente todos os dias.",
  "Regras: em via pública o limite é 32 km/h (Resolução CONTRAN 996/2023). Acima disso é uso de propriedade privada.",
];

/* --------------------------------------------------------------------------
   Conteúdo das páginas de ajuda e políticas
   TEMA JURÍDICO: o texto das políticas precisa de revisão jurídica antes de
   publicar (VALIDAR.md). O piso legal (arrependimento em 7 dias, CDC art. 49)
   está presente como referência.
   -------------------------------------------------------------------------- */
const DOCUMENTOS = {
  "guia-de-escolha": {
    tipo: "Ajuda",
    titulo: "Guia de escolha",
    resumo:
      "Como escolher o modelo pelo perfil de uso, pelo peso do piloto e o tamanho certo do capacete.",
    corpo: "guia",
  },
  envios: {
    tipo: "Ajuda",
    titulo: "Envios e retirada",
    resumo:
      "Retirada no showroom, envio por transportadora e como vai a bateria de reserva.",
    corpo: "texto",
    linhas: [
      {
        titulo: "Retirada no showroom",
        texto: "ILUSTRATIVO — o showroom fica em Gaspar, SC (confirmado no Instagram da loja), mas o endereço de rua ainda não está confirmado. A retirada será sem custo, assim que o modelo for separado e conferido.",
      },
      {
        titulo: "Envio por transportadora",
        texto: "ILUSTRATIVO — o frete é calculado por CEP e peso, e confirmado no WhatsApp antes de qualquer pagamento. Scooters de performance vão em caixa reforçada e pallet, com prazo maior.",
      },
      {
        titulo: "Bateria de reserva",
        texto: "Baterias de lítio seguem regras de transporte próprias, que variam por transportadora e distância. A loja confirma o que é possível para o seu CEP antes de fechar o pedido.",
      },
      {
        titulo: "Prazo",
        texto: "ILUSTRATIVO — depois da confirmação, o envio de acessórios leva em média 2 a 6 dias úteis; de scooters, 3 a 10 dias úteis. O prazo real é informado no WhatsApp junto com o rastreio.",
      },
      {
        titulo: "Embalagem",
        texto: "Cada scooter sai na caixa original, com os cabos presos e o guidão desacoplado conforme a montagem de fábrica. O kit de segurança (farol, refletores e manuais) vem dentro do deck.",
      },
    ],
  },
  trocas: {
    tipo: "Ajuda",
    titulo: "Trocas e devoluções",
    resumo: "Prazo de arrependimento, troca de modelo e comunicação de defeito.",
    corpo: "texto",
    linhas: [
      {
        titulo: "Arrependimento — 7 dias",
        texto: "Pelo Código de Defesa do Consumidor (art. 49), você tem 7 dias corridos após o recebimento para desistir da compra e pedir a devolução, sem precisar justificar o motivo.",
      },
      {
        titulo: "Troca de modelo",
        texto: "ILUSTRATIVO — dentro dos 7 dias, aceitamos troca de modelo com a caixa fechada, sem marcas de uso e com o selo intacto. Depois dos 7 dias, vale revisar caso a caso com a equipe do WhatsApp.",
      },
      {
        titulo: "Defeito (diferença, defeito de fabricação)",
        texto: "Com nota, defeito de fabricação é resolvido por troca ou reparo, sem custo e sem prazo de carência. Comunicar o quanto antes ajuda a diagnosticar.",
      },
      {
        titulo: "Como pedir",
        texto: "Mande o número do pedido (ou a foto da nota) no WhatsApp da loja. A equipe orienta sobre embalagem de devolução e como seguimos com o reenvio.",
      },
    ],
  },
  garantia: {
    tipo: "Ajuda",
    titulo: "Garantia",
    resumo: "O que fica coberto, por quanto tempo, e o que a degradação natural não cobre.",
    corpo: "texto",
    aviso: "ILUSTRATIVO — os prazos de garantia são propostos, não garantidos. Confirmar com o fornecedor e revisar juridicamente antes de publicar.",
    linhas: [
      {
        titulo: "Piso legal",
        texto: "Por lei, qualquer produto tem garantia mínima legal de 90 dias contra defeitos ocultos (CDC, art. 26). Os prazos abaixo são os que a loja propõe endossar.",
      },
      {
        titulo: "Prazo proposto — 12 meses",
        texto: "ILUSTRATIVO — 12 meses de garantia contra defeito de fabricação no motor, no controlador, no guidão e no chassi dos scooters, e 3 meses para acessórios, contados da entrega.",
      },
      {
        titulo: "Bateria",
        texto: "ILUSTRATIVO — cobre defeito de fabricação das células. Não cobre degradação natural de capacidade: a bateria perde alcance com os ciclos, e isso é química, não defeito. Referência de fábrica: cerca de 80% da capacidade após 300–500 ciclos de carga — confirmar com o fornecedor.",
      },
      {
        titulo: "O que se acumula como uso",
        texto: "Desgaste de pneus, pastilhas, suporte do guidão após queda e desgaste da dobra não são cobertos — peças de consumo. A loja vende a reposição e orienta a troca com vídeo.",
      },
      {
        titulo: "Como acionar",
        texto: "Mande vídeo curto do comportamento anormal e o número do pedido no WhatsApp. A loja encaminha para a assistência autorizada ou orienta o reparo no próprio showroom.",
      },
    ],
  },
  contato: {
    tipo: "Ajuda",
    titulo: "Fale com a gente",
    resumo: "WhatsApp, e-mail (a confirmar), endereço do showroom e horários.",
    corpo: "contato",
  },
  privacidade: {
    tipo: "Políticas",
    titulo: "Política de privacidade",
    resumo: "Quais dados coletamos, por que coletamos e como pedir a exclusão.",
    corpo: "texto",
    aviso: "ILUSTRATIVO — precisa de revisão jurídica antes de publicar.",
    linhas: [
      {
        titulo: "Dados que coletamos",
        texto: "Nome, telefone e endereço, informados por você no WhatsApp ou no painel de preferências deste site, para separar, enviar e trocar o pedido. Também registramos a sua mensagem de atendimento.",
      },
      {
        titulo: "Para que usamos",
        texto: "Apenas para executar a venda: confirmar o pedido, enviar, emitir a nota e comunicar sobre a entrega e garantia. Não vendemos dados a terceiros.",
      },
      {
        titulo: "Bases legais",
        texto: "Execução de contrato (art. 7º, V da LGPD) para o pedido e consentimento (art. 7º, I) para comunicações de marketing e cookies opcionais.",
      },
      {
        titulo: "Seus direitos",
        texto: "Você pode pedir confirmação de tratamento, acesso, correção, portabilidade, anonimização ou exclusão a qualquer momento, pelo WhatsApp ou pelo painel de cookies deste site.",
      },
      {
        titulo: "Retenção",
        texto: "Dados de pedidos são mantidos pelo prazo exigido pela legislação tributária. Dados de marketing e de cookies são mantidos até você pedir a saída ou limpar o consentimento.",
      },
    ],
  },
  reembolso: {
    tipo: "Políticas",
    titulo: "Política de reembolso",
    resumo: "Prazos, condições e o que acontece depois que a devolução chega.",
    corpo: "texto",
    aviso: "ILUSTRATIVO — precisa de revisão jurídica antes de publicar.",
    linhas: [
      {
        titulo: "Prazo de análise",
        texto: "A devolução é analisada em até 5 dias úteis depois de recebida no endereço informado pela loja.",
      },
      {
        titulo: "Forma de reembolso",
        texto: "O valor é devolvido pelo mesmo meio de pagamento usado na compra, em até 10 dias úteis após a análise.",
      },
      {
        titulo: "O que não é aceito",
        texto: "Scooter aberto e usado fora do teste de segurança de 10 minutos em área interna, caixa violada sem selo, acessório com vestígios de uso fora da embalagem ou bateria com marca de dano mecânico.",
      },
      {
        titulo: "Custo de reenvio",
        texto: "No arrependimento de 7 dias, o custo do reenvio é do cliente. Em produto com defeito, é da loja.",
      },
    ],
  },
  frete: {
    tipo: "Políticas",
    titulo: "Política de envio",
    resumo: "Retirada, envio por transportadora e conferência do pedido na entrega.",
    corpo: "texto",
    aviso: "ILUSTRATIVO — precisa de revisão jurídica antes de publicar.",
    linhas: [
      {
        titulo: "Retirada",
        texto: "Sem custo no showroom, depois que o modelo é separado e conferido. Você recebe a confirmação no WhatsApp quando pode retirar.",
      },
      {
        titulo: "Envio",
        texto: "O frete é calculado por CEP e peso do pedido, e informado no WhatsApp antes de qualquer pagamento.",
      },
      {
        titulo: "Conferência na entrega",
        texto: "Abra e confira a caixa na frente do entregador: guidão, carregador e manual. Se a caixa vier violada ou com avaria de transporte, recuse e avise a loja no mesmo dia.",
      },
    ],
  },
  termos: {
    tipo: "Políticas",
    titulo: "Termos de uso",
    resumo: "Uso do site, preços, disponibilidade e responsabilidade pelas informações.",
    corpo: "texto",
    aviso: "ILUSTRATIVO — precisa de revisão jurídica antes de publicar.",
    linhas: [
      {
        titulo: "Uso do site",
        texto: "Este site apresenta os modelos do nosso catálogo. A compra é combinada pelo WhatsApp, no canal informado na página de contato.",
      },
      {
        titulo: "Preços e disponibilidade",
        texto: "Preços podem mudar sem aviso prévio. O modelo só é reservado após a confirmação do pagamento.",
      },
      {
        titulo: "Imagens",
        texto: "As imagens podem ter diferença de cor em relação ao produto real, conforme a tela e a iluminação. A cor de referência é a do produto físico.",
      },
      {
        titulo: "Uso do produto",
        texto: "O scooter elétrico é destinado a uso conforme a legislação local. Uso público tem limite de velocidade de 32 km/h no Brasil (Resolução CONTRAN 996/2023); velocidades acima disso são para uso em propriedade privada.",
      },
    ],
  },
};
