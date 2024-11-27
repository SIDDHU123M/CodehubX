document.addEventListener("DOMContentLoaded", () => {
	const lastVisitedPage = localStorage.getItem("lastVisitedPage") || "data/README.md";
	const theme = localStorage.getItem("theme") || "light";
	document.documentElement.setAttribute("data-theme", theme);

	loadSidebar();
	loadPage(lastVisitedPage);

	const menuButton = document.getElementById("menu-button");
	menuButton.addEventListener("click", () => {
		const sidebar = document.getElementById("sidebar");
		if (sidebar.style.display === "block") {
			sidebar.style.display = "none";
		} else {
			sidebar.style.display = "block";
		}
	});

	const themeToggle = document.getElementById("theme-toggle");
	themeToggle.addEventListener("click", () => {
		const currentTheme = document.documentElement.getAttribute("data-theme");
		const newTheme = currentTheme === "light" ? "dark" : "light";
		document.documentElement.setAttribute("data-theme", newTheme);
		localStorage.setItem("theme", newTheme);
	});
});

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
	try {
		const response = await fetch(file);
		if (!response.ok) {
			throw new Error(`Failed to load ${file}: ${response.statusText}`);
		}
		const markdown = await response.text();
		let htmlContent = converter.makeHtml(markdown);
		document.getElementById("content").innerHTML = htmlContent;
		if (file !== "data/README.md") {
			createRightNav();
		}
		localStorage.setItem("lastVisitedPage", file);
	} catch (error) {
		console.error(error);
		document.getElementById("content").innerHTML = `<p>Error loading content. Please try again later.</p>`;
	}
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

	if (window.innerWidth <= 768) {
		addMobileNav(content, rightNavContent, firstH2);
	}
}

function addMobileNav(content, rightNavContent, firstH2) {
	content.append(document.createElement("hr"));
	const mobileNav = `
        <nav class="mobile-nav" aria-label="Mobile Navigation">
            <ul>${rightNavContent}</ul>
        </nav>`;
	if (firstH2) {
		firstH2.insertAdjacentHTML("afterend", mobileNav);
	} else {
		content.insertAdjacentHTML("afterbegin", mobileNav);
	}
}

function addSidebarEventListeners() {
	document.getElementById("sidebar-content").addEventListener("click", handleSidebarClick);
}

function handleSidebarClick(e) {
	if (e.target.tagName === "A") {
		e.preventDefault();
		const link = e.target;
		const file = link.getAttribute("data-link");
		loadPage(file);
		setActiveLink(link);

		const sidebar = document.getElementById("sidebar");
		if (window.innerWidth <= 768) {
			sidebar.classList.add("sidebar-close");
			sidebar.addEventListener(
				"animationend",
				() => {
					sidebar.style.display = "none";
					sidebar.classList.remove("sidebar-close");
				},
				{once: true}
			);
		}
	}
}

function setActiveLink(activeLink) {
	document.querySelectorAll("#sidebar-content a").forEach((link) => {
		link.classList.remove("active");
	});
	activeLink.classList.add("active");
}
