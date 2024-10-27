let divcontainer = document.querySelector(".container");
divcontainer.style.display = "none";

function fetchJSON(file) {
	divcontainer.style.display = "flex";

	let htagDIV = document.getElementById("contentHtag");
	htagDIV.innerHTML = "<h1 style='font-weight: 700;'>Contents</h1>";

	fetch(`json/${file}.json`)
		.then((response) => response.json())
		.then((data) => {
			const contentDiv = document.getElementById("content");
			const navDiv = document.getElementById("navigation");

			navDiv.style.display = "none";

			contentDiv.innerHTML = "";
			navDiv.innerHTML = "";

			const navList = document.createElement("ul");

			data.forEach((section, index) => {
				for (const [sectionTitle, items] of Object.entries(section)) {
					const sectionId = sectionTitle.replace(/\s+/g, "").toLowerCase();

					if (data.length > 1 && index > 0) {
						const separator = document.createElement("div");
						separator.className = "separator";
						contentDiv.appendChild(separator);
					}

					const h2 = document.createElement("h2");
					h2.innerText = sectionTitle;
					h2.id = sectionId;
					contentDiv.appendChild(h2);

					const ul = document.createElement("ul");
					items.forEach((item) => {
						const li = document.createElement("li");

						const emojiSpan = document.createElement("span");
						emojiSpan.innerText = item.emoji;
						li.appendChild(emojiSpan);

						const a = document.createElement("a");
						a.innerText = item.title;
						a.href = item.link.toLowerCase(); // Ensure href is lowercase
						li.appendChild(a);

						const descriptionText = document.createTextNode(` ${item.description}`);
						li.appendChild(descriptionText);

						ul.appendChild(li);
					});

					contentDiv.appendChild(ul);

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

			if (data.length > 1) {
				navDiv.appendChild(navList);
			}
		})
		.catch((error) => console.error("Error fetching JSON:", error));
}

function otherPages(link) {
	window.open(link, "_blank");
}

let icon = document.querySelectorAll(".icon");

setInterval(() => {
	let element = icon[Math.floor(Math.random() * icon.length)];
	element.style.transition = "all 0.8s ease-in-out";
	element.style.transform = `rotate(${Math.floor(Math.random() * 360)}deg)`;
}, 5000);

function changeTheme() {
	document.documentElement.classList.toggle("dark-theme");
}

let themeElement = document.querySelector(".toggleTheme");
themeElement.addEventListener("click", changeTheme);
