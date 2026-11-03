// Gera os artigos do blog a partir de artigos.js (rodar: node blog/gerar.js)
// Cada artigo vira blog/<slug>/index.html + entra no índice do blog e no sitemap.
// Visual (31/10): mesmo topo, fontes e cores da loja; índice com destaque + grade; artigo com capa, índice lateral e chamada pro canal.
const fs = require("fs"), path = require("path");
const BASE = "https://joaopaulogoncalve.github.io/chinaemcasa";
const ZAP = "https://whatsapp.com/channel/0029VbE3bM49hXFAMF7r5i1n";
const artigos = require("./artigos.js");
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const semTags = s => String(s).replace(/<[^>]+>/g, "");
const ancora = s => semTags(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const css = fs.readFileSync(path.join(__dirname, "estilo.css"), "utf8");

// raiz = caminho até a pasta do site ("../" no índice, "../../" no artigo)
const cabeca = (titulo, descricao, canonico, extra = "") => `<!doctype html>
<html lang="pt-BR"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(titulo)}</title>
<meta name="description" content="${esc(descricao)}">
<link rel="canonical" href="${canonico}">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎄</text></svg>">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,700;9..144,800&family=Nunito+Sans:wght@400;600;800&display=swap" rel="stylesheet">
<style>${css}</style>${extra}
</head><body>`;
const topo = raiz => `<div class="faixa"></div><header class="topo"><div class="wrap">
<a class="logo" href="${raiz}"><i>🎄</i><span><b>China em Casa</b><small>achadinhos de Natal</small></span></a>
<nav><a href="${raiz}">Ofertas</a><a href="${raiz}blog/">Blog</a><a class="zap" href="${ZAP}" target="_blank" rel="noopener">Canal no WhatsApp</a></nav>
</div></header>`;
// mini contador da faixa do artigo ("faltam 8 dias pro 11.11"); some sozinho depois da última data
const CONTA = `<script>document.querySelectorAll(".conta").forEach(e=>{const h=new Date();h.setHours(0,0,0,0);const d=JSON.parse(e.dataset.datas).map(([n,dt])=>[n,Math.round((new Date(dt+"T00:00:00")-h)/864e5)]).find(([,x])=>x>=0);e.textContent=d?(d[1]===0?"⏰ É HOJE: "+d[0]+"!":"⏳ Faltam "+d[1]+(d[1]===1?" dia":" dias")+" pro "+d[0]):"";if(!d)e.remove();});</script>`;
const rodape = raiz => `<footer><div class="wrap"><span>🎄 China em Casa · achadinhos que cabem no bolso · #publi links de afiliado</span>
<nav><a href="${raiz}">Ofertas</a><a href="${raiz}blog/">Blog</a><a href="${raiz}sobre/">Sobre</a><a href="${raiz}contato/">Contato</a><a href="${raiz}privacidade/">Privacidade</a><a href="https://www.tiktok.com/@china.em.casa">TikTok</a><a href="https://br.pinterest.com/chinaemcasa">Pinterest</a></nav>
</div></footer>${CONTA}</body></html>`;

function card(p) {
  return `<div class="prod">
  <img src="../../img/${p.foto}" alt="${esc(p.alt || p.nome)}" width="360" height="480" loading="lazy">
  <div><h3>${esc(p.nome)}</h3>
  <p>${p.texto}</p>
  ${p.pros ? `<ul>${p.pros.map(x => `<li>✅ ${x}</li>`).join("")}${(p.contras || []).map(x => `<li>⚠️ ${x}</li>`).join("")}</ul>` : ""}
  ${(p.links || [{ r: "Ver preço no Mercado Livre", u: p.link }]).map(l => `<a class="btn" href="${l.u}" target="_blank" rel="sponsored nofollow noopener">${esc(l.r)}</a>`).join(" ")}
  </div></div>`;
}
const minutos = a => Math.max(2, Math.round(JSON.stringify(a).split(/\s+/).length / 200));
// 03/11: blocos visuais opcionais da seção: passo a passo com telinha de celular, dicas em cartões e vitrine de fotos (leva pro site)
const passos = s => s.passos ? `<ol class="passos">${s.passos.map((p, i) => `<li><div class="cel"><div class="tela"><span class="barra"></span><span class="ico">${p.icone}</span><span class="bt">${esc(p.tela)}</span></div></div><div><span class="n">${i + 1}</span><h3>${esc(p.tit)}</h3><p>${p.txt}</p></div></li>`).join("")}</ol>` : "";
const dicas = s => s.dicas ? `<div class="dicas">${s.dicas.map(([ic, t, txt]) => `<div><span>${ic}</span><b>${esc(t)}</b><p>${esc(txt)}</p></div>`).join("")}</div>` : "";
const vitrine = s => s.vitrine ? `<div class="vitrine">${s.vitrine.map(v => `<a href="../../${v.link || ""}"><img src="../../img/${v.foto}" alt="" loading="lazy"><span>${esc(v.nome)}</span></a>`).join("")}</div><p class="ver-mais"><a href="../../">Ver todos os achadinhos no site →</a></p>` : "";
const cardArtigo =(x, raiz) => `<a class="card" href="${raiz}blog/${x.slug}/"><img src="${raiz}img/${x.capa}" alt="" loading="lazy"><div><span class="tag">Guia de compra · ${minutos(x)} min</span><h3>${esc(x.h1 || x.titulo)}</h3><p>${esc(x.descricao)}</p></div></a>`;

function pagina(a) {
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: a.faq.map(([q, r]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: r } })) };
  const h2s = [...(a.tabela ? [a.tabela.titulo] : []), ...a.secoes.map(s => s.h2), "Perguntas frequentes"];
  return `${cabeca(a.titulo, a.descricao, `${BASE}/blog/${a.slug}/`, `
