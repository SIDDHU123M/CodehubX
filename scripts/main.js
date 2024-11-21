document.addEventListener("DOMContentLoaded", () => {
	loadSidebar();
	loadPage("data/README.md");

	const menuButton = document.getElementById("menu-button");
	menuButton.addEventListener("click", () => {
		const sidebar = document.getElementById("sidebar");
		if (sidebar.style.display === "block") {
			sidebar.style.display = "none";
		} else {
			sidebar.style.display = "block";
		}
	});
});

/* Existing JavaScript code */

const converter = new showdown.Converter();
const iconMap = {
	Overview: "home",
	AI: "psychology",
	Entertainment: "theaters",
	Piracy: "warning",
	"Free Resources": "volunteer_activism",
	"Github Repo's": "folder",
	tools: "build",
	"Fake Identity": "person",
};

let files = [];
let currentIndex = 0;

async function loadSidebar() {
	const response = await fetch("data/summary.md");
	const markdown = await response.text();
	files = parseSidebarMarkdown(markdown);
	renderSidebar(files);
	addSidebarEventListeners();
}

function parseSidebarMarkdown(markdown) {
	const lines = markdown.split("\n");
	const fileList = [];

	lines.forEach((line) => {
		const match = line.match(/^\*\s+\[(.*?)\]\((.*?)\)$/);
		if (match) {
			const [_, text, link] = match;
			fileList.push({title: text, file: `data/${link}`});
		}
	});
	return fileList;
}

function renderSidebar(files) {
	const sidebarContent = files
		.map((file) => {
			const iconClass = iconMap[file.title] || "description";
			return `<a href="#" data-link="${file.file}">
                  <span class="material-symbols-outlined">${iconClass}</span> ${file.title}
                </a>`;
		})
		.join("");
	document.getElementById("sidebar-content").innerHTML = sidebarContent;
}

async function loadPage(file) {
	const response = await fetch(file);
	const markdown = await response.text();
	let htmlContent = converter.makeHtml(markdown);
	document.getElementById("content").innerHTML = htmlContent;
	if (file !== "data/README.md") {
		createRightNav();
	}
	// Remove or define updatePagination function
	// updatePagination();
}

function createRightNav() {
	const content = document.getElementById("content");
	const headings = content.querySelectorAll("h3");
	const firstH2 = content.querySelector("h2");
	const navHeading = firstH2 ? firstH2.textContent : "Navigation";
	const rightNavContent = Array.from(headings)
		.map((heading) => {
			const id = heading.textContent.toLowerCase().replace(/\s+/g, "-");
			heading.id = id;
			return `<li><a href="#${id}" class="anchorNav">${heading.textContent}</a></li>`;
		})
		.join("");
	document.getElementById("right-nav-content").innerHTML = `<ul>${rightNavContent}</ul>`;

	document.querySelectorAll("#right-nav a").forEach((link) => {
		link.addEventListener("click", (e) => {
			document.querySelectorAll("#right-nav a").forEach((link) => {
				link.classList.remove("active");
			});
			e.target.classList.add("active");
		});
	});

	// Add navigation links after the first line of the content for mobile users
	if (window.innerWidth <= 768) {
		content.append(document.createElement("hr"));
		const mobileNav = `
            <nav class="mobile-nav">
                <ul>${rightNavContent}</ul>
            </nav>`;
		if (firstH2) {
			firstH2.insertAdjacentHTML("afterend", mobileNav);
		} else {
			content.insertAdjacentHTML("afterbegin", mobileNav);
		}
	}
}

function addSidebarEventListeners() {
	document.querySelectorAll("#sidebar-content a").forEach((link, index) => {
		link.addEventListener("click", (e) => {
			e.preventDefault();
			currentIndex = index;
			loadPage(files[currentIndex].file);
			setActiveLink(link);
		});
	});
}

function setActiveLink(activeLink) {
	document.querySelectorAll("#sidebar-content a").forEach((link) => {
		link.classList.remove("active");
	});
	activeLink.classList.add("active");
}
