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
		let htmlContent;
		if (file === "data/README.md") {
			htmlContent = `
			<h2>Overview</h2>
<p class="boldS mb-4 text-lg font-normal text-gray-500 dark:text-gray-400">The repository <a href="https://github.com/SIDDHU123M/CodehubX">CodehubX</a> is a curated collection of diverse resources for developers, students, and tech enthusiasts. It features an extensive range of websites and tools, categorized into multiple sections for easy navigation. Whether you're interested in AI, entertainment, cybersecurity, or even creating a fake identity, CodehubX offers valuable tools and resources to enhance your journey.</p>
<p class="boldS mb-4 text-lg font-normal text-gray-500 dark:text-gray-400">Explore various categories, each containing carefully selected websites with detailed descriptions, ensuring you can easily find what you need.</p>

<h2>Content</h2>
<ol class="relative border-s border-gray-200 dark:border-gray-700"> 
    <li class="mb-4 ms-4">
        <div class="absolute w-2 h-2 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
        <h1 class="text-lg font-semibold text-gray-900 dark:text-white">AI Resources</h1>
        <p class="boldS mb-4 text-lg font-normal text-gray-500 dark:text-gray-400">Unlock the potential of AI with tools and libraries.</p>
    </li>
    <li class="mb-4 ms-4">
        <div class="absolute w-2 h-2 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
        <h1 class="text-lg font-semibold text-gray-900 dark:text-white">Entertainment</h1>
        <p class="boldS mb-4 text-lg font-normal text-gray-500 dark:text-gray-400">Get access to the best platforms for your entertainment needs.</p>
    </li>
    <li class="mb-4 ms-4">
        <div class="absolute w-2 h-2 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
        <h1 class="text-lg font-semibold text-gray-900 dark:text-white">Piracy Resources</h1>
        <p class="boldS mb-4 text-lg font-normal text-gray-500 dark:text-gray-400">Access tools and websites for piracy-related content.</p>
    </li>
    <li class="mb-4 ms-4">
        <div class="absolute w-2 h-2 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
        <h1 class="text-lg font-semibold text-gray-900 dark:text-white">Free Resources</h1>
        <p class="boldS mb-4 text-lg font-normal text-gray-500 dark:text-gray-400">Explore educational and professional resources for growth and development.</p>
    </li>
    <li class="mb-4 ms-4">
        <div class="absolute w-2 h-2 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
        <h1 class="text-lg font-semibold text-gray-900 dark:text-white">GitHub Repositories</h1>
        <p class="boldS mb-4 text-lg font-normal text-gray-500 dark:text-gray-400">Browse valuable repositories for developers and cybersecurity enthusiasts.</p>
    </li>
    <li class="mb-4 ms-4">
        <div class="absolute w-2 h-2 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
        <h1 class="text-lg font-semibold text-gray-900 dark:text-white">Tools</h1>
        <p class="boldS mb-4 text-lg font-normal text-gray-500 dark:text-gray-400">Access a comprehensive collection of development and design tools.</p>
    </li>
    <li class="mb-4 ms-4">
        <div class="absolute w-2 h-2 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
        <h1 class="text-lg font-semibold text-gray-900 dark:text-white">Fake Identity Tools</h1>
        <p class="boldS mb-4 text-lg font-normal text-gray-500 dark:text-gray-400">Create and manage temporary identities with ease.</p>
    </li>
</ol>

<h2>Important Note</h2>
<p class="boldS mb-4 text-lg font-normal text-gray-500 dark:text-gray-400">If any URL is not working or you think something needs an update, please report it to <a href="mailto:codehubx.work@gmail.com" class="text-blue-500">codehubx.work@gmail.com</a>.</p>
`;
		} else {
			const response = await fetch(file);
			if (!response.ok) {
				throw new Error(`Failed to load ${file}: ${response.statusText}`);
			}
			const markdown = await response.text();
			htmlContent = converter.makeHtml(markdown);
		}
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
	const headings = content.querySelectorAll("h1");
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

window.addEventListener("scroll", () => {
	const headings = Array.from(document.querySelectorAll("#content h1"));
	const scrollPosition = window.scrollY + 200;
	headings.forEach((heading, i) => {
		const nextHeading = headings[i + 1];
		const isActive = nextHeading ? scrollPosition >= heading.offsetTop && scrollPosition < nextHeading.offsetTop : scrollPosition >= heading.offsetTop;
		document.querySelectorAll("#right-nav a")[i].classList.toggle("active", isActive);
	});
});