<meta property="og:title" content="${esc(a.titulo)}"><meta property="og:image" content="${BASE}/img/${a.capa}">
<script type="application/ld+json">${JSON.stringify(faqLd)}</script>`)}
${topo("../../")}
<main class="wrap">
<p class="migalha"><a href="../../">Início</a> › <a href="../">Blog</a> › ${esc(semTags(a.h1 || a.titulo)).slice(0, 60)}</p>
<div class="cab-artigo"><div>
<span class="tag">Guia de compra de Natal</span>
<h1>${esc(a.h1 || a.titulo)}</h1>
<p class="lead">${esc(a.descricao)}</p>
<p class="meta"><span>🗓️ Atualizado em ${a.atualizado}</span><span>⏱️ ${minutos(a)} min de leitura</span><span>✍️ China em Casa</span></p>
</div><img src="../../img/${a.capa}" alt="" width="300" height="400"></div>
<div class="corpo"><article>
<p class="publi">#publi — Os botões são links de afiliado do Mercado Livre: posso ganhar uma comissão, sem custo extra pra você. Preço e prazo mudam: confira no anúncio.</p>
${a.faixa ? `<div class="faixa-art" style="background:${a.faixa.cor}"><img src="../../icone.jpg" alt="China em Casa"><div><small>${esc(a.faixa.sobre)}</small><b>${esc(a.faixa.tit)}</b><span>${esc(a.faixa.txt)}</span>${a.faixa.conta ? `<i class="conta" data-datas="${esc(JSON.stringify(a.faixa.conta))}"></i>` : ""}</div><em>${a.faixa.grande}</em></div>` : ""}
${a.intro.map(p => `<p>${p}</p>`).join("\n")}
<div class="resumo"><strong>Resumo rápido:</strong><br>${a.resumo.join("<br>")}</div>
${a.tabela ? `<h2 id="${ancora(a.tabela.titulo)}">${esc(a.tabela.titulo)}</h2><div class="tabela"><table><tr>${a.tabela.cab.map(c => `<th>${esc(c)}</th>`).join("")}</tr>${a.tabela.linhas.map(l => `<tr>${l.map(c => `<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</table></div>` : ""}
${a.secoes.map(s => `<h2 id="${ancora(s.h2)}">${esc(s.h2)}</h2>${s.img ? `<img class="sec-img" src="../../img/${s.img}" alt="" loading="lazy">` : ""}${(s.texto || []).map(p => `<p>${p}</p>`).join("")}${passos(s)}${dicas(s)}${(s.produtos || []).map(card).join("")}${vitrine(s)}`).join("\n")}
<h2 id="perguntas-frequentes">Perguntas frequentes</h2><div class="faq">${a.faq.map(([q, r]) => `<details><summary>${esc(q)}</summary><p>${esc(r)}</p></details>`).join("")}</div>
<div class="chamada"><h2>Quer receber os achadinhos do dia?</h2><p>Mando as melhores ofertas de Natal no canal do WhatsApp, sem spam.</p>
<a class="btn zap" href="${ZAP}" target="_blank" rel="noopener">Entrar no canal</a> <a class="btn" href="../../">Ver todas as ofertas</a></div>
</article>
<aside class="lateral">
<nav class="indice"><b>Neste guia</b>${h2s.map(t => `<a href="#${ancora(t)}">${esc(semTags(t))}</a>`).join("")}</nav>
<div class="caixa zap"><b>📲 Ofertas no WhatsApp</b><p style="margin:6px 0 10px">Achadinhos novos todo dia.</p><a class="btn zap" href="${ZAP}" target="_blank" rel="noopener">Entrar no canal</a></div>
</aside></div>
<h2>Leia também</h2><div class="leia">${artigos.filter(x => x.slug !== a.slug).slice(0, 4).map(x => cardArtigo(x, "../../")).join("")}</div>
</main>
${rodape("../../")}`;
}

for (const a of artigos) {
  const dir = path.join(__dirname, a.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), pagina(a));
}

