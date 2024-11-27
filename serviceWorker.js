const CACHE_NAME = "codehubx-cache-v1";
const urlsToCache = ["/", "/index.html", "/styles/style.css", "/scripts/main.js", "https://cdn.jsdelivr.net/npm/showdown@1.9.1/dist/showdown.min.js", "/data/README.md", "/data/summary.md", "/data/ai.md", "/data/entertainment.md", "/data/piracy.md", "/data/free-resources.md", "/data/github-repos.md", "/data/tools.md", "/data/fake-identity.md", "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined", "https://fonts.googleapis.com/css2?family=Titillium+Web:wght@600&display=swap", "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap", "https://fonts.googleapis.com/css2?family=Nabla&display=swap"];

self.addEventListener("install", (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => {
			return cache.addAll(urlsToCache);
		})
	);
});

self.addEventListener("fetch", (event) => {
	event.respondWith(
		caches
			.match(event.request)
			.then((response) => {
				return (
					response ||
					fetch(event.request).then((response) => {
						return caches.open(CACHE_NAME).then((cache) => {
							cache.put(event.request, response.clone());
							return response;
						});
					})
				);
			})
			.catch(() => {
				return caches.match("/index.html");
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
