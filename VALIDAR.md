# Validar com o cliente — Kazoom Scooters

> Documento de handoff. **Nada aqui foi publicado.** O site está pronto no
> código, mas não vai ao ar até a lista de baixo ser resolvida.
>
> Este é um **projeto-base**. A marca existe de verdade — o Instagram
> @kazoomscooters (verificado) confirma nome, cidade (Gaspar, SC), WhatsApp
> oficial e oferta de teste drive — mas os dados usados no site (preços,
> fichas técnicas, número de WhatsApp, endereço de rua, CNPJ) ainda são
> proposta não confirmada: por isso o site carrega faixa e avisos de
> "ilustrativo" em vez de fingir fatos.

---

## 0. FATOS CONFIRMADOS — Instagram @kazoomscooters (nov/2026)

Coletados da página pública do perfil. Não dependem de validação do cliente
(mas qualquer mudança na bio/comunicado da loja vale re-checar):

- Nome da marca: **Kazoom Scooters** · perfil **verificado** · ~5,2 mil
  seguidores
- Cidade da loja: **Gaspar, SC** — bio: "Venha conhecer a Kazoom em Gaspar, SC!"
- Oferta real: **teste drive** no showroom — bio: "Faça um teste drive com a
  gente ⚡" · destaque "Teste Drive" no perfil
- WhatsApp oficial: link `wa.me/message/7IMOEWVABPDXD1` (não expõe o número e
  não aceita mensagem pré-escrita — por isso os CTAs com texto continuam no
  número marcador até a loja informar o número)
- Destaques do perfil: "Clientes" · "Teste Drive" · "Localização"
- Onde já entrou no site: `LOJA.instagram`, `LOJA.whatsappOficial`,
  `LOJA.cidade` (js/dados.js) · Instagram no rodapé de todas as páginas ·
  cards de contato e menção ao teste drive no doc "Onde estamos" (ajuda.html) ·
  menção ao showroom em Gaspar na PDP (produto.js)

---

## 1. O QUE É CONFIRMAÇÃO DO CLIENTE (nada disso existe ainda)

O site declara só o que ele mesmo sustenta (contagem de modelos do próprio
catálogo, limite legal real da Resolução CONTRAN 996/2023) — e marca todo o
resto. Esta lista é a pendência central do projeto:

### 1.1 Canais de atendimento (bloqueiam qualquer publicação)

Os links de WhatsApp usam número marcador. **Nenhuma mensagem real pode ser
enviada hoje.**

- [ ] WhatsApp comercial real → substituir `5500000000000` e `(00) 00000-0000`
  (estão em todos os HTMLs e em `LOJA.whatsapp` / `LOJA.whatsappFormatado` em
  `js/dados.js`). Obs.: o perfil Instagram já aponta o canal oficial
  `wa.me/message/7IMOEWVABPDXD1` (no site como "WhatsApp oficial (perfil)"),
  mas esse link não aceita mensagem pré-escrita — o número real resolve os
  CTAs com texto pronto.
- [ ] E-mail → "Em definição" aparece em contato e na faixa de pós-venda
- [x] Instagram da loja → CONFIRMADO: @kazoomscooters (verificado), já no
  rodapé de todas as páginas e no doc "Onde estamos" (VALIDAR.md §0)

### 1.2 Showroom, horário, razão social e CNPJ

- [ ] Endereço de rua do showroom → cidade CONFIRMADA no Instagram (Gaspar,
  SC); o endereço completo ainda é "a confirmar" no rodapé, no doc
  "Onde estamos" e no doc "Envios e retirada"