// Índice do blog: 1º artigo em destaque + grade com os outros
const [primeiro, ...outros] = artigos;
fs.writeFileSync(path.join(__dirname, "index.html"), `${cabeca("Blog China em Casa: ideias de Natal, presentes e decoração", "Guias de compra de Natal: árvore, decoração e presentes baratos no Mercado Livre, com comparativos e dicas.", `${BASE}/blog/`)}
${topo("../")}
<section class="hero-blog"><div class="wrap"><span class="chip">🎄 GUIAS DE NATAL 2026</span><h1>Ideias de Natal que cabem no bolso</h1><p>Comparativos e listas de presentes e decoração, com o que vale a pena e o que chega a tempo.</p></div></section>
<main class="wrap">
<a class="destaque" href="${primeiro.slug}/"><img src="../img/${primeiro.capa}" alt=""><div><span class="tag">Em destaque · ${minutos(primeiro)} min</span><h2>${esc(primeiro.h1 || primeiro.titulo)}</h2><p>${esc(primeiro.descricao)}</p><span class="ler">Ler o guia →</span></div></a>
<div class="grade">${outros.map(x => cardArtigo(x, "../")).join("")}</div>
<div class="chamada"><h2>Achadinhos novos todo dia</h2><p>Entre no canal do WhatsApp ou veja a vitrine completa.</p><a class="btn zap" href="${ZAP}" target="_blank" rel="noopener">Entrar no canal</a> <a class="btn" href="../">Ver as ofertas</a></div>
</main>
${rodape("../")}`);

// Sitemap
const urls = [`${BASE}/`, `${BASE}/blog/`, `${BASE}/sobre/`, `${BASE}/contato/`, `${BASE}/privacidade/`, ...artigos.map(a => `${BASE}/blog/${a.slug}/`)];
fs.writeFileSync(path.join(__dirname, "..", "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u => `  <url><loc>${u}</loc><lastmod>2026-10-31</lastmod></url>`).join("\n")}\n</urlset>\n`);
console.log("ok", artigos.length, "artigos");
