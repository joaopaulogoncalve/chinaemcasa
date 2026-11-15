// 15/11: artigos AGENDADOS (2 semanas, seg/qua/sáb). Cada um só aparece no dia de `publicar` (gerar.js filtra;
// o GitHub Actions roda o gerador todo dia às 6h de Brasília e publica sozinho).
// Regras: preço só em faixa ou "confira no link" (muda), fotos = nossas (B2 do admin), #publi no rodapé do blog, nunca inventar fato.
const L = c => "https://meli.la/" + c;
const F = f => "https://china-em-casa.paulojao151.workers.dev/foto/" + f;

module.exports = [
{
  publicar: "2026-11-28",
  slug: "presentes-de-ultima-hora-natal",
  titulo: "Presentes de Natal de última hora: ideias que chegam rápido e salvam a ceia (2026)",
  h1: "Esqueceu alguém? Presentes de Natal de última hora que salvam a ceia",
  descricao: "Lista de presentes de Natal de última hora no Mercado Livre: perfumes, brinquedos, fones e kits que resolvem rápido, com dicas pra chegar antes do dia 24.",
  capa: F("2026-11-15/4506f790.jpg"), atualizado: "novembro de 2026",
  faixa: { cor: "linear-gradient(120deg,#8b0000,#d62828)", sobre: "Natal sem correria", tit: "Ainda dá tempo! ⏰", txt: "Presentes que resolvem em 1 clique", grande: "24/12" },
  intro: ["Sempre aparece aquele tio, a sogra ou o amigo secreto de última hora. A boa notícia: dá pra resolver sem sair de casa.", "Separei presentes que <strong>agradam quase todo mundo</strong> e que costumam ter opção de entrega rápida. Confira o prazo pro seu CEP antes de fechar a compra."],
  resumo: ["🌸 <strong>Pra ela:</strong> colônia Floratta ou Liz Flora (O Boticário).", "🧔 <strong>Pra ele:</strong> Quasar Blue ou um kit de ferramentas.", "🧒 <strong>Pra criança:</strong> Hot Wheels, dinossauros ou pelúcia.", "🎧 <strong>Coringa:</strong> fone bluetooth de marca."],
  secoes: [
    { h2: "Pra ela", produtos: [
      { nome: "Colônia Floratta Flores Secretas 75 ml (O Boticário)", foto: F("2026-11-15/4506f790.jpg"), texto: "Clássico feminino que quase ninguém recusa. Vem pronto pra embrulhar.", link: L("1o4Kfxw") },
      { nome: "Colônia Liz Flora 100 ml (O Boticário)", foto: F("2026-11-15/814065af.jpg"), texto: "Entre as mais vendidas da categoria no Mercado Livre.", link: L("1U1fDeJ") }] },
    { h2: "Pra ele", produtos: [
      { nome: "Colônia Quasar Blue 100 ml (O Boticário)", foto: F("2026-11-15/6e3c7268.jpg"), texto: "A mais vendida em perfumaria masculina. Presente seguro pra pai, sogro ou cunhado.", link: L("16rx7H2") },
      { nome: "Kit ferramentas 46 peças com maleta (Quicko)", foto: F("2026-11-15/2413fbe5.jpg"), texto: "Útil o ano todo, ótimo pra quem gosta de resolver as coisas em casa.", link: L("2UPZiTH") }] },
    { h2: "Pra criança", produtos: [
      { nome: "Hot Wheels Velozes e Furiosos (Honda Del Sol)", foto: F("2026-11-15/ec337868.jpg"), texto: "Colecionável: agrada a criança e o adulto fã da série.", link: L("27RhXQ6") },
      { nome: "Kit 8 dinossauros de borracha soft", foto: F("2026-11-15/7318fae3.jpg"), texto: "Barato, macio e rende horas de brincadeira (3 a 6 anos).", link: L("2Zk5Jye") },
      { nome: "Urso de pelúcia Teddy 50 cm", foto: F("2026-11-03/434f7282.jpg"), texto: "Antialérgico e grande, presente que vira companheiro.", link: L("2eYudjn") }] },
    { h2: "O coringa: fone bluetooth", produtos: [
      { nome: "Fone JBL Wave Buds 2", foto: F("2026-11-07/19c43a57.jpg"), texto: "Marca conhecida, serve pra adolescente, adulto e quem faz academia.", link: L("2BcwJTH") }] },
    { h2: "Como garantir que chega antes do Natal", dicas: [
      ["⚡", "Filtre por FULL", "Os anúncios FULL saem do centro do Mercado Livre e costumam chegar mais rápido."],
      ["📍", "Confira o prazo no seu CEP", "O prazo aparece na página do produto antes de pagar. Se passar do dia 23, escolha outro."],
      ["💳", "Pix aprova na hora", "Boleto pode levar até 3 dias pra compensar e atrasar o envio."]] }],
  faq: [["Até quando dá pra comprar e receber antes do Natal?", "Depende do produto e do CEP. O prazo aparece na página antes de pagar; prefira anúncios FULL e compre o quanto antes."],
        ["Qual presente agrada quase todo mundo?", "Perfume de marca conhecida e fone bluetooth são os mais seguros pra adultos; pra criança, carrinho colecionável e pelúcia."]]
},
{
  publicar: "2026-11-25",
  slug: "presente-de-natal-para-pai",
  titulo: "Presente de Natal pra pai: 7 ideias úteis que ele vai usar de verdade (2026)",
  h1: "Presente de Natal pra pai: 7 ideias que ele vai usar de verdade",
  descricao: "Ideias de presente de Natal pra pai no Mercado Livre: perfume, ferramentas, fone, smartwatch e eletro de cozinha, com dicas pra acertar o gosto dele.",
  capa: F("2026-11-15/6e3c7268.jpg"), atualizado: "novembro de 2026",
  faixa: { cor: "linear-gradient(120deg,#0b2545,#13315c)", sobre: "Guia de presente", tit: "Pro pai que \"não precisa de nada\" 👔", txt: "7 ideias que ele usa o ano todo", grande: "7" },
  intro: ["Todo pai fala que \"não precisa de nada\". Mas presente útil ele usa todo dia e lembra de quem deu.", "Separei <strong>7 ideias</strong> por estilo de pai. Escolha a que combina com ele e confira o preço de hoje no link."],
  resumo: ["🧔 <strong>Vaidoso:</strong> Quasar Blue.", "🔧 <strong>Faz tudo:</strong> parafusadeira ou kit de ferramentas.", "🎧 <strong>Conectado:</strong> fone ou smartwatch.", "🍳 <strong>Cozinheiro:</strong> sanduicheira."],
  tabela: { titulo: "Resumo das ideias", cab: ["Presente", "Pro pai que…"], linhas: [
    ["Colônia Quasar Blue", "gosta de perfume"], ["Parafusadeira de impacto", "monta e conserta tudo"], ["Kit ferramentas 46 peças", "resolve as coisas em casa"],
    ["Lavadora de alta pressão Kärcher", "cuida do carro e do quintal"], ["Headphone JBL Tune 530BT", "ouve música e futebol"], ["Smartband Huawei Band 10", "caminha e cuida da saúde"], ["Sanduicheira grill Kian", "faz o lanche da família"]] },
  secoes: [
    { h2: "Pro pai vaidoso", produtos: [
      { nome: "Colônia Quasar Blue 100 ml (O Boticário)", foto: F("2026-11-15/6e3c7268.jpg"), texto: "A mais vendida em perfumaria masculina. Cheiro fresco, bom pro dia a dia.", link: L("16rx7H2") }] },
    { h2: "Pro pai faz-tudo", produtos: [
      { nome: "Parafusadeira e furadeira de impacto (The Black Tools)", foto: F("2026-11-05/3bc7c0a5.jpg"), texto: "Monta móvel, pendura quadro e resolve a casa inteira.", link: L("1bbJSPD") },
      { nome: "Kit ferramentas 46 peças com maleta (Quicko)", foto: F("2026-11-15/2413fbe5.jpg"), texto: "Catraca, soquetes e chaves numa maleta organizada.", link: L("2UPZiTH") },
      { nome: "Lavadora de alta pressão Kärcher compacta", foto: F("2026-11-06/26ca588e.jpg"), texto: "Lava carro, calçada e quintal. Marca referência.", link: L("23JjSQa") }] },
    { h2: "Pro pai conectado", produtos: [
      { nome: "Headphone JBL Tune 530BT", foto: F("2026-11-07/b7275a68.jpg"), texto: "Bluetooth e marca conhecida, pra música, jogo e reunião.", link: L("2MkAcbS") },
      { nome: "Smartband Huawei Band 10 (tela AMOLED)", foto: F("2026-11-06/cfe18edb.jpg"), texto: "Conta passos, monitora o sono e mostra notificações.", link: L("1T23FJ6") }] },
    { h2: "Pro pai cozinheiro", produtos: [
      { nome: "Sanduicheira grill elétrica 750 W (Kian)", foto: F("2026-11-15/62556eab.jpg"), texto: "Misto quente e grelhados rápidos no café da manhã.", link: L("2a3ycM1") }] },
    { h2: "Dica pra acertar", texto: ["Pense no que ele faz no fim de semana: quem mexe no carro gosta de ferramenta, quem caminha gosta de smartband, quem vive no celular gosta de fone. Presente ligado à rotina dele sempre acerta."] }],
  faq: [["Qual o melhor presente de Natal pra pai que não precisa de nada?", "Algo útil pra rotina dele: perfume de marca, ferramenta ou fone. São presentes que ele usa todo dia."],
        ["Perfume é um bom presente pra pai?", "Sim. Colônias de marca conhecida, como a Quasar Blue, estão entre as mais vendidas e são fáceis de acertar."]]
},
{
  publicar: "2026-11-23",
  slug: "decoracao-de-natal-barata",
  titulo: "Decoração de Natal barata: luzes e enfeites que transformam a casa gastando pouco (2026)",
  h1: "Decoração de Natal barata: transforme a casa gastando pouco",
  descricao: "Ideias de decoração de Natal barata no Mercado Livre: pisca cortina, cascata de LED, fio de fada, festão e saia de árvore, com dicas de onde usar cada um.",
  capa: F("2026-10-31/2d98e148.jpg"), atualizado: "novembro de 2026",
  faixa: { cor: "linear-gradient(120deg,#145a32,#d4a017)", sobre: "Casa de Natal", tit: "Casa iluminada, bolso feliz ✨", txt: "Luzes e enfeites que fazem efeito", grande: "LED" },
  intro: ["Não precisa gastar muito pra casa ficar com cara de Natal. O segredo é <strong>luz</strong>: um bom pisca ou uma cascata muda o ambiente na hora.", "Separei os itens que dão mais efeito gastando pouco, e onde usar cada um."],
  resumo: ["🪟 <strong>Janela:</strong> pisca cortina 300 LEDs.", "🏠 <strong>Fachada e varanda:</strong> cascata de LED.", "🫙 <strong>Mesa e potes:</strong> fio de fada a pilha.", "🎄 <strong>Árvore:</strong> festão e saia de árvore."],
  secoes: [
    { h2: "Pra janela e parede", produtos: [
      { nome: "Pisca cortina 300 LEDs 3 x 3 m (USB)", foto: F("2026-10-31/2d98e148.jpg"), texto: "Pendura na janela e transforma a sala em 5 minutos.", link: L("1Cyps3D") }] },
    { h2: "Pra fachada e varanda", produtos: [
      { nome: "Cascata natalina 400 LEDs 10 m", foto: F("2026-11-03/1c5af115.jpg"), texto: "Cobre a frente da casa com luz quente.", link: L("19gRzsL") },
      { nome: "Cascata LED meteoro 3 m", foto: F("2026-10-31/6ef2d048.jpg"), texto: "Efeito de neve caindo, faz sucesso na rua.", link: L("14ZdynC") }] },
    { h2: "Pra mesa, potes e cantinhos", produtos: [
      { nome: "Fio de fada 100 LEDs 10 m (pilha)", foto: F("2026-11-04/52f50bb1.jpg"), texto: "Sem tomada: vai em pote de vidro, centro de mesa e prateleira.", link: L("11cUkKN") },
      { nome: "Kit 10 fios de fada 2 m (pilha)", foto: F("2026-11-03/81bee39c.jpg"), texto: "Dez pontinhos de luz pra espalhar pela casa.", link: L("2yKK3mS") }] },
    { h2: "Pra árvore e porta", produtos: [
      { nome: "Festão aramado grosso 2,70 m", foto: F("2026-10-31/4b9baf5c.jpg"), texto: "Deixa a árvore cheia e dá pra moldar no corrimão.", link: L("2yKCszc") },
      { nome: "Saia de árvore de Natal luxo", foto: F("2026-10-31/5a99acd7.jpg"), texto: "Esconde o pé da árvore e dá acabamento de vitrine.", link: L("21LA31T") },
      { nome: "Gancho de guirlanda pra porta (dourado)", foto: F("2026-10-31/b864cac2.jpg"), texto: "Pendura a guirlanda sem furar a porta.", link: L("1bdnrWD") }] },
    { h2: "Dicas pra luz render mais", dicas: [
      ["💡", "Branco quente acolhe", "Luz amarelada deixa a sala aconchegante; branco frio combina com fachada."],
      ["🔌", "Confira a tomada", "Veja se é USB, pilha ou 220 V antes de escolher o lugar."],
      ["☔", "Área externa", "Pra varanda e fachada, confira na descrição se o produto é pra uso externo."]] }],
  faq: [["Qual decoração de Natal dá mais efeito gastando pouco?", "Luz. Um pisca cortina ou uma cascata de LED muda o ambiente inteiro, e fio de fada a pilha decora mesa e potes sem tomada."],
        ["Pisca-pisca pode ficar ligado a noite toda?", "Siga a orientação do fabricante na descrição do produto e desligue ao sair de casa."]]
},
{
  publicar: "2026-11-21",
  slug: "kit-perfume-boticario-presente-natal",
  titulo: "Perfume de presente de Natal: as colônias O Boticário mais vendidas (pra ele e pra ela)",
  h1: "Perfume de presente de Natal: as colônias O Boticário mais vendidas",
  descricao: "Guia rápido de perfume pra presente de Natal: Quasar Blue, Floratta Flores Secretas e Liz Flora, entre as mais vendidas do Mercado Livre, e como escolher a certa.",
  capa: F("2026-11-15/814065af.jpg"), atualizado: "novembro de 2026",
  faixa: { cor: "linear-gradient(120deg,#5a189a,#c9184a)", sobre: "Presente cheiroso", tit: "Perfume nunca erra 🎁", txt: "As mais vendidas pra ele e pra ela", grande: "3" },
  intro: ["Perfume é o presente mais fácil de acertar: todo mundo usa e marca conhecida passa confiança.", "Separei <strong>3 colônias O Boticário</strong> que estão entre as mais vendidas do Mercado Livre, e uma dica de maquiagem pra completar."],
  resumo: ["🧔 <strong>Pra ele:</strong> Quasar Blue.", "🌸 <strong>Pra ela:</strong> Floratta Flores Secretas ou Liz Flora.", "💄 <strong>Completa o kit:</strong> máscara de cílios Maybelline."],
  secoes: [
    { h2: "Pra ele", produtos: [
      { nome: "Colônia Quasar Blue 100 ml", foto: F("2026-11-15/6e3c7268.jpg"), texto: "Fresca e leve, boa pro dia a dia. Uma das mais vendidas da perfumaria masculina.", link: L("16rx7H2") }] },
    { h2: "Pra ela", produtos: [
      { nome: "Colônia Floratta Flores Secretas 75 ml", foto: F("2026-11-15/4506f790.jpg"), texto: "Floral marcante, linha clássica da marca.", link: L("1o4Kfxw") },
      { nome: "Colônia Liz Flora 100 ml", foto: F("2026-11-15/814065af.jpg"), texto: "Floral elegante, entre as mais vendidas da categoria.", link: L("1U1fDeJ") }] },
    { h2: "Pra completar o presente", produtos: [
      { nome: "Máscara de cílios Maybelline Lash Sensational", foto: F("2026-11-15/c57ced0d.jpg"), texto: "Junto com o perfume vira um kit caprichado.", link: L("1L4z4oe") },
      { nome: "Kit pincel de maquiagem 13 peças", foto: F("2026-11-15/90ded9c4.jpg"), texto: "Opção barata pra amigo secreto de quem gosta de maquiagem.", link: L("2SmUzqg") }] },
    { h2: "Como escolher sem errar", dicas: [
      ["👃", "Floral pra ela, fresco pra ele", "Na dúvida, florais leves agradam a maioria das mulheres e cítricos/frescos a maioria dos homens."],
      ["🏷️", "Confira se é original", "Compre de loja oficial ou com muitas vendas e boa nota."],
      ["📦", "Veja o tamanho", "Compare o preço pelo tamanho (ml) antes de decidir."]] }],
  faq: [["Qual perfume O Boticário dar de presente de Natal?", "Quasar Blue pra ele e Floratta ou Liz Flora pra ela estão entre as mais vendidas e são escolhas seguras."],
        ["Colônia é diferente de perfume?", "Colônia tem fragrância mais leve que o perfume. É ótima pro dia a dia e costuma custar menos."]]
},
{
  publicar: "2026-11-18",
  slug: "presente-de-natal-para-menino",
  titulo: "Presente de Natal pra menino: carrinhos, dinossauros e brinquedos que fazem sucesso (2026)",
  h1: "Presente de Natal pra menino: os brinquedos que fazem sucesso",
  descricao: "Ideias de presente de Natal pra menino no Mercado Livre: carrinhos de controle remoto, Hot Wheels, dinossauros, Patrulha Canina e pistas, separados por idade.",
  capa: F("2026-11-04/f79a1899.jpg"), atualizado: "novembro de 2026",
  faixa: { cor: "linear-gradient(120deg,#c1121f,#003049)", sobre: "Natal da criançada", tit: "Brinquedo que vira festa 🚗", txt: "Separado por idade", grande: "🦖" },
  intro: ["Carrinho, dinossauro e herói: os campeões de pedido pro Papai Noel.", "Separei por idade pra facilitar. Confira sempre a idade indicada na embalagem."],
  resumo: ["👶 <strong>3 a 6 anos:</strong> dinossauros soft, Patrulha Canina e pistas.", "🧒 <strong>6 anos ou mais:</strong> carrinhos de controle remoto.", "🏁 <strong>Colecionador:</strong> Hot Wheels Velozes e Furiosos."],
  secoes: [
    { h2: "Pros pequenos (3 a 6 anos)", produtos: [
      { nome: "Kit 8 dinossauros de borracha soft", foto: F("2026-11-15/7318fae3.jpg"), texto: "Macios e baratos, ótimos pra imaginação.", link: L("2Zk5Jye") },
      { nome: "Kit 9 carrinhos Patrulha Canina (fricção)", foto: F("2026-11-04/b3321132.jpg"), texto: "Não precisa de pilha: empurra e vai.", link: L("1o8mCet") },
      { nome: "Boneco Patrulha Canina Skye", foto: F("2026-11-15/c066a84d.jpg"), texto: "Personagem favorito de quem assiste o desenho.", link: L("2XdNR14") },
      { nome: "Caminhão dinossauro maleta com carrinhos", foto: F("2026-10-31/7f42f1fc.jpg"), texto: "O caminhão \"engole\" os carrinhos e vira maleta.", link: L("2qa17UH") }] },
    { h2: "Pros maiores (controle remoto)", produtos: [
      { nome: "Carrinho de controle remoto Homem-Aranha", foto: F("2026-11-04/f79a1899.jpg"), texto: "Solta fumaça e acende LED.", link: L("1hefZdr") },
      { nome: "Carrinho drift 4x4 Porsche (controle remoto)", foto: F("2026-11-07/b3a1da70.jpg"), texto: "Faz drift de verdade: anda de lado nas curvas.", link: L("2LdjkRK") },
      { nome: "Carrinho 2 em 1 que vira robô", foto: F("2026-11-07/8b7b4a4d.jpg"), texto: "Carro e robô no mesmo brinquedo, recarregável.", link: L("2EztiUq") }] },
    { h2: "Pro colecionador", produtos: [
      { nome: "Hot Wheels Velozes e Furiosos (Honda Del Sol)", foto: F("2026-11-15/ec337868.jpg"), texto: "Linha premium colecionável.", link: L("27RhXQ6") },
      { nome: "Maleta com 48 carrinhos e tapete-pista", foto: F("2026-10-31/6bb268e4.jpg"), texto: "Muitos carrinhos e um tapete que vira cidade.", link: L("1aQo2Zk") }] },
    { h2: "Antes de comprar", dicas: [
      ["🔋", "Veja a bateria", "Carrinho de controle remoto: confira se é recarregável ou usa pilha (e se a pilha vem junto)."],
      ["👶", "Idade da embalagem", "Peças pequenas não são pra menores de 3 anos."],
      ["⚡", "FULL chega antes", "Pra chegar antes do Natal, prefira anúncio FULL e confira o prazo no seu CEP."]] }],
  faq: [["Qual o brinquedo mais pedido pelos meninos no Natal?", "Carrinhos de controle remoto, dinossauros e personagens de desenho como a Patrulha Canina estão sempre entre os mais procurados."],
        ["Carrinho de controle remoto é pra qual idade?", "Cada modelo indica a idade na embalagem; em geral, a partir de 6 anos."]]
},
{
  publicar: "2026-11-16",
  slug: "presente-amigo-secreto-ate-30-reais",
  titulo: "Amigo secreto até R$ 30: 8 presentes baratos que não parecem baratos (2026)",
  h1: "Amigo secreto até R$ 30: 8 presentes que não parecem baratos",
  descricao: "Ideias de presente de amigo secreto até R$ 30 no Mercado Livre: maquiagem, ferramentas, brinquedos e decoração, pra homem, mulher e criança.",
  capa: F("2026-11-15/90ded9c4.jpg"), atualizado: "novembro de 2026",
  faixa: { cor: "linear-gradient(120deg,#ff006e,#8338ec)", sobre: "Amigo secreto", tit: "Barato que parece caro 🎁", txt: "8 ideias até R$ 30 (confira o preço do dia)", grande: "R$ 30" },
  intro: ["O valor do amigo secreto da firma ou da família costuma ser baixo, mas dá pra dar presente bonito.", "Separei <strong>8 ideias que estavam até cerca de R$ 30</strong> quando fiz a lista. Preço muda todo dia: confira no link antes de comprar."],
  resumo: ["💄 <strong>Pra mulher:</strong> máscara Maybelline ou kit de pincéis.", "🔧 <strong>Pra homem:</strong> kit de ferramentas.", "🦖 <strong>Pra criança:</strong> dinossauros ou carrinhos.", "✨ <strong>Pra qualquer um:</strong> fio de fada pra decorar."],
  secoes: [
    { h2: "Pra mulher", produtos: [
      { nome: "Máscara de cílios Maybelline Lash Sensational", foto: F("2026-11-15/c57ced0d.jpg"), texto: "Marca conhecida, item que toda maquiadora usa.", link: L("1L4z4oe") },
      { nome: "Kit pincel de maquiagem 13 peças", foto: F("2026-11-15/90ded9c4.jpg"), texto: "Kit completo e colorido, cara de presente caro.", link: L("2SmUzqg") }] },
    { h2: "Pra homem", produtos: [
      { nome: "Kit ferramentas 46 peças com maleta", foto: F("2026-11-15/2413fbe5.jpg"), texto: "Maleta organizada, sempre útil.", link: L("2UPZiTH") },
      { nome: "Kit de ferramentas 11 peças (aço carbono)", foto: F("2026-11-05/825ae467.jpg"), texto: "Opção ainda mais em conta.", link: L("2HEya35") }] },
    { h2: "Pra criança", produtos: [
      { nome: "Kit 8 dinossauros de borracha soft", foto: F("2026-11-15/7318fae3.jpg"), texto: "Oito bichos num presente só.", link: L("2Zk5Jye") },
      { nome: "Kit 3 bolas surpresa Mini Brands", foto: F("2026-11-03/cf9cc62b.jpg"), texto: "A graça é abrir e descobrir as miniaturas.", link: L("2Tvk1Xh") }] },
    { h2: "Pra qualquer pessoa", produtos: [
      { nome: "Fio de fada 100 LEDs 10 m (pilha)", foto: F("2026-11-04/52f50bb1.jpg"), texto: "Decora quarto, mesa ou pote de vidro.", link: L("11cUkKN") },
      { nome: "Kit 14 organizadores multiuso de gaveta", foto: F("2026-11-03/12381790.jpg"), texto: "Útil e bonito, agrada quem gosta de casa arrumada.", link: L("1MQ1MVU") }] },
    { h2: "Dica de ouro", texto: ["Capriche no embrulho e escreva um bilhetinho. Presente simples bem apresentado parece muito mais caro. E se o preço do dia passar do limite, veja outra ideia da lista."] }],
  faq: [["O que dar de amigo secreto até R$ 30?", "Maquiagem de marca, kit de ferramentas, dinossauros pra criança ou fio de fada pra decorar estão entre as opções que costumam caber no valor."],
        ["O preço desses presentes é sempre até R$ 30?", "Não: o preço muda todo dia no Mercado Livre. A lista foi feita com itens que estavam perto desse valor; confira no link antes de comprar."]]
}
];
