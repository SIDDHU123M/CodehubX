function fetchJSON(file) {
    fetch(`json/${file}.json`)
        .then((response) => response.json())
        .then((data) => {
            const contentDiv = document.getElementById("content");
            const navDiv = document.getElementById("navigation");

            contentDiv.innerHTML = "";
            navDiv.innerHTML = "";

            const navList = document.createElement("ul");

            data.forEach((section) => {
                for (const [sectionTitle, items] of Object.entries(
                    section
                )) {
                    const sectionId = sectionTitle
                        .replace(/\s+/g, "")
                        .toLowerCase();

                    const h2 = document.createElement("h2");
                    h2.innerText = sectionTitle;
                    h2.id = sectionId;
                    contentDiv.appendChild(h2);

                    const ul = document.createElement("ul");
                    items.forEach((item) => {
                        const li = document.createElement("li");

                        const emojiSpan =
                            document.createElement("span");
                        emojiSpan.innerText = item.emoji;
                        li.appendChild(emojiSpan);

                        const a = document.createElement("a");
                        a.innerText = item.title;
                        a.href = item.link.toLowerCase(); // Ensure href is lowercase
                        li.appendChild(a);

                        const descriptionText =
                            document.createTextNode(
                                ` ${item.description}`
                            );
                        li.appendChild(descriptionText);

                        ul.appendChild(li);
                    });

                    contentDiv.appendChild(ul);

                    const navItem = document.createElement("li");
                    const navLink = document.createElement("a");
                    navLink.href = `#${sectionId}`;
                    navLink.innerText = sectionTitle;
                    navItem.appendChild(navLink);
                    navList.appendChild(navItem);
                }
            });

            navDiv.appendChild(navList);
        })
        .catch((error) =>
            console.error("Error fetching JSON:", error)
        );
}

function Otherpages(file) {
window.open(`pages/${file}.html`, "_blank");
}

// const sections = document.querySelectorAll('h2');
// const result = [];

// sections.forEach(section => {
//     const sectionTitle = section.innerText;
//     const ul = section.nextElementSibling;
//     const items = ul.querySelectorAll('li');

//     const sectionItems = Array.from(items).map(item => {
//         const link = item.querySelector('a');
//         const emoji = item.childNodes[0].textContent.trim();
//         const descriptionNode = Array.from(item.childNodes).find((node, index, nodes) => {
//             return node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '' && nodes[index - 1] === link;
//         });
//         return {
//             emoji: emoji,
//             title: link.innerText,
//             link: link.href,
//             description: descriptionNode ? descriptionNode.textContent.trim().replace(/\s+/g, ' ') : ''
//         };
//     });

//     result.push({
//         [sectionTitle]: sectionItems
//     });
// });

// console.log(result);


