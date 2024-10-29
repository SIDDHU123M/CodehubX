const divContainer = document.querySelector(".container");
const spinner = document.getElementById("loading-spinner");
const htagDIV = document.getElementById("contentHtag");
const contentDiv = document.getElementById("content");
const navDiv = document.getElementById("navigation");
const icon = document.querySelectorAll(".icon");

divContainer.style.display = "none";

const cache = {};

async function fetchJSON(file) {
	spinner.style.display = "block";
	divContainer.style.display = "flex";
	htagDIV.innerHTML = "<h1 style='font-weight: 700;'>Contents</h1>";

	if (cache[file]) {
		renderContent(cache[file]);
		spinner.style.display = "none";
		return;
	}

	try {
		const response = await fetch(`json/${file}.json`);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const data = await response.json();
		cache[file] = data;
		renderContent(data);
	} catch (error) {
		console.error("Error fetching JSON:", error);
		htagDIV.innerHTML = `
            <h1 style='font-weight: 700; color: red;'>Failed to load content</h1>
            <button onclick="fetchJSON('${file}')">Retry</button>
        `;
	} finally {
		spinner.style.display = "none";
	}
}

function renderContent(data) {
	navDiv.style.display = "none";
	contentDiv.innerHTML = "";
	navDiv.innerHTML = "";

	const navList = document.createElement("ul");
	const fragment = document.createDocumentFragment();

	data.forEach((section, index) => {
		for (const [sectionTitle, items] of Object.entries(section)) {
			const sectionId = sectionTitle.replace(/\s+/g, "").toLowerCase();

			if (data.length > 1 && index > 0) {
				const separator = document.createElement("div");
				separator.className = "separator";
				fragment.appendChild(separator);
			}

			const h2 = document.createElement("h2");
			h2.innerText = sectionTitle;
			h2.id = sectionId;
			fragment.appendChild(h2);

			const ul = document.createElement("ul");
			items.forEach((item) => {
				const li = document.createElement("li");

				const emojiSpan = document.createElement("span");
				emojiSpan.innerText = item.emoji;
				li.appendChild(emojiSpan);

				const a = document.createElement("a");
				a.innerText = item.title;
				a.href = item.link.toLowerCase();
				a.setAttribute("aria-label", `${item.title} - ${item.description}`);
				li.appendChild(a);

				const descriptionText = document.createTextNode(` ${item.description}`);
				li.appendChild(descriptionText);

				ul.appendChild(li);
			});

			fragment.appendChild(ul);

			if (data.length > 1) {
				navDiv.style.display = "block";
				const navItem = document.createElement("li");
				const navLink = document.createElement("a");
				navLink.href = `#${sectionId}`;
				navLink.innerText = `${sectionTitle}`;
				navItem.appendChild(navLink);
				navList.appendChild(navItem);
			}
		}
	});

	contentDiv.appendChild(fragment);

	if (data.length > 1) {
		navDiv.appendChild(navList);
	}
}

function otherPages(link) {
	window.open(link, "_blank");
}

function changeTheme() {
	document.body.classList.toggle("dark-theme");
	localStorage.setItem("theme", document.body.classList.contains("dark-theme") ? "dark" : "light");
}

document.querySelector(".toggleTheme").addEventListener("click", changeTheme);

document.addEventListener("DOMContentLoaded", () => {
	if (localStorage.getItem("theme") === "dark") {
		document.body.classList.add("dark-theme");
	}
});

setInterval(() => {
	const element = icon[Math.floor(Math.random() * icon.length)];
	element.style.transition = "all 0.8s ease-in-out";
	element.style.transform = `rotate(${Math.floor(Math.random() * 360)}deg)`;
}, 5000);

function searchTools() {
	const query = document.getElementById("searchBar").value.toLowerCase();
	const items = document.querySelectorAll("#content ul li");

	items.forEach((item) => {
		const text = item.textContent.toLowerCase();
		item.style.display = text.includes(query) ? "" : "none";
	});
}
