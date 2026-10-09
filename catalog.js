const catalogList = document.querySelector("#catalog-list");
const catalogItems = window.designCatalog;

if (!catalogList) {
    throw new Error("Catalog list element was not found.");
}

if (!Array.isArray(catalogItems)) {
    throw new Error("Catalog data is missing or invalid. Run scripts/generate_catalog.py.");
}

if (catalogItems.length === 0) {
    catalogList.replaceChildren();
    const message = document.createElement("p");
    message.className = "catalog-message";
    message.textContent = "まだデザインがありません。フォルダーに .txt を追加してください。";
    catalogList.append(message);
} else {
    const cards = catalogItems.map((item, index) => {
        const card = document.createElement("a");
        card.className = `info-card${index % 2 === 1 ? " accent" : ""}`;
        card.href = item.path || `./${item.directory}/index.html`;
        card.setAttribute("aria-label", `${item.name} を開く`);
        card.title = `${item.name} を開く`;

        const copy = document.createElement("div");
        copy.className = "info-card-copy";

        const tag = document.createElement("span");
        tag.className = "tag";
        tag.textContent = `${item.directory} / ${item.file}`;

        const title = document.createElement("h3");
        title.textContent = item.name;

        const mark = document.createElement("span");
        mark.className = "card-mark";
        mark.setAttribute("aria-hidden", "true");
        mark.textContent = "✳";

        copy.append(tag, title);
        card.append(copy, mark);
        return card;
    });

    catalogList.replaceChildren(...cards);
}
