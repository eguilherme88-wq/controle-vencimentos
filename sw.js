/* Service worker do Controle de Vencimentos.
   Escopo restrito a /controle-vencimentos/ e caches com prefixo próprio,
   para não interferir nos outros apps publicados em eguilherme88-wq.github.io. */
const PREFIX = "ctrlvenc-";
const VERSION = "v4";
const CACHE = PREFIX + VERSION;
const CORE = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/maskable-192.png",
  "./icons/maskable-512.png",
  "./icons/apple-touch-icon.png",
  "./icons/favicon.png",
  "./vendor/firebase/firebase-app-compat.js",
  "./vendor/firebase/firebase-auth-compat.js",
  "./vendor/firebase/firebase-firestore-compat.js"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  // Apaga só versões antigas DESTE app; caches de outros apps ficam intactos.
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith(PREFIX) && k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // Página principal: rede primeiro (pega atualizações), cache se estiver offline.
  const root = new URL("./", self.registration.scope).pathname;
  const isPage = url.origin === location.origin && (url.pathname === root || url.pathname === root + "index.html");
  if (req.mode === "navigate" && isPage) {
    e.respondWith(
      fetch(new Request(req.url, { cache: "no-cache", credentials: "same-origin" })).then(res => {
        if (res && res.ok && (res.headers.get("content-type") || "").includes("text/html")) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put("./index.html", copy));
        }
        return res;
      }).catch(() => caches.match("./index.html"))
    );
    return;
  }
  if (req.mode === "navigate") return;

  const sameApp = url.origin === location.origin && url.pathname.startsWith(new URL("./", self.registration.scope).pathname);
  const fonts = url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com";
  if (!sameApp && !fonts) return;

  // Arquivos do app e fontes: cache primeiro, atualiza em segundo plano.
  e.respondWith(
    caches.match(req).then(hit => {
      const net = fetch(req).then(res => {
        if (res && (res.ok || res.type === "opaque")) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(req, copy));
        }
        return res;
      }).catch(() => hit);
      return hit || net;
    })
  );
});
