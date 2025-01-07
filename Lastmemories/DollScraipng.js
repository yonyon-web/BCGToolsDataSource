(() => {
    const name = document.getElementById("01").innerText.replace("の評価", "");
    const battleStyle = document.querySelector("#\\30 1 + table > tbody > tr:nth-child(4) > td:nth-child(1) > a").innerText;
    const attr = document.querySelector("#\\30 1 + table > tbody > tr:nth-child(4) > td:nth-child(2) > a").innerText.replace("属性", "");
    const skills = [
        ...Array.from(document.querySelectorAll("#\\30 9 + table th")).map(th => {
            const span = th.querySelector("span");
            return span.querySelector('span') !== null ? Array.from(span.childNodes).find(n => n.nodeType === 3)?.textContent : span.textContent;
        }),
        ...Array.from(document.querySelectorAll("#\\30 10 + table th")).map(th => {
            const span = th.querySelector("span");
            return span.querySelector('span') !== null ? Array.from(span.childNodes).find(n => n.nodeType === 3)?.textContent : span.textContent;
        })
    ].map(t => t?.trim() ?? "★取得不能★");

    const ust = document.querySelector("#\\30 7 + table");
    const usName = ust.querySelector("th > span").childNodes[2]?.textContent?.trim() ?? "★取得不能★";
    const usAttr = ust.querySelector("th img").attributes.getNamedItem("alt").value;
    const usDescription = ust.querySelector("td").innerText.replaceAll("\n", "");
    const usCharacteristic = Array.from(ust.querySelectorAll("th .textwaku")).map(s => s.innerText);
    console.log([name, "", "", "", "", "", battleStyle, attr, "", skills.join(","), "", "", "", "", "", "", "", "", "", "", "", usName, usAttr, usDescription, usCharacteristic].join("\t"))
})();