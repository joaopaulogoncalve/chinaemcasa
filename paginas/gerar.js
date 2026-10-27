// Gera as páginas institucionais: sobre/, contato/, privacidade/ (rodar: node site/paginas/gerar.js)
const fs = require("fs"), path = require("path");
const RAIZ = path.join(__dirname, "..");
const BASE = "https://joaopaulogoncalve.github.io/chinaemcasa";
const ZAP = "https://whatsapp.com/channel/0029VbE3bM49hXFAMF7r5i1n";

const paginas = [
  {
    slug: "sobre", titulo: "Sobre o China em Casa", desc: "Quem somos: achadinhos de Natal, casa e presentes escolhidos a dedo no Mercado Livre.",
    corpo: `
<h1>Sobre o China em Casa</h1>
<p class="lead">A gente garimpa achadinhos bons e baratos pra casa, pro Natal e pra presentear — e mostra tudo num lugar só, sem enrolação.</p>
<h2>O que você encontra aqui</h2>
<ul>
  <li><b>Decoração e árvore de Natal</b> que deixam a casa bonita gastando pouco.</li>
  <li><b>Presentes</b> pra mãe, pai, crianças e amigo secreto, muitos já prontos pra entregar.</li>
  <li><b>Casa, cozinha e beleza</b>: coisas úteis que a gente usaria em casa.</li>
  <li><b>Ofertas do dia</b>, com os produtos dos nossos vídeos.</li>
</ul>
<h2>Como a gente escolhe</h2>
<p>Olhamos nota dos compradores, quantidade de vendas, prazo de entrega e se o produto é <b>FULL</b> (enviado pelo próprio Mercado Livre, chega mais rápido). Produto com nota baixa ou reclamação repetida fica de fora. Preço e estoque mudam rápido: sempre confira no anúncio antes de comprar.</p>
<h2>Onde a gente está</h2>
<p>Vídeos curtos no <a href="https://www.tiktok.com/@china.em.casa">TikTok</a>, <a href="https://www.instagram.com/chin_aemcasa">Instagram</a> e <a href="https://www.youtube.com/@ChinaemCasa">YouTube</a>, ideias no <a href="https://br.pinterest.com/chinaemcasa">Pinterest</a>, guias no <a href="../blog/">blog</a> e ofertas todo dia no <a href="${ZAP}">canal do WhatsApp</a>.</p>
<p class="nota">#publi — os botões do site são links de afiliado do Mercado Livre: podemos ganhar uma comissão quando você compra, <b>sem nenhum custo extra pra você</b>. É assim que o China em Casa se mantém.</p>`
  },
  {
    slug: "contato", titulo: "Contato", desc: "Fale com o China em Casa: canal do WhatsApp e redes sociais.",
    corpo: `
<h1>Contato</h1>
<p class="lead">Quer sugerir um produto, avisar de um link quebrado ou mandar uma dúvida? Chama a gente.</p>
<div class="cards">
  <a class="card zap" href="${ZAP}"><b>💬 Canal do WhatsApp</b><span>Ofertas todo dia e novidades</span></a>
  <a class="card" href="https://www.instagram.com/chin_aemcasa"><b>📸 Instagram</b><span>Mensagem direta no @chin_aemcasa</span></a>
  <a class="card" href="https://www.tiktok.com/@china.em.casa"><b>🎵 TikTok</b><span>Comenta nos vídeos do @china.em.casa</span></a>
</div>
<h2>Dúvidas sobre um pedido</h2>
<p>As compras são feitas direto no <b>Mercado Livre</b>, com a loja que vende o produto. Entrega, troca, devolução e garantia são tratadas por lá: entre em <b>Minhas compras</b> no app ou site do Mercado Livre e fale com o vendedor. A compra tem a proteção do <b>Compra Garantida</b> do Mercado Livre.</p>
<p class="nota">Nunca pedimos senha, dados de cartão ou pagamento por fora. Se alguém fizer isso em nosso nome, é golpe.</p>`
  },
  {
    slug: "privacidade", titulo: "Privacidade e links de afiliado", desc: "Política de privacidade e aviso de links de afiliado do China em Casa.",
    corpo: `
<h1>Privacidade e links de afiliado</h1>
<p class="lead">Atualizado em 26/10/2026.</p>
<h2>Links de afiliado (#publi)</h2>
<p>O China em Casa participa do programa de afiliados do <b>Mercado Livre</b>. Os botões "Ver no Mercado Livre" são links de afiliado: quando você compra por eles, podemos receber uma comissão. <b>O preço pra você é o mesmo.</b> Isso não muda a nossa escolha: só indicamos o que achamos que vale a pena.</p>
<h2>Que dados este site coleta</h2>
<p>Este site <b>não tem cadastro, não pede seus dados e não tem formulário</b>. Não usamos cookies próprios de rastreamento nem anúncios.</p>
<ul>
  <li>O site é hospedado no <b>GitHub Pages</b>, que pode registrar dados técnicos de acesso (como endereço IP) pra segurança. Veja a política de privacidade do GitHub.</li>
  <li>As fontes de texto vêm do <b>Google Fonts</b>.</li>
  <li>Quando você clica num link de afiliado, você vai pro site do <b>Mercado Livre</b>, que usa os próprios cookies pra registrar a indicação e a compra. Isso segue a política de privacidade do Mercado Livre.</li>
</ul>
<h2>Preços e disponibilidade</h2>
<p>Preço, estoque, frete e prazo são da loja e mudam a qualquer momento. Sempre confira no anúncio antes de comprar. Imagens dos produtos no site são ilustrativas.</p>
<h2>Seus direitos (LGPD)</h2>
<p>Como não coletamos dados pessoais pelo site, não guardamos informações suas. Se tiver qualquer dúvida, fale com a gente pela página de <a href="../contato/">contato</a>.</p>`
  }
];

