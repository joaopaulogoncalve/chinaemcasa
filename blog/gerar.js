// Gera os artigos do blog a partir de artigos.js + artigos-agendados.js (rodar: node blog/gerar.js)
// Cada artigo vira blog/<slug>/index.html + entra no índice do blog e no sitemap.
// 16/11 — BLOG v2 (pedido do João: "mais profissional, dinâmico, bonito, com os links dos produtos"):
//   topo igual ao do site (branco + ícone), índice com busca e filtros por assunto, artigo com barra de leitura,
//   "Nossas escolhas" no topo, cartões de produto com nº, selo, preço do dia (/api/links), código do ML pra copiar
//   e botão grande; barra de compra fixa no celular; caixa "quem escolhe"; leia também.
// Produto (opcional): selo: "🏆 Mais vendido" (só se for verdade), idml: "HNABFC-…" (senão vem do /api/links).
// Artigo (opcional): cat: "presentes" | "criancas" | "decoracao" | "ofertas" | "dicas" (senão é deduzido do slug).
const fs = require("fs"), path = require("path");
const BASE = "https://chinaemcasa.com.br";
const ZAP = "https://whatsapp.com/channel/0029VbE3bM49hXFAMF7r5i1n";
// 15/11: artigo com `publicar: "AAAA-MM-DD"` só entra no dia (horário de Brasília). O GitHub Actions roda isto todo dia às 6h.
const HOJE = process.env.HOJE || new Date(Date.now() - 3 * 36e5).toISOString().slice(0, 10);
const artigos = require("./artigos-agendados.js").concat(require("./artigos.js")).filter(a => !a.publicar || a.publicar <= HOJE);
// foto pode ser do site (img/) ou link completo (fotos do admin no B2)
const im = (f, raiz) => /^https?:/.test(f || "") ? f : raiz + "img/" + f;
const esc = s => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const semTags = s => String(s).replace(/<[^>]+>/g, "");
const ancora = s => semTags(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const meli = l => (String(l || "").match(/meli\.la\/([A-Za-z0-9]+)/) || [])[1] || "";
const css = fs.readFileSync(path.join(__dirname, "estilo.css"), "utf8") + fs.readFileSync(path.join(__dirname, "estilo-v2.css"), "utf8") + fs.readFileSync(path.join(__dirname, "estilo-v3.css"), "utf8");

const CATS = { presentes: "🎁 Presentes", criancas: "🧸 Crianças", decoracao: "🎄 Decoração", ofertas: "🏷️ Ofertas e cupons", dicas: "💡 Dicas" };
const catDe = a => a.cat || (/black|cupom|11-11/.test(a.slug) ? "ofertas" : /crianca|menino|menina/.test(a.slug) ? "criancas" : /arvore|decora|enfeite|luz/.test(a.slug) ? "decoracao" : /codigo|como-/.test(a.slug) ? "dicas" : "presentes");
const produtosDe = a => (a.secoes || []).flatMap(s => s.produtos || []);
const minutos = a => Math.max(2, Math.round(JSON.stringify(a).split(/\s+/).length / 200));

// raiz = caminho até a pasta do site ("../" no índice, "../../" no artigo)
const cabeca = (titulo, descricao, canonico, extra = "") => `<!doctype html>
<html lang="pt-BR"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><script>if(location.hostname.endsWith("github.io"))location.replace("https://chinaemcasa.com.br"+location.pathname.replace("/chinaemcasa","")+location.search+location.hash)</script>
<title>${esc(titulo)}</title>
<meta property="og:site_name" content="China em Casa Achadinhos">
<meta name="description" content="${esc(descricao)}">
<link rel="canonical" href="${canonico}">
<link rel="icon" href="/icone.jpg">
<meta name="theme-color" content="#c8102e">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,700;9..144,800&family=Nunito+Sans:wght@400;600;800;900&display=swap" rel="stylesheet">
<style>${css}</style>${extra}
</head><body>`;
const topo = raiz => `<div class="faixa-top">💬 <b>Ofertas todo dia</b> no canal do WhatsApp · <b>#publi</b> links de afiliado do Mercado Livre</div>
<header class="topo"><div class="wrap">
<a class="marca" href="${raiz}"><img src="${raiz}icone.jpg" alt="China em Casa" width="46" height="46"><span><b>China em Casa</b><small>achadinhos de Natal</small></span></a>
<nav><a href="${raiz}">Ofertas</a><a href="${raiz}blog/" class="ativo">Blog</a><a href="${raiz}blog/black-friday-presentes-de-natal/">Black Friday</a></nav>
<a class="zap-top" href="${ZAP}" target="_blank" rel="noopener">📲 <span>Canal no WhatsApp</span></a>
</div></header>`;
// mini contador da faixa do artigo ("faltam 8 dias pro 11.11"); some sozinho depois da última data
const CONTA = `<script>document.querySelectorAll(".conta").forEach(e=>{const h=new Date();h.setHours(0,0,0,0);const d=JSON.parse(e.dataset.datas).map(([n,dt])=>[n,Math.round((new Date(dt+"T00:00:00")-h)/864e5)]).find(([,x])=>x>=0);e.textContent=d?(d[1]===0?"⏰ É HOJE: "+d[0]+"!":"⏳ Faltam "+d[1]+(d[1]===1?" dia":" dias")+" pro "+d[0]):"";if(!d)e.remove();});</script>`;
const rodape = raiz => `<footer><div class="wrap">
<div class="rod-marca"><img src="${raiz}logo-horizontal.jpg" alt="China em Casa · achadinhos de Natal" loading="lazy"><p>A gente garimpa os mais vendidos e bem avaliados do Mercado Livre e mostra só o que vale a pena. Você compra direto no Mercado Livre, com entrega, garantia e devolução da própria loja.</p><p class="pq">#publi: os botões são links de afiliado. Se você comprar por eles, ganhamos uma pequena comissão, sem custo extra pra você.</p></div>
<nav><b>Navegar</b><a href="${raiz}">Ofertas</a><a href="${raiz}blog/">Blog</a><a href="${raiz}sobre/">Sobre</a><a href="${raiz}contato/">Contato</a><a href="${raiz}privacidade/">Privacidade</a></nav>
<nav><b>Siga</b><a href="https://www.youtube.com/@ChinaemCasa" target="_blank" rel="noopener">YouTube</a><a href="https://www.instagram.com/chin_aemcasa/" target="_blank" rel="noopener">Instagram</a><a href="https://www.tiktok.com/@china.em.casa" target="_blank" rel="noopener">TikTok</a><a href="https://br.pinterest.com/chinaemcasa" target="_blank" rel="noopener">Pinterest</a><a href="${ZAP}" target="_blank" rel="noopener">WhatsApp</a></nav>
</div></footer>${CONTA}</body></html>`;

// preço do dia, código do ML e "indisponível" vêm do Worker (/api/links), pelo código do meli.la de cada botão
const VIVO = `<script>
(function(){
  var fmt=function(v){return v.toLocaleString("pt-BR",{style:"currency",currency:"BRL"})};
  var dia=function(s){var p=s.split("-");return p[2]+"/"+p[1]};
  fetch("https://chinaemcasa.com.br/api/links").then(function(r){return r.json()}).then(function(L){
    document.querySelectorAll("[data-ml]").forEach(function(el){
      var d=L[el.dataset.ml]; if(!d) return;
      var pr=el.querySelector(".preco"); if(pr&&d.v&&!d.off){pr.innerHTML="<b>"+fmt(d.v)+"</b><span>visto em "+dia(d.em)+" · pode mudar</span>";pr.hidden=false;}
      var cd=el.querySelector(".cod"); var id=el.dataset.id||d.id; if(cd&&id){cd.querySelector("code").textContent=id;cd.hidden=false;}
      if(d.off){el.classList.add("off");var a=el.querySelector(".aviso-off");if(a)a.hidden=false;}
    });
  }).catch(function(){});
  document.addEventListener("click",function(e){
    var b=e.target.closest(".cod"); if(!b) return;
    var t=b.querySelector("code").textContent; (navigator.clipboard?navigator.clipboard.writeText(t):Promise.reject()).then(function(){b.classList.add("ok");setTimeout(function(){b.classList.remove("ok")},1500)}).catch(function(){});
  });
  var barra=document.querySelector(".leitura"); if(barra) addEventListener("scroll",function(){var h=document.documentElement;barra.style.width=Math.min(100,100*h.scrollTop/(h.scrollHeight-h.clientHeight))+"%"},{passive:true});
  var fixa=document.querySelector(".compra-fixa"), alvo=document.getElementById("escolhas");
  if(fixa&&alvo&&"IntersectionObserver" in window){new IntersectionObserver(function(es){fixa.classList.toggle("on",!es[0].isIntersecting&&scrollY>alvo.offsetTop)}).observe(alvo);}
})();
</script>`;

let numProd = 0;
function card(p) {
  const n = ++numProd, c = meli(p.link || (p.links || [])[0]?.u);
  const links = p.links || [{ r: "Ver no Mercado Livre", u: p.link }];
  return `<div class="pcard" id="p-${n}" data-ml="${c}"${p.idml ? ` data-id="${esc(p.idml)}"` : ""}>
  <div class="pfoto"><span class="rank">${n}</span><img src="${im(p.foto, "../../")}" alt="${esc(p.alt || p.nome)}" width="360" height="360" loading="lazy"></div>
  <div class="pinfo">
  ${p.selo ? `<span class="selo">${esc(p.selo)}</span>` : ""}
  <h3>${esc(p.nome)}</h3>
  <p>${p.texto}</p>
  ${p.pros ? `<ul class="pros">${p.pros.map(x => `<li class="sim">${x}</li>`).join("")}${(p.contras || []).map(x => `<li class="nao">${x}</li>`).join("")}</ul>` : ""}
  <div class="preco" hidden></div>
  <p class="aviso-off" hidden>⚠️ Pode estar esgotado agora: confira no link.</p>
  <div class="acoes">${links.map((l, i) => `<a class="btn-ml${i ? " sec" : ""}" href="${l.u}" target="_blank" rel="sponsored nofollow noopener">${esc(l.r)} <span>→</span></a>`).join("")}
  <button class="cod" type="button" hidden title="Copiar o código pra buscar no Mercado Livre">🔎 <code></code> <i>copiar</i></button></div>
  </div></div>`;
}
// 22/11 (João: "o blog é feio" → CARA DE LOJA): logo depois do título, a VITRINE com todos os produtos (foto, nome, preço do dia,
// botão do ML), com a Tia Cida apresentando. O texto (por que escolhemos, dicas, FAQ) vem depois, pra quem quiser ler.
function vitrineLoja(a) {
  const ps = produtosDe(a).map((p, i) => ({ ...p, n: i + 1, link: p.link || (p.links || [])[0]?.u || "" }));
  if (ps.length < 2) return "";
  return `<section class="loja" id="escolhas">
  <div class="apresenta"><span class="ava"><img src="../../img/tia-cida-aponta.jpg" alt="Tia Cida, da China em Casa" width="120" height="120"></span><p><b>A Tia Cida separou ${ps.length} achados 👇</b><span>Toque no produto pra ver o preço de hoje no Mercado Livre.</span></p></div>
  <div class="loja-grade">${ps.map(p => `<div class="item" data-ml="${meli(p.link)}"${p.idml ? ` data-id="${esc(p.idml)}"` : ""}>
  <a class="item-foto" href="${p.link}" target="_blank" rel="sponsored nofollow noopener"><span class="rank">${p.n}</span>${p.selo ? `<span class="selo">${esc(p.selo)}</span>` : ""}<img src="${im(p.foto, "../../")}" alt="${esc(p.alt || p.nome)}" loading="lazy" width="300" height="300"></a>
  <b class="item-nome">${esc(p.nome)}</b>
  <div class="preco" hidden></div>
  <a class="btn-ml" href="${p.link}" target="_blank" rel="sponsored nofollow noopener">Ver oferta <span>→</span></a>
  <a class="item-mais" href="#p-${p.n}">Por que escolhemos ↓</a></div>`).join("")}</div>
  <p class="publi"><b>#publi</b> Links de afiliado do Mercado Livre: se você comprar, ganhamos uma pequena comissão, sem custo extra pra você. Preço e prazo mudam: confira no anúncio.</p>
  </section>`;
}
// escolhas do topo: produtos com selo primeiro, depois a ordem do artigo (máx. 4)
function escolhas(a) {
  const ps = produtosDe(a).map((p, i) => ({ ...p, n: i + 1, link: p.link || (p.links || [])[0]?.u || "" }));
  if (ps.length < 3) return "";
  const top = [...ps.filter(p => p.selo), ...ps.filter(p => !p.selo)].slice(0, 4);
  return `<section class="escolhas" id="escolhas"><h2>🏆 Nossas escolhas</h2><div class="trilho">${top.map(p => `<div class="mini" data-ml="${meli(p.link)}">
  <a class="mini-foto" href="#p-${p.n}"><span class="rank">${p.n}</span><img src="${im(p.foto, "../../")}" alt="" loading="lazy"></a>
  ${p.selo ? `<span class="selo">${esc(p.selo)}</span>` : ""}<b>${esc(p.nome)}</b><div class="preco" hidden></div>
  <a class="btn-ml" href="${p.link}" target="_blank" rel="sponsored nofollow noopener">Ver oferta <span>→</span></a></div>`).join("")}</div></section>`;
}
// 03/11: blocos visuais opcionais da seção: passo a passo com telinha de celular, dicas em cartões e vitrine de fotos (leva pro site)
const passos = s => s.passos ? `<ol class="passos">${s.passos.map((p, i) => `<li><div class="cel"><div class="tela"><span class="barra"></span><span class="ico">${p.icone}</span><span class="bt">${esc(p.tela)}</span></div></div><div><span class="n">${i + 1}</span><h3>${esc(p.tit)}</h3><p>${p.txt}</p></div></li>`).join("")}</ol>` : "";
const dicas = s => s.dicas ? `<div class="dicas">${s.dicas.map(([ic, t, txt]) => `<div><span>${ic}</span><b>${esc(t)}</b><p>${esc(txt)}</p></div>`).join("")}</div>` : "";
const vitrine = s => s.vitrine ? `<div class="vitrine">${s.vitrine.map(v => `<a href="../../${v.link || ""}"><img src="${im(v.foto, "../../")}" alt="" loading="lazy"><span>${esc(v.nome)}</span></a>`).join("")}</div><p class="ver-mais"><a href="../../">Ver todos os achadinhos no site →</a></p>` : "";
const cardArtigo = (x, raiz) => { const np = produtosDe(x).length; return `<a class="card" href="${raiz}blog/${x.slug}/" data-cat="${catDe(x)}" data-txt="${esc((x.h1 || x.titulo) + " " + x.descricao).toLowerCase()}"><div class="card-img"><img src="${im(x.capa, raiz)}" alt="" loading="lazy"><span class="cat">${CATS[catDe(x)]}</span></div><div class="card-txt"><h3>${esc(x.h1 || x.titulo)}</h3><p>${esc(x.descricao)}</p><span class="info">${np ? `🛍️ ${np} produtos · ` : ""}⏱️ ${minutos(x)} min</span></div></a>`; };

function pagina(a) {
  numProd = 0;
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: a.faq.map(([q, r]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: r } })) };
  const artLd = { "@context": "https://schema.org", "@type": "Article", headline: semTags(a.h1 || a.titulo).slice(0, 110), description: a.descricao, image: im(a.capa, BASE + "/"), author: { "@type": "Organization", name: "China em Casa Achadinhos", url: BASE }, publisher: { "@type": "Organization", name: "China em Casa Achadinhos", logo: { "@type": "ImageObject", url: BASE + "/icone-512.jpg" } }, mainEntityOfPage: `${BASE}/blog/${a.slug}/` };
  const h2s = [...(a.tabela ? [a.tabela.titulo] : []), ...a.secoes.map(s => s.h2), "Perguntas frequentes"];
  const np = produtosDe(a).length;
  return `${cabeca(a.titulo, a.descricao, `${BASE}/blog/${a.slug}/`, `
