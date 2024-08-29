if (typeof window !== "undefined") {
	try {
		const key = "X-XSS-Protection";
		if (typeof event !== "undefined") {
			event.respondWith(
				new Response("", {headers: {[key]: "1; mode=block"}})
			);
		} else {
			const existing = document.head.querySelector(
				`meta[http-equiv="${key}"]`
			);
			if (existing) {
				existing.setAttribute("content", "1; mode=block");
			} else {
				const meta = document.createElement("meta");
				meta.setAttribute("http-equiv", key);
				meta.setAttribute("content", "1; mode=block");
				document.head.appendChild(meta);
			}
		}
	} catch (e) {
		console.log("Error protecting your security!");
	}
}

// Set GitHub link dynamically

// Use the native fetch API for browser environments
fetch("json/main.json")
	.then((response) => response.json())
	.then((data) => {
		const githubLinkElement = document.getElementById("githubLink");
		githubLinkElement.href = data.githubLink;
		githubLinkElement.target = "_blank";
	})
	.catch((error) => console.error("Error fetching GitHub link:", error));

// // Dynamic List Script
// const fetchDataAndCreateLinks = (skills, containerId) => {
// 	fetch("json/main.json")
// 		.then((response) => response.json())
// 		.then((data) => {
// 			const skillData = data[skills];
// 			const container = document.getElementById(containerId);
// 			for (const key in skillData) {
// 				if (skillData.hasOwnProperty(key)) {
// 					const linkItem = document.createElement("div");
// 					linkItem.className = "link-item";
// 					const anchor = document.createElement("a");
// 					anchor.href = skillData[key];
// 					anchor.target = "_blank";
// 					const paragraph = document.createElement("p");
// 					paragraph.textContent = key;
// 					anchor.appendChild(paragraph);
// 					linkItem.appendChild(anchor);
// 					container.appendChild(linkItem);
// 				}
// 			}
// 		})
// 		.catch((error) => console.error("Error fetching JSON:", error));
// };

function checkLinkStatus(link, statusId) {
	const statusCircle = document.getElementById(statusId);

	fetch(link.href, {mode: "no-cors"})
		.then((response) => {
			console.log(`Response for ${link.href}:`, response);
			statusCircle.classList.add("online");
		})
		.catch((error) => {
			console.error(`Error fetching ${link.href}:`, error);
			statusCircle.classList.add("offline");
		});
}

document.addEventListener("DOMContentLoaded", function () {
	const links = document.querySelectorAll("main ul a");
	links.forEach((link, index) => {
		const statusCircle = document.createElement("span");
		statusCircle.classList.add("status-circle");
		statusCircle.id = `status-${index}`;
		link.parentNode.insertBefore(statusCircle, link);

		checkLinkStatus(link, statusCircle.id);
	});

	const isIndexPage =
		window.location.pathname === "/" ||
		window.location.pathname.endsWith("index.html");

	const allLinks = document.querySelectorAll(
		'main a:not(header a):not(.back-button a):not(.logo a):not([href^="#"]):not([href="index.html"])'
	);

	if (!isIndexPage) {
		allLinks.forEach((link) => {
			link.setAttribute("target", "_blank");
		});
	}
});
