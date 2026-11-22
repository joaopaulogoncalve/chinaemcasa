// Robô que MONTA o MP4 das historinhas (15/11). Roda no GitHub Actions (grátis), de hora em hora.
// Abre o editor do Worker (/editor?v=admin:<id>&baixar=1) num Chrome sem tela: o próprio editor monta
// frames + textos + selo + voz (/ia/voz) e baixa o MP4. O script sobe o MP4 no B2 (/api/foto) e grava
// videoPronto na revisão. A chave do admin vem do secret ADMIN_KEY (nunca fica no código).
import { chromium } from "playwright-core";
import { readFile } from "node:fs/promises";

const BASE = "https://china-em-casa.paulojao151.workers.dev";
const K = (process.env.ADMIN_KEY || "").trim();
if (!K) { console.error("falta ADMIN_KEY"); process.exit(1); }
const H = { "x-admin-key": K, cookie: "adm=" + K };
const POR_VEZ = Number(process.env.POR_VEZ || 2);

const salvar = (id, dados) => fetch(`${BASE}/api/db/revisoes/${id}`, { method: "POST", headers: { ...H, "content-type": "application/json" }, body: JSON.stringify(dados) });

const fila = await (await fetch(`${BASE}/api/montar/fila`, { headers: H })).json();
if (!Array.isArray(fila)) { console.error("fila:", fila); process.exit(1); }
console.log(`fila: ${fila.length} vídeo(s) pronto(s) pra montar`);
// (não sai aqui: depois das historinhas vem a fila dos vídeos longos)

const browser = await chromium.launch({ channel: process.env.CHROME_CANAL || "chrome", headless: true, args: ["--autoplay-policy=no-user-gesture-required"] });
const ctx = await browser.newContext({ acceptDownloads: true, viewport: { width: 1200, height: 900 } });
await ctx.addCookies([{ name: "adm", value: K, domain: "china-em-casa.paulojao151.workers.dev", path: "/", secure: true, httpOnly: true, sameSite: "Lax" }]);