<meta property="og:title" content="${esc(a.titulo)}"><meta property="og:image" content="${im(a.capa, BASE + "/")}"><meta property="og:type" content="article">
<script type="application/ld+json">${JSON.stringify(faqLd)}</script><script type="application/ld+json">${JSON.stringify(artLd)}</script>`)}
<div class="leitura"></div>
${topo("../../")}
<header class="hero-art hero-loja"><div class="wrap">
<p class="migalha"><a href="../../">Início</a> › <a href="../">Blog</a> › ${CATS[catDe(a)]}</p>
<h1>${esc(a.h1 || a.titulo)}</h1>
<p class="lead">${esc(a.descricao)}</p>
<p class="mini-autor">Atualizado em ${a.atualizado}${np ? ` · ${np} produtos` : ""} · Equipe China em Casa</p>
${a.faixa && a.faixa.conta ? `<i class="conta faixa-conta" data-datas="${esc(JSON.stringify(a.faixa.conta))}"></i>` : ""}
</div></header>
<main class="wrap">
${np >= 2 ? vitrineLoja(a) : `<div class="capa-wrap"><img class="capa" src="${im(a.capa, "../../")}" alt="" width="1100" height="500"></div>`}
<div class="corpo"><article>
<h2 class="tit-guia">📖 O guia: por que escolhemos cada um</h2>
${a.intro.map(p => `<p>${p}</p>`).join("\n")}
<div class="resumo"><strong>⚡ Resumo rápido</strong>${a.resumo.map(r => `<span>${r}</span>`).join("")}</div>
${a.tabela ? `<h2 id="${ancora(a.tabela.titulo)}">${esc(a.tabela.titulo)}</h2><div class="tabela"><table><tr>${a.tabela.cab.map(c => `<th>${esc(c)}</th>`).join("")}</tr>${a.tabela.linhas.map(l => `<tr>${l.map(c => `<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</table></div>` : ""}
${a.secoes.map(s => `<h2 id="${ancora(s.h2)}">${esc(s.h2)}</h2>${s.img ? `<img class="sec-img" src="${im(s.img, "../../")}" alt="" loading="lazy">` : ""}${(s.texto || []).map(p => `<p>${p}</p>`).join("")}${passos(s)}${dicas(s)}${(s.produtos || []).map(card).join("")}${vitrine(s)}`).join("\n")}
<h2 id="perguntas-frequentes">Perguntas frequentes</h2><div class="faq">${a.faq.map(([q, r]) => `<details><summary>${esc(q)}</summary><p>${esc(r)}</p></details>`).join("")}</div>
<div class="quem"><img src="../../icone-512.jpg" alt="" width="64" height="64" loading="lazy"><div><b>Como a gente escolhe</b><p>Olhamos os mais vendidos e bem avaliados do Mercado Livre, preferimos anúncios com entrega FULL e conferimos o preço toda semana. Produto que sai do ar ou sobe muito de preço sai da lista.</p></div></div>
<div class="chamada"><h2>Quer receber os achadinhos do dia?</h2><p>As melhores ofertas de Natal no canal do WhatsApp, sem spam.</p>
<a class="btn zap" href="${ZAP}" target="_blank" rel="noopener">Entrar no canal</a> <a class="btn" href="../../">Ver todas as ofertas</a></div>
</article>
<aside class="lateral">
<nav class="indice"><b>Neste guia</b>${h2s.map(t => `<a href="#${ancora(t)}">${esc(semTags(t))}</a>`).join("")}</nav>
<div class="caixa zap"><b>📲 Ofertas no WhatsApp</b><p>Achadinhos novos todo dia.</p><a class="btn zap" href="${ZAP}" target="_blank" rel="noopener">Entrar no canal</a></div>
</aside></div>
<h2 class="tit-leia">Leia também</h2><div class="grade leia">${artigos.filter(x => x.slug !== a.slug).slice(0, 3).map(x => cardArtigo(x, "../../")).join("")}</div>
</main>
${np >= 3 ? `<a class="compra-fixa" href="#escolhas">🛒 Ver as escolhas <span>${np} produtos</span></a>` : ""}
${VIVO}
${rodape("../../")}`;
}

for (const a of artigos) {
  const dir = path.join(__dirname, a.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), pagina(a));
}

