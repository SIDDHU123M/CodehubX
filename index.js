const divContainer = document.querySelector(".container");
divContainer.style.display = "none";

function fetchJSON(file) {
	divContainer.style.display = "flex";
	const htagDIV = document.getElementById("contentHtag");
	htagDIV.innerHTML = "<h1 style='font-weight: 700;'>Contents</h1>";

	fetch(`json/${file}.json`)
		.then((response) => {
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			return response.json();
		})
		.then((data) => {
			renderContent(data);
		})
		.catch((error) => {
			console.error("Error fetching JSON:", error);
			htagDIV.innerHTML = "<h1 style='font-weight: 700; color: red;'>Failed to load content</h1>";
		});
}

function renderContent(data) {
	const contentDiv = document.getElementById("content");
	const navDiv = document.getElementById("navigation");

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

const icon = document.querySelectorAll(".icon");

setInterval(() => {
	const element = icon[Math.floor(Math.random() * icon.length)];
	element.style.transition = "all 0.8s ease-in-out";
	element.style.transform = `rotate(${Math.floor(Math.random() * 360)}deg)`;
}, 5000);

function changeTheme() {
	document.body.classList.toggle("dark-theme");
}

document.querySelector(".toggleTheme").addEventListener("click", changeTheme);