- [ ] Teste drive → oferta CONFIRMADA na bio do Instagram ("Faça um teste
  drive com a gente ⚡"), mas agendamento/condições ainda não descritas no
  site — decidir se entra página própria ou fica no WhatsApp
- [ ] Horário real → "Seg a sex, 9h às 18h · Sáb, 9h às 13h" é suposição
- [ ] Razão social e CNPJ → rodapé diz "CNPJ a confirmar" (obrigatórios)
- [ ] Nome do responsável pelo site (LGPD art. 41)

### 1.3 Preços e condições

Os preços dos 11 produtos em `js/dados.js` são inventados para atingir a
proporção entre categorias — nenhum foi confirmado.

- [ ] Preço real por modelo
- [ ] Promos reais (alguns itens têm `precoAntes` só para exibir o estado)
- [ ] Parcelamento em até 10x sem juros → aparece na faixa com "(a confirmar)"
- [ ] Meios de pagamento (PIX, cartão na retirada, boleto?)

### 1.4 Fichas técnicas (o bloco decisivo do nicho)

Cada PDP responde por `produto.ficha` (potência, autonomia, velocidade, bateria,
carga, suporte, pneus, freios). Os valores são de mercado, não de fornecedor. **A
ficha é o que o cliente analisa antes de comprar — se estiver errada,
destrói a confiança na loja.**

- [ ] Ficha real de cada modelo (por fornecedor)
- [ ] Autonomia declarada vs. real de uso (o guia de escolha vende honestidade —
  tem que se sustentar)
- [ ] Condição de garantia proposta: **12 meses** da home e da PDP é proposta,
  não política da loja
- [ ] Política de garantia da bateria (ciclos / prazo / pro-rata?)

### 1.5 Certificação e tamanhos de capacete

O kaz-08 (capacete) usa `tipoVariante: "tamanho"` com S / M / L.

- [ ] Padrão real do capacete do fornecedor: cores, acabamentos e tamanhos
  (o site usa S / M / L por estimativa de mercado)
- [ ] Certificação INMETRO mencionada na página do capacete — confirmar que o
  modelo vendido realmente a possui (ou remover a menção)
- [ ] Tabela de tamanhos S/M/L por circunferência de cabeça (estimativa de
  mercado) — trocar pelo padrão real do fornecedor
- [ ] Peso suportado por scooter — a ficha informa, precisa validar com o
  fornecedor

### 1.6 Aviso legal de velocidade (CONTRAN)

A PDP mostra aviso automático quando a velocidade da ficha > 32 km/h (limite em
via pública — Resolução CONTRAN 996/2023), para uso em propriedade privada. A
referência legal é real; a decisão de como apresentar (afixar no produto,
termo de responsabilidade assinado) é da loja.

- [ ] Formato do termo de responsabilidade do cliente na retirada
- [ ] Enquadramento dos modelos "Performance" tópicos de uso que excedem 32 km/h

### 1.7 Envio e retirada

- [ ] Envios para todo o Brasil? Quais transportadoras e prazos (a loja publica
  que calcula por CEP, mas não há tabela)
- [ ] Retirada no showroom com teste guiado → confirmar o formato
- [ ] Frete grátis existe? A partir de quanto? A barra da seleção usa
  **R$ 499** como referência ilustrativa (`FAIXA_SELECAO` em `js/app.js`)

### 1.8 Pós-venda

- [ ] Assistência própria real (oficina? peças de reposição em estoque?)
- [ ] Prazos de troca (a página trocas propõe 7 dias / caixa fechada) e garantia
- [ ] Política e prazo de formatação da bateria / amortecedor na ficha

---

## 2. FALTANDO DO CLIENTE

Nada abaixo existe hoje. O site foi construído sem eles, e vários blocos são
provisórios por isso.

### 2.1 Logo

O logo é tipográfico (`KAZOOM` + `SCOOTERS` em Space Grotesk); o favicon é a
letra K em verde-limão gerada por SVG inline.

- [ ] Logo em SVG/PDF com fundo transparente
- [ ] Versão monocromática para uso em capacete / chassi adesivo
- [ ] Se houver identidade gráfica anterior, conferir nome de domínio

### 2.2 Fotografias dos produtos

**Maior pendência visual.** Todas as imagens são silhuetas vetoriais por código
(`SILHUETAS` em `js/app.js`): scooter urbano, dobrável, capacete, bateria,
cadeado, kit de acessórios — paleta por produto (`PALETAS`). Mantêm o grid
coerente, mas não vendem scooter. Fotos genéricas chegaram a ser testadas
(nov/2026, Wikimedia Commons) e foram **retiradas** a pedido do cliente — o
suporte a fotos reais já está pronto no código (`fotos: [...]` no produto +
arquivos em `img/`), falta só a foto própria da loja.

- [ ] Foto 3:4 de frente, fundo neutro, de cada modelo real (é só adicionar
  `fotos: [...]` no produto e as imagens em `img/` — nada mais muda)
- [ ] Foto de detalhe (pneu, dobra, painel, farol) por modelo
- [ ] Foto em uso (via / terreno) com consentimento do uso da imagem de quem
  aparece
- [ ] Foto do capacete aberto (vista interna) e da bateria

### 2.3 Padrão da mensagem de WhatsApp

- [ ] Mensagem fixa vs. mensagem com produto escrito (hoje: produto escrito)
- [ ] Prompt de orçamento: quem atende precisa do CEP na primeira troca? Hoje o
  texto só pede cor e frete.

### 2.4 Domínio

Todo o site usa `kazoomscooters.com.br` como marcador (head, JSON-LD,
sitemap).

- [ ] Registrar o domínio real e corrigir em `index.html`, `catalogo.html`,
  `produto.html`, `ajuda.html`, `politicas.html`, `404.html`, `sitemap.xml`,
  `robots.txt`

---

## 3. REVISÃO JURÍDICA OBRIGATÓRIA

As páginas de política incluem aviso explícito de que são textos propostos em
projeto-base.

- [ ] `politicas.html?doc=privacidade` — LGPD art. 7º, 41 e 46
- [ ] `politicas.html?doc=reembolso` — arrependimento CDC art. 49 + prazos
- [ ] `politicas.html?doc=frete` — responsabilidade na entrega de bateria de
  lítio (transportadora tem regras próprias para mercadoria com bateria)
- [ ] `politicas.html?doc=termos` — aviso de uso em propriedade privada acima
  de 32 km/h; isenção de responsabilidade por uso irregular

**Ponto sensível:** scooter elétrico com velocidade acima de 32 km/h não pode
sair de fábrica para uso via pública. O site declara o limite — o material
impresso entregue no showroom precisa declarar o mesmo.

---

## 4. COLETA DE DADOS (LGPD)

O painel de cookies está implementado (recusa = nada carregado; salvar com só
"Analíticos" liga análise e deixa marketing off). Chave `kazoom:consentimento`.

**Não há ferramenta de analytics ou marketing instalada** — o painel é
estrutura vazia.

- [ ] Quais ferramentas o cliente usará? (Meta Pixel, GA4, TikTok Pixel)
- [ ] Entram no site? Então ligar em `CARREGADORES` (`js/cookies.js`)

---

## 5. O QUE NÃO FOI TESTADO

Registrado para não dar como verificado o que não é:

- **Pagamento**: não há checkout. Nada testado porque não há o que testar.
- **Envio real de e-mail**: o formulário de contato **abre o WhatsApp** com a
  mensagem escrita. Não envia e-mail (porque não há e-mail definido).
- **Imagens reais**: só existem as silhuetas vetoriais.
- **iPhone/Safari**: verificação feita em Chromium (desktop + viewport 390 ×
  844). O `backdrop-filter` do header e a `env(safe-area-inset-bottom)` do menu
  inferior pedem teste em iPhone.
- **Estoque real**: `esgotado` em `js/dados.js` é teatro de demonstração (tem um
  produto marcado) — ligar a uma fonte real antes de publicar.

---

## 6. ORDEM SUGERIDA

1. **Fichas técnicas reais** — é o produto do nicho: sem ficha honesta não há
   conversa de WhatsApp
2. **Canais reais** (WhatsApp + endereço + horário) — sem isso nada pode
   funcionar
3. **Preços reais**
4. **Fotos dos modelos**
5. **Logo + razão social + CNPJ** — identidade e obrigação legal
6. **Revisão jurídica das políticas** + termo de responsabilidade CONTRAN
7. **Estoque real** — desligar o modo demonstração de `esgotado`
