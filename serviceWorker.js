const CACHE_NAME = "codehubx-cache-v1";
const urlsToCache = [
	"/",
	"/index.html",
	"/styles/style.css",
	"/scripts/main.js",
	"https://cdn.jsdelivr.net/npm/showdown@1.9.1/dist/showdown.min.js",
	"/data/README.md",
	"/data/summary.md",
	"/data/ai.md",
	"/data/entertainment.md",
	"/data/piracy.md",
	"/data/free-resources.md",
	"/data/github-repos.md",
	"/data/tools.md",
	"/data/fake-identity.md",
];

self.addEventListener("install", (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => {`	`
			return cache.addAll(urlsToCache);
		})
	);
});

self.addEventListener("fetch", (event) => {
	event.respondWith(
		caches.match(event.request).then((response) => {
			return response || fetch(event.request);
		})
	);
});

self.addEventListener("activate", (event) => {
	const cacheWhitelist = [CACHE_NAME];
	event.waitUntil(
		caches.keys().then((cacheNames) => {
			return Promise.all(
				cacheNames.map((cacheName) => {
					if (!cacheWhitelist.includes(cacheName)) {
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
});
