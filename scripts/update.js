// @ts-check

import { parse, HTMLElement } from "node-html-parser";
import { writeFile } from "node:fs/promises";

const URL = "https://core.telegram.org/bots/webapps";
const DATA_FILE = "data/table-data.json";

async function main() {
    const res = await fetch(URL);
    const html = await res.text();

    const root = parse(html);
    fixLinks(root);

    const fieldsData = await getFieldsData(root);
    const eventsData = await getEventsData(root);

    await writeFile(DATA_FILE, JSON.stringify({ fieldsData, eventsData }, null, 2));
}

/**
 * @param {HTMLElement} startElement
 * @returns {HTMLElement | null}
 */
function findSiblingClosestTableElement(startElement) {
    let table = startElement.nextElementSibling;

    while (table !== null && table.rawTagName !== "table") {
        table = table.nextElementSibling;
    }

    return table?.rawTagName === "table" ? table : null;
}

/**
 * @param {HTMLElement} root
 * @returns {Promise<object[]>}
 */
async function getFieldsData(root) {
    const startLinkName = "initializing-web-apps";
    const h3 = root.querySelector(`a[name="${startLinkName}"]`)?.closest("h3");

    if (h3?.rawTagName !== "h3") {
        throw new Error(`Could not be found h3 ${startLinkName} node.`);
    }

    const table = findSiblingClosestTableElement(h3);

    if (table?.rawTagName !== "table") {
        throw new Error(`Could not be found table ${startLinkName} node.`);
    }

    const data = [];

    table.querySelectorAll("tbody > tr").forEach((tr) => {
        const trData = {};

        tr.querySelectorAll("td").forEach((td, i) => {
            trData[i] = td.innerHTML.toString();
        });

        data.push(trData);
    });

    return data;
}

/**
 * @param {HTMLElement} root
 * @returns {Promise<object[]>}
 */
async function getEventsData(root) {
    const startLinkName = "events-available-for-web-apps";
    const h4 = root.querySelector(`a[name="${startLinkName}"]`)?.closest("h4");

    if (h4?.rawTagName !== "h4") {
        throw new Error(`Could not be found h4 ${startLinkName} node.`);
    }

    const table = findSiblingClosestTableElement(h4);

    if (table?.rawTagName !== "table") {
        throw new Error(`Could not be found table ${startLinkName} node.`);
    }

    const data = [];

    table.querySelectorAll("tbody > tr").forEach((tr) => {
        const trData = {};

        tr.querySelectorAll("td").forEach((td, i) => {
            trData[i] = td.innerHTML.toString();
        });

        data.push(trData);
    });

    return data;
}

/**
 * Because we copy the content of the table from
 * https://core.telegram.org/bots/webapps
 * without manual edits in the HTML code, we need to replace
 * all local links to telegram site.
 * @param {HTMLElement} root
 */
function fixLinks(root) {
    root.querySelectorAll("a").forEach((a) => {
        const href = a.getAttribute("href");

        if (href?.startsWith("#")) {
            a.setAttribute("href", `https://core.telegram.org/bots/webapps${href}`);
        } else if (href?.startsWith("/")) {
            a.setAttribute("href", `https://core.telegram.org${href}`);
        }
    });
}

main();
