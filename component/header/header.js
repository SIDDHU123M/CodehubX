let head = document.getElementsByTagName("HEAD")[0];
let link = document.createElement("link");
link.rel = "stylesheet";
link.type = "text/css";
link.href = "css/header.css";
head.appendChild(link);

document.addEventListener("DOMContentLoaded", function () {
	var header = document.createElement("header");
	// Create h1 element with logo class
	var h1 = document.createElement("h1");
	h1.classList.add("logo");
	var anchor = document.createElement("a");
	anchor.setAttribute("href", "index.html");
	anchor.textContent = "CodeHub";
	var llo = document.createElement("llo");
	llo.textContent = "X";
	anchor.appendChild(llo);
	h1.appendChild(anchor);
	// Create nav element with nav-bar class
	var nav = document.createElement("nav");
	nav.classList.add("nav-bar");
	var ul = document.createElement("ul");
	ul.classList.add("nav-list");
	var li1 = document.createElement("li");
	li1.innerHTML = '<a href="index.html" class="nav-link">Home</a>';
	var li2 = document.createElement("li");
	li2.innerHTML = '<a href="profile/index.html" target="_blank" class="nav-link">Profile</a>';
	var li3 = document.createElement("li");
	li3.innerHTML = '<a href="https://github.com/SIDDHU123M/" class="nav-link">GitHub</a>';
	// Append li elements to ul
	ul.appendChild(li1);
	ul.appendChild(li2);
	ul.appendChild(li3);
	// Append h1 and ul to nav
	nav.appendChild(ul);
	// Append h1 and nav to header
	header.appendChild(h1);
	header.appendChild(nav);
	// Append header to body
	document.body.prepend(header);
	// Show all elements
	var elements = header.querySelectorAll("*");
	elements.forEach(function (element) {
		console.log(element);
	});
});