const html = p => `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${p.titulo} · China em Casa</title>
<meta name="description" content="${p.desc}">
<link rel="canonical" href="${BASE}/${p.slug}/">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎄</text></svg>">
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,700;9..144,800&family=Nunito+Sans:wght@400;600;800&display=swap" rel="stylesheet">
<style>
  :root { --fundo: #fbf6ef; --card: #fff; --texto: #2a1d17; --muted: #6e5d52; --linha: #ecdfcd; --vermelho: #c8102e; --verde: #145a32; --f-tit: "Fraunces", Georgia, serif; --f-txt: "Nunito Sans", system-ui, sans-serif; }
  * { box-sizing: border-box; }
  body { margin: 0; background: var(--fundo); color: var(--texto); font: 16px/1.6 var(--f-txt); }
  header { background: var(--verde); color: #fff; }
  header .in { max-width: 820px; margin: 0 auto; padding: 12px 16px; display: flex; align-items: center; gap: 12px; }
  header a { color: #fff; text-decoration: none; display: flex; align-items: center; gap: 10px; font: 800 1.1rem var(--f-tit); }
  header img { width: 40px; height: 40px; object-fit: contain; background: #fff; border-radius: 10px; padding: 3px; }
  header .voltar { margin-left: auto; font: 800 .85rem var(--f-txt); background: rgba(255,255,255,.15); padding: 7px 12px; border-radius: 99px; }
  main { max-width: 820px; margin: 0 auto; padding: 24px 16px 40px; }
  h1 { font: 800 clamp(1.6rem, 5vw, 2.3rem)/1.1 var(--f-tit); margin: 0 0 8px; }
  h2 { font: 800 1.2rem var(--f-tit); margin: 26px 0 6px; }
  .lead { font-size: 1.08rem; color: var(--muted); }
  a { color: var(--vermelho); }
  ul { padding-left: 20px; }
  .nota { margin-top: 24px; background: var(--card); border: 1px solid var(--linha); border-radius: 12px; padding: 14px 16px; font-size: .92rem; }
  .cards { display: grid; gap: 10px; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); margin: 16px 0; }
  .card { display: block; text-decoration: none; color: var(--texto); background: var(--card); border: 1px solid var(--linha); border-radius: 14px; padding: 14px 16px; }
  .card b { display: block; font-size: 1.02rem; }
  .card span { color: var(--muted); font-size: .88rem; }
  .card.zap { background: #25d366; border-color: #25d366; color: #fff; }
  .card.zap span { color: #eafff1; }
  footer { background: var(--verde); color: #fff; text-align: center; font-size: .85rem; padding: 20px 16px; }
  footer a { color: #fff; margin: 0 6px; }
</style>
</head>
<body>
<header><div class="in"><a href="../"><img src="../logo.png" alt="">China em Casa</a><a class="voltar" href="../">← Voltar aos achadinhos</a></div></header>
<main>${p.corpo}
</main>
<footer><a href="../sobre/">Sobre</a> · <a href="../contato/">Contato</a> · <a href="../privacidade/">Privacidade</a> · <a href="../blog/">Blog</a><br>China em Casa · links de afiliado do Mercado Livre (#publi)</footer>
</body>
</html>
`;

for (const p of paginas) {
  const dir = path.join(RAIZ, p.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), html(p));
}
console.log("páginas:", paginas.map(p => p.slug).join(", "));
