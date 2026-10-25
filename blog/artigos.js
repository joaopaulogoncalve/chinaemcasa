// Artigos do blog. Para criar um novo: copie um bloco, mude os campos e rode `node blog/gerar.js`.
// Preço NUNCA fixo no texto (muda): use faixas e "confira no link". Fotos = img/ do site (nossas).
const L = c => "https://meli.la/" + c;

module.exports = [
{
  slug: "arvore-de-natal-completa-barata",
  titulo: "Árvore de Natal completa barata: 3 opções que chegam rápido (2026)",
  h1: "Árvore de Natal completa barata: 3 opções que chegam rápido",
  descricao: "Comparei árvores de Natal completas e baratas no Mercado Livre: tamanho, o que vem junto e entrega FULL. Veja qual vale mais a pena em 2026.",
  capa: "arvore-economica.jpg", atualizado: "outubro de 2026",
  intro: ["Quer uma <strong>árvore de Natal completa e barata</strong>, sem comprar cada enfeite separado? Comparei as opções que mais vendem no Mercado Livre e separei 3 caminhos: a mais barata, a mais bonita e a que já serve pra quem tem enfeite em casa."],
  resumo: ["💰 <strong>Mais barata:</strong> árvore 1,50 m que já vem com enfeites, pisca e estrela.", "🌟 <strong>Mais bonita:</strong> árvore 2,10 m + kit 100 bolas + 3 piscas (tudo FULL).", "🌲 <strong>Só a árvore:</strong> 2,10 m com 1000 galhos."],
  tabela: { titulo: "Comparativo: qual árvore de Natal escolher", cab: ["Opção", "Tamanho", "O que vem", "Entrega", "Pra quem"], linhas: [
    ["Árvore completa 1,50 m", "1,50 m · 400 galhos", "Árvore + enfeites + pisca + estrela", "FULL", "Quer gastar pouco"],
    ["Montar a 2,10 m", "2,10 m · 1200 galhos", "Peças separadas", "FULL", "Quer árvore grande e cheia"],
    ["Árvore 2,10 m 1000 galhos", "2,10 m · 1000 galhos", "Só a árvore", "FULL", "Já tem enfeites"]] },
  secoes: [
    { h2: "1. A mais barata: árvore de 1,50 m completa", produtos: [{ nome: "Árvore 1,50 m + enfeites + pisca + estrela", foto: "arvore-economica.jpg", texto: "Tudo num pedido só: árvore de 400 galhos, mais de 60 enfeites variados, pisca de 100 LEDs e a estrela.", pros: ["Um frete só", "Entrega FULL"], contras: ["Pé de plástico", "Pisca não é bivolt: escolha 110 V ou 220 V"], links: [{ r: "Ver preço · 110 V", u: L("1bbUm2C") }, { r: "Ver preço · 220 V", u: L("1Yk3cXo") }] }] },
    { h2: "2. A mais bonita: monte a árvore de 2,10 m (tudo FULL)", texto: ["Pra árvore grande e cheia de foto, compre as peças separadas — escolhendo FULL, chega rápido."], produtos: [
      { nome: "Árvore 2,10 m · 1200 galhos", foto: "arvore-210.jpg", texto: "Base de metal, nota 4,9. Vem sem luzes e sem enfeites.", link: L("1eBxGNW") },
      { nome: "Pisca-pisca 100 LEDs branco quente (use 3)", foto: "pisca.jpg", texto: "Fio verde, 9,5 m, 8 funções. Escolha 127 V ou 220 V.", link: L("1E4GZ3Z") },
      { nome: "Kit 100 bolas + estrela", foto: "kit100.jpg", texto: "Bolas vermelhas lisas, foscas e glitter, já com a estrela ponteira.", link: L("2Hdxu9f") },
      { nome: "Saia de pelúcia 120 cm", foto: "saia.jpg", texto: "Esconde o pé da árvore.", link: L("1RCCm4o") }] },
    { h2: "3. Só a árvore grande: 2,10 m com 1000 galhos", produtos: [{ nome: "Árvore 2,10 m · 1000 galhos", foto: "arv210b.jpg", texto: "Pra quem já tem enfeites guardados e só quer trocar a árvore.", link: L("28cdAfZ") }] },
    { h2: "Dicas pra árvore ficar bonita", texto: ["<strong>Abra galho por galho</strong>: a árvore vem compactada. <strong>Pisca primeiro, enfeite depois</strong>, de dentro pra fora. <strong>Uma paleta só</strong> (vermelho + dourado) deixa com cara de loja. Pra 2,10 m: <strong>3 piscas</strong> e uns <strong>100 enfeites</strong>."] }],
  faq: [["Qual árvore de Natal completa é mais barata?", "A de 1,50 m que já vem com enfeites, pisca e estrela num pedido só. Confira o preço do dia no link."],
        ["Quantos pisca-piscas precisa pra árvore de 2,10 m?", "Uns 300 LEDs, ou seja, 3 cordões de 100."],
        ["Árvore FULL chega antes do Natal?", "FULL costuma ser rápido, mas o prazo depende do CEP: confira no anúncio."]]
},
{
  slug: "presentes-de-natal-ate-50-reais",
  titulo: "Presentes de Natal até R$ 50: 8 ideias que todo mundo gosta (2026)",
  h1: "Presentes de Natal até R$ 50: 8 ideias que todo mundo gosta",
  descricao: "Lista de presentes de Natal baratos, até R$ 50, no Mercado Livre: pra amigo secreto, família e criança. Com dicas de quem combina com cada um.",
  capa: "copo-termico.jpg", atualizado: "outubro de 2026",
  intro: ["Procurando <strong>presente de Natal até R$ 50</strong>? Separei 8 ideias que vendem muito no Mercado Livre, com nota boa, e que servem pra quase todo mundo: colega de trabalho, amigo secreto, sogra, criança.", "Os preços mudam toda semana, então use os valores como faixa e confira o do dia no link."],
  resumo: ["☕ <strong>Pra quem ama café:</strong> caneca 3D ou kit de canecas de vidro.", "🥤 <strong>Pra qualquer pessoa:</strong> copo térmico 1,2 L.", "💎 <strong>Pra ela:</strong> brincos de prata 925.", "🧸 <strong>Pra criança:</strong> capivara de pelúcia."],
  tabela: { titulo: "Resumo das ideias", cab: ["Presente", "Pra quem", "Entrega"], linhas: [
    ["Copo térmico 1,2 L", "Todo mundo", "FULL"], ["Caneca 3D de Natal", "Amigo secreto", "—"], ["Brincos prata 925", "Mulheres", "FULL"],
    ["Capivara de pelúcia", "Crianças", "FULL"], ["Globo de neve", "Decoração/presente", "FULL"], ["Jogo desafio da corda", "Família", "FULL"],
    ["Kit 6 canecas cappuccino", "Casa nova / café", "FULL"], ["Kit 8 dinossauros", "Crianças 3–6 anos", "—"]] },
  secoes: [
    { h2: "As 8 ideias", produtos: [
      { nome: "Copo térmico 1,2 L inox com canudo", foto: "copo-termico.jpg", texto: "Mais de 50 mil vendidos, nota 4,9. Presente que a pessoa usa todo dia.", link: L("2Vj2S25") },
      { nome: "Caneca 3D de Natal (4 modelos)", foto: "caneca.jpg", texto: "Cerâmica, vai no micro-ondas e na lava-louças. Boneco de neve ou Papai Noel.", link: L("1HuPXC1") },
      { nome: "Brincos argola de prata 925", foto: "brincos.jpg", texto: "Prata 925 com zircônia: parece presente caro.", link: L("247MEWJ") },
      { nome: "Capivara de pelúcia gigante", foto: "capivara.jpg", texto: "Antialérgica, a febre do ano entre as crianças.", link: L("23FuTcH") },
      { nome: "Globo de neve Papai Noel", foto: "globo.jpg", texto: "Enfeite que vira lembrança.", link: L("1GaFGvv") },
      { nome: "Jogo desafio da corda", foto: "corda.jpg", texto: "Pra família jogar junto na ceia.", link: L("1d3dDAV") },
      { nome: "Kit 6 canecas de vidro cappuccino", foto: "canecas-capp.jpg", texto: "Nota 4,9. Ótimo pra quem ama café.", link: L("1pivnVh") },
      { nome: "Kit 8 dinossauros de borracha", foto: "dinos.jpg", texto: "Pra crianças de 3 a 6 anos.", link: L("1Km46fe") }] },
    { h2: "Como embrulhar gastando pouco", texto: ["Uma <strong>sacolinha térmica de Natal</strong> já vem decorada e ainda serve depois. <a href=\"../presente-de-amigo-secreto-barato/\">Veja mais ideias de amigo secreto</a>."] }],
  faq: [["Qual o melhor presente de Natal até 50 reais?", "Copo térmico, caneca 3D e brincos de prata estão entre os mais vendidos e bem avaliados. Confira o preço do dia."],
        ["Esses presentes chegam antes do Natal?", "Os marcados como FULL costumam chegar rápido; o prazo depende do CEP. A partir de meados de dezembro, prefira FULL."]]
},
{
  slug: "presente-de-amigo-secreto-barato",
  titulo: "Presente de amigo secreto barato: ideias de R$ 20 a R$ 50 (2026)",
  h1: "Presente de amigo secreto barato: ideias de R$ 20 a R$ 50",
  descricao: "Ideias de presente de amigo secreto barato no Mercado Livre, de R$ 20 a R$ 50, pra homem, mulher e qualquer pessoa. Com dica de embrulho.",
  capa: "caneca.jpg", atualizado: "outubro de 2026",
  intro: ["Tirou alguém que você mal conhece no <strong>amigo secreto</strong>? O segredo é dar algo <strong>útil e bonito</strong>, que serve pra qualquer pessoa. Separei ideias por faixa de preço."],
  resumo: ["🎁 <strong>Até R$ 30:</strong> brincos de prata, kit dinossauros (se for criança).", "☕ <strong>R$ 30 a R$ 50:</strong> caneca 3D, copo térmico, canecas de vidro.", "🙋 <strong>Não sabe nada da pessoa?</strong> Copo térmico: todo mundo usa."],
  secoes: [
    { h2: "Pra qualquer pessoa", produtos: [
      { nome: "Copo térmico 1,2 L", foto: "copo-termico.jpg", texto: "O presente mais seguro: serve pra homem e mulher, de qualquer idade.", link: L("2Vj2S25") },
      { nome: "Caneca 3D de Natal", foto: "caneca.jpg", texto: "Fofa, temática e útil o ano todo.", link: L("1HuPXC1") }] },
    { h2: "Pra mulher", produtos: [{ nome: "Brincos argola prata 925", foto: "brincos.jpg", texto: "Delicado e com cara de joia.", link: L("247MEWJ") }] },
    { h2: "Pra homem", produtos: [{ nome: "Kit 5 camisetas dry fit", foto: "camisetas.jpg", texto: "Prático e sempre útil (confira o tamanho no anúncio).", link: L("1Specfx") }] },
    { h2: "Dica: presente que já vem embrulhado", texto: ["Coloque o presente numa <strong>sacolinha térmica de Natal</strong>: fica bonito e ainda serve pra levar lanche depois."], produtos: [{ nome: "Kit 10 sacolinhas térmicas Papai Noel (pequenas)", foto: "sacola-noel-pequena.jpg", texto: "Tamanho presente. Dá pra dividir o kit com a família ou o trabalho.", link: L("1poFz8Z") }] }],
  faq: [["Qual presente de amigo secreto agrada qualquer pessoa?", "Copo térmico e caneca de Natal são as escolhas mais seguras: úteis e bonitas."],
        ["Quanto gastar no amigo secreto?", "O mais comum é entre R$ 30 e R$ 50. Combine o valor com o grupo antes."]]
},
{
  slug: "presente-de-natal-para-mae",
  titulo: "Presente de Natal pra mãe: ideias que ela vai usar (2026)",
  h1: "Presente de Natal pra mãe: ideias que ela vai usar",
  descricao: "Ideias de presente de Natal pra mãe no Mercado Livre: kit relógio e joias, bolsa, perfume e pijama da família. Pra todos os bolsos.",
  capa: "kit-relogio.jpg", atualizado: "outubro de 2026",
  intro: ["Presente de mãe precisa ser <strong>bonito e útil</strong>. Separei ideias que vendem muito no Mercado Livre e que dá pra entregar já com cara de presente."],
  resumo: ["⌚ <strong>Mais completo:</strong> kit relógio + colar + brincos.", "👜 <strong>Pra usar todo dia:</strong> kit bolsa + carteira.", "📸 <strong>Pra família toda:</strong> pijama de Natal combinando."],
  secoes: [
    { h2: "As ideias", produtos: [
      { nome: "Kit relógio + colar + brincos dourado", foto: "kit-relogio.jpg", texto: "Já vem pronto pra presentear, nota 4,8.", link: L("2WKKuxx") },
      { nome: "Kit bolsa transversal + bolsa pequena + carteira", foto: "bolsa.jpg", texto: "Três peças combinando, nota 4,7.", link: L("1pQvTpL") },
      { nome: "Brincos argola prata 925", foto: "brincos.jpg", texto: "Opção mais em conta e delicada.", link: L("247MEWJ") },
      { nome: "Kit pijama família de Natal", foto: "pijama.jpg", texto: "Pai, mãe e filho combinando: a foto de Natal do ano. Tamanhos informados no chat depois da compra.", link: L("1vHvcA8") }] }],
  faq: [["O que dar de presente de Natal pra mãe?", "Kit de relógio e joias, bolsa com carteira e pijama de família estão entre os mais procurados."],
        ["Chega antes do Natal?", "Prefira os anúncios FULL e confira o prazo pro seu CEP."]]
},
{
  slug: "presentes-de-natal-para-criancas",
  titulo: "Presentes de Natal pra criança: brinquedos que mais vendem (2026)",
  h1: "Presentes de Natal pra criança: brinquedos que mais vendem",
  descricao: "Brinquedos e presentes de Natal pra criança no Mercado Livre: pelúcia gigante, carrinho de controle remoto, boneca, jogos e presentes pra bebê.",
  capa: "carrinho.jpg", atualizado: "outubro de 2026",
  intro: ["Separei os <strong>presentes de Natal pra criança</strong> que mais vendem e têm nota boa no Mercado Livre, por idade."],
  resumo: ["👶 <strong>Bebê (1 ano+):</strong> blocos de montar.", "🧒 <strong>3 a 6 anos:</strong> dinossauros, capivara de pelúcia.", "🚙 <strong>6+ anos:</strong> carrinho de controle remoto 4x4.", "👨‍👩‍👧 <strong>Família:</strong> jogo Stop, desafio da corda."],
  secoes: [
    { h2: "Os presentes", produtos: [
      { nome: "Carrinho de controle remoto rally 4x4", foto: "carrinho.jpg", texto: "Bateria recarregável, nota 4,8.", link: L("2aWfkdV") },
      { nome: "Capivara de pelúcia gigante", foto: "capivara.jpg", texto: "Antialérgica, a mais pedida do ano.", link: L("23FuTcH") },
      { nome: "Gato de pelúcia gigante 1,10 m", foto: "gato.jpg", texto: "Rosa e bem macio.", link: L("2JLWyoH") },
      { nome: "Blocos de montar pra bebê", foto: "blocos.jpg", texto: "A partir de 1 ano, nota 4,9.", link: L("2C1AwQu") },
      { nome: "Kit 8 dinossauros", foto: "dinos.jpg", texto: "Borracha soft, 3 a 6 anos.", link: L("1Km46fe") },
      { nome: "Jogo Stop eletrônico", foto: "stop.jpg", texto: "Pra família jogar junto.", link: L("2BCXy45") }] },
    { h2: "Dica de segurança", texto: ["Sempre confira a <strong>idade indicada</strong> no anúncio, principalmente pra peças pequenas e brinquedos com bateria."] }],
  faq: [["Qual o brinquedo mais vendido no Natal?", "Pelúcias gigantes, carrinhos de controle remoto e jogos de família estão entre os mais procurados."],
        ["Como saber a idade certa?", "Veja a faixa etária indicada no anúncio do produto."]]
}
];
