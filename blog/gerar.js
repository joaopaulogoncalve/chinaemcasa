// Gera os artigos do blog a partir de artigos.js (rodar: node blog/gerar.js)
// Cada artigo vira blog/<slug>/index.html + entra no índice do blog e no sitemap.
const fs = require("fs"), path = require("path");
const BASE = "https://joaopaulogoncalve.github.io/chinaemcasa";
const artigos = require("./artigos.js");
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const css = fs.readFileSync(path.join(__dirname, "estilo.css"), "utf8");

function card(p) {
  return `<div class="prod">
  <img src="../../img/${p.foto}" alt="${esc(p.alt || p.nome)}" width="360" height="480" loading="lazy">
  <div><h3>${esc(p.nome)}</h3>
  <p>${p.texto}</p>
  ${p.pros ? `<ul>${p.pros.map(x => `<li>✅ ${x}</li>`).join("")}${(p.contras || []).map(x => `<li>⚠️ ${x}</li>`).join("")}</ul>` : ""}
  ${(p.links || [{ r: "Ver preço no Mercado Livre", u: p.link }]).map(l => `<a class="btn" href="${l.u}" target="_blank" rel="sponsored nofollow noopener">${esc(l.r)}</a>`).join(" ")}
  </div></div>`;
}

function pagina(a) {
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: a.faq.map(([q, r]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: r } })) };
  return `<!doctype html>
<html lang="pt-BR"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(a.titulo)}</title>
<meta name="description" content="${esc(a.descricao)}">
<link rel="canonical" href="${BASE}/blog/${a.slug}/">
<meta property="og:title" content="${esc(a.titulo)}"><meta property="og:image" content="${BASE}/img/${a.capa}">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎄</text></svg>">
<style>${css}</style>
<script type="application/ld+json">${JSON.stringify(faqLd)}</script>
</head><body>
<header class="topo"><a href="../../">🎄 China em Casa</a> · <a href="../">Blog</a></header>
<main><article>
<h1>${esc(a.h1 || a.titulo)}</h1>
<p class="meta">Atualizado em ${a.atualizado} · por China em Casa</p>
<p class="publi">#publi — Os botões são links de afiliado do Mercado Livre: posso ganhar uma comissão, sem custo extra pra você. Preço e prazo mudam: confira no anúncio.</p>
${a.intro.map(p => `<p>${p}</p>`).join("\n")}
<div class="resumo"><strong>Resumo rápido:</strong><br>${a.resumo.join("<br>")}</div>
${a.tabela ? `<h2>${esc(a.tabela.titulo)}</h2><div class="tabela"><table><tr>${a.tabela.cab.map(c => `<th>${esc(c)}</th>`).join("")}</tr>${a.tabela.linhas.map(l => `<tr>${l.map(c => `<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</table></div>` : ""}
${a.secoes.map(s => `<h2>${esc(s.h2)}</h2>${(s.texto || []).map(p => `<p>${p}</p>`).join("")}${(s.produtos || []).map(card).join("")}`).join("\n")}
<h2>Perguntas frequentes</h2><div class="faq">${a.faq.map(([q, r]) => `<details><summary>${esc(q)}</summary><p>${esc(r)}</p></details>`).join("")}</div>
<h2>Leia também</h2><ul>${artigos.filter(x => x.slug !== a.slug).slice(0, 3).map(x => `<li><a href="../${x.slug}/">${esc(x.h1 || x.titulo)}</a></li>`).join("")}</ul>
<p>Mais achadinhos na nossa <a href="../../">página de ofertas</a>.</p>
</article></main>
<footer>China em Casa · <a href="https://www.tiktok.com/@china.em.casa">TikTok</a> · <a href="https://br.pinterest.com/chinaemcasa">Pinterest</a></footer>
</body></html>`;
}

for (const a of artigos) {
  const dir = path.join(__dirname, a.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), pagina(a));
}

// Índice do blog
fs.writeFileSync(path.join(__dirname, "index.html"), `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Blog China em Casa: ideias de Natal, presentes e decoração</title>
<meta name="description" content="Guias de compra de Natal: árvore, decoração e presentes baratos no Mercado Livre, com comparativos e dicas.">
<link rel="canonical" href="${BASE}/blog/"><style>${css}</style></head><body>
<header class="topo"><a href="../">🎄 China em Casa</a> · Blog</header>
<main><h1>Blog: ideias de Natal que cabem no bolso</h1>
<div class="lista">${artigos.map(a => `<a class="item" href="${a.slug}/"><img src="../img/${a.capa}" alt="" loading="lazy"><span><b>${esc(a.h1 || a.titulo)}</b><small>${esc(a.descricao)}</small></span></a>`).join("")}</div>
</main><footer>China em Casa</footer></body></html>`);

// Sitemap
const urls = [`${BASE}/`, `${BASE}/blog/`, ...artigos.map(a => `${BASE}/blog/${a.slug}/`)];
fs.writeFileSync(path.join(__dirname, "..", "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u => `  <url><loc>${u}</loc><lastmod>2026-10-25</lastmod></url>`).join("\n")}\n</urlset>\n`);
console.log("ok", artigos.length, "artigos");