for (const v of fila.slice(0, POR_VEZ)) {
  const page = await ctx.newPage();
  const inicio = Date.now();
  // 22/11: diagnóstico da voz (no PC sai com voz, aqui saía "sem voz" sem dizer por quê)
  page.on("response", r => { if (r.url().includes("/ia/voz")) console.log(`${v.id}: /ia/voz ${r.status()} ${r.headers()["content-type"] || ""} ${r.headers()["x-voz"] || ""}`); });
  page.on("console", m => { const t = m.text(); if (/voz|Voz|erro|Erro|decode/i.test(t)) console.log(`${v.id}: console: ${t.slice(0, 200)}`); });
  try {
    const baixou = page.waitForEvent("download", { timeout: 15 * 60e3 });
    await page.goto(`${BASE}/editor?v=admin:${encodeURIComponent(v.id)}&baixar=1`, { waitUntil: "load" });
    // se o editor mostrar "Erro:", para na hora (não espera os 15 min)
    const deuErro = page.waitForFunction(() => /^Erro:/.test(document.getElementById("status")?.textContent || ""), null, { timeout: 15 * 60e3, polling: 2000 })
      .then(async () => { throw new Error(await page.textContent("#status")); });
    const dl = await Promise.race([baixou, deuErro]);
    const arq = await dl.path();
    await page.waitForTimeout(500);
    const status = (await page.textContent("#status")) || "";
    const mapaSons = await page.evaluate(() => window.MAPA_SONS || null);
    const mp4 = await readFile(arq);
    console.log(`${v.id}: MP4 ${(mp4.length / 1e6).toFixed(1)} MB em ${Math.round((Date.now() - inicio) / 1000)} s`);
    console.log(`${v.id}: status: ${status.slice(0, 160)} | voz: ${await page.evaluate(() => window.VOZ_CONFERIDA || "-")}`);
    if (!/COM A VOZ/.test(status)) {
      // a voz grátis tem cota diária: sem voz, tenta de novo na próxima hora (até 96 vezes = 4 dias; 18/11: o robô roda de hora em hora) em vez de entregar mudo
      const n = (v.semVoz || 0) + 1;
      await salvar(v.id, n >= 96 ? { videoPronto: "", montarErro: "sem voz há 96 tentativas (cota do TTS?)", montarSemVoz: n } : { montarSemVoz: n, montarAviso: "esperando a voz (cota do TTS)" });
      console.log(`${v.id}: saiu SEM VOZ, tento de novo depois`);
      continue;
    }
    const up = await (await fetch(`${BASE}/api/foto`, { method: "POST", headers: { ...H, "content-type": "video/mp4" }, body: mp4 })).json();
    if (!up.url) throw new Error("upload: " + JSON.stringify(up));
    await salvar(v.id, { videoPronto: up.url, videoProntoEm: new Date().toISOString(), mapaSons, montarErros: 0, montarErro: "", montarAviso: "", videoSemVoz: false });
    // 16/11: se esse vídeo já estava na fila do robô do Instagram (versão antiga), troca pelo novo e reativa
    const ig = (await (await fetch(`${BASE}/api/db/insta`, { headers: H })).json().catch(() => [])).find(i => i.tarefa === "t-zap-" + v.id && i.status !== "publicado");
    if (ig) await fetch(`${BASE}/api/db/insta/${ig.id}`, { method: "POST", headers: { ...H, "content-type": "application/json" }, body: JSON.stringify({ video: up.url, status: "agendado", erro: "", container: null }) });
    console.log(`${v.id}: ✅ ${up.url}`);
    // 22/11 (João: "põe tudo pra moer"): o robô dá o "OK, já editei" sozinho → o admin agenda YouTube, TikTok B e Instagram
    // (antes os vídeos prontos ficavam parados esperando o clique do João)
    try {
      const adm = await ctx.newPage();
      await adm.goto(`${BASE}/admin`, { waitUntil: "load" });
      await adm.waitForTimeout(9000);
      const ok = await adm.evaluate(id => { const b = document.querySelector(`[data-editado="${id}"]`); if (!b) return "sem botão"; if (b.disabled) return "desabilitado"; b.click(); return "clicado"; }, v.id);
      await adm.waitForTimeout(6000);
      console.log(`${v.id}: OK automático: ${ok}`);
      await adm.close();
    } catch (e) { console.log(`${v.id}: OK automático falhou: ${e.message}`); }
  } catch (e) {
    console.error(`${v.id}: erro`, e.message);
    await salvar(v.id, { montarErros: (v.montarErros || 0) + 1, montarErro: String(e.message).slice(0, 300) });
  } finally {
    await page.close();
  }
}
// 16/11: VÍDEOS LONGOS (deitados, YouTube). Abre /longo?l=<id>&baixar=1 (o Short toca em tempo real e é gravado),
// sobe o MP4 e chama /api/longo/<id>/pronto: o Worker monta a descrição com capítulos e agenda no YouTube.
const longos = await (await fetch(`${BASE}/api/longos/fila`, { headers: H })).json().catch(() => []);
console.log(`longos: ${Array.isArray(longos) ? longos.length : 0} na fila`);
for (const l of Array.isArray(longos) ? longos.slice(0, 1) : []) {
  const page = await ctx.newPage();
  const inicio = Date.now();
  try {
    const baixou = page.waitForEvent("download", { timeout: 25 * 60e3 });
    await page.goto(`${BASE}/longo?l=${encodeURIComponent(l.id)}&baixar=1`, { waitUntil: "load" });
    const deuErro = page.waitForFunction(() => /^Erro:/.test(document.getElementById("status")?.textContent || ""), null, { timeout: 25 * 60e3, polling: 2000 })
      .then(async () => { throw new Error(await page.textContent("#status")); });
    const dl = await Promise.race([baixou, deuErro]);
    const mp4 = await readFile(await dl.path());
    const info = await page.evaluate(() => ({ capitulos: window.CAPITULOS || [], duracao: window.DURACAO || 0, status: window.STATUS || "" }));
    console.log(`${l.id}: MP4 ${(mp4.length / 1e6).toFixed(1)} MB em ${Math.round((Date.now() - inicio) / 1000)} s (${info.status})`);
    if (/SEM SOM/.test(info.status)) throw new Error("saiu sem som");
    const up = await (await fetch(`${BASE}/api/foto`, { method: "POST", headers: { ...H, "content-type": "video/mp4" }, body: mp4 })).json();
    if (!up.url) throw new Error("upload: " + JSON.stringify(up));
    const r = await (await fetch(`${BASE}/api/longo/${l.id}/pronto`, { method: "POST", headers: { ...H, "content-type": "application/json" }, body: JSON.stringify({ video: up.url, capitulos: info.capitulos, duracao: info.duracao }) })).json();
    console.log(`${l.id}:`, JSON.stringify(r));
  } catch (e) {
    console.error(`${l.id}: erro`, e.message);
    await fetch(`${BASE}/api/longo/${l.id}`, { method: "POST", headers: { ...H, "content-type": "application/json" }, body: JSON.stringify({ montarErros: (l.montarErros || 0) + 1, montarErro: String(e.message).slice(0, 300) }) });
  } finally {
    await page.close();
  }
}
await browser.close();
