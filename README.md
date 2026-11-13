# Kazoom Scooters — site-base

Site de vitrine para a **Kazoom Scooters**, loja de scooters elétricos
(urbanos, dobráveis, off-road e acessórios) que vende pelo WhatsApp.
HTML, CSS e JavaScript puros, sem framework e sem build: dá para abrir o
`index.html` direto no navegador ou subir a pasta em qualquer hospedagem
estática.

Esta é a **base de um projeto real**: antes de publicar, a lista completa de
valores ilustrativos está em [`VALIDAR.md`](VALIDAR.md). O próprio site avisa
onde o dado não é confirmado (faixa de anúncio, avisos "ilustrativo" e rodapé).

## Rodar local

Opções, da mais simples para a mais completa:

1. **Duplo clique em `index.html`** — tudo funciona via `file://`.
2. **Servidor estático** (recomendado para testar storage e URL):

   ```bash
   npx serve .
   # ou
   python -m http.server 8000
   ```

   Depois abra `http://localhost:8000`.

## Páginas

| Arquivo | O que é | Estado da URL |
|---|---|---|
| `index.html` | Home: hero, benefícios, vitrines por categoria, bloco de pós-venda | — |
| `catalogo.html` | Todos os modelos, com filtros | `?q=`, `?categoria=`, `?promo=1` |
| `produto.html` | PDP com ficha técnica completa | `?id=kaz-01` … `kaz-11` |
| `ajuda.html` | Guia de escolha, envios, trocas, garantia, contato | `?doc=guia-de-escolha` etc. |
| `politicas.html` | Privacidade, reembolso, frete, termos | `?doc=privacidade` etc. |
| `404.html` | Página de erro com busca e atalhos | — |

## Estrutura

```
kazoom-scooters/
├── index.html            Home
├── catalogo.html         Catálogo com filtros (categoria, autonomia, cor)
├── produto.html          PDP: ficha técnica + seleção de variante
├── ajuda.html            Conteúdo por ?doc= (render em docs.js)
├── politicas.html        Conteúdo por ?doc= (render em docs.js)
├── 404.html              Erro com busca
├── README.md             Este arquivo
├── VALIDAR.md            Tudo que é ilustrativo e precisa do cliente
├── robots.txt
├── sitemap.xml
├── css/
│   └── kazoom.css        Design system completo (tema claro/escuro)
└── js/
    ├── dados.js          Fonte de verdade: loja, categorias, 11 produtos,
    │                     fichas, guia de escolha, documentos
    ├── app.js            Núcleo: tema, imagens (foto + silhueta), paletas, seleção, toasts
    ├── busca.js          Painel de busca com atalhos e resultados vivos
    ├── cookies.js        Banner + painel LGPD (consentimento em 3 níveis)
    ├── home.js           Render da home
    ├── catalogo.js       Facetas, ordenação, carregar-mais, CTA de lista
    ├── produto.js        PDP: ficha rápida, tabela, variante, WhatsApp
    └── docs.js           Render de ajuda e políticas
```

## Como o funil funciona

Este é um site de vitrine: **não há checkout**. A compra é combinada com a
loja, no WhatsApp — e o site é desenhado para essa realidade:

1. A **ficha técnica** é o bloco decisivo da PDP (ficha rápida com 6 números +
   tabela completa). Nos urbanos ela substitui a foto bonita como argumento.
2. O cliente escolhe a **cor** (ou tamanho, no capacete) e manda o modelo para
   o WhatsApp — a mensagem vai escrita, com ID e preço.
3. Ou salva vários modelos na **seleção** (o "carrinho" da vitrine) e envia a
   lista inteira de uma vez, com total.
4. A disponibilidade de cor, frete e prazo são confirmados na conversa — o site
   nunca promete estoque.

## Catálogo (dados)

Os 11 produtos em `js/dados.js` (`kaz-01` a `kaz-11`) cobrem as cinco
categorias: urbanos, dobráveis, off-road, performance e acessórios. Cada
produto carrega:

- `ficha` — objeto chave→valor (potência, autonomia, velocidade, bateria,
  carga, suporte, pneus, freios), com rótulos em `ROTULOS_FICHA`;
- `autonomiaKm` — alimenta a faceta de faixa de autonomia no catálogo
  (`FREQUENCIAS_AUTONOMIA`: até 30 / 30–60 / 60+ km);
- `variantes` — cores (ou tamanhos, com `tipoVariante: "tamanho"` no capacete);
- `avisaVelocidade` — a PDP mostra aviso automático de uso em propriedade
  privada quando a velocidade da ficha passa de **32 km/h** (limite legal em
  via pública — Resolução CONTRAN 996/2023).

**Preços e fichas são ilustrativos** até a validação do cliente (ver
`VALIDAR.md`).

## WhatsApp (provisório)

Todos os links usam o número marcador `5500000000000` e exibem
`(00) 00000-0000`. **Não dispara mensagem de verdade de propósito**: é o tick
de que nada foi publicado com dado inventado. O número real entra em
`LOJA.whatsapp` / `LOJA.whatsappExibicao` e nos links `wa.me` dos 6 HTMLs.

## Design system

- **Fontes**: Space Grotesk (display) + Inter (texto), via Google Fonts.
- **Tema claro**: fundo `--papel #f6f7f2`, tinta `#141711`, acento "volt"
  verde-limão escurecido para contraste (`#4e6b00` sobre fundo claro).
- **Tema escuro**: fundo `#141711`, acento `#c9f24b`, texto do acento escuro.
- Chave do tema: `kazoom:tema`, aplicado antes da primeira pintura (sem flash).
- Modo escuro e claro com contraste verificado (AA nos componentes).

## Storage (localStorage)

| Chave | Guarda |
|---|---|
| `kazoom:tema` | Claro/escuro |
| `kazoom:selecao` | Modelos da seleção `{id, variante, qtd}` |
| `kazoom:favoritos` | Corações (salvos) |
| `kazoom:vistos` | Últimos vistos na PDP |
| `kazoom:consentimento` | Cookies LGPD |

## Imagens

- Todas as imagens são **silhuetas vetoriais geradas por código**
  (`SILHUETAS` em `js/app.js` — scooter, scooter dobrável, capacete,
  bateria, cadeado, kit) com paleta por produto (`PALETAS`). A arte do hero
  (`arteHero`) e da história (`arteHistoria`) também é vetorial.
- Fotos genéricas chegaram a ser testadas (nov/2026) e **foram retiradas a
  pedido do cliente**.
- O suporte a foto real já está pronto: adicionar `fotos: [...]` ao produto
  em `js/dados.js` com os arquivos em `img/` — a PDP gera 1 miniatura por
  foto, o card usa as duas na troca de hover e o fallback vetorial assume
  onde não tem foto. Sem layout novo.
