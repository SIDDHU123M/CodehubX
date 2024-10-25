const sections = document.querySelectorAll('h2');
const result = [];

sections.forEach(section => {
    const sectionTitle = section.innerText;
    const ul = section.nextElementSibling;
    const items = ul.querySelectorAll('li');

    const sectionItems = Array.from(items).map(item => {
        const link = item.querySelector('a');
        const emoji = item.childNodes[0].textContent.trim();
        const descriptionNode = Array.from(item.childNodes).find((node, index, nodes) => {
            return node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '' && nodes[index - 1] === link;
        });
        return {
            emoji: emoji,
            title: link.innerText,
            link: link.href,
            description: descriptionNode ? descriptionNode.textContent.trim().replace(/\s+/g, ' ') : ''
        };
    });

    result.push({
        [sectionTitle]: sectionItems
    });
});

console.log(result);