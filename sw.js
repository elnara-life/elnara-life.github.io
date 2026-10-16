// Service worker Life OS (L16, ADR-026). Генерируется при сборке (vite.config.ts → offlineSw).
// Хранит только файлы приложения. Данных пользователя не видит и не кэширует: они в IndexedDB,
// зашифрованы, и сюда не попадают. Запросы на другие адреса (OpenAI) не трогает.
const VERSION = 'a4b93c21c12a31a7';
const CACHE = `lifeos-app-${VERSION}`;
const PRECACHE = ["./","assets/AssistantPage-JxxaRP6s.js","assets/HabitsPage-IKB0tyRT.js","assets/HealthPage-CgLdvRLX.js","assets/InvestPage-B_4Od-Z4.js","assets/MoneyPage-Cw996YnH.js","assets/MorePage-z8FmCzX5.js","assets/PlansPage-Cf88u5sz.js","assets/ResponsesParser-BM8duHyo.js","assets/WardrobePage-DbilZcpX.js","assets/cormorant-garamond-cyrillic-500-italic-C9gO-8KC.woff","assets/cormorant-garamond-cyrillic-500-italic-DVnfXoMy.woff2","assets/cormorant-garamond-cyrillic-500-normal-CyAY5ZLS.woff2","assets/cormorant-garamond-cyrillic-500-normal-DkJXBcIH.woff","assets/cormorant-garamond-cyrillic-600-normal-C2atO-64.woff2","assets/cormorant-garamond-cyrillic-600-normal-FNmA3REe.woff","assets/cormorant-garamond-cyrillic-ext-500-italic-ClXnudBg.woff2","assets/cormorant-garamond-cyrillic-ext-500-italic-DakTmaFY.woff","assets/cormorant-garamond-cyrillic-ext-500-normal-Yta7XZ9C.woff2","assets/cormorant-garamond-cyrillic-ext-500-normal-lsPpqi9g.woff","assets/cormorant-garamond-cyrillic-ext-600-normal-BMhMHfrj.woff2","assets/cormorant-garamond-cyrillic-ext-600-normal-CsIYWmWK.woff","assets/cormorant-garamond-latin-500-italic-DhNIfkTX.woff","assets/cormorant-garamond-latin-500-italic-Y14P-dkT.woff2","assets/cormorant-garamond-latin-500-normal-BsRWmXhO.woff2","assets/cormorant-garamond-latin-500-normal-zIXX3Q-H.woff","assets/cormorant-garamond-latin-600-normal-2CBVLo0M.woff","assets/cormorant-garamond-latin-600-normal-Co1r35X9.woff2","assets/cormorant-garamond-latin-ext-500-italic-CE7zdTnu.woff2","assets/cormorant-garamond-latin-ext-500-italic-CalKM9tT.woff","assets/cormorant-garamond-latin-ext-500-normal-CH1kM7og.woff2","assets/cormorant-garamond-latin-ext-500-normal-DYeaGGzO.woff","assets/cormorant-garamond-latin-ext-600-normal-DaBc-lu7.woff2","assets/cormorant-garamond-latin-ext-600-normal-Dk3-quAP.woff","assets/cormorant-garamond-vietnamese-500-italic-C-296ow0.woff","assets/cormorant-garamond-vietnamese-500-italic-D3igDnAQ.woff2","assets/cormorant-garamond-vietnamese-500-normal-BZGLGj12.woff2","assets/cormorant-garamond-vietnamese-500-normal-DqXqCC0q.woff","assets/cormorant-garamond-vietnamese-600-normal-BoXdMtcr.woff2","assets/cormorant-garamond-vietnamese-600-normal-C4HEjEaf.woff","assets/handoff-BCM35icO.js","assets/index-BsBopHsF.js","assets/index-DvRm_r0M.css","assets/inter-cyrillic-400-normal-HOLc17fK.woff","assets/inter-cyrillic-400-normal-obahsSVq.woff2","assets/inter-cyrillic-500-normal-BasfLYem.woff2","assets/inter-cyrillic-500-normal-CxZf_p3X.woff","assets/inter-cyrillic-600-normal-4D_pXhcN.woff","assets/inter-cyrillic-600-normal-CWCymEST.woff2","assets/inter-cyrillic-ext-400-normal-BQZuk6qB.woff2","assets/inter-cyrillic-ext-400-normal-DQukG94-.woff","assets/inter-cyrillic-ext-500-normal-B0yAr1jD.woff2","assets/inter-cyrillic-ext-500-normal-BmqWE9Dz.woff","assets/inter-cyrillic-ext-600-normal-Bcila6Z-.woff","assets/inter-cyrillic-ext-600-normal-Dfes3d0z.woff2","assets/inter-greek-400-normal-B4URO6DV.woff2","assets/inter-greek-400-normal-q2sYcFCs.woff","assets/inter-greek-500-normal-BIZE56-Y.woff2","assets/inter-greek-500-normal-Xzm54t5V.woff","assets/inter-greek-600-normal-BZpKdvQh.woff","assets/inter-greek-600-normal-plRanbMR.woff2","assets/inter-greek-ext-400-normal-DGGRlc-M.woff2","assets/inter-greek-ext-400-normal-KugGGMne.woff","assets/inter-greek-ext-500-normal-2j5mBUwD.woff","assets/inter-greek-ext-500-normal-C4iEst2y.woff2","assets/inter-greek-ext-600-normal-B8X0CLgF.woff","assets/inter-greek-ext-600-normal-DRtmH8MT.woff2","assets/inter-latin-400-normal-C38fXH4l.woff2","assets/inter-latin-400-normal-CyCys3Eg.woff","assets/inter-latin-500-normal-BL9OpVg8.woff","assets/inter-latin-500-normal-Cerq10X2.woff2","assets/inter-latin-600-normal-CiBQ2DWP.woff","assets/inter-latin-600-normal-LgqL8muc.woff2","assets/inter-latin-ext-400-normal-77YHD8bZ.woff","assets/inter-latin-ext-400-normal-C1nco2VV.woff2","assets/inter-latin-ext-500-normal-BxGbmqWO.woff","assets/inter-latin-ext-500-normal-CV4jyFjo.woff2","assets/inter-latin-ext-600-normal-CIVaiw4L.woff","assets/inter-latin-ext-600-normal-D2bJ5OIk.woff2","assets/inter-vietnamese-400-normal-Bbgyi5SW.woff","assets/inter-vietnamese-400-normal-DMkecbls.woff2","assets/inter-vietnamese-500-normal-DOriooB6.woff2","assets/inter-vietnamese-500-normal-mJboJaSs.woff","assets/inter-vietnamese-600-normal-BuLX-rYi.woff","assets/inter-vietnamese-600-normal-Cc8MFFhd.woff2","assets/nav-Cl8RIbiV.js","assets/openai-DBAJhJaY.js","assets/parse-9gPJ2S6e.js","assets/photo-CiwzPrLw.js","assets/rolldown-runtime-XKyaHtl9.js","assets/shared-BekQC2zW.js","assets/ui-5ZvHEvTR.js","assets/useInvest-Cuu-VPae.js","assets/zod-GKvYizo_.js","index.html","icon.svg","manifest.webmanifest"];

self.addEventListener('install', (event) => {
  // Новая версия ждёт, пока владелица нажмёт «Жаңарту» — открытая вкладка не меняется на ходу.
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(PRECACHE)));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((k) => k.startsWith('lifeos-app-') && k !== CACHE).map((k) => caches.delete(k)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== self.location.origin) return;
  if (req.mode === 'navigate') {
    // Страница — из сети (свежая версия), без сети — из кэша.
    event.respondWith(
      fetch(req).catch(() => caches.match('index.html', { ignoreSearch: true, ignoreVary: true })),
    );
    return;
  }
  // Файлы с хешем в имени не меняются — сначала кэш. ignoreVary: сервер может прислать
  // `Vary: Origin`, а скрипты модулей запрашиваются с Origin — без этого кэш не находился бы.
  event.respondWith(caches.match(req, { ignoreVary: true }).then((hit) => hit || fetch(req)));
});