// Índice do blog: busca + filtros por assunto + destaque + grade
const [primeiro, ...outros] = artigos;
const catsUsadas = [...new Set(artigos.map(catDe))];
fs.writeFileSync(path.join(__dirname, "index.html"), `${cabeca("Blog China em Casa Achadinhos: ideias de Natal, presentes e decoração", "Guias de compra de Natal: árvore, decoração e presentes baratos no Mercado Livre, com comparativos e dicas.", `${BASE}/blog/`)}
${topo("../")}
<section class="hero-blog"><div class="wrap"><span class="chip">🎄 GUIAS DE NATAL 2026</span><h1>Ideias de Natal que cabem no bolso</h1><p>Listas de presentes e decoração com o que vale a pena, o preço do dia e o link direto pro Mercado Livre.</p>
<input id="q" class="busca-blog" type="search" placeholder="Procurar: amigo secreto, árvore, pai…" aria-label="Procurar no blog">
<div class="filtros"><button class="on" data-f="">Todos</button>${catsUsadas.map(c => `<button data-f="${c}">${CATS[c]}</button>`).join("")}</div></div></section>
<main class="wrap">
<a class="destaque" href="${primeiro.slug}/" data-cat="${catDe(primeiro)}" data-txt="${esc((primeiro.h1 || primeiro.titulo) + " " + primeiro.descricao).toLowerCase()}"><div class="d-img"><img src="${im(primeiro.capa, "../")}" alt=""><span class="cat">${CATS[catDe(primeiro)]}</span></div><div class="d-txt"><span class="tag">✨ Novo</span><h2>${esc(primeiro.h1 || primeiro.titulo)}</h2><p>${esc(primeiro.descricao)}</p><span class="info">${produtosDe(primeiro).length ? `🛍️ ${produtosDe(primeiro).length} produtos · ` : ""}⏱️ ${minutos(primeiro)} min</span><span class="ler">Ler o guia →</span></div></a>
<div class="grade" id="grade">${outros.map(x => cardArtigo(x, "../")).join("")}</div>
<p class="vazio" id="vazio" hidden>Nada encontrado. Tenta outra palavra 🙂</p>
<div class="chamada"><h2>Achadinhos novos todo dia</h2><p>Entre no canal do WhatsApp ou veja a vitrine completa.</p><a class="btn zap" href="${ZAP}" target="_blank" rel="noopener">Entrar no canal</a> <a class="btn" href="../">Ver as ofertas</a></div>
</main>
<script>
(function(){
  var q=document.getElementById("q"),f="",itens=[].slice.call(document.querySelectorAll("[data-txt]"));
  var tira=function(s){return s.normalize("NFD").replace(/[\\u0300-\\u036f]/g,"").toLowerCase()};
  function filtra(){var t=tira(q.value.trim()),n=0;itens.forEach(function(e){var ok=(!f||e.dataset.cat===f)&&(!t||tira(e.dataset.txt).indexOf(t)>=0);e.hidden=!ok;if(ok)n++});document.getElementById("vazio").hidden=n>0;}
  q.addEventListener("input",filtra);
  document.querySelectorAll(".filtros button").forEach(function(b){b.onclick=function(){document.querySelectorAll(".filtros button").forEach(function(x){x.classList.remove("on")});b.classList.add("on");f=b.dataset.f;filtra();}});
})();
</script>
${rodape("../")}`);

// Sitemap
const urls = [`${BASE}/`, `${BASE}/blog/`, `${BASE}/sobre/`, `${BASE}/contato/`, `${BASE}/privacidade/`, `${BASE}/entregas/`, ...artigos.map(a => `${BASE}/blog/${a.slug}/`)];
fs.writeFileSync(path.join(__dirname, "..", "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u => `  <url><loc>${u}</loc><lastmod>${HOJE}</lastmod></url>`).join("\n")}\n</urlset>\n`);
console.log("ok", artigos.length, "artigos");
