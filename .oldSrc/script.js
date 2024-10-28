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

let Setting = JSON.parse(localStorage.getItem('statusPopupShown'))

if(Setting.showStatus) {
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
            window.location.pathname.endsWith("index.html") ||
            window.location.href === "https://siddhu123m.github.io/CodehubX/" ||
            window.location.href === "https://siddhu123m.github.io/CodehubX";
    
        const allLinks = document.querySelectorAll(
            'main a:not(header a):not(.back-button a):not(.logo a):not([href^="#"]):not([href="index.html"])'
        );
    
        if (!isIndexPage) {
            allLinks.forEach((link) => {
                link.setAttribute("target", "_blank");
            });
        }
    });    
}